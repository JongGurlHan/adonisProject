import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TagTasks extends BaseSchema {
  protected tableName = 'tag_task'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('task_id').unsigned().references('task_id')
      table.integer('tag_id').unsigned().references('tag_id')
      table.unique(['task_id', 'tag_id'])

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      // table.timestamp('created_at', { useTz: true })
      // table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
    //목적에 따라 truncate table도 가능!
  }
}
