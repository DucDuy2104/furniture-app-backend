const { User, userMutation, userQuery, userInput } = require('./user')
const { Cart, cartInput, cartMutation, cartQuery} = require('./cart')
const { Category, categoryInput, categoryMutation, categoryQuery } = require('./category')
const { Favorite, favoriteInput, favoriteMutation, favoriteQuery } = require('./favorite')
const OrderItem = require('./order_item')
const { Order, orderInput, orderMutation, orderQuery} = require('./order')
const { Product, productInput, productMutation, productQuery} = require('./product')
const Review = require('./review')


module.exports = {
    User, userMutation, userQuery, userInput,
    Cart, cartInput, cartMutation, cartQuery,
    Category, categoryInput, categoryMutation, categoryQuery,
    Favorite, favoriteInput, favoriteMutation, favoriteQuery,
    OrderItem,
    Order, orderInput, orderMutation, orderQuery,
    Product, productInput, productMutation, productQuery,
    Review
}