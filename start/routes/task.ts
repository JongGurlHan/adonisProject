import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'TasksController.showAllTask') //전체 task 조회
  //특정 task와 그task에 연결된 user , tag 조회
  Route.get('/:taskId/userTag', 'TasksController.showTaskUserTag')
  Route.get('/:taskId/user', 'TasksController.showTaskUser') //특정 task와 그task에 연결된 user 조회
  Route.get('/:taskId/tag', 'TasksController.showTaskTag') //특정 task에 연결된 tag 조회

  Route.post('/', 'TasksController.store').middleware('auth')

  Route.put('/:taskId', 'TasksController.update')

  Route.delete('/:taskId', 'TasksController.destory')

  Route.post('/file', 'TasksController.uploadFile').middleware('auth') //추후 1.auth라우터 적용 필요
}).prefix('/tasks')

Route.post('/transactionTest', 'TasksController.transactionTest')
