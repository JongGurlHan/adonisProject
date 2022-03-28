import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    name: schema.string({}),

    password: schema.string({ trim: true }, [rules.minLength(4)]),
  })

  public messages = {
    'required': '{{field}}를 입력해주세요',
    //'email.required': '이메일을 입력해주세요',
    'email.unique': '이미 존재하는 이메일입니다',
    'password.minLength': '비밀번호는 4글자 이상 작성해주세요',
  }
}
