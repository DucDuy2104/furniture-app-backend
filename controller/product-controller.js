const { where } = require('sequelize');
const { Product, Category } = require('../model');

module.exports = {
    createProduct: async ({ createProductInput }, req) => {
        try {
            const { name, price, description, image, categoryId } = createProductInput

            const category = await Category.findOne({ where: { categoryId: categoryId } })

            if (!category) {
                throw new Error('Category not found')
            }

            const createdProduct = await Product.create({ name, price, description, image, categoryId, rate: 0, vote: 0 })
            return {
                category: {
                    ...category.dataValues,
                    createdAt: category.createdAt.toString(),
                    updatedAt: category.updatedAt.toString()
                },
                ...createdProduct.dataValues,
                createdAt: createdProduct.createdAt.toString(),
                updatedAt: createdProduct.updatedAt.toString()
            }
        } catch (error) {
            console.log("createProduct error: " + error.message)
            throw new Error(error.message)
        }
    },
    updateProduct: async ({ updateProductInput }, req) => {
        try {
            const { productId, name, price, description, image, categoryId } = updateProductInput
            const product = await Product.findOne({ where: { productId: productId } })
            if (!product) {
                throw new Error('Product not found')
            }
            const category = await Category.findOne({ where: { categoryId: categoryId } })
            if (!category) {
                throw new Error('Category not found')
            }
            const amountUpdated = await Product.update({ name, price, description, image, categoryId }, { where: { productId: productId } })
            const updatedProduct = await Product.findByPk(productId)
            return {
                category: {
                    ...category.dataValues,
                    createdAt: category.createdAt.toString(),
                    updatedAt: category.updatedAt.toString()
                },
                ...updatedProduct.dataValues,
                createdAt: updatedProduct.createdAt.toString(),
                updatedAt: updatedProduct.updatedAt.toString()
            }
        } catch (error) {
            console.log("Update error: " + error.message)
            throw new Error(error.message)
        }
    },
    deleteProduct: async ({ deleteProductInput }, req) => {
        try {
            const { productId } = deleteProductInput
            const product = await Product.findOne({ where: { productId: productId } })
            const category = await Category.findByPk(product.categoryId)
            if (!product) {
                throw new Error('Product not found')
            }
            const amountDeleted = await Product.destroy({ where: { productId: productId } })
            return {
                category: {
                    ...category.dataValues,
                    createdAt: category.createdAt.toString(),
                    updatedAt: category.updatedAt.toString()
                },
                ...product.dataValues,
                createdAt: product.createdAt.toString(),
                updatedAt: product.updatedAt.toString()
            }
        } catch (error) {
            console.log("Delete product error: " + error.message)
            throw new Error(error.message)
        }
    },

    getProductById: async ({ getProductByIdInput }, req) => {
        try {
            const { productId } = getProductByIdInput
            const product = await Product.findOne({ where: { productId: productId } })
            const category = await Category.findOne({ categoryId: product.categoryId })
            if (!product) {
                throw new Error('Product not found')
            }
            return {
                ...product.dataValues,
                category: {
                    ...category.dataValues,
                    createdAt: category.createdAt.toString(),
                    updatedAt: category.updatedAt.toString()
                },
                image: req.protocol + '://' + req.get("host") +product.image,
                createdAt: product.createdAt.toString(),
                updatedAt: product.updatedAt.toString()
            }
        } catch (error) {
            console.log("get product failed: ", error.message)
            throw new Error(error.message)
        }
    },

    getProductByCategoryId: async ({ getProductByCategoryIdInput }, req) => {
        try {
            const { categoryId } = getProductByCategoryIdInput
            const category = await Category.findByPk(categoryId)
            const products = await Product.findAll({ where: { categoryId: categoryId } })
            if (!products) {
                throw new Error('get product failed')
            }
            console.log('category: ', category)
            return products.map((product) => ({
                category: {
                    ...category.dataValues,
                    createdAt: category.createdAt.toString(),
                    updatedAt: category.updatedAt.toString()
                },
                ...product.dataValues,
                image: req.protocol + '://' + req.get("host") +product.image,
                createdAt: product.createdAt.toString(),
                updatedAt: product.updatedAt.toString()
            }))
        } catch (error) {
            console.log("get product failed: ", error.message)
            throw new Error(error.message)
        }
    },

    getAllProduct: async ({}, req) => {
        try {
            const products = await Product.findAll()
            if (!products) {
                throw new Error('get product failed')
            }
            const getCategory = async (categoryId) => {
                const category = await Category.findOne({ categoryId: categoryId })
                return {
                    ...category.dataValues,
                    createdAt: category.createdAt.toString(),
                    updatedAt: category.updatedAt.toString()
                }
            }

            for (let i = 0; i < products.length; i++) {
                const category = await getCategory(products[i].categoryId)
                products[i] = {
                    ...products[i].dataValues,
                    category: category,
                    image: req.protocol + '://' + req.get('host') + products[i].image,
                    createdAt: products[i].createdAt.toString(),
                    updatedAt: products[i].updatedAt.toString()
                }
            }
            return products
        } catch (error) {
            console.log("get product failed: ", error.message)
            throw new Error(error.message)
        }
    }
}