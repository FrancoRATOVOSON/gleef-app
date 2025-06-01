import db from '#config/db'
import { Prisma } from '#prisma/index'
import { flattenTranslationObject, TranslationJson } from '#utils/translation'
import { uploadFilesValidator } from '#validators/translation'
import type { HttpContext } from '@adonisjs/core/http'
import fs from 'node:fs/promises'

export default class TranslationsController {
  async updateTranslation({ auth, request, response }: HttpContext) {
    const { user } = auth
    if (!user) return response.status(401)

    const {
      id,
      locale: code,
      value,
    } = request.body() as { id: string; locale: string; value: string }
    if (!id || !code || !value) return response.status(400)

    const existingLocale = await db.locale.findUnique({ where: { code } })
    const existingTranslation = await db.translation.findUnique({ where: { id, locale: { code } } })
    if (!existingLocale || !existingTranslation) return response.status(404)

    const translation = await db.translation.update({
      where: { id, locale: { code } },
      data: { value },
    })

    return translation
  }

  async createTranslation({ auth, request, response }: HttpContext) {
    const { user } = auth
    if (!user) return response.status(401)

    const {
      projectId,
      fullKey: keyPath,
      values,
    } = request.body() as {
      projectId: string
      fullKey: string
      values: { [locales: string]: string | null }
    }
    if (!projectId || !keyPath || !values) return response.status(400)

    const existingProject = await db.project.findUnique({ where: { id: projectId } })
    if (!existingProject) return response.status(404)

    await db.$transaction(async (tx) => {
      const locales = await tx.locale.findMany({ where: { code: { in: Object.keys(values) } } })
      const localeValues: Record<string, string | null> = {}
      locales.forEach(({ id, code }) => {
        if (values[code]) localeValues[id] = values[code]
      })

      const translationKey = await tx.translationKey.create({
        data: {
          keyPath,
          isGroupHeader: false,
          projectId,
        },
      })

      const translation = await tx.translation.createMany({
        data: Object.entries(localeValues).map(
          ([localeId, value]) =>
            ({
              value,
              localeId,
              translationKeyId: translationKey.id,
            }) as Prisma.TranslationCreateManyInput
        ),
      })

      return translation
    })

    return {}
  }

  async uploadFiles({ auth, request, response }: HttpContext) {
    const { user } = auth
    if (!user) return response.status(401)

    const { files, projectId } = await request.validateUsing(uploadFilesValidator)

    const localeTranslations: Record<string, TranslationJson> = {}

    for (const file of files) {
      if (file.isValid && file.tmpPath) {
        try {
          const content = await fs.readFile(file.tmpPath, 'utf-8')
          const jsonData = JSON.parse(content)
          localeTranslations[file.clientName] = jsonData
        } catch (error) {
          console.error(`Failed to process file ${file.clientName}:`, error)
          return response.status(422).send({
            message: `Le fichier ${file.clientName} est un JSON invalide.`,
          })
        }
      }
    }

    const translationList = Object.entries(localeTranslations)
      .map(([locale, translation]) => flattenTranslationObject(translation, locale))
      .flat()

    const result = await db.$transaction(async (tx) => {
      await tx.translationKey.createManyAndReturn({
        data: translationList.map(
          ({ id, key: keyPath, isGroupHeader }) =>
            ({
              id,
              keyPath,
              isGroupHeader,
              projectId,
            }) satisfies Prisma.TranslationKeyCreateManyInput
        ),
      })

      const locales = await Promise.all(
        Object.keys(localeTranslations).map((code) =>
          tx.locale.upsert({
            where: { code },
            create: { code, name: code.toUpperCase() },
            update: {},
          })
        )
      )

      const translationWithValues = translationList.filter(
        (translation) => !translation.isGroupHeader
      )

      const data = translationWithValues
        .map(({ id, isGroupHeader, key, ...localesValues }) =>
          Object.entries(localesValues).map(
            ([locale, value]) =>
              ({
                localeId: locales.find((lcl) => lcl.code === locale)?.id ?? '',
                translationKeyId: id,
                value: value as string,
              }) satisfies Prisma.TranslationCreateManyInput
          )
        )
        .flat()

      const translations = await tx.translation.createMany({
        data,
      })

      return translations
    })

    return result
  }
}
