import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task'

import TasksRepository from 'App/Repositories/TasksRepository'
import TasksValidator from 'App/Validators/TaskValidator'

export default class TasksController {
  //task 등록
  public async store({ request, auth }: HttpContextContract) {
    // const title = request.input('title')
    const userId = auth.user?.id

    // const post = await Task.create({
    //   title,
    //   userId,
    // })

    // return post
    try {
      const validatedData = await request.validate(TasksValidator)
      await TasksRepository.store(validatedData.title, userId)
      console.log(validatedData)
      return validatedData
    } catch (error) {
      return error
    }
  }

  //전체 task 조회
  public async showAllTask() {
    return await TasksRepository.showAllTasks()
  }

  //task 1개 - user, tag정보 조회
  public async showTaskUserTag({ params }: HttpContextContract) {
    return await TasksRepository.showTaskUserTag(params.id)
  }

  //task 1개 - user정보조회
  public async showTaskUser({ params }: HttpContextContract) {
    return await TasksRepository.showTaskUser(params.id)
  }

  //task 1개 - tag 정보조회
  public async showTaskTag({ params }: HttpContextContract) {
    return await TasksRepository.showTaskTag(params.id)
  }

  //task 수정
  public async update({ request, params }: HttpContextContract) {
    try {
      const validatedData = await request.validate(TasksValidator)
      await TasksRepository.update(params.id, validatedData.title)
      return validatedData
    } catch (error) {
      return error
    }
  }

  //task 삭제
  public async destory({ params }: HttpContextContract) {
    return await TasksRepository.delete(params.id)
  }
}
