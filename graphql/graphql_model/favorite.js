const Favorite = `
    type Favorite {
        favoriteId: Int!
        userId: Int!
        productId: Int!
        createdAt: String!
        updatedAt: String!
        product: Product!
    }
`


const favoriteInput = `
    input CreateFavoriteInput {
        userId: Int!
        productId: Int!
    }
    input DeleteFavoriteInput {
        favoriteId: Int!
    }
    input getFavoriteByUserId {
        userId: Int!
    }
 `


const favoriteMutation = `
    createFavorite(createFavoriteInput: CreateFavoriteInput) : Favorite!
    deleteFavorite(deleteFavoriteInput: DeleteFavoriteInput) : Favorite!
`

const favoriteQuery = `
    getFavoriteByUserId(getFavoriteByUserId: getFavoriteByUserId) : [Favorite]!
`
module.exports = { Favorite, favoriteInput, favoriteMutation, favoriteQuery};