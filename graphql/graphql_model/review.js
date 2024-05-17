const Review = `
    type Review {
        reviewId: Int!
        comment: String!
        rating: Float!
        userId: Int!
        productId: Int!
        createdAt: String!
        updatedAt: String!
    }
`

module.exports = Review;