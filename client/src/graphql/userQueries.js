import { gql } from '@apollo/client'

const GET_USERS = gql`
query GetUsers {
    getUsers{
        id, firstName, lastName, email, organizationName, contactNumber
    }
}
`
const GET_USER = gql`
    query GetUser($id: ID!){
        getUser(id:$id){
            id, firstName, lastName, email, organizationName, contactNumber
    }
    }
`

export { GET_USERS, GET_USER }
