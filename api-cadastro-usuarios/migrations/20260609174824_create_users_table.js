/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary();

    table.string('nome').notNullable();
    table.string('email').notNullable().unique();
    table.string('telefone').notNullable();

    table.string('password').notNullable();

    table.enu('tipo', ['cliente', 'luthier']).notNullable().defaultTo('cliente');

    table.string('tempo_experiencia').nullable();
    table.text('instrumentos_atendidos').nullable();
    table.text('descricao_profissional').nullable();

    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
