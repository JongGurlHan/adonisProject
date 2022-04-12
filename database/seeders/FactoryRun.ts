import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { UserFactory } from 'Database/factories/user'

export default class FactoryRunSeeder extends BaseSeeder {
  public async run() {
    // user 3명씩 생성 - 한 user당 task 2개씩
    // 한 task당 tag 2개씩 붙도록 설정

    //문서 확인 -apply, stats 문서 나중에 확인
    await UserFactory.with('tasks', 2, (task) => task.with('tags', 2)).createMany(3)
  }
}
