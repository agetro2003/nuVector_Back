
let getConnection = require("../getConnection/getConnection");
const {output} = require ("../../utils");
exports.handler = async (event) => {

    let {
        httpMethod: method,
        queryStringParameters: p
    } = event;

    let connection = await getConnection();

if (method == "GET"){
    let {project} = p;
 
    

    
   
    const textAct = 'select * from (activities as a inner join project_activity as pa on a.code = pa.activity ) where pa.project = $1'
    const textPro = 'select * from (products as p inner join project_product as pp on p.code = pp.product ) where pp.project = $1'
const valuesAct = [project];
const valuesPro = [project];
    try {
        let res = {}
        const resAct = await connection.query(textAct,valuesAct);
       res.activities = resAct.rows
       const resPro = await connection.query(textPro,valuesPro);
       res.products =  resPro.rows
       connection.end();
        return output (res);
    } catch (error) {
        console.log(error)
    }
}

}