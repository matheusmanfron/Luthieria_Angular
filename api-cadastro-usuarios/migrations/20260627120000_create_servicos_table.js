exports.up = function(knex) {
  return knex.schema.createTable('servicos', table => {
    table.increments('id').primary();

    table.integer('cliente_id').notNullable().defaultTo(1);
    table.integer('instrumento_id').notNullable().defaultTo(0);
    table.integer('luthier_id').notNullable().defaultTo(1);

    table.string('instrumento').notNullable();
    table.enu('status', ['solicitado', 'aceito', 'em_andamento', 'finalizado', 'cancelado'])
      .notNullable()
      .defaultTo('solicitado');
    table.text('observacoes').notNullable();

    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('servicos');
};
