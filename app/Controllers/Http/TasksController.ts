import Application from '@ioc:Adonis/Core/Application'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TasksRepository from 'App/Repositories/TasksRepository'
import TasksValidator from 'App/Validators/TaskValidator'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class TasksController {
  //task 등록
  public async store({ request, auth }: HttpContextContract) {
    try {
      const validatedData = await request.validate(TasksValidator)
      const newTask = await TasksRepository.store(validatedData, auth)
      return newTask
    } catch (error) {
      return error
    }
  }

  public async storeTask({ request, response }: HttpContextContract) {
    const postSchema = schema.create({
      task: schema.file({
        size: '2mb',
        extnames: ['jpg', 'gif', 'png'],
      }),
    })
    // const files = request.allFiles()
    // const task = request.file('task', {
    //   size: '2mb',
    //   extnames: ['jpg', 'png'],
    // })
    // console.log(task)
    // if (!task || !task.isValid) {
    //   return response.send({
    //     message: 'problme with file!',
    //   })
    // }
    // await task.move(Application.tmpPath('uploads'))

    const postData = await request.validate({ schema: postSchema })
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
