const { buildSchema } = require("graphql");

const graphqlSchema = buildSchema(`
    type User {
        id: ID!
        firstName: String!
        lastName: String!
        email: String!
        organizationName: String!
        contactNumber: String!
    }

    type Query {
        getUser(id:ID!): User
        getUsers: [User]
    }

    type Mutation {
        createUser(firstName: String!, lastName: String!, email: String!, organizationName: String!, contactNumber: String!): User
        updateUser(id: ID!, firstName: String, lastName: String, email: String, organizationName: String, contactNumber: String): User
        deleteUser(id: ID!): User
    }
`);

module.exports = graphqlSchema
