const OrderItem = `
    type OrderItem {
        orderItemId: Int!
        amount: Int!
        orderId: Int!
        productId: Int!
        createdAt: String!
        updatedAt: String!
    }
`


module.exports = OrderItem;