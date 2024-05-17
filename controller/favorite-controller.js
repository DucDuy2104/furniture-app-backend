const { Favorite, User, Product } = require('../model')

module.exports = {
    createFavorite: async ({ createFavoriteInput }, req) => {
        try {
            const { userId, productId } = createFavoriteInput
            const user = await User.findOne({ userId: userId})
            if (!user) {
                throw new Error('User not found')
            }
            const product = await Product.findOne({ productId: productId})
            if (!product) {
                throw new Error('Product not found')
            }
            const favorite = await Favorite.findOne({ where: { userId: userId, productId: productId } })
            if (favorite) {
                throw new Error('Favorite already exists')
            }
            const createdFavorite = await Favorite.create({
                userId: userId,
                productId: productId
            })
            return {
               ...createdFavorite.dataValues,
                createdAt: createdFavorite.createdAt.toString(),
                updatedAt: createdFavorite.updatedAt.toString()
            }
        } catch (error) {
            console.log("create favorite: ", error.message)
            throw new Error(error.message)
            
        }
    }
}