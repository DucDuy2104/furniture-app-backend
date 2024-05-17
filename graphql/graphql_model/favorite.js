const Favorite = `
    type Favorite {
        favoriteId: Int!
        userId: Int!
        productId: Int!
        createdAt: String!
        updatedAt: String!
    }
`


const favoriteInput = `
    input CreateFavoriteInput {
        userId: Int!
        productId: Int!
    }
`


const favoriteMutation = `
    createFavorite(createFavoriteInput: CreateFavoriteInput) : Favorite!
`

const favoriteQuery = `
`
module.exports = { Favorite, favoriteInput, favoriteMutation, favoriteQuery};