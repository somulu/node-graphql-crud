require('dotenv').config()
const express = require('express')
const cors = require('cors')
const {graphqlHTTP} = require('express-graphql')
const graphqlSchema = require('./graphql/graphqlSchema')
const graphqlResolvers = require('./graphql/graphqlResolvers')
const connectDB = require('./config/db')
const app = express()

const port = process.env.PORT || 5000


// DB Connection
connectDB()

// Middlewares
app.use(cors())
app.use(express.json())

app.use('/graphql', graphqlHTTP((req, res)=>({
    schema: graphqlSchema, 
    rootValue: graphqlResolvers,
    context: { req, res },
    graphiql: process.env.NODE_ENV === 'development'
})))


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
