import { gql } from '@apollo/client'

const DELETE_USER = gql`
    mutation deleteUser($id:ID!){
        deleteUser(id:$id){
            id, firstName, lastName, email, organizationName, contactNumber
        }
    }
`
const CREATE_USER = gql`
  mutation createUser($firstName: String!, $lastName: String!, $email: String!, $organizationName: String!, $contactNumber: String!) {
    createUser(firstName: $firstName, lastName: $lastName, email: $email, organizationName: $organizationName, contactNumber: $contactNumber){
        id, firstName, lastName, email, organizationName, contactNumber
    }
  }
`;

const UPDATE_USER = gql`
  mutation updateUser($id:ID!, $firstName: String, $lastName: String, $email: String, $organizationName: String, $contactNumber: String) {
    updateUser(id:$id, firstName: $firstName, lastName: $lastName, email: $email, organizationName: $organizationName, contactNumber: $contactNumber){
        id, firstName, lastName, email, organizationName, contactNumber
    }
  }
`;

export { DELETE_USER, CREATE_USER, UPDATE_USER }