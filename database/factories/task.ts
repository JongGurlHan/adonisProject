import Factory from '@ioc:Adonis/Lucid/Factory'
import Task from 'App/Models/Task'
import { TagFactory } from './tag'

export const TaskFactory = Factory.define(Task, ({ faker }) => {
  return {
    title: faker.lorem.sentence(),
  }
})
  .relation('tags', () => TagFactory)
  .build()
