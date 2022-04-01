async function aa() {
  //변수에 담을 수 있는 것은 모두 await 붙일 수 있다
  //Promise()에는 함수를 인자로 넣어줘야한다.

  console.log('A')
  let boy = await 123 //변수에 123 들어간다

  //Promise() 안의 함수 안에서 어떤 코드가 실행되기 전에는 이 라인을 빠져나갈 수 없다.
  let box = await new Promise(function (resolve, reject) {
    console.log('Promise로 인자로 넘겨준 함수 실행')
    console.log(resolve) //resolve는 함수다!
    resolve(123) //1. await뒤에 new promise 해줬을 경우 promise의 매개변수로 넘겨준 함수 안에서 resolve함수가 실행되지 않으면 멈추게 된다
  }) //2.resolve()에 넣어주는 값이 box에 들어간다
  console.log(box)
  console.log('B')
}

aa()
