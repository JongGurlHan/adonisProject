function getName(name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(name)
    }, 1000)
  })
}
//await키워드는 async 함수 내부에서만 사용가능
//await 옆에는 promise가 오고, 그 promise가 처리될 때까지 기다린다.
//getName에서 resolv된것을 기댜렸다가 result에 넣어준다
async function showName() {
  const result = await getName('james')
  console.log(result)
}

console.log('시작')
showName()
