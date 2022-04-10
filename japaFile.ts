import 'reflect-metadata'
import execa from 'execa'
import { join } from 'path'
import getPort from 'get-port'
import { configure } from 'japa'
import sourceMapSupport from 'source-map-support'

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

// async function rollbackMigrations() {
//   await execa.node('ace', ['migration:rollback', '--batch=0'], {
//     stdio: 'inherit',
//   })
//}

async function truncateMigrations() {
  await execa.node('ace', ['migration:truncate', '--batch=0'], {
    stdio: 'inherit',
  })
}

async function startHttpServer() {
  const { Ignitor } = await import('@adonisjs/core/build/src/Ignitor')
  process.env.PORT = String(await getPort())
  await new Ignitor(__dirname).httpServer().start()
}

configure({
  //files: ['test/**/*.spec.ts'],
  files: getTestFiles(),
  before: [runMigrations, startHttpServer, runSeeder],
  //after: [rollbackMigrations],
})

//
