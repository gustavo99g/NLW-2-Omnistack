import Knex from 'knex'

export async function up(knex: Knex){
    return knex.schema.createTable('classes', table =>{
        table.increments('id').primary()
        table.string('subject').notNullable().defaultTo('')
        table.decimal('cost').notNullable().defaultTo(0)
        table.boolean('show').defaultTo(false)
        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
      
    })

}

export async function down(knex: Knex){
    return knex.schema.dropTable('classes')
}