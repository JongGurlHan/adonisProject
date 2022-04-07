import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import NotFoundException from 'App/Exceptions/NotFoundException'
import RegisterUserException from 'App/Exceptions/RegisterUserException'
import ShowUserException from 'App/Exceptions/ShowUserException'
import User from 'App/Models/User'
import UserRepository from 'App/Repositories/UserRepository'
import UserValidator from 'App/Validators/UserValidator'

export default class UsersController {
  //회원가입
  public async register({ request }: HttpContextContract) {
    try {
      const validatedData = await request.validate(UserValidator)
      await UserRepository.createUser(validatedData)
      return validatedData
    } catch (e) {
      const message = '회원가입 오류입니다.'
      const status = 500
      const errorCode = 'E_INVALID_USER_REGISTRATION'
      throw new RegisterUserException(message, status, errorCode)
    }
  }

  //전체유저 조회
  public async showAllUsers({ response }: HttpContextContract) {
    try {
      const users = await UserRepository.showAllUsers()
      if (users == null) {
        throw new ShowUserException('회원정보가 없습니다.', 404, 'E_INVALID_USER')
      }
      return users
    } catch (e) {
      response.status(e.status)
      return e.name + '::' + e.message
    }
  }

  //특정유저 조회
  public async showUser({ params, response }: HttpContextContract) {
    try {
      const user = await UserRepository.showUser(params.id)
      if (!user) {
        //null, undefiend 상황일때 / !사용법
        throw new NotFoundException('user')
      }
      return user
    } catch (e) {
      console.log(e.code)
      //console.log(e.status)
      // console.log(e.message)

      response.status(e.status)
      throw e
    }
  }

  //로그인
  public async login({ auth, request, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      const user = await User.findBy('email', email)
      if (user == null) {
        throw new NotFoundException('해당 유저는 존재하지 않습니다.')
      }
      const token = await auth.use('api').attempt(email, password, { expiresIn: '24hours' })
      return token
    } catch (e) {
      response.status(e.status)
      return e.name + '::' + e.message
    }
  }

  //로그아웃 - 컨트롤러단에서 처리
  public async logout({ auth }: HttpContextContract) {
    await auth.use('api').revoke()

    // console.log(auth.user)
    if (auth.user == null) {
      return auth.user
    } else {
      return 'logout failed!'
    }
  }

  // 로그인한 유저 조회(토큰정보로)
  public async profile({ auth }: HttpContextContract) {
    return auth.user
  }
}
