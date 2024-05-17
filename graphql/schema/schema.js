const { buildSchema } = require('graphql');
const { User, userMutation, userInput, 
    Product, productMutation, productInput, productQuery,
    Category, categoryInput, categoryMutation, categoryQuery,
    Favorite, favoriteMutation, favoriteInput, favoriteQuery
 } = require('../graphql_model');

module.exports = buildSchema(`
    ${User}
    ${userInput}

    ${Product}
    ${productInput}

    ${Category}
    ${categoryInput}

    ${Favorite}
    ${favoriteInput}

    type RootQuery {
        ${productQuery}
        ${categoryQuery}
        ${favoriteQuery}
    }

    type RootMutation {
       ${userMutation}
       ${productMutation}
       ${categoryMutation}
       ${favoriteMutation}
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);