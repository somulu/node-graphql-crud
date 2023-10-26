import React, { useState } from 'react'
import { FaUser } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { GET_USERS } from '../graphql/userQueries'
import { CREATE_USER } from '../graphql/userMutations'

const AddUserModal = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [organizationName, setOrganizationName] = useState('')
    const [contactNumber, setContactNumber] = useState('')

    const [createUser] = useMutation(CREATE_USER, {
        variables: { firstName, lastName, email, organizationName, contactNumber },
        update(cache, { data: { createUser } }) {
            const { getUsers } = cache.readQuery({ query: GET_USERS });

            cache.writeQuery({
                query: GET_USERS,
                data: { getUsers: [...getUsers, createUser] },
            });
        },
    });

    const onSubmit = (e) => {
        e.preventDefault();

        if (firstName === '' || lastName === '' || email === '' ||  organizationName === '' || contactNumber === '') {
            return alert('Please fill in all fields');
        }

        createUser(firstName, lastName, email, organizationName, contactNumber);

        setFirstName('');
        setLastName('');
        setEmail('');
        setOrganizationName('')
        setContactNumber('');
    };

    return (
        <>
            <button
                type='button'
                className='btn btn-secondary'
                data-bs-toggle='modal'
                data-bs-target='#addUserModal'
            >
                <div className='d-flex align-items-center'>
                    <FaUser className='icon' />
                    <div>Add User</div>
                </div>
            </button>

            <div
                className='modal fade'
                id='addUserModal'
                aria-labelledby='addUserModalLabel'
                aria-hidden='true'
            >
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title' id='addUserModalLabel'>
                                Add User
                            </h5>
                            <button
                                type='button'
                                className='btn-close'
                                data-bs-dismiss='modal'
                                aria-label='Close'
                            ></button>
                        </div>
                        <div className='modal-body'>
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
                                    data-bs-dismiss='modal'
                                    className='btn btn-secondary'
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddUserModal