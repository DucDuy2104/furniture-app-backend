const User = `
    type User {
        userId: Int!
        name: String!
        email: String!
        password: String!
        image: String
        createdAt: String!
        updatedAt: String!
    }
`
const userQuery = `
    
`

const userInput = `
    input RegisterInput {
        name: String!
        email: String!
        password: String!
        image: String
    }

    input LoginInput {
        email: String!
        password: String!
    }
`

const userMutation = `
    userRegister(registerInput: RegisterInput) : Boolean!
    userLogin(loginInput: LoginInput) : User!
`


module.exports = { User, userQuery, userMutation, userInput };