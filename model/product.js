const sequelize = require('../util/database');
const Sequelize = require('sequelize');

const Product = sequelize.define("Product", {
    productId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING,
        allowNull: true
    },
    rate: {
        type: Sequelize.FLOAT,
        allowNull: true
    },
    vote: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

},
{
    tablename: "products"
});


module.exports = Product;