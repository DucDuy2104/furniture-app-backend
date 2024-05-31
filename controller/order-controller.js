const { where } = require('sequelize')
const { Order, Cart, Product, OrderItem } = require('../model')


const getOrderItemByOrderId = async (orderId) => {
    const orderItems = await OrderItem.findAll({ where: { orderId: orderId } })
    return orderItems.map(orderItem => ({
        ...orderItem.dataValues,
        createdAt: orderItem.createdAt.toString(),
        updatedAt: orderItem.updatedAt.toString()
    }))
}


const getProduct = async (productId) => {
    const product = await Product.findByPk(productId)
    return {
        ...product.dataValues,
        createdAt: product.createdAt.toString(),
        updatedAt: product.updatedAt.toString()
    }
}

const resetCart = async (carts) => {
    for (let i = 0; i < carts.length; i++) {
        await Cart.destroy({ where: { cartId: carts[i].cartId } })
    }
}

module.exports = {
    createOrder: async ({ createOrderInput }, req) => {
        try {
            const { userId } = createOrderInput
            if (!userId) {
                throw new Error('User not found')
            }
            const carts = await Cart.findAll({ where: { userId: userId } })
            if (!carts || carts.length == 0) {
                throw new Error('Cart not found')
            }

            const order = await Order.create({ userId: userId })
            if (!order) {
                throw new Error('Create order failed')
            }

            const addProductToOrder = async (cart) => {
                const product = await Product.findOne({ where: { productId: cart.productId } })
                await order.addProduct(product, { through: { amount: cart.amount } })
            }


            for (let i = 0; i < carts.length; i++) {
                await addProductToOrder(carts[i])
            }

            console.log("orderId: ", order.orderId)

            const orderItems = await getOrderItemByOrderId(order.orderId)
            for(let i = 0; i < orderItems.length; i++) {
                const product = await getProduct(orderItems[i].productId)
                orderItems[i] = {
                   ...orderItems[i],
                    product: product
                }
            }


            await resetCart(carts)

            return {
                orderItems: orderItems,
                ...order.dataValues,
                createdSuccess: true,
                createdAt: order.createdAt.toString(),
                updatedAt: order.updatedAt.toString()
            }

        } catch (error) {
            console.log('create order error: ', error.message)
            throw new Error(error.message)

        }
    },

    getOrderByUserId: async ({ getOrderByUserIdInput }, req) => {
        try {
            const { userId } = getOrderByUserIdInput
            const orders = await Order.findAll({ where: { userId: userId } });
            if (!orders) {
                throw new Error('Order not found')
            }
            for (let i = 0; i < orders.length; i++) {
                const orderItems = await getOrderItemByOrderId(orders[i].orderId)
                for (let j = 0; j < orderItems.length; j++) {
                    const product = await getProduct(orderItems[j].productId)
                    orderItems[j] = {
                        ...orderItems[j],
                        createdAt: orderItems[j].createdAt.toString(),
                        updatedAt: orderItems[j].updatedAt.toString(),
                        product: product
                    }
                }

                orders[i] = {
                    ...orders[i].dataValues,
                    createdAt: orders[i].createdAt.toString(),
                    updatedAt: orders[i].updatedAt.toString(),
                    orderItems: orderItems
                }
            }
            return orders
        } catch (error) {
            console.log('get order error: ', error.message)
            throw new Error(error.message)

        }
    }

}