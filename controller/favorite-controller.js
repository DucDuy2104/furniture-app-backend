const { Favorite, User, Product } = require('../model')

module.exports = {
    createFavorite: async ({ createFavoriteInput }, req) => {
        try {
            const { userId, productId } = createFavoriteInput
            const user = await User.findOne({ userId: userId })
            if (!user) {
                throw new Error('User not found')
            }
            const product = await Product.findOne({ productId: productId })
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
                product: {
                    ...product.dataValues,
                    createdAt: product.createdAt.toString(),
                    updatedAt: product.updatedAt.toString()
                },
                ...createdFavorite.dataValues,
                createdAt: createdFavorite.createdAt.toString(),
                updatedAt: createdFavorite.updatedAt.toString()
            }
        } catch (error) {
            console.log("create favorite: ", error.message)
            throw new Error(error.message)

        }
    },
    deleteFavorite: async ({ deleteFavoriteInput }, req) => {
        try {
            const { favoriteId } = deleteFavoriteInput
            const favorite = await Favorite.findOne({ favoriteId: favoriteId })
            const product = await Product.findByPk(favorite.productId)
            if (!favorite) {
                throw new Error('Favorite not found')
            }
            await Favorite.destroy({ where: { favoriteId: favoriteId } })
            return {
                product: {
                    ...product.dataValues,
                    createdAt: product.createdAt.toString(),
                    updatedAt: product.updatedAt.toString()
                },
                ...favorite.dataValues,
                createdAt: favorite.createdAt.toString(),
                updatedAt: favorite.updatedAt.toString()
            }
        } catch (error) {
            console.log("delete favorite err: ", error.message)
            throw new Error(error.message)
        }
    },

    getFavoriteByUserId: async ({ getFavoriteByUserId }, req) => {
        try {
            const { userId } = getFavoriteByUserId
            const favorites = await Favorite.findAll({ where: { userId: userId } })
        
            if (!favorites) {
                throw new Error('Favorite not found')
            }

            const getProduct  = async (productId) => {
                const product = await Product.findByPk(productId)
                if (!product) {
                    throw new Error('Product not found')
                }
                return {
                   ...product.dataValues,
                    createdAt: product.createdAt.toString(),
                    updatedAt: product.updatedAt.toString()
                }   
            }

            for(let i = 0; i < favorites.length; i++) {
                const product = await getProduct(favorites[i].productId)
                favorites[i] = {
                   ...favorites[i].dataValues,
                    createdAt: favorites[i].createdAt.toString(),
                    updatedAt: favorites[i].updatedAt.toString(),
                    product: product
                }
            }

            return favorites
            
        } catch (error) {
            console.log("get favorite err: ", error.message)
            throw new Error(error.message)
            
        }
    }
}