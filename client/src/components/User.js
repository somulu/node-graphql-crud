import React from "react";
import { useQuery } from '@apollo/client'
import { GET_USERS } from '../graphql/userQueries'
import UserRow from './UserRow'
import Spinner from './Spinner'

function User() {
  const { loading, error, data } = useQuery(GET_USERS)

  if (loading) return <Spinner/>
  if (error) return <p>Error: {error.message}</p>
  const getUsers = data.getUsers
  return (
    <>
      <>
      {!loading && !error && (
        <table className='table table-hover mt-3'>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Organization</th>
              <th>Phone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {getUsers?.map((user) => (
              <UserRow key={user.id} user={user} />
            ))}
          </tbody>
        </table>
      )}
    </>
    </>
  );
}

export default User;