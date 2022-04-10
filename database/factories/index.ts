import User from 'App/Models/User'
import Factory from '@ioc:Adonis/Lucid/Factory'
import Task from 'App/Models/Task'
import Tag from 'App/Models/Tag'

//모델 팩토리: 테스트 코드 최소화, 무작위 데이터 생성

export const TagFactory = Factory.define(Tag, ({ faker }) => {
  return {
    name: faker.lorem.words(),
  }
}).build()

export const TaskFactory = Factory.define(Task, ({ faker }) => {
  return {
    title: faker.lorem.sentence(),
  }
}).build()

export const UserFactory = Factory.define(User, ({ faker }) => {
  return {
    name: faker.internet.userName(),
    email: faker.internet.email(),
    password: '1111',
  }
})
  .relation('tasks', () => TaskFactory)
  .build()
