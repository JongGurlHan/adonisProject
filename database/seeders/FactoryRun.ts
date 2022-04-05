import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { UserFactory } from 'Database/factories'
import { Test } from 'japa/build/src/Test'

export default class FactoryRunSeeder extends BaseSeeder {
  public async run () {
    // user 팩토리 인스턴스 생성
    const userFactory = await UserFactory.createMany(100)



    // task 팩토리 인스턴스 생성
    


    // tag 팩토리 인스턴스 생성 
  }
}
