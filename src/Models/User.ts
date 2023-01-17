const db = require('../dbconfig/db.js')
module.exports.getUsers = async function() { 

    try{
        await db.authenticate();
        console.log("connected");

        const [result, metadata ] = await db.query("SELECT * FROM user");

        return result;
    }
    catch(err){
        console.log("cannot connect to database");
    }

}