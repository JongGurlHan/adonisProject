import { UserFactory } from 'Database/factories'
import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`
let token: string
//console.log(BASE_URL)

test.group('User', () => {
   //factory 만들어서 
  test.only('회원가입 - 가입시킨 계정이 존재하는지 검증', async (assert) => {
    const user = await UserFactory.create()
    console.log(user.name)
    console.log(user.email)
    console.log(user.password)


    const res =  await supertest(BASE_URL)
      .post('/register')
      .type('application/json')
      .send(user)
      //존재하는지 여부는 여기서 체크하지 말고, 가입했을때 return 되는 값 확인
      console.log(res.body)

      //assert.equal(res.body.name, 'test1@naver.com')  
    })

  test('전체 유저 조회 - 전체 유저 수 검증', async (assert) => {
    const res =  await supertest(BASE_URL)
      .get('/users')    
      .expect(200) //주로 상태코드
   // console.log(res.body)

    assert.equal(res.body.length, 1)    
  })


  test('특정 유저 조회', async(assert)=>{
    const res = await supertest(BASE_URL)
    .get('/users/1')
    //console.log('특정 유저 조회결과',res.body)
    assert.equal(res.body.email ,'test1@naver.com')
  })


  //로그인 하면 토큰이 존재하는지 확인
  // 헤더에 토큰을 전달해서 로그인 되는지 확인

  test('로그인', async(assert)=>{   
    const res = await supertest(BASE_URL)
    .post('/login')
    .set('Accept', 'application/json')
    .send({
      email :'test1@naver.com',
      password: '1111'
    })
    token = res.body.token

    //console.log('토큰정보 : ' ,token)
    assert.exists(token)
  })

  //로그인한 유저 조회(토큰정보로)
  test('로그인한 유저 조회 -토큰정보로', async (assert) => {
    const res = await supertest(BASE_URL)
    .get('/profile')    
    .set('Authorization', 'Bearer ' + token)

   // console.log('로그인한 유저 정보: ' , res.body)
    assert.exists(res.body)
  })


  //로그아웃 - 로그아웃 하면 토큰이 사라졌는지 확인
  test('로그아웃', async(assert)=>{
    const res = await supertest(BASE_URL)
    .post('/logout')    
    .set('Authorization', 'Bearer ' + token)
    //console.log(token)
    
    //console.log('토큰 존재확인: ', res.body.token)
    
    assert.notExists(res.body.token)  
  })

  

})








