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
   let {activities} = p;
   let {products} = p;

    const text = 'INSERT INTO projects (code, client, name, description, active) VALUES ($1, $2, $3, $4, $5)'
const values = [code, client, name, description, active]

    try {
        connection.connect();
       const res= await connection.query(text,values);
       let resAct = [];
       let resPro = [];
       for (let index = 0; index < activities.length; index++) {
           if (activities.charAt(index) == 1 ){
             resAct[index] = await connection.query(`INSERT INTO project_activity VALUES (${code}, ${index + 1} )`);  
           }
       }
       for (let index = 0; index < products.length; index++) {
        if (products.charAt(index) == 1 ){
          resPro[index] = await connection.query(`INSERT INTO project_product VALUES (${code}, ${index + 1} )`);  
        }
    }
       connection.end();
        return output (res);
    } catch (error) {
         console.log(error)
         return output(error)
      
    }
}

}