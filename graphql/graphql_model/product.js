const Product = `
    type Product {
        productId: Int!
        name: String!
        price: Float!
        description: String!
        image: String!
        rate: Float
        vote: Int
        categoryId: Int!
        createdAt: String!
        updatedAt: String!
    }
`

const productQuery=`
    getProductById(getProductByIdInput: GetProductByIdInput): Product!
    getProductByCategoryId(getProductByCategoryIdInput: GetProductByCategoryIdInput): [Product]!
    getAllProduct: [Product]!
`

const productInput = `
    input CreateProductInput {
        name: String!
        price: Float!
        description: String!
        image: String
        categoryId: Int!
    }

    input UpdateProductInput {
        productId: Int!
        name: String!
        price: Float!
        description: String!
        image: String
        categoryId: Int!
    }

    input DeleteProductInput {
        productId: Int!
    }

    input GetProductByIdInput {
        productId: Int!
    }
    
    input GetProductByCategoryIdInput {
        categoryId: Int!
    }
    

`

const productMutation = `
    createProduct(createProductInput: CreateProductInput): Product!
    updateProduct(updateProductInput: UpdateProductInput): Product!
    deleteProduct(deleteProductInput: DeleteProductInput): Product!
`


module.exports = {Product, productMutation,productInput,productQuery}