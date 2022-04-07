import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
      rules.maxLength(25),
    ]),
    name: schema.string({ trim: true }, [rules.maxLength(5)]),

    password: schema.string({ trim: true }, [rules.minLength(4)]),
  })

  public messages = {
    'email.required': '이메일을 입력해주세요',
    'name.required': '이름을 입력해주세요',
    'name.maxLength': '이름은 최대 5글자입니다.',

    'email.unique': '이미 존재하는 이메일입니다',
    'password.minLength': '비밀번호는 4글자 이상 작성해주세요',
  }
}
