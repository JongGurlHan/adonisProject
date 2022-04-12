import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/', 'FileController.uploadFile')
}).prefix('/files')

//추후 1.auth라우터 적용 필요
