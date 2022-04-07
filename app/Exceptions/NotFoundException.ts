import { Exception } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new NotFoundException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
// status?: number | undefined
// status: number | undefined = undefined
export default class NotFoundException extends Exception {
  constructor(modelNmae: string) {
    super(`${modelNmae} not found!!`, 404)
  }

  //code, status 차이 다시 확인!
  public async handle(error: this, { response }: HttpContextContract) {
    response.status(error.status).send({
      error: {
        message: this.message,
        code: error.code,
      },
    })
  }
}
