import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Task from './Task'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column({
    //prepare: (value: string) => value + '@gmail.com',
    //serialize: (value: string) => value + '@gmail.com', //직렬화: 조회후 전송(response)하는 순간 이뤄진다.
    //consume: (value: string) => value + '@gmail.com', //데이터 조회순간부터 값이 변경되는 옵션이므로 console.log할때 이미 데이터가 변경되있다
  })
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @hasMany(() => Task, {
    foreignKey: 'userId',
  })
  public tasks: HasMany<typeof Task>
}
