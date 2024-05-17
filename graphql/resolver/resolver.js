const { userController, categoryController, productController,favoritesController } = require('../../controller')


module.exports = {
    ...userController,
    ...categoryController,
    ...productController,
    ...favoritesController
}