import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import NotFoundException from 'App/Exceptions/NotFoundException'
import RegisterUserException from 'App/Exceptions/RegisterUserException'
import User from 'App/Models/User'
import UserRepository from 'App/Repositories/UserRepository'
import UserValidator from 'App/Validators/UserValidator'
import Event from '@ioc:Adonis/Core/Event'

// import { globalUser } from 'App/Middleware/UserId'

export default class UsersController {
  //회원가입
  public async register({ request }: HttpContextContract) {
    try {
      const validatedData = await request.validate(UserValidator)
      await UserRepository.createUser(validatedData)

      Event.emit('new:user', { email: validatedData.email, name: validatedData.name })

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
      if (!users) {
        throw new NotFoundException('users')
      }
      return users
    } catch (e) {
      response.status(e.status)
      return e
    }
  }

  //특정유저 조회
  public async showUser() {
    // return globalUser
  }

  //로그인
  public async login({ auth, request }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      const user = await User.findBy('email', email)
      if (!user) {
        throw new NotFoundException('user')
      }
      const token = await auth.use('api').attempt(email, password, { expiresIn: '24hours' })
      return token
    } catch (e) {
      throw new NotFoundException('user')
    }
  }

  //로그아웃 - 컨트롤러단에서 처리
  public async logout({ auth }: HttpContextContract) {
    await auth.use('api').revoke()

    console.log(auth.user)
    if (auth.user == null) {
      console.log('logout success!')
      return auth.user
    } else {
      return 'logout failed!'
    }
  }

  // 로그인한 유저 조회(토큰정보로)
  public async profile({ auth }: HttpContextContract) {
    console.log(auth.user)
    return auth.user
  }
}
