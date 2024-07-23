import React, { act } from 'react'
import {Logo , Container , LogoutButton} from '../index.js'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const Header = () => {
  const navigate = useNavigate();
  const authStatus = useSelector((state)=>state.auth.status)

  const navItem = [
    {
      name : "Home",
      slug : '/',
      active : true,
    },
    {
      name : "Login",
      slug : '/login',
      active : !authStatus,
    },
    {
      name : "Sign Up",
      slug : '/signup',
      active : !authStatus,
    },
    {
      name : "All Posts",
      slug : '/all-post',
      active : authStatus,
    },
    {
      name : "Add Post",
      slug : '/add-post',
      active : authStatus,
    },
    
  ]
  return (
   <header className='py-3 shadow bg-gray-500'>
    <Container>
      <nav className='flex'>
        <div className='mr-4'> 
          <Link to='/'>
          <Logo width='70px'/> 
          </Link>
        </div>
        <ul className='flex ml-auto'>
          {
            navItem.map((item)=>
            item.active ? (
              <li key={item.name}>
                <button  className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' onClick={()=>navigate(item.slug)}>
                  {item.name}
                </button>
              </li>
            ) : null
            )
          }
          {authStatus && (
            <li>
              <LogoutButton/>
            </li>
          )}
        </ul>
      </nav>
    </Container>
    
   </header>
  )
}

export default Header
