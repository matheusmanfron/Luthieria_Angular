/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('instrumentos', table => {
    table.increments('id').primary();

    table.string('nome').notNullable();
    table.string('tipo').notNullable();
    table.string('marca').notNullable();
    table.string('modelo').notNullable();

    table.enu('estado', ['novo', 'usado', 'precisa_conserto'])
      .notNullable()
      .defaultTo('usado');

    table.decimal('preco', 10, 2).notNullable().defaultTo(0);
    table.boolean('aceita_troca').notNullable().defaultTo(false);
    table.text('descricao').notNullable();

    table.integer('dono_id').notNullable().defaultTo(1);

    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('instrumentos');
};
