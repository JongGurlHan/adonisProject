//import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task'
import { DateTime } from 'luxon'

export default class TasksRepository extends Task {
  //task 생성
  public static async store(
    validatedData:
      | Partial<{
          id: number
          userId: number
          title: string
          isCompleted: boolean
          createdAt: DateTime
          updatedAt: DateTime
        }>
      | { title: string }
  ) {
    return await Task.create(validatedData)
  }

  //전체 task 조회
  public static async showAllTasks() {
    const tasks = await Task.all()
    if (tasks) {
      return tasks
    } else {
      return 'task가 하나도 없습니다.'
    }
  }
  //특정 task와 그 task와 연관된 user, tag조회
  //타입지정필요
  public static async showTaskUserTag(id: number) {
    console.log(id)
    const task = await Task.query().where('id', id).preload('user').preload('tags').first()
    if (task) {
      return task
    } else {
      return '해당 task는 존재하지 않습니다.'
    }
  }

  //특정 task와 그 task에 연결된 user 조회
  public static async showTaskUser(id: number) {
    const task = await Task.query().where('id', id).preload('user').first()

    if (task) {
      return task
    } else {
      return '해당 task는 존재하지 않습니다.'
    }
  }

  //특정 task에 연결된 tag 조회
  public static async showTaskTag(id: number) {
    const taskTag = await Task.query().where('id', id).preload('tags').first()

    if (taskTag) {
      return taskTag
    } else {
      return '해당 task는 존재하지 않습니다.'
    }
  }
  //task 수정
  public static async update(id: number, title: string) {
    const task = await Task.find(id) //SQL: SELECT * from "Task" WHERE "id" = 1 LIMIT 1;//파라미터가 pk인지
    if (task) {
      await task
        .merge({
          updatedAt: DateTime.local(),
          title: title,
        })
        .save()
      return task
    } else {
      return '해당 task는 존재하지 않습니다.'
    }
  }

  //task 삭제
  public static async delete(id: number) {
    /**
     * findOrFail()
     * Same as the find method.
     * But instead of returning null it will raise an exception when the row doesn't exists.
     */
    const task = await Task.find(id)
    if (task) {
      await task.delete()
      return '삭제완료'
    } else {
      return '해당 task는 존재하지 않습니다.'
    }
  }
}
