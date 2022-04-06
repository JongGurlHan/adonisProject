import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ExceptionHandler extends HttpExceptionHandler {
  protected statusPages = {
    '403': 'errors/unauthorized',
    '404': 'errors/not-found',
    '500..599': 'errors/server-error',
  }

  //오류를 자체 처리
  public async handle(error: any, ctx: HttpContextContract) {
    /**
     * Self handle the validation exception
     */

    if (error.code === 'E_INVALID_AUTH_UID') {
      console.log('유저정보를 찾을 수 없습니다.')
      //return ctx.response.status(422).send(error.messages)
    }

    /**
     * 나머지 예외를 상위 클래스로 전달
     */
    return super.handle(error, ctx)
  }

  constructor() {
    super(Logger)
  }
}
