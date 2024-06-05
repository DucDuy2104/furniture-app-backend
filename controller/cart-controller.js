const { Cart, User, Product } = require('../model')

module.exports = {
    createCart: async ({ createCartInput }, req) => {
        try {
            const { userId, productId, amount } = createCartInput
            const user = await User.findOne({ userId: userId })
            if (!user) {
                throw new Error('User not found')
            }
            const product = await Product.findOne({ productId: productId })
            if (!product) {
                throw new Error('Product not found')
            }
            const cart = await Cart.findOne({ where: { userId: userId, productId: productId } })
            if (cart) {
                cart.amount = cart.amount + amount
                const updatedCart = await cart.save()
                return {
                    ...updatedCart.dataValues,
                    createdAt: updatedCart.createdAt.toString(),
                    updatedAt: updatedCart.updatedAt.toString()
                }
            }
            const createdCart = await Cart.create({
                userId: userId,
                productId: productId,
                amount: amount
            })

            return {
                product: {
                    ...product.dataValues,
                    image: req.protocol + '://' + req.get('host') + product.image,
                    createdAt: product.createdAt.toString(),
                    updatedAt: product.updatedAt.toString()
                },
                ...createdCart.dataValues,
                createdAt: createdCart.createdAt.toString(),
                updatedAt: createdCart.updatedAt.toString()
            }

        } catch (error) {
            console.log("create cart error: ", error.message)
            throw new Error(error.message)

        }
    },
    deleteCart: async ({ deleteCartInput }, req) => {
        try {
            const { cartId } = deleteCartInput
            const cart = await Cart.findOne({where: { cartId: cartId}})
            const product = await Product.findByPk(cart.productId)
            if (!cart) {
                throw new Error('Cart not found')
            }
            const numDeletedCart = await cart.destroy()
            return {
                product: {
                    ...product.dataValues,
                    createdAt: product.createdAt.toString(),
                    updatedAt: product.updatedAt.toString()
                },
                ...cart.dataValues,
                createdAt: cart.createdAt.toString(),
                updatedAt: cart.updatedAt.toString()
            }
        } catch (error) {
            console.log("Delete cart error: " + error.message)
            throw new Error(error.message)
        }
    },
    getCartByUserId: async ({ getCartByUserIdInput }, req) => {
        try {
            const { userId } = getCartByUserIdInput
            const user = await User.findOne({ userId: userId })
            if (!user) {
                throw new Error('User not found')
            }
            const carts = await Cart.findAll({ where: { userId: userId } })
            if (!carts) {
                throw new Error('Cart not found')
            }
            const getProduct = async (productId) => {
                const product = await Product.findByPk(productId)
                return {
                    ...product.dataValues,
                    image: req.protocol + '://' + req.get('host') + product.image,
                    createdAt: product.createdAt.toString(),
                    updatedAt: product.updatedAt.toString()
                }
            }
            for (let i = 0; i < carts.length; i++) {
                const product = await getProduct(carts[i].productId)
                carts[i] = {
                    ...carts[i].dataValues,
                    product: product,
                    createdAt: carts[i].createdAt.toString(),
                    updatedAt: carts[i].updatedAt.toString()
                }
            }
            return carts
        } catch (error) {
            console.log("Get cart by user id error: " + error.message)
            throw new Error(error.message)
        }
    },
    updateCart: async ({ updateCartInput }, req) => {
        try {
            const {cartId, type} = updateCartInput
            console.log("cart id: " + cartId)
            const cart = await Cart.findOne({where: { cartId: cartId}})
            if (!cart) {
                throw new Error('Cart not found')
            }
            switch (type) {
                case 'increase':
                    cart.amount = cart.amount + 1
                    break
                case 'decrease':
                    if(cart.amount > 1) {
                        cart.amount = cart.amount - 1
                    }
                    break
                default:
                    throw new Error('Invalid type')
            }
            console.log("cart.amount", cart.amount)
            const updatedCart = await cart.save()
            
            return true

        } catch (error) {
            console.log("updateCart error: " + error.message)
            throw new Error(error.message)
        }
    }
}