import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`
let token: string

const defaultPw: string = '1111'
//console.log(BASE_URL)

test.group('User', (group) => {
  group.before(async () => {})
  //before
  test('전체 유저 조회 - 전체 유저 수 테스트', async (assert) => {
    const res = await supertest(BASE_URL).get('/user')
    console.log('유저수', res.body.length)
    assert.equal(res.body.length, 3)
  })

  test('회원가입 - 요청하는 정보로 가입되는지 테스트', async (assert) => {
    const res = await supertest(BASE_URL).post('/user/register').type('application/json').send({
      name: 'test1',
      email: 'test1@naver.com',
      password: defaultPw,
    })
    assert.equal(res.body.email, 'test1@naver.com')
  })

  test('특정 유저 조회', async (assert) => {
    const res = await supertest(BASE_URL).get('/user/1')
    // id값이 1인 유저가 존재하는지 테스트
    assert.exists(res.body.id, '1')
  })

  test('로그인 - 로그인시 토큰 생성되는지 테스트', async (assert) => {
    // db에 어떤 값이 있더라도 테스트 돌아갈 수 있도록 설정
    //파라미터 조회

    //1. 유저조회
    const res1 = await supertest(BASE_URL).get('/user/1')

    //2. 유저가 조회된다면 로그인(토큰생성)
    if (res1) {
      const res2 = await supertest(BASE_URL)
        .post('/user/login')
        .set('Accept', 'application/json')
        .send({
          email: res1.body.email,
          password: defaultPw,
        })
      token = res2.body.token
      //토큰이 생성되는지 테스트
      assert.exists(token)
    }
  })

  test('토큰정보로 로그인된 유저 테스트', async (assert) => {
    //1. 유저조회
    const res1 = await supertest(BASE_URL).get('/user/1').expect(200)

    //2. 유저가 조회된다면 로그인(토큰생성)
    if (res1) {
      const res2 = await supertest(BASE_URL).post('/login').set('Accept', 'application/json').send({
        email: res1.body.email,
        password: defaultPw,
      })
      token = res2.body.token

      //3. 토큰이 존재한다면 로그인된 유저의 정보조회
      if (token) {
        const res3 = await supertest(BASE_URL)
          .get('/profile')
          .set('Authorization', 'Bearer ' + token)

        //조회된 유저와 로그인된 유저의 정보가 동일한지 테스트
        assert.equal(res1.body.name, res3.body.name)
        assert.equal(res1.body.email, res3.body.email)
      } else {
        console.log('로그인 정보가 없습니다.')
      }
    }
  })

  test('로그아웃 - 로그아웃 하면 토큰이 사라지는지 테스트', async (assert) => {
    //1. 유저조회
    const res1 = await supertest(BASE_URL).get('/user/1').expect(200) //에러났을때 오류확인 불가 -> 삭제, 다른방식으로 체크

    //2. 유저가 조회된다면 로그인(토큰생성)
    if (res1) {
      const res2 = await supertest(BASE_URL).post('/login').set('Accept', 'application/json').send({
        email: res1.body.email,
        password: defaultPw,
      })
      token = res2.body.token

      //3. 로그인해서 토큰 생성된다면 로그아웃(토큰삭제)
      if (token) {
        const res3 = await supertest(BASE_URL)
          .post('/logout')
          .set('Authorization', 'Bearer ' + token)

        //토큰이 존재하는지 테스트
        assert.exists(res3.body)
      } else {
        console.log('로그인 정보가 없습니다.')
      }
    }
  })
})
