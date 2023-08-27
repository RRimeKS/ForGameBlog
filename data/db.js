const Sequelize = require('sequelize');
const config = require("../config");

const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
    host: config.db.host,
    dialect: "mysql",
    define: {
        timestamps: false
    },
    storage: "./session.mysql"
});

const connect = async () => {
    try {
        await sequelize.authenticate();
        console.log("MySQL is started");
    } catch (error) {
        console.log(error);
    }
}

connect();

module.exports = sequelize;