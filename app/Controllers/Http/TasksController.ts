import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class TasksController {
  public async index({ view }: HttpContextContract) {
    const tasks = await Task.all()

    return view.render('tasks/index', { tasks })
  }

  public async store({ request, response, session }: HttpContextContract) {
    const validationSchema = schema.create({
      title: schema.string({ trim: true }, [rules.maxLength(50)]),
    })

    const validatedData = await request.validate({
      schema: validationSchema,
      messages: {
        'title.required': '내용을 입력해주세요',
        'title.maxLength': '50자를 초과할 수 없습니다',
      },
    })

    await Task.create({
      title: validatedData.title,
    })

    session.flash('notification', 'Task added!')

    return response.redirect('back')
  }

  public async update({ request, response, session, params }: HttpContextContract) {
    const task = await Task.findOrFail(params.id)

    task.isCompleted = !!request.input('completed')
    await task.save()

    session.flash('notification', 'Task updated!')

    return response.redirect('back')
  }

  public async destory({ params, session, response }: HttpContextContract) {
    const task = Task.findOrFail(params.id)

    await (await task).delete()
    session.flash('notification', '삭제되었습니다.')

    return response.redirect('back')
  }
}
