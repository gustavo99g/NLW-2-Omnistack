import Knex from 'knex'

export async function up(knex: Knex){
    return knex.schema.createTable('class_schedule', table =>{
        table.increments('id').primary()
        table.integer('week_day').notNullable().defaultTo(0)
        table.integer('from').notNullable().defaultTo(0)
        table.integer('to').notNullable().defaultTo(0)

        table.integer('class_id')
        .notNullable()
        .references('classes')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      
      
    })

}

export async function down(knex: Knex){
    return knex.schema.dropTable('class_schedule')
}