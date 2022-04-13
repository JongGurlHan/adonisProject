import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TasksValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string({ trim: true }, [rules.minLength(2), rules.maxLength(50)]),
  })

  public messages = {
    'required': '{{field}}를 입력해주세요',
    'title.minLength': '최소 2자 이상 입력해주세요',
    'title.maxLength': '최대 50자까지 입력 가능합니다',
  }
  data: any
}
