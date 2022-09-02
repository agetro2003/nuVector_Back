let getConnection = require("../getConnection/getConnection");

const {output} = require ("../../utils");
exports.handler = async (event) => {
  let {
    httpMethod: method,
} = event;

let connection = await getConnection();

if (method == "GET"){
const text = 'select p.code, p.name, p.description, p.active, c.name as client from (projects as p inner join clients as c on p.client = c.code);'
try {
  const res = await connection.query(text);


  connection.end();
  return output (res.rows);
} catch (error) {
   console.log(error);
}
}
}


