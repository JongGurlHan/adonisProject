import test from 'japa'
import supertest from 'supertest'
const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`
let token: string

test.group('Total', async () => {


  test('전체 유저 조회 - seeder를 통해 생성된 전체 유저 수 테스트', async (assert) => {
    const res =  await supertest(BASE_URL)
      .get('/users')    
      .expect(200) //주로 상태코드
      //console.log(res.body) 
   assert.equal(res.body.length, 10)  
  })

  test('특정 유저 조회', async(assert)=>{
    const res = await supertest(BASE_URL)
      .get('/users/1') 
      .expect(200)
    assert.equal(res.body.id ,'1')
  })
  
  test('로그인 - 토큰이 생성되는지 테스트', async(assert)=>{
    const res1 =  await supertest(BASE_URL)
      .post('/register')
      .type('application/json')
      .send({
        name : 'test1',
        email :'test1@naver.com', 
        password: '1111'
      })
    const res2 = await supertest(BASE_URL)
      .post('/login')
      .set('Accept', 'application/json')
      .send({
        email : res1.body.email,
        password: res1.body.password
      })
      token = res2.body.token
      assert.exists(token)


  test('로그인한 유저 조회 - 토큰정보로', async (assert) => {
    const res = await supertest(BASE_URL)
    .get('/profile')    
    .set('Authorization', 'Bearer ' + token)

    console.log('로그인한 유저 정보: ' , res.body)
    assert.exists(res.body)
  })

  test('로그아웃 - 로그아웃 하면 토큰이 사라지는지 확인', async(assert)=>{
    const res = await supertest(BASE_URL)
    .post('/logout')    
    .set('Authorization', 'Bearer ' + token)    
    //console.log('토큰 존재확인: ', res.body.token)    
    assert.notExists(res.body.token)  
  })


    

  })


 




  //test.ts 돌릴 수 있도록 설정


  //task test (추후)

  //tag test  (추후)

  
  
    
})
