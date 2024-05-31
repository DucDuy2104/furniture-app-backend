const { where } = require('sequelize')
const { Category } = require('../model')

module.exports = {
    createCategory: async ({ createCategoryInput }, req) => {
        try {
            const { title, icon } = createCategoryInput
            const category = await Category.findOne({ where: { title: title } })
            if (category) {
                throw new Error('Category already exists')
            }

            const createdCategory = await Category.create({ title, icon })
            return {
                ...createdCategory.dataValues,
                createdAt: createdCategory.createdAt.toString(),
                updatedAt: createdCategory.updatedAt.toString()
            }
        } catch (error) {
            console.log("Error creating category: " + error.message)
            throw new Error(error.message)
        }
    },
    getAllCategory: async ({ }, req) => {
        try {
            const categories = await Category.findAll()
            if (!categories) {
                throw new Error('Get categories failed')
            }
            return categories.map(category => {
                return {
                    ...category.dataValues,
                    icon: req.protocol+ '://' + req.get('host') + category.icon,
                    createdAt: category.createdAt.toString(),
                    updatedAt: category.updatedAt.toString()
                }
            })
        } catch (error) {
            console.log("Error getting categories: " + error.message)
            throw new Error(error.message)

        }
    }
}