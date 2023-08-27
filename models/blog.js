const sequelize = require("../data/db");
const { DataTypes } = require("sequelize");

const Blog = sequelize.define("blog",{
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    subtitle: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    desc: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        defaultValue:""
    },
    isConfirm: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    isHomepage: {
        type: DataTypes.BOOLEAN
    },
    isShowcase: {
        type: DataTypes.BOOLEAN
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Date.now
    }
});

module.exports = Blog;