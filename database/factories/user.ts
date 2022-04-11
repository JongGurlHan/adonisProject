import User from 'App/Models/User'
import Factory from '@ioc:Adonis/Lucid/Factory'
import { TaskFactory } from './task'

export const UserFactory = Factory.define(User, ({ faker }) => {
  return {
    name: faker.internet.userName(),
    email: faker.internet.email(),
    password: '1111',
  }
})
  .relation('tasks', () => TaskFactory)
  .build()
