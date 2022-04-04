import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Task', () => {   

  test('회원가입', async (assert) => {
    const res =  await supertest(BASE_URL)
      .post('/register')
      .type('application/json')
      .send(
      {
        name : 'test1',
        email :'test1@naver.com', 
        password: '1111'
      })
      assert.equal(res.body.email, 'test1@naver.com')  
    })
    
  test('게시글 등록', async (assert) => {           
    const res =  await supertest(BASE_URL)
      .post('/tasks')
      .type('application/json')         
      .send(
      {
        title : 'go swimming',
        userId :'1', 
      })    
      //res 해당하는 값들 다 assert, 데이터 형식도     
      assert.equal(res.body.title , 'go swimming')
    })

  test('전체 task 조회',async (assert) => {
    const res = await supertest(BASE_URL)
    .get('/tasks')
    .expect(200)    
    assert.equal(res.body.length , '1')    
  })


  test('특정 task와 그 task에 연결된 user 조회',async (assert) => {
    const res = await supertest(BASE_URL)
    .get('/taskUser/1')
    .expect(200)
   // console.log(res.body)
    assert.equal(res.body.user.name, 'test1')   
  })

  test('특정 task 수정',async (assert) => {
    const res = await supertest(BASE_URL)
    .put('/tasks/1')
    .send(
      {
        title : 'go climbing',
        userId :'4', 
      })    
    assert.equal(res.body.title, 'go climbing')    
  })

  

  test('특정 task 삭제',async (assert) => {
    const res = await supertest(BASE_URL)
    .delete('/tasks/1')
    .expect(200)    

    //console.log('삭제정보: ', res.body)


    
  })
    
})
