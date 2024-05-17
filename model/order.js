const Sequelize = require('sequelize');
const sequelize = require('../util/database')


const Order  = sequelize.define('Order', {
    orderId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
}, {
    tablename: 'orders'
})


module.exports = Order;