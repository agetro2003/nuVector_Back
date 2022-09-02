const {Pool} = require ('pg');
const { password, database, port, host, user } = require('pg/lib/defaults');

const url = 'postgres://qaqnyieslqdcbl:b3a3cbe948003e7e7e9d19d573598fee390cc5f3d828fa1e705085832f05b94b@ec2-3-214-2-141.compute-1.amazonaws.com:5432/dae6ju162acpbv'


async function getConnection(){
  const pool = new Pool({
    connectionString: url,
    ssl: {
      rejectUnauthorized: false
    }
    /*user: 'qaqnyieslqdcbl',
    host: 'ec2-3-214-2-141.compute-1.amazonaws.com',
    password: 'b3a3cbe948003e7e7e9d19d573598fee390cc5f3d828fa1e705085832f05b94b', 
    database: 'dae6ju162acpbv',
    port: 5432 */
})
  await pool.connect();
  return pool;
}
module.exports = getConnection;