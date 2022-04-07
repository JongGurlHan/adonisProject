import test from 'japa'
import supertest from 'supertest'
const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

let token: string
test.group('Task', (group) => {
  group.before(async () => {})

  test('회원가입', async (assert) => {
    const res = await supertest(BASE_URL).post('/register').type('application/json').send({
      name: 'test1',
      email: 'test1@naver.com',
      password: '1111',
    })
    assert.equal(res.body.email, 'test1@naver.com')
  })

  test('로그인 - 회원가입시 토큰 생성되는지 테스트', async (assert) => {
    const res = await supertest(BASE_URL).post('/login').set('Accept', 'application/json').send({
      email: 'test1@naver.com',
      password: '1111',
    })
    token = res.body.token
    assert.exists(token)
  })

  test('게시글 등록', async (assert) => {
    const res = await supertest(BASE_URL)
      .post('/tasks')
      .type('application/json')
      .send({
        title: 'go swimming',
      })
      .set('Authorization', 'Bearer ' + token)
    assert.equal(res.body.title, 'go swimming')
  })

  test('전체 task 조회', async (assert) => {
    const res = await supertest(BASE_URL).get('/tasks').expect(200)
    assert.equal(res.body.length, '1')
  })

  test('1개의 task와 그 task에 연결된 user, tag 조회', async (assert) => {
    const res = await supertest(BASE_URL).get('/taskUserTag/1').expect(200)
    //console.log(res.body)
    assert.equal(res.body.user.name, 'test1')
  })

  test('특정 task 수정', async (assert) => {
    const res = await supertest(BASE_URL).put('/tasks/1').send({
      title: 'go climbing',
    })
    assert.equal(res.body.title, 'go climbing')
  })

  test('특정 task 삭제', async (assert) => {
    await supertest(BASE_URL).delete('/tasks/1').expect(200)

    const res = await supertest(BASE_URL).get('/tasks').expect(200)
    assert.equal(res.body.length, '0')
  })
})
