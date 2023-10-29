import React from 'react'
import { Link } from 'react-router-dom'
import { FaTrash, FaEdit } from 'react-icons/fa'
import { useMutation } from '@apollo/client'
import { DELETE_USER } from '../graphql/userMutations'
import { GET_USERS } from '../graphql/userQueries'

const UserRow = ({ user }) => {
  const { firstName, lastName, email, organizationName, contactNumber } = user
  const [deleteUser] = useMutation(DELETE_USER, {
    variables: { id: user.id },
    // refetchQueries:[{query: GET_USERS}], --> This cause multiple query execution So otherway of fetching the data after performing delete is
    update(cache, { data: { deleteUser } }) {
      const { getUsers } = cache.readQuery({ query: GET_USERS })
      cache.writeQuery({
        query: GET_USERS,
        data: {
          getUsers: getUsers.filter((user) => user.id !== deleteUser.id)
        }
      })
    }
  })
  return (
    <tr>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{email}</td>
      <td>{organizationName}</td>
      <td>{contactNumber}</td>
      <td>
        <Link to={`/user/${user.id}`}>
          <button className='btn btn-danger btn-sm' style={{ marginRight: "5px" }} >
            <FaEdit />
          </button>
        </Link>
        <button className='btn btn-danger btn-sm' onClick={deleteUser} >
          <FaTrash />
        </button>

      </td>
    </tr>
  )
}

export default UserRow