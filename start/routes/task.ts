import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'TasksController.showAllTask') //전체 task 조회

  Route.post('/', 'TasksController.store').middleware('auth')

  Route.put('/:id', 'TasksController.update')

  Route.delete('/:id', 'TasksController.destory')
}).prefix('/tasks')

Route.post('/file', 'TasksController.storeTask') //추후 auth라우터 적용 필요

//특정 task와 그task에 연결된 user , tag 조회
Route.get('/taskUserTag/:taskId', 'TasksController.showTaskUserTag').where(
  'id',
  Route.matchers.number()
)
Route.get('/taskUser/:id', 'TasksController.showTaskUser') //특정 task와 그task에 연결된 user 조회
Route.get('/taskTag/:id', 'TasksController.showTaskTag') //특정 task에 연결된 tag 조회
