const { where } = require('sequelize');
const { Product, Category } = require('../model');

module.exports= {
    createProduct:  async ({ createProductInput }, req) => {
        try {
            const { name, price, description, image, categoryId } = createProductInput

            const category = await Category.findOne({ where : { categoryId: categoryId}})

            if (!category) {
                throw new Error('Category not found')
            }

            const createdProduct = await Product.create({ name, price, description, image, categoryId, rate: 0, vote: 0 })
            return {
                ...createdProduct.dataValues,
                createdAt: createdProduct.createdAt.toString(),
                updatedAt: createdProduct.updatedAt.toString()
            }
        } catch (error) {
            console.log("createProduct error: " + error.message)
            throw new Error(error.message)
        }
    },
    updateProduct: async ({ updateProductInput } , req) => {
        try {
            const { productId, name, price, description, image, categoryId } = updateProductInput
            const product = await Product.findOne({ where: { productId: productId } })
            if (!product) {
                throw new Error('Product not found')
            }
            const category = await Category.findOne({ where : { categoryId: categoryId}})
            if (!category) {
                throw new Error('Category not found')
            }
            const amountUpdated = await Product.update({ name, price, description, image, categoryId }, { where: { productId: productId } })
            const updatedProduct = await Product.findByPk(productId)
            return {
               ...updatedProduct.dataValues,
                createdAt: updatedProduct.createdAt.toString(),
                updatedAt: updatedProduct.updatedAt.toString()
            }
        } catch (error) {
            console.log("Update error: " + error.message)
            throw new Error(error.message)
        }
    },
    deleteProduct: async ({ deleteProductInput}, req) => {
        try {
            const { productId }= deleteProductInput
            const product = await Product.findOne({ where: { productId: productId } })
            if (!product) {
                throw new Error('Product not found')
            }
            const amountDeleted = await Product.destroy({ where: { productId: productId } })
            return {
                ...product.dataValues,
                createdAt: product.createdAt.toString(),
                updatedAt: product.updatedAt.toString()
            }
        } catch (error) {
            console.log("Delete product error: " + error.message)
            throw new Error(error.message)
        }
    },

    getProductById: async ({getProductByIdInput},req) => {
        try {
            const { productId } =getProductByIdInput
            const product = await Product.findOne({ where: { productId: productId } })
            if (!product) {
                throw new Error('Product not found')
            }
            return {
               ...product.dataValues,
                createdAt: product.createdAt.toString(),
                updatedAt: product.updatedAt.toString()
            }
        } catch (error) {
            console.log("get product failed: ", error.message)
            throw new Error(error.message)
        }
    },

    getProductByCategoryId: async ({getProductByCategoryIdInput},req) => {
        try {
            const { categoryId } =getProductByCategoryIdInput
            const products = await Product.findAll({ where: { categoryId: categoryId } })
            if (!products) {
                throw new Error('get product failed')
            }
            return products.map((product) =>({
                ...product.dataValues,
                createdAt: product.createdAt.toString(),
                updatedAt: product.updatedAt.toString()
            }))
        } catch (error) {
            console.log("get product failed: ", error.message)
            throw new Error(error.message)
        }
    },

    getAllProduct: async () => {
        try {
            const products = await Product.findAll()
            if (!products) {
                throw new Error('get product failed')
            }
            return products.map((product) =>({
               ...product.dataValues,
                createdAt: product.createdAt.toString(),
                updatedAt: product.updatedAt.toString()
            }))
        } catch (error) {
            console.log("get product failed: ", error.message)
            throw new Error(error.message)
        }
    }
}