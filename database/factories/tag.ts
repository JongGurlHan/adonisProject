import Factory from '@ioc:Adonis/Lucid/Factory'
import Tag from 'App/Models/Tag'

export const TagFactory = Factory.define(Tag, ({ faker }) => {
  return {
    name: faker.lorem.words(),
  }
}).build()
