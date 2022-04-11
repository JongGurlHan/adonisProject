//세션방식 로그인
//const { email, password } = request.all()
// try {
//   await auth.attempt(email, password)
//   console.log('login success!')
//   return response.redirect('/')
// } catch (error) {
//   console.log(error)
//   session.flash('notification', '로그인할 수 없습니다. ')
//   return response.redirect('back')
// }

//기존 유저조회 UsersController - showUser
//return user
// try {
//   const user = await UserRepository.showUser(params.id)
//   if (!user) {
//     throw new NotFoundException('user')
//   }
//   return user
// } catch (e) {
//   console.log(e.code)
//   console.log(e.status)
//   console.log(e.message)
//   response.status(e.status)
//   throw e
// }

//1648012775739_task_tags.ts
// import BaseSchema from '@ioc:Adonis/Lucid/Schema'

// export default class TaskTags extends BaseSchema {
//   protected tableName = 'tasks_tags'

//   public async up() {
//     this.schema.createTable(this.tableName, (table) => {
//       //table.increments('id').primary()
//       table.integer('task_id').unsigned().references('task_id')
//       table.integer('tag_id').unsigned().references('tag_id')
//       table.unique(['task_id', 'tag_id'])

//       // table.integer('task_id').notNullable
//       //table.integer('tag_id').notNullable
//     })
//   }

//   public async down() {
//     this.schema.dropTable(this.tableName)
//   }
// }
