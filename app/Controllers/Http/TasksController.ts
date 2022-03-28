import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task'

import TasksRepository from 'App/Repositories/TasksRepository'

export default class TasksController {
  //전체 task 조회
  public async showAllTask() {
    return TasksRepository.showAllTasks()
  }

  //특정 task - user, tag정보 조회
  public async showTaskUserTag(id) {
    return TasksRepository.showTaskUserTag(id)
  }

  //특정 task - user정보조회
  public async showTaskUser(id) {
    return TasksRepository.showTaskUser(id)
  }

  //특정task - tag 정보조회
  public async showTaskTag(id) {
    return TasksRepository.showTaskTag(id)
  }

  public async store({ request }: HttpContextContract) {
    const task = new Task()
    const { title, userId } = request.all()

    task.title = title
    task.userId = userId

    await task.save()

    return task
  }

  public async update(id) {
    return TasksRepository.update(id)
  }

  public async destory(id) {
    return TasksRepository.delete(id)
    //
  }
}
