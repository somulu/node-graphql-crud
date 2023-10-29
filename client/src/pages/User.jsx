import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { GET_USER } from '../graphql/userQueries'
import { UPDATE_USER } from '../graphql/userMutations'
import Spinner from '../components/Spinner'

const User = () => {
    const { userId } = useParams()
    const { loading, error, data } = useQuery(GET_USER, { variables: { id: userId } })

    const getUser = data ? data.getUser : {};

    const [firstName, setFirstName] = useState(getUser.firstName || '');
    const [lastName, setLastName] = useState(getUser.lastName || '');
    const [email, setEmail] = useState(getUser.email || '');
    const [organizationName, setOrganizationName] = useState(getUser.organizationName || '');
    const [contactNumber, setContactNumber] = useState(getUser.contactNumber || '');

    const [updateUser] = useMutation(UPDATE_USER, {
        variables: {
            id: userId,
            firstName,
            lastName,
            email,
            organizationName,
            contactNumber,
        },
        refetchQueries: [{ query: GET_USER, variables: { id: userId } }],
    });

    const onSubmit = (e) => {
        e.preventDefault();

        if (firstName === '' || lastName === '' || email === '' || organizationName === '' || contactNumber === '') {
            return alert('Please fill in all fields');
        }
        updateUser({
                userId,
                firstName,
                lastName,
                email,
                organizationName,
                contactNumber,
            },
        );
    };

    if (loading) return <Spinner />
    if (error) return <p>Something went wrong...</p>

    return (
        <>
            <div className='mx-auto w-100'>
                <Link to='/' className='btn btn-light btn-sm w-25 d-inline ms-auto'>
                    Back
                </Link>
            </div>
            <div className="mt-5">
                <h3>Update User Details</h3>
                <form onSubmit={onSubmit}>
                    <div className='mb-3'>
                        <label className='form-label'>First Name</label>
                        <input
                            type='text'
                            className='form-control'
                            id='firstName'
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Last Name</label>
                        <input
                            type='text'
                            className='form-control'
                            id='lastName'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Email</label>
                        <input
                            type='email'
                            className='form-control'
                            id='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Organization</label>
                        <input
                            type='text'
                            className='form-control'
                            id='organizationName'
                            value={organizationName}
                            onChange={(e) => setOrganizationName(e.target.value)}
                        />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Phone</label>
                        <input
                            type='text'
                            className='form-control'
                            id='phone'
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)}
                        />
                    </div>

                    <button
                        type='submit'
                        // data-bs-dismiss='modal'
                        className='btn btn-secondary'
                    >
                        Update
                    </button>
                </form>
            </div>
        </>
    )
}

export default User