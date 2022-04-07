import test from 'japa'
import supertest from 'supertest'
const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Tag', () => {
  test('tag 등록', async (assert) => {
    const res = await supertest(BASE_URL).post('/tags').type('application/json').send({
      name: 'red',
    })
    assert.equal(res.body.name, 'red')
  })

  test('전체 tag 조회', async (assert) => {
    const res = await supertest(BASE_URL).get('/tags').expect(200)
    assert.equal(res.body.length, '1')
  })

  test('1개의 tag와 그 tag과 연관된 task 조회', async (assert) => {
    const res = await supertest(BASE_URL).get('/tags/1').expect(200)
    console.log(res.body)
    assert.equal(res.body.id, '1')
  })

  test('특정 tag 수정', async (assert) => {
    const res = await supertest(BASE_URL).put('/tags/1').send({
      name: 'pink',
    })
    assert.equal(res.body.name, 'pink')
  })

  test('특정 tag 삭제', async (assert) => {
    await supertest(BASE_URL).delete('/tags/1').expect(200)

    const res = await supertest(BASE_URL).get('/tags').expect(200)
    assert.equal(res.body.length, '0')
  })
})
