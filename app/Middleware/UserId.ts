import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import NotFoundException from 'App/Exceptions/NotFoundException'
import User from 'App/Models/User'
import UserRepository from 'App/Repositories/UserRepository'

export let globalUser: User
//범용적으로 사용할 목적으로 이름 변경
export default class UserId {
  public async handle({ request }: HttpContextContract, next: () => Promise<void>) {
    console.log('=== Middleware is running! ===')

    //라우터 별로 지정한 파라미터가 안들어왔을때 어떻게 할지 수정
    //1. 어느 라우터 파라미터가 넘어오는지 확인
    const idParam = request.param('userId')

    if (idParam) {
      let user = await UserRepository.showUser(idParam)
      if (user) {
        globalUser = user
      } else {
        throw new NotFoundException('userfasdfadsf')
      }
    } else {
      throw new NotFoundException('param')
    }

    await next()
  }
}
