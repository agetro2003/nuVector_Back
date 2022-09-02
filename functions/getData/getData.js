let getConnection = require("../getConnection/getConnection");

const {output} = require ("../../utils");
exports.handler = async (event) => {
  let {
    httpMethod: method,
} = event;

let connection = await getConnection();

if (method == "GET"){
let res = {}
try {
  const tasks = await connection.query("SELECT * FROM task_entries");
const projects = await connection.query("SELECT * FROM projects");
const products = await connection.query("SELECT * FROM products");
const activities = await connection.query("SELECT * FROM activities");
const contractors = await connection.query("SELECT * FROM contractors");
const clients = await connection.query("SELECT * FROM clients");
const categories = await connection.query("SELECT * FROM categories");
  connection.end();
res.tasks = tasks.rows
res.projects = projects.rows
res.products = products.rows
res.activities = activities.rows
res.contractors = contractors.rows
res.clients = clients.rows
res.categories = categories.rows

  return output (res);
} catch (error) {
   console.log(error);
}
}
}


