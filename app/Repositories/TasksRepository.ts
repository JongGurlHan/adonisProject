import Task from 'App/Models/Task'
import { DateTime } from 'luxon'

export default class TasksRepository extends Task {
  //task 생성
  public static async store(validatedData, auth) {
    const task: Task = new Task()
    task.title = validatedData.title
    // task.tagId = validatedData.tagId
    task.userId = auth.user?.id
    return await task.save()
  }

  //파일저장
  //public static async uploadFile(validatedData) {}

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
  public static async showTaskUserTag(taskId: number) {
    console.log(taskId)
    const task = await Task.query().where('id', taskId).preload('user').preload('tags').first()
    if (task) {
      return task
    } else {
      return '해당 task는 존재하지 않습니다.'
    }
  }

  //특정 task와 그 task에 연결된 user 조회
  public static async showTaskUser(taskId: number) {
    const task = await Task.query().where('id', taskId).preload('user').first()

    if (task) {
      return task
    } else {
      return '해당 task는 존재하지 않습니다.'
    }
  }

  //특정 task에 연결된 tag 조회
  public static async showTaskTag(taskId: number) {
    const taskTag = await Task.query().where('id', taskId).preload('tags').first()

    if (taskTag) {
      return taskTag
    } else {
      return '해당 task는 존재하지 않습니다.'
    }
  }

  //task 수정
  public static async update(taskId: number, title: string) {
    const task = await Task.find(taskId) //SQL: SELECT * from "Task" WHERE "id" = 1 LIMIT 1;//파라미터가 pk인지
    console.log(task)
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
  public static async delete(taskId: number) {
    /**
     * findOrFail()
     * Same as the find method.
     * But instead of returning null it will raise an exception when the row doesn't exists.
     */
    const task = await Task.find(taskId)
    if (task) {
      await task.delete()
      //return '삭제완료'
      return task
    } else {
      return '해당 task는 존재하지 않습니다.'
    }
  }
}
