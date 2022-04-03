import test from 'japa'
import { JSDOM } from 'jsdom'
import supertest from 'supertest'
import User from 'App/Models/User'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Task', (group) => {

    group.beforeEach(async () => {
        console.log('=========== task 테스트 시작  ===========')
    })

    group.afterEach(async () => {
        console.log('=========== task테스트 종료 ===========')
    })
    
    test('게시글이 등록되는지 테스트', async (assert) => {
           
        const res =  await supertest(BASE_URL)
          .post('/tasks')
          .type('application/json')         
          .send(
          {
            title : 'go swimming',
            userId :'4', 
          }) 
          
          console.log(res.body)
        })
    
})
