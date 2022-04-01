import Tag from 'App/Models/Tag'
import { DateTime } from 'luxon'

export default class TagsRepository extends Tag {
  //전체 tag 조회
  public static async showAllTag() {
    const tags = await Tag.all()
    if (tags) {
      return tags
    } else {
      return 'tag가 하나도 없습니다.'
    }
  }

  //특정 tag와 그 tag와 연결된 task 조회
  public static async showTag(id: number) {
    const taginfo = await Tag.query().where('id', id).preload('tasks').first()
    if (taginfo) {
      return taginfo
    } else {
      return '해당 태그 정보가 없습니다.'
    }
  }

  //tag 등록
  public static async store(
    validatedData:
      | Partial<{ id: number; name: string; createdAt: DateTime; updatedAt: DateTime }>
      | { name: string }
  ) {
    return await Tag.create(validatedData)
  }

  //tag 수정
  public static async update(id: number, name: string) {
    const tag = await Tag.find(id)
    if (tag) {
      await tag
        .merge({
          updatedAt: DateTime.local(),
          name: name,
        })
        .save()
      return tag
    } else {
      return '해당 tag는 존재하지 않습니다.'
    }
  }

  //tag 삭제
  public static async delete(id: number) {
    const tag = await Tag.find(id)
    if (tag) {
      await tag.delete()
      return '삭제완료'
    } else {
      return '해당 tag는 존재하지 않습니다.'
    }
  }
}
