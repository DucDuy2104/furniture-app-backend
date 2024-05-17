const Sequelize = require('sequelize');
const sequelize =  require('../util/database');


const Favorite = sequelize.define('Favorite', {
    favoriteId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }

}, {
    tablename: 'favorites'
})


module.exports = Favorite;