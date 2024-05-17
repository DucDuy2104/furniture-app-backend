const Sequelize = require('sequelize')
const sequelize = require('../util/database')


const Cart = sequelize.define('Cart',{
    cartId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    amount: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
},{
    tablename: 'carts'
})



module.exports = Cart;