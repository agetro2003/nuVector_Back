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
    const text = 'INSERT INTO task_entries (contractor, date, duration, billable_flag, project, client, product, activity, category, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)'
const values = [contractor, date, duration, billable, project, client, product, activity, category, description]

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