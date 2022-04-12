import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'TagsController.showAllTag')
  Route.get('/:tagId', 'TagsController.showTag') //특정 tag와 그 tag와 연결된 task 조회

  Route.post('/', 'TagsController.store')

  Route.put('/:tagId', 'TagsController.update')

  Route.delete('/:tagId', 'TagsController.delete')
}).prefix('/tags')
