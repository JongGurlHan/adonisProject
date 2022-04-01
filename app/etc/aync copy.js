const f1 = () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res('1번 주문 완료')
    }, 1000)
  })
}

const f2 = (message) => {
  console.log(message)
  return new Promise((res, rej) => {
    setTimeout(() => {
      res('2번 주문 완료')
      rej(new Error('err..'))
    }, 3000)
  })
}

const f3 = (message) => {
  console.log(message)
  return new Promise((res, rej) => {
    setTimeout(() => {
      res('3번 주문 완료')
    }, 2000)
  })
}

// f1()
//   .then((res) => f2(res))
//   .then((res) => f3(res))
//   .then((res) => console.log(res))
//   .catch(console.log)

//async는 오류 발생시 try-catch로 잡아준다
console.log('시작')

async function order() {
  try {
    // const result1 = await f1()
    // const result2 = await f2(result1)
    // const result3 = await f3(result2)
    // console.log(result3)

    const result = await Promise.all([f1(), f2(), f3()]) //async-await함수를 병렬로 실행
    console.log(result)
  } catch (e) {
    console.log(e)
  }
  console.log('종료')
}

order()

//https://elvanov.com/2597
//https://inpa.tistory.com/entry/JS-%F0%9F%93%9A-%EB%B9%84%EB%8F%99%EA%B8%B0%EC%B2%98%EB%A6%AC-async-await
//https://realrain.net/post/async-await/

//async 함수의 리턴 값은 무조건 Promise 이다!
//async 함수 안에서는 await 를 쓸 수 있습니다.
//await : Promise 가 끝날 때까지 기다리거라.
// await 는 Promise 가 fulfilled 가 되든지 rejected 가 되든지 아무튼 간에 끝날 때까지 기다리는 함수입니다
//async와 await은 우리가 예전에 동기 코드를 작성했던 익숙한 경험 속에서 비동기 작업들을 코딩할 수 있게 해줍니다. / 비동기작업의 순차처리

//async는 promise를 반환합니다. 그래서 promise에서 then을 사용해도 비동기적으로 처리 가능합니다.

//그럼 promise 쓰지 왜 굳이 async await을 쓰는 것이냐 물으실 수 있습니다. promise then 보다 async await이 쓰기 간결합니다.
