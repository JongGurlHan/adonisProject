import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'UsersController.showAllUsers')

  Route.post('/register', 'UsersController.register')
  Route.post('/login', 'UsersController.login')

  //Route.get('/:userId', 'UsersController.showUser').middleware('userId')

  Route.group(() => {
    Route.get('/profile', 'UsersController.profile')
    Route.post('/logout', 'UsersController.logout')
  }).middleware('auth')
}).prefix('/users')
