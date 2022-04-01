async function aa() {
  //new Promise 할때 매개변수의 함수가 실행된다

  let resolve
  let promise = await new Promise(function (r, r2) {
    resolve = r
  })
  setTimeout(() => {
    console.log(promise)
    resolve()
    console.log(promise)
  }, 2000)

  console.log('A')
  let box = await promise
  console.log('B')
}
//resolove 가 실행되지 않아 await에 갇혀있는 상태를 pending라고 한다
//reslover가 실행된 상태 를 fulfilled라고 한다
aa()
