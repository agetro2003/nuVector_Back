let getConnection = require("../getConnection/getConnection");
const {output} = require ("../../utils");
exports.handler = async (event) => {

    let {
        httpMethod: method,
        queryStringParameters: p
    } = event;

    let connection = await getConnection();

if (method == "POST"){
    let {code} = p;
    

    const text = 'DELETE FROM projects where code=$1'
    const textact = 'DELETE FROM project_activity where project=$1'
    const textpro = 'DELETE FROM project_product where project=$1'
const values = [code]
    try {
        connection.connect();
        const resact = await connection.query(textact,values)
        const respro = await connection.query(textpro,values)
       const res= await connection.query(text,values);
       connection.end();
        return output (res);
    } catch (error) {
         console.log(error)
         return output(error)
      
    }
}

}