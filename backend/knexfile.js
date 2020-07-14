// Update with your config settings.

module.exports = {
  
  // ambiente de desenvolvimento
  development: {
    client: 'sqlite3',
    connection: {
      // arquivo que armazena os dados
      filename: './src/database/db.sqlite'
    },
    // forma de criar tabelas e manter um histórico
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault: true,
  },

  test: {
    client: 'sqlite3',
    connection: {
      // arquivo que armazena os dados
      filename: './src/database/test.sqlite'
    },
    // forma de criar tabelas e manter um histórico
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault: true,
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
