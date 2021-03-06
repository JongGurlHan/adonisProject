/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
import Event from '@ioc:Adonis/Core/Event'

//Event.on:  registers an event listener.
Event.on('new:user', (user) => {
  console.log(user)
})

Event.on('new:user', 'User.onNewUser')
