import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task'
import { DateTime } from 'luxon'

export default class TasksRepository extends Task {
  //task 생성

  //전체 task 조회
  public static async showAllTasks() {
    const tasks = await Task.all()
    return tasks
  }
  //특정 task와 그 task와 연관된 user, tag조회
  public static async showTaskUserTag({ params }: HttpContextContract) {
    const task = await Task.query().where('id', params.id).preload('user').preload('tags')
    if (task) {
      return task
    } else {
      return '해당 task는 존재하지 않습니다.'
    }
  }

  //특정 task와 그 task에 연결된 user 조회
  public static async showTaskUser({ params }: HttpContextContract) {
    const task = await Task.query().where('id', params.id).preload('user')

    if (task) {
      return task
    } else {
      return '해당 task는 존재하지 않습니다.'
    }
  }

  //특정 task에 연결된 tag 조회
  public static async showTaskTag({ params }: HttpContextContract) {
    const taskTag = await Task.query().where('id', params.id).preload('tags')

    if (taskTag) {
      return taskTag
    } else {
      return '해당 task는 존재하지 않습니다.'
    }
  }
  //task 수정
  public static async update({ params, request }: HttpContextContract) {
    const task = await Task.find(params.id)
    if (task) {
      await task
        .merge({
          updatedAt: DateTime.local(),
          title: request.input('title'),
        })
        .save()
      return task
    } else {
      return '해당 task는 존재하지 않습니다.'
    }
  }

  //task 삭제
  public static async delete({ params }: HttpContextContract) {
    /**
     * findOrFail()
     * Same as the find method.
     * But instead of returning null it will raise an exception when the row doesn't exists.
     */
    const task = await Task.find(params.id)
    if (task) {
      return await task.delete()
    } else {
      return '해당 task는 존재하지 않습니다.'
    }
  }
}
