const Sequelize = require('sequelize');

const sequelize = new Sequelize('a_do_mi', 'root', '', {
    host: 'localhost',
    port: 3306, //port mysql
    dialect:"mysql"
});

//Test de fonction, on la renvoie vers server.js 

module.exports.getUsers = async function() {

    try{
        await sequelize.authenticate();
        console.log("connected");

        const [result, metadata ] = await sequelize.query("SELECT * FROM user");

        return result;
    }
    catch(err){
        console.log("cannot connect to database");
    }

}