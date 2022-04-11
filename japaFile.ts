import 'reflect-metadata'
import execa from 'execa'
import { join } from 'path'
import getPort from 'get-port'
import { configure } from 'japa'
import sourceMapSupport from 'source-map-support'
// import User from 'App/Models/User'

process.env.NODE_ENV = 'testing'
process.env.ADONIS_ACE_CWD = join(__dirname)
sourceMapSupport.install({ handleUncaughtExceptions: false })

// Add this method to the file
function getTestFiles() {
  let userDefined = process.argv.slice(2)[0]
  if (!userDefined) {
    return 'test/**/*.spec.ts'
  }
  return `${userDefined.replace(/\.ts$|\.js$/, '')}.ts`
}

async function runMigrations() {
  await execa.node('ace', ['migration:run'], {
    stdio: 'inherit',
  })
}

// 테이블이 많을때 팩토리 돌리는 방법 새각
async function runSeeder() {
  await execa.node('ace', ['db:seed', '--files', './database/seeders/FactoryRun.ts'], {
    stdio: 'inherit',
  })
}

async function rollbackMigrations() {
  //굳이 테이블을 다 지울 필요가 없으니까
  // await User.truncate(true)
  // await User.truncate(true) // task, tag,외래키 설정 확인!
  // await User.truncate(true)
  await execa.node('ace', ['migration:rollback', '--batch=0'], {
    stdio: 'inherit',
  })
}

// async function truncateMigrations() {
//   await execa.node('ace', ['migration:truncate', '--batch=0'], {
//     stdio: 'inherit',
//   })
// }

async function startHttpServer() {
  const { Ignitor } = await import('@adonisjs/core/build/src/Ignitor')
  process.env.PORT = String(await getPort())
  await new Ignitor(__dirname).httpServer().start()
}

configure({
  //files: ['test/**/*.spec.ts'],
  files: getTestFiles(),
  before: [rollbackMigrations, runMigrations, startHttpServer, runSeeder],
  //-> 4/11
  //after: [rollbackMigrations],
})

//테스트 마이그레이션 절차
//테스트 돌리기전: 롤백, 마이그레이션, 런 시더로 데이터 생성
//테스트 진행
//테스트 후
