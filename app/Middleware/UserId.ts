import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import NotFoundException from 'App/Exceptions/NotFoundException'
import User from 'App/Models/User'
import UserRepository from 'App/Repositories/UserRepository'

export let globalUser: User

export default class UserId {
  public async handle({ request }: HttpContextContract, next: () => Promise<void>) {
    console.log('=== UserId Middleware is running! ===')

    const idParam = request.param('id')

    //유저 검색 할때 id값이 있는지 없는지 구분
    if (idParam) {
      let user = await UserRepository.showUser(idParam)
      if (user) {
        globalUser = user
      } else {
        throw new NotFoundException('user')
      }
    } else {
      //exception 던지는 방향으로
      //or 전체 조회 미들웨어 걷어내기
      console.log('파라미터를 입력하지 않았습니다 - 전체유저 조회')
    }

    await next()
  }
}
