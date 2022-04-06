import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { UserFactory } from 'Database/factories'

export default class FactoryRunSeeder extends BaseSeeder {
  public async run () {
    // user 팩토리 인스턴스 생성
    await UserFactory.createMany(10)



    // task 팩토리 인스턴스 생성
    


    // tag 팩토리 인스턴스 생성 
  }
}
