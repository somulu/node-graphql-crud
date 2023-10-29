import React from 'react'
import AddUserModal from '../components/AddUserModal';
import Users from '../components/Users';
const Home = () => {
    return (
        <>
            <div className='d-flex gap-3 mb-4'>
                <AddUserModal />
            </div>
            <Users />
        </>
    )
}

export default Home