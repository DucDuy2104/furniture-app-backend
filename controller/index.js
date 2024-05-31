const userController = require('./user-controller')
const categoryController = require('./category-controller')
const productController = require('./product-controller')
const favoritesController = require('./favorite-controller')
const cartController = require('./cart-controller')
const orderController = require('./order-controller')

module.exports = {
    userController,
    categoryController,
    productController,
    favoritesController,
    cartController,
    orderController
}