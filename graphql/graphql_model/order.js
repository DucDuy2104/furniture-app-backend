const Order = `
    type Order {
        orderId: Int!
        userId: Int!
        createdAt: String!
        updatedAt: String!
        user: User
        orderItems: [OrderItem]!
        createdSuccess: Boolean
    }
`


const orderInput = `
    input CreateOrderInput {
        userId: Int!
    }
    input GetOrderByUserIdInput {
        userId: Int!
    }
`

const orderMutation = `
    createOrder(createOrderInput: CreateOrderInput) : Order!
`

const orderQuery = `
    getOrderByUserId(getOrderByUserIdInput: GetOrderByUserIdInput) : [Order]!
`
module.exports = { Order, orderInput, orderMutation, orderQuery }
