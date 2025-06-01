import vine from '@vinejs/vine'

export const uploadFilesValidator = vine.compile(
  vine.object({}).merge(
    vine.group([
      vine.group.if((data) => Array.isArray(data.files), {
        files: vine
          .array(
            vine.file({
              size: '5mb',
              extnames: ['json'],
            })
          )
          .minLength(1),
        projectId: vine.string(),
      }),
      vine.group.if((data) => !Array.isArray(data.files), {
        files: vine.file({
          size: '5mb',
          extnames: ['json'],
        }),
        projectId: vine.string(),
      }),
    ])
  )
)
