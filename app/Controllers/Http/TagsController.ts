import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Tag from 'App/Models/Tag'

export default class TagsController {
  //특정 tag와 그 tag와 연결된 task 조회
  public async showTag({ params }: HttpContextContract) {
    const taginfo = await Tag.query().where('id', params.id).preload('tasks')
    if (taginfo) {
      return taginfo
    } else {
      return '정보가 없습니다.'
    }
  }
}
