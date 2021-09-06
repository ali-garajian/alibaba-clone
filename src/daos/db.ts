import mysql from 'mysql';

function createConn() {
  const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    port: +(process.env.DB_PORT ?? ''),
    database: process.env.DB_DATABASE,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  });

  return conn;
}

function query<T>(
  connection: mysql.Connection,
  query: string | mysql.QueryOptions,
  values?: any
): Promise<T> {
  return new Promise((resolve, reject) => {
    connection.query(query, values, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
}

export default createConn();

export { createConn, query };
