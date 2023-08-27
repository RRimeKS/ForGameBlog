const sequelize = require("../data/db");
const { DataTypes } = require("sequelize");

const Category = sequelize.define("category", {
    categoryName: {
        type: DataTypes.STRING
    }
});

module.exports = Category;