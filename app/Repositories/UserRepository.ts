//import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { DateTime } from 'luxon'

export default class UserRepository extends User {
  public static async createUser(
    validatedData:
      | Partial<{
          id: number
          createdAt: DateTime
          updatedAt: DateTime
          name: string
          email: string
          password: string
          rememberMeToken: string | undefined
        }>
      | { email: string; name: string; password: string }
  ) {
    return await User.create(validatedData)
  }
  
  public static async showAllUsers() {
    const users = await User.all()
    console.log(users) //데이터 리턴 이전이므로
    return users
  }

  public static async showUser(id: number){
    const user = await User.query().where('id', id).first()
    if (user) {
      return user
    } else {
      return '해당 유저는 존재하지 않습니다.'
    }


  }
}
