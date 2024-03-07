const { Sequelize } = require("sequelize");

const sequelizeOptions = {
    dialect: "mysql",
    username: 'root',
    password: 'root',
    host: 'localhost',
    port: '3306',
    database: 'users', //added database;
    logging: false,
};

const connection = new Sequelize(sequelizeOptions);

const testConnection = async () => {
    
    try {
        await connection.authenticate();
        console.log("Connection has been established successfully.");
        
    } catch(error) {
        console.log(`Unable to connect to the database: ${error.message}`);
    }
}

testConnection();

module.exports = connection;
