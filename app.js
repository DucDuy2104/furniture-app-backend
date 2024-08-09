const express = require('express');
const app = express();
const sequelize = require('./util/database')
const { graphqlHTTP } = require('express-graphql')
require('dotenv').config()
const path = require('path')

const XLSX = require('xlsx')
var logger = require('morgan')

const relationships = require('./util/relation');

const graphqlSchema = require('./graphql/schema/schema')
const graphqlResolver = require('./graphql/resolver/resolver')


// const { Product, Category } = require('./model')


app.use(express.json());
app.use(express.static('public'))
app.use(logger('dev'))



// const workBook =XLSX.readFile(path.join(__dirname, 'public', 'sheet/products_sheet.xlsx'));
// const listSheet = workBook.SheetNames
// let data = XLSX.utils.sheet_to_json(workBook.Sheets[listSheet[0]]);

// console.log('data: ', data);


app.use('/graphql', graphqlHTTP({
    rootValue: graphqlResolver,
    schema: graphqlSchema,
    graphiql: true
}))

// for(let i = 0; i < data.length; i++) {
//     Product.create(data[i])
// }

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

