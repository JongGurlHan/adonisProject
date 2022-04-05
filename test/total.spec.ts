import { UserFactory } from 'Database/factories'
import test from 'japa'
import supertest from 'supertest'
const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Total', async () => {


  test('전체 유저 조회 - 전체 유저 수 검증', async (assert) => {
    const res =  await supertest(BASE_URL)
      .get('/users')    
      .expect(200) //주로 상태코드
    console.log(res)

   // assert.equal(res.body.length, 1)    
  })


  //user test 실행
  test('회원가입 - 가입시킨 계정이 존재하는지 검증', async (assert) => {
    const res =  await supertest(BASE_URL)
      .post('/register')
      .type('application/json')
      .send(
      {
        
      })
      assert.equal(res.body.email, 'test1@naver.com')  
    })





  //test.ts 돌릴 수 있도록 설정


  //task test (추후)

  //tag test  (추후)

  
  
    
})
