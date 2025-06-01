import vine from '@vinejs/vine'

export const uploadFilesValidator = vine.compile(
  vine.object({
    files: vine
      .array(
        vine.file({
          size: '5mb',
          extnames: ['json'],
        })
      )
      .minLength(1),
    projectId: vine.string(),
  })
)
