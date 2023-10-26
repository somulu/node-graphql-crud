import { gql } from '@apollo/client'

const GET_USERS = gql`
query GetUsers {
    getUsers{
        id, firstName, lastName, email, organizationName, contactNumber
    }
}
`
export { GET_USERS }
