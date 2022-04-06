/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

/*  === Task ==*/

Route.get('/tasks', 'TasksController.showAllTask') //전체 task 조회

Route.get('/taskUserTag/:id', 'TasksController.showTaskUserTag').where(
  'id',
  Route.matchers.number()
) //특정 task와 그task에 연결된 user , tag 조회
Route.get('/taskUser/:id', 'TasksController.showTaskUser') //특정 task와 그task에 연결된 user 조회
Route.get('/taskTag/:id', 'TasksController.showTaskTag') //특정 task에 연결된 tag 조회

// Route.post('/tasks', 'TasksController.store')
Route.put('/tasks/:id', 'TasksController.update')
Route.delete('/tasks/:id', 'TasksController.destory')

/*  === User ==*/
Route.post('/register', 'UsersController.register')

Route.group(() => {
 Route.post('/logout', 'UsersController.logout')
 Route.get('/profile', 'UsersController.profile')
 Route.post('/tasks', 'TasksController.store')
}).middleware('auth')

Route.post('/login', 'UsersController.login')

Route.get('/users', 'UsersController.showAllUsers')
Route.get('/users/:id', 'UsersController.showUser')

/*  === Tag ==*/

Route.get('/tags', 'TagsController.showAllTag')
Route.get('/tags/:id', 'TagsController.showTag') //특정 tag와 그 tag와 연결된 task 조회
Route.post('/tags', 'TagsController.store')
Route.put('/tags/:id', 'TagsController.update')
Route.delete('/tags/:id', 'TagsController.delete')

/* ==middle ware test */ 


