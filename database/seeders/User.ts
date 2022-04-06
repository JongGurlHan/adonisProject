import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run() {

    await User.createMany([
      {
        email: 'virk@adonisjs.com',
        name: 'virk',
        password: 'secret',
      },
      {
        email: 'romain@adonisjs.com',
        name: 'romain',
        password: 'supersecret',
      },
      {
        email: 'romain2@adonisjs.com',
        name: 'romain2',
        password: 'supersecret',
      },
    ])  
}
}
