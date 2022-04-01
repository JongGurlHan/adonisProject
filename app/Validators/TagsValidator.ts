import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TagsValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }, [
      rules.maxLength(10),
      rules.unique({ table: 'tags', column: 'name' }),
    ]),
  })

  public messages = {
    'required': 'tag명을 입력해주세요',
    'name.unique': '이미 같은 이름의 태그가 존재합니다',
    'name.maxLength': 'tag는 최대 10자까지 입력 가능합니다',
  }
}
