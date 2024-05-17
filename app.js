const express = require('express');
const app = express();
const sequelize = require('./util/database')
const { graphqlHTTP } = require('express-graphql')
require('dotenv').config()

const relationships = require('./util/relation');

const graphqlSchema = require('./graphql/schema/schema')
const graphqlResolver = require('./graphql/resolver/resolver')

app.use(express.json());

app.use('/graphql', graphqlHTTP({
    rootValue: graphqlResolver,
    schema: graphqlSchema,
    graphiql: true
}))


relationships()

sequelize.sync(
// {force: true}

)
.then(() => {
    console.log('connection established')
    app.listen(process.env.PORT)
})
.catch(() => {
    console.log('connection closed')
})

