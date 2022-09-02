let getConnection = require("../getConnection/getConnection");

const {output} = require ("../../utils");
exports.handler = async (event) => {
  let {
    httpMethod: method,
} = event;

let connection = await getConnection();


 


if (method == "GET"){
const text1 = 'select te.entry_number, te.description, te.date, te.duration, te.billable_flag, co.name as contractor, c.name as client, p.name as project, pr.description as product, ca.description as category, a.description as activity from '
const text2 = '(task_entries as te inner join clients as c on te.client = c.code inner join projects as p on te.project = p.code inner join contractors as co on te.contractor = co.code '
const text3 = 'inner join products as pr on te.product = pr.code inner join categories as ca on te.category = ca.code inner join activities as a on te.activity = a.code)'
const text = text1 + text2 + text3;
try {
  const res = await connection.query(text);


  connection.end();
  return output (res.rows);
} catch (error) {
   console.log(error);
}
}
}


