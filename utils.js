function output(content){
    return{
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
            content
        })
    }
}

module.exports = {
    output
};