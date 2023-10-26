import React from 'react'

const Header = () => {
  return (
    <nav className='navbar bg-light mb-4 p-0'>
      <div className='container'>
        <a className='navbar-brand' href='/'>
          <div className='d-flex'>
            <div>React GraphQL CRUD</div>
          </div>
        </a>
      </div>
    </nav>
  )
}

export default Header