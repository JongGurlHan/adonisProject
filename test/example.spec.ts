import test from 'japa'
import { JSDOM } from 'jsdom'
import supertest from 'supertest'
import User from 'App/Models/User'
import { UserFactory } from 'Database/factories'
import UserRepository from 'App/Repositories/UserRepository'
import auth from 'Config/auth'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`
console.log(BASE_URL)

test.group('User', (group) => {
  group.before(async () => {
    console.log('============ 전체 테스트 시작 ============')
  })

  group.beforeEach(async () => {
    console.log('=== 테스트 시작  ===')
  })

  group.afterEach(async () => {
    console.log('=== 테스트 종료 ===')
  })

  group.after(async () => {
    console.log('============ 전체 테스트 종료 ============')
  })

  test('회원가입', async (assert) => {
    const user = await UserFactory.create()
    await user.save()

    const res = await supertest(BASE_URL).get('/')
    assert.exists(res.body)
  })

  test('전체유저 조회', async (assert) => {
    const res = await UserRepository.showAllUsers()
    assert.exists(res)

    // assert.notEqual(user.password, '1111')
  })

  test('로그인', async (assert) => {
    //유저 생성
    const user = await UserFactory.create()
    //auth.use 통해 로그인, 토큰생성

    //토큰이 ~~한지 assert 메소드 사용
  })

  test('로그아웃', async (assert) => {
    //유저 생성
    const user = await UserFactory.create()
    //auth.use 통해 로그인, 토큰생성

    //로그아웃

    //토큰이 유효한지 assert 메소드 사용
  })

  //  로그인한 유저 조회(토큰정보로)

  test('로그인한 유저 조회', async (assert) => {
    //유저 생성
    const user = await UserFactory.create()
    //auth.use 통해 로그인, 토큰생성

    //auth.user로 나온 유저정보가 1개 존재하는지 asssert 메소두ㅡ 사용
    
  })
})

function async(arg0: {
  'console': Console
  '': any
}): import('japa/build/src/Contracts').ICallback<[Function]> {
  throw new Error('Function not implemented.')
}
