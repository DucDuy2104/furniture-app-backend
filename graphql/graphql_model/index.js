const { User, userMutation, userQuery, userInput } = require('./user')
const Cart = require('./cart')
const { Category, categoryInput, categoryMutation, categoryQuery } = require('./category')
const { Favorite, favoriteInput, favoriteMutation, favoriteQuery } = require('./favorite')
const OrderItem = require('./order_item')
const Order = require('./order')
const { Product, productInput, productMutation, productQuery} = require('./product')
const Review = require('./review')


module.exports = {
    User, userMutation, userQuery, userInput,
    Cart,
    Category, categoryInput, categoryMutation, categoryQuery,
    Favorite, favoriteInput, favoriteMutation, favoriteQuery,
    OrderItem,
    Order,
    Product, productInput, productMutation, productQuery,
    Review
}