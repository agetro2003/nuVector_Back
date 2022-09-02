const { Pool } = require("pg/lib");
let getConnection = require("../getConnection/getConnection");
const jwt = require("jsonwebtoken")
exports.handler = async (event) => {

    let {
        httpMethod: method,
        queryStringParameters: p
    } = event;

    let connection = await getConnection();

if (method == "POST"){
    let {username} = p;
    let token;
    let {password} = p;
    let {email} = p;
    let payload = {username: username, password: password, email:email};
    try {
         token = await jwt.sign(payload, password);

    } catch (error) {
        console.log(error)
    }

    const text = 'INSERT INTO users (token, email) VALUES ($1, $2)'
const values = [token, email]
    try {
       const res= await connection.query(text,values);
       connection.end();
        return output (res);
    } catch (error) {
        console.log(error)
    }
}

}