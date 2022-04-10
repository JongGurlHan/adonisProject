//세션방식 로그인
//const { email, password } = request.all()
// try {
//   await auth.attempt(email, password)
//   console.log('login success!')
//   return response.redirect('/')
// } catch (error) {
//   console.log(error)
//   session.flash('notification', '로그인할 수 없습니다. ')
//   return response.redirect('back')
// }

//기존 유저조회 UsersController - showUser
//return user
// try {
//   const user = await UserRepository.showUser(params.id)
//   if (!user) {
//     throw new NotFoundException('user')
//   }
//   return user
// } catch (e) {
//   console.log(e.code)
//   console.log(e.status)
//   console.log(e.message)
//   response.status(e.status)
//   throw e
// }
