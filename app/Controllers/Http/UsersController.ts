import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

import UserRepository from 'App/Repositories/UserRepository'
import UserValidator from 'App/Validators/UserValidator'

export default class UsersController {
  //회원가입
  public async register({ request }: HttpContextContract) {
    // try catch - throw 하는 이유 및 test에서 200나오는 이유 찾기
    try {
      const validatedData = await request.validate(UserValidator)
      await UserRepository.createUser(validatedData)
      return validatedData
    } catch (error) {
      //return error.messages
      throw error
    }
  }

  //전체유저 조회
  public async showAllUsers() {
    return await UserRepository.showAllUsers()
  }
  //특정유저 조회
  public async showUser({params} : HttpContextContract) {
    return await UserRepository.showUser(params.id)
  }

 

  //로그인 - 컨트롤러단에서 처리
  public async login({ auth, request }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    const token = await auth.use('api').attempt(email, password, { expiresIn: '24hours' }) //api인증.attempt(uuid, password)

    const user = await User.findBy('email', email)
    return {
      user,
      token,
    }
  }

  //로그아웃 - 컨트롤러단에서 처리
  public async logout({ auth }: HttpContextContract) {
    await auth.use('api').revoke()
    return 'logout successfully!'
  }

  // 로그인한 유저 조회(토큰정보로)
  public async profile({ auth }: HttpContextContract) {
    console.log(auth.user)
    return auth.user
  }
}
