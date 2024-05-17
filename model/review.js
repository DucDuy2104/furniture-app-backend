const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const Review = sequelize.define('Review', {
    reviewId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    rating: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    comment: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    tablename: "reviews"
})

module.exports = Review;