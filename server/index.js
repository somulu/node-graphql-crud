const express = require('express')
require('dotenv').config()
const {graphqlHTTP} = require('express-graphql')
const graphqlSchema = require('./graphql/graphqlSchema')
const graphqlResolvers = require('./graphql/graphqlResolvers')
const connectDB = require('./config/db')
const app = express()

const port = process.env.PORT || 5000


// DB Connection
connectDB()

// Middlewares
app.use(express.json())

app.use('/graphql', graphqlHTTP({
    schema: graphqlSchema, 
    rootValue: graphqlResolvers,
    graphiql: process.env.NODE_ENV === 'development'
}))


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})