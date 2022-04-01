import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { UserFactory } from 'Database/factories'

export default class UserSeeder extends BaseSeeder {
  public async run() {

    await UserFactory.createMany(10)
    
    // await User.createMany([
  //     {
  //       email: 'virk@adonisjs.com',
  //       name: 'virk',
  //       password: 'secret',
  //     },
  //     {
  //       email: 'romain@adonisjs.com',
  //       name: 'romain',
  //       password: 'supersecret',
  //     },
  //   ])
  // }
}
}
//https://jagr.co/lessons/adonis-5-infinite-load-project-setup-and-dummy-data