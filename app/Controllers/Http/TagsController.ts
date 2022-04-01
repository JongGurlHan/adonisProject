import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TagsRepository from 'App/Repositories/TagsRepository'
import TagsValidator from 'App/Validators/TagsValidator'

export default class TagsController {
  //전체 tag 조회
  public async showAllTag() {
    return await TagsRepository.showAllTag()
  }

  //특정 tag와 그 tag와 연결된 task 조회
  public async showTag({ params }: HttpContextContract) {
    return await TagsRepository.showTag(params.id)
  }

  //tag 생성
  public async store({ request }: HttpContextContract) {
    try {
      const validatedData = await request.validate(TagsValidator)
      await TagsRepository.store(validatedData)
      return validatedData
    } catch (error) {
      return error
    }
  }

  //tag 수정
  public async update({ request, params }: HttpContextContract) {
    try {
      const validatedData = await request.validate(TagsValidator)
      await TagsRepository.update(params.id, validatedData.name)
      return validatedData
    } catch (error) {
      return error
    }
  }

  //tag 삭제
  public async delete({ params }: HttpContextContract) {
    return await TagsRepository.delete(params.id)
  }
}
