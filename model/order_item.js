const Sequelize = require('sequelize')
const sequelize = require('../util/database')


const OrderItem = sequelize.define('OrderItem',{
    orderItemId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    amount: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
},
 {
    tablename: "order-items"
 })


 module.exports = OrderItem;