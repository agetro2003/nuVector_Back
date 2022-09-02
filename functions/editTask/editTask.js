let getConnection = require("../getConnection/getConnection");
const {output} = require ("../../utils");
exports.handler = async (event) => {

    let {
        httpMethod: method,
        queryStringParameters: p
    } = event;

    let connection = await getConnection();
      connection.connect();
if (method == "POST"){
    let {entry} = p;
    let {contractor} = p;
    let {date} = p;
    let {duration} = p;
    let {billable} = p;
    let {project} = p;
    let {product} = p;
    let {activity} = p;
    let {category} = p;
    let {description} = p;
let client;

const getclient = `select client from projects where code = '${project}';`
try {
  
    const resClient = await connection.query (getclient);
    let clientArray = resClient.rows
    client = parseInt(clientArray[0].client)
 
} catch (error) {
    console.log(error)
}

    const text = 'UPDATE task_entries SET contractor = $1, date = $2, duration = $3, billable_flag = $4, project = $5, client = $6, product = $7, activity = $8, category = $9, description = $10 WHERE entry_number = $11'
const values = [contractor, date, duration, billable, project, client, product, activity, category, description, entry]

    try {
  
       const res= await connection.query(text,values);
       connection.end();
        return output (res);
    } catch (error) {
         console.log(error)
         return output(error)
      
    }
}

}