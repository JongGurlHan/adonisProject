import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { TagFactory, TaskFactory, UserFactory } from 'Database/factories'

//1. reverted 안하고 trucate 하도록 설정
//   create 하기 전에 truncate 했을 경우도 고려
//2. 연관된 task 도 생성될 수 있도록
//   user 만들때 연관된 테이블도 정보도 생성되도록
export default class FactoryRunSeeder extends BaseSeeder {
  public async run() {
    // user 팩토리 인스턴스 생성

    //await UserFactory.createMany(10)
    await UserFactory.with('tasks', 3).create()

    // task 팩토리 인스턴스 생성
    // await TaskFactory.createMany(10)

    // tag 팩토리 인스턴스 생성
    await TagFactory.createMany(10)
  }
}
