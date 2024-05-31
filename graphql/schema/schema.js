const { buildSchema } = require('graphql');
const { User, userMutation, userInput, 
    Product, productMutation, productInput, productQuery,
    Category, categoryInput, categoryMutation, categoryQuery,
    Favorite, favoriteMutation, favoriteInput, favoriteQuery,
    Cart, cartMutation, cartInput, cartQuery,
    Order, orderMutation, orderInput, orderQuery,
    OrderItem
 } = require('../graphql_model');

module.exports = buildSchema(`
    ${OrderItem}

    ${User}
    ${userInput}

    ${Product}
    ${productInput}

    ${Category}
    ${categoryInput}

    ${Favorite}
    ${favoriteInput}

    ${Cart}
    ${cartInput}

    ${Order}
    ${orderInput}

    type RootQuery {
        ${productQuery}
        ${categoryQuery}
        ${favoriteQuery}
        ${cartQuery}
        ${orderQuery}
    }

    type RootMutation {
       ${userMutation}
       ${productMutation}
       ${categoryMutation}
       ${favoriteMutation}
       ${cartMutation}
       ${orderMutation}
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);