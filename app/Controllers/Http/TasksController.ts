import Application from '@ioc:Adonis/Core/Application'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task'
import TasksRepository from 'App/Repositories/TasksRepository'
import TasksValidator from 'App/Validators/TaskValidator'
import Database from '@ioc:Adonis/Lucid/Database'
import { validator, schema, rules } from '@ioc:Adonis/Core/Validator'
import * as fs from 'fs'
import NotFoundException from 'App/Exceptions/NotFoundException'

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
  //file validaotor
  // task validator
  //커밋, 롤백시 파일 삭제 추가
  //성공 시 200
  //실패시 412, 에러 메시지 리턴
  //+@비동기로 테스트(새로 메소드 파서) -> 시간소요 비교(시간될때 필수)

  //지금까지 한 작업 커밋

  //file 업로드
  public async uploadFile({ request, auth, response }: HttpContextContract) {
    const file = request.file('file')
    console.time('test')
    let taskArr: string[]
    let savedTask: Task[] = []

    if (auth.user) {
      const user = auth.user
      //파일정보가 있으면
      if (file && file.filePath) {
        //1. 파일저장
        await file.move(Application.tmpPath('uploads'))
        const filePath: string = file.filePath

        //2. 저장된 파일에서 task 한줄씩 읽어서 taskArr 배열에 등록
        taskArr = fs.readFileSync(filePath).toString().split('\n')

        const trx = await Database.transaction()
        //3. taskArr배열 길이 만큼 for 문 돌면서 task에 등록

        try {
          //비동기시 for each 혹은 map으로
          for (let i = 0; i < taskArr.length; i++) {
            const task: Task = new Task()

            task.title = taskArr[i]
            task.userId = user.id

            // await validator.validate(
            //   new TasksValidator({
            //     data: task,
            //   })
            // )
            await validator.validate({
              schema: schema.create({
                title: schema.string({ trim: true }, [rules.minLength(2), rules.maxLength(50)]),
              }),
              messages: {
                'required': '제목을 입력해주세요',
                'title.minLength': '최소 2자 이상 입력해주세요',
                'title.maxLength': '최대 50자까지 입력 가능합니다',
              },
              data: task,
            })

            task.useTransaction(trx)

            await task.save()
            savedTask.push(task)
          }
          await trx.commit()
          console.timeEnd('test')

          return savedTask //업로드 성공 메시지 리턴하도록 수정
        } catch (error) {
          console.log(error)
          await trx.rollback()
          //커밋, 롤백시 파일 삭제 추가
          //파일 삭제시 있는지 먼저 확인 후 삭제
          //+비동기 for문 적용
          console.timeEnd('test')

          return response.status(412) //코드확인
        }
      } else {
        throw new NotFoundException('file')
      }
    } else {
      throw new NotFoundException('user')
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
