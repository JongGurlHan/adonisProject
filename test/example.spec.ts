import test from 'japa'
import { JSDOM } from 'jsdom'
import supertest from 'supertest'
import User from 'App/Models/User'
import { UserFactory } from 'Database/factories'
import UserRepository from 'App/Repositories/UserRepository'
import UserValidator from 'App/Validators/UserValidator'
import { Assert } from 'japa/build/src/Assert'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`
console.log(BASE_URL)

test.group('User', (group) => {
 
  group.beforeEach(async () => {
    console.log('=========== User 테스트 시작  ===========')
  })

  group.afterEach(async () => {
    console.log('=========== User 테스트 종료 ===========')
  })

  
  test('회원가입 - 가입시킨 계정이 존재하는지 검증', async (assert) => {
    //const user = await UserFactory.create()
       
    const res =  await supertest(BASE_URL)
      .post('/register')
      .type('application/json')         
      .send(
      {
        name : 'test1',
        email :'test1@naver.com', 
        password: '1111'
      }) 
      assert.exists('test1@naver.com')  
    })

  test('전체 유저 조회 - 전체 유저 수 검증', async (assert) => {

    const res =  await supertest(BASE_URL)
      .get('/users')
      // .type('application/json')
      // .set('Accept', 'application/json')
      .expect(200) //주로 상태코드
      // .set('Accept', 'application/json')
    assert.equal(res.body.length, 1)
    
  })

  test('특정 유저 조회', async(assert)=>{
    const res = await supertest(BASE_URL)
    .get('/users/1')
    console.log(res.body)
    assert.equal(res.body.id, 1)
  })

  //로그인 하면 토큰이 존재하는지 확인
  test('로그인', async(assert)=>{
    const res = await supertest(BASE_URL)
    .post('/login')
    .send(
      {
        email :'test1@naver.com', 
        password: '1111'
      }
     ) 
    console.log(res.body.token)
    assert.exists(res.body.token)  

  })
  //로그아웃 하면 토큰이 사라졌는지 확인
  test('로그인', async(assert)=>{
    const res = await supertest(BASE_URL)
    .post('/logout')
    
    console.log(res.body.token)
    assert.equal(res.body.token, undefined)  

  })



})








