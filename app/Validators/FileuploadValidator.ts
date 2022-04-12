import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class FileuploadValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    tasks: schema.file({
      size: '2mb',
      extnames: ['txt', 'rtf'],
    }),
  })

  public messages = {
    'required': '파일을 업로드해주세요',
    'tasks.size': '파일크기는 2mb를 초과할 수 없습니다.',
    'tasks.extnames': 'txt, 혹은 rtf파일 형식만 업로드할 수 있습니다..',
  }
}
