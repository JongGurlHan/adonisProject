import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'UsersController.showAllUsers')
  Route.get('/:id', 'UsersController.showUser').middleware('userId')

  Route.post('/register', 'UsersController.register')
  Route.post('/login', 'UsersController.login')
}).prefix('/users')

Route.group(() => {
  Route.post('/logout', 'UsersController.logout')
  Route.get('/profile', 'UsersController.profile')
}).middleware('auth')
