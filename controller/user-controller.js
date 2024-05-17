const { where } = require('sequelize')
const { User } = require('../model')
const bcrypt = require('bcryptjs')

module.exports = {
    userRegister: async ({ registerInput }, req) => {
        try {
            const { name, email, password, image } = registerInput
            const user = await User.findOne({ where: { email: email } })

            if (user) {
                throw new Error('Email already exists')
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const createdUser = await User.create({ ...registerInput, password: hashedPassword })
            console.log("created user: ", createdUser)
            return {
                ...createdUser.dataValues,
                createdAt: createdUser.createdAt.toString(),
                updatedAt: createdUser.updatedAt.toString()
            }
        } catch (error) {
            console.log('error creating user: ', error.message)
            throw new Error(error.message)
        }
    },

    userLogin: async ({ loginInput }, req) => {
        try {
            const { email, password } = loginInput
        const user = await User.findOne({ where: { email: email } })
        if (!user) {
            throw new Error('User not found')
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            throw new Error('Invalid password')
        }
        return {
            ...user.dataValues,
            createdAt: user.createdAt.toString(),
            updatedAt: user.updatedAt.toString()
        }
        } catch (error) {
            console.log('log in error: ', error.message)
            throw new Error(error.message)
        }
    },
}