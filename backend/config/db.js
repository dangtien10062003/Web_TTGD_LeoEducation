const sql = require('mssql');

const config = {
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true',
    trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true',
    enableArithAbort: true
  },
  authentication: {
    type: 'default',
    options: {
      userName: process.env.DB_USERNAME || '',
      password: process.env.DB_PASSWORD || ''
    }
  }
};

if (!config.server || !config.database) {
  throw new Error('Missing required database environment variables: DB_SERVER and DB_DATABASE');
}

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('✅ Connected to SQL Server');
    return pool;
  })
  .catch(err => {
    console.error('❌ Database Connection Failed:', err);
    throw err;
  });

module.exports = {
  sql,
  poolPromise
};
