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
    let {client} = p;
    let {name} = p;
    let {description} = p;
    let {active} = p;


    const text = 'UPDATE projects SET client =$1, name = $2, description =$3, active=$4 WHERE code = $5'
const values = [client, name, description, active, code]

    try {
        connection.connect();
       const res= await connection.query(text,values);
       connection.end();
        return output (res);
    } catch (error) {
         console.log(error)
         return output(error)
      
    }
}

}