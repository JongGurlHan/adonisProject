//import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UserRepository extends User {
  public static async createUser(
    validatedData: Partial<User> | { email: string; name: string; password: string }
  ) {
    return await User.create(validatedData)
  }
  //const user :User = new User()
  // user.email = validatedData.email
  // user.name = validatedData.name
  // user.password = validatedData.password
  //return await user.save()

  public static async showAllUsers() {
    const users = await User.all()
    return users
  }

  public static async showUser(id: number) {
    const user = await User.query().where('id', id).first()
    return user
    // if (user) {
    //   return user
    // } else {
    //   return '해당 유저는 존재하지 않습니다.'
    // }
  }
}
