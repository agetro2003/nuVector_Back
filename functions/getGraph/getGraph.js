let getConnection = require("../getConnection/getConnection");

const {output} = require ("../../utils");
exports.handler = async (event) => {
  let {
    httpMethod: method,
} = event;

let connection = await getConnection();




if (method == "GET"){
const text1 = 'select pc.code, pc.name, pc.description, pc.active, pc.client, sum(te.duration) as duration from '
const text2  = '(Select p.code, p.name, p.description, p.active, c.name as client from projects as p inner join clients as c on p.client = c.code) as pc '
const text3 = 'inner join task_entries as te on pc.code = te.project '
const text4 = 'group by pc.code, pc.name, pc.description, pc.active, pc.client '
const text = text1 + text2 + text3 + text4;
const text5 = 'select pc.code, pc.name, pc.description, pc.active, pc.client, te.duration, te.date as start from  '
const testB = text5 + text2 + text3
try {
  const mainres = await connection.query(text);
const fillres =  await connection.query(testB);
const res = { 
  main: mainres.rows,
  fill: fillres.rows
}
  connection.end();
  return output (res);
} catch (error) {
   console.log(error);
}
}
}


