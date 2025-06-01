import db from '#config/db'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProjectsController {
  async getAll() {
    const projects = await db.project.findMany()
    return projects.map(({ id, name, createdAt }) => ({ id, name, createdAt }))
  }

  async getSingle({ response, request }: HttpContext) {
    const id = request.param('id', null)
    if (!id) return response.status(400)

    const project = await db.project.findUnique({
      where: { id },
    })
    return project
  }

  async create({ request }: HttpContext) {
    const { name } = request.body() as { name: string }
    const project = await db.project.create({
      data: {
        name,
      },
    })
    return project
  }

  async getLocales({ request, response }: HttpContext) {
    const id = request.param('id', null)
    if (!id) return response.status(400)

    const locales = await db.locale.findMany({
      where: {
        translations: {
          every: {
            translationKey: {
              projectId: id,
            },
          },
        },
      },
    })
    return locales.map(({ code }) => code)
  }

  async getTranslations({ request, response }: HttpContext) {
    const id = request.param('id', null)
    if (!id) return response.status(400)

    const translations = await db.translationKey.findMany({
      where: { projectId: id },
      select: {
        id: true,
        keyPath: true,
        isGroupHeader: true,
        translations: {
          select: {
            value: true,
            locale: {
              select: {
                code: true,
              },
            },
          },
        },
      },
    })
    return translations.map(
      ({ id: translationId, isGroupHeader, keyPath, translations: translationValues }) => {
        const result: Record<string, string | null> = {}
        const keysArray = keyPath.split('.')
        const level = keysArray.length - 1

        translationValues.forEach(({ value, locale: { code } }) => {
          result[code] = value
        })

        return {
          id: translationId,
          isGroupHeader,
          key: keyPath,
          displayKey: keysArray[level],
          level,
          ...result,
        }
      }
    )
  }
}
