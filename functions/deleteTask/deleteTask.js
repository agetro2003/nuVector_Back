let getConnection = require("../getConnection/getConnection");
const {output} = require ("../../utils");
exports.handler = async (event) => {

    let {
        httpMethod: method,
        queryStringParameters: p
    } = event;

    let connection = await getConnection();

if (method == "POST"){
    let {entry} = p;
    

    const text = 'DELETE FROM task_entries where entry_number=$1'

const values = [entry]
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