//import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UserRepository extends User {
  public static async createUser(validatedData) {
    return await User.create(validatedData)
  }

  public static async showAllUsers() {
    const users = await User.all()
    return users
  }
}
