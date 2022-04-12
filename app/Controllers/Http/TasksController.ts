import Application from '@ioc:Adonis/Core/Application'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task'
import TasksRepository from 'App/Repositories/TasksRepository'
import TasksValidator from 'App/Validators/TaskValidator'
import Database from '@ioc:Adonis/Lucid/Database'

//import { validator, schema } from '@ioc:Adonis/Core/Validator'

import * as fs from 'fs'

let taskArr: string[]

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

  //file 업로드
  public async uploadFile({ request, auth, response }: HttpContextContract) {
    const file = request.file('file')
    const trx = await Database.transaction()

    try {
      if (file && auth.user) {
        const user = auth.user
        //1. 파일저장
        await file.move(Application.tmpPath('uploads'))
        const filePath: string = String(file.filePath)
        console.log('경로:', filePath)

        //2. 저장된 파일에서 task 한줄씩 읽어서 taskArr 배열에 등록
        taskArr = fs.readFileSync(filePath).toString().split('\n')

        //3. taskArr배열 길이 만큼 for 문 돌면서 task에 등록
        for (let i = 0; i < taskArr.length; i++) {
          const task: Task = new Task()
          task.title = taskArr[i]
          task.userId = user.id
          if (task.title === '') {
            throw Error
          }
          task.useTransaction(trx)
          await task.save()
        }

        await trx.commit() // 완료 (여기까지 왔으면 문제없다는 것이다. 실제로 저장진행)
      } else {
        console.log('파일정보 혹은 로그인 정보가 없습니다.')
      }
    } catch (error) {
      console.log(error)
      await trx.rollback()
      return response.status(500) //코드확인
    }
  }

  //트렌젝션 테스트
  public async transactionTest() {
    const trx = await Database.transaction()
    try {
      //for문으로 변경
      for (let i = 0; i < 2; i++) {
        const task: Task = new Task()
        task.title = 'test' + i + 1
        task.userId = i + 1
        task.useTransaction(trx)
        await task.save()
      }

      await trx.commit() //commit() 이 에러가 났을 경우(낮지만), 제어 할 수 없기때문에
    } catch (error) {
      console.log(error)
      await trx.rollback()
    }
    return 'hello'
  }

  //전체 task 조회
  public async showAllTask() {
    return await TasksRepository.showAllTasks()
  }

  //task 1개 - user, tag정보 조회
  public async showTaskUserTag({ params }: HttpContextContract) {
    return await TasksRepository.showTaskUserTag(params.taskId)
  }

  //task 1개 - user정보조회
  public async showTaskUser({ params }: HttpContextContract) {
    return await TasksRepository.showTaskUser(params.taskId)
  }

  //task 1개 - tag 정보조회
  public async showTaskTag({ params }: HttpContextContract) {
    return await TasksRepository.showTaskTag(params.taskId)
  }

  //task 수정
  public async update({ request, params }: HttpContextContract) {
    try {
      const validatedData = await request.validate(TasksValidator)
      await TasksRepository.update(params.taskId, validatedData.title)
      return validatedData
    } catch (error) {
      return error
    }
  }

  //task 삭제
  public async destory({ params }: HttpContextContract) {
    return await TasksRepository.delete(params.taskId)
  }
}
