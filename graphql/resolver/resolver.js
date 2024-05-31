const { userController, categoryController, productController, favoritesController,
    cartController, orderController
 } = require('../../controller')


module.exports = {
    ...userController,
    ...categoryController,
    ...productController,
    ...favoritesController,
    ...cartController,
    ...orderController
}