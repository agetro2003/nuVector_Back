let getConnection = require("../getConnection/getConnection");
const jwt = require("jsonwebtoken");
const {output} = require ("../../utils");
exports.handler = async (event) => {
  let {
    httpMethod: method,
    queryStringParameters: p
} = event;

let connection = await getConnection();

if (method == "GET"){
  let {email} = p;
  let {password} = p;

const text = 'SELECT * FROM users WHERE email = $1'
const values = [email]
try {
  const res = await connection.query(text,values);
  let {token} = res.rows[0]
  var decoded = await jwt.verify(token,password);
  connection.end();
  return output (decoded);
} catch (error) {
   console.log(error);
  return output(error)
  }
}
}


