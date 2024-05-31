const Cart = `
    type Cart {
        cartId: Int!
        amount: Int
        userId: Int!
        productId: Int!
        createdAt: String!
        updatedAt: String!
        product: Product!
    }
`


const cartInput = `
    input CreateCartInput {
        amount: Int!
        userId: Int!
        productId: Int!
    }
    input DeleteCartInput {
        cartId: Int!
    }
    input GetCartByUserIdInput {
        userId: Int!
    }
    input UpdateCartInput {
        cartId: Int!
        type: String!
    }
`

const cartMutation = `
    createCart(createCartInput: CreateCartInput) : Cart!
    deleteCart(deleteCartInput: DeleteCartInput) : Cart!
    updateCart(updateCartInput: UpdateCartInput) : Boolean!
`

const cartQuery = `
    getCartByUserId(getCartByUserIdInput: GetCartByUserIdInput) : [Cart]!
`
module.exports = { cartInput, cartMutation, cartQuery, Cart };