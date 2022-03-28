import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TaskTags extends BaseSchema {
  protected tableName = 'tasks_tags'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      //table.increments('id').primary()
      table.integer('task_id').unsigned().references('task_id')
      table.integer('tag_id').unsigned().references('tag_id')
      table.unique(['task_id', 'tag_id'])

      // table.integer('task_id').notNullable
      //table.integer('tag_id').notNullable
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
