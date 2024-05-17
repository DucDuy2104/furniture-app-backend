const Category = `
    type Category {
        categoryId: Int!
        title: String!
        icon: String
        createdAt: String!
        updatedAt: String!
    }
`

const categoryInput = `
    input CreateCategoryInput {
        title: String!
        icon: String
    }
`

const categoryMutation = `
   createCategory(createCategoryInput: CreateCategoryInput): Category!
`

const categoryQuery = `
    getAllCategory: [Category]!
`

module.exports = { Category, categoryMutation, categoryQuery, categoryInput };