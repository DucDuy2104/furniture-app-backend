const Sequelize = require('sequelize');
const sequelize = require('../util/database')

const Category =  sequelize.define("Category", {
    categoryId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    icon: {
        type: Sequelize.STRING,
        allowNull: true
    }
}, {
    tablename: "categories"
})


module.exports = Category;


