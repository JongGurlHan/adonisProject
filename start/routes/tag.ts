import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'TagsController.showAllTag')
  Route.get('/:id', 'TagsController.showTag') //특정 tag와 그 tag와 연결된 task 조회

  Route.post('/', 'TagsController.store')

  Route.put('/:id', 'TagsController.update')

  Route.delete('/:id', 'TagsController.delete')
}).prefix('/tags')
