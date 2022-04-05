import User from 'App/Models/User'
import Factory from '@ioc:Adonis/Lucid/Factory'

//모델 팩토리: 테스트 코드 최소화, 무작위 데이터 생성
export const UserFactory = Factory.define(User, ({ faker }) => {
  return {
    name: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),    
  }
}).build()



// export const TaskFactory = Factory
//   .define(User, ({ faker }) => {
//     return {
//       title: faker.internet.t,
//     }
//   })
  // .relation('posts', () => PostFactory) // 👈
