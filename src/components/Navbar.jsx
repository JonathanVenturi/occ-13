import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { skipToken } from '@reduxjs/toolkit/query'

import { useGetProfileQuery } from '../features/auth/authService'
import { setAuthToken } from '../features/auth/authSlice'

import argentBankLogo from '../assets/images/argentBankLogo.png'

export default function Navbar() {
  const dispatch = useDispatch()

  const authToken = useSelector((state) => state.auth.userToken)
  const { data: userData, isSuccess } = useGetProfileQuery(
    !authToken ? skipToken : null
  )

  return (
    <>
      <nav className='main-nav'>
        <NavLink className='main-nav-logo' to='/'>
          <img
            className='main-nav-logo-image'
            src={argentBankLogo}
            alt='Argent Bank Logo'
          />
        </NavLink>
        <div>
          {(!authToken || !isSuccess) && (
            <NavLink className='main-nav-item' to='/sign-in'>
              <i className='fa fa-user-circle'></i> Sign In
            </NavLink>
          )}
          {authToken && isSuccess && (
            <>
              <NavLink className='main-nav-item' to='/dashboard'>
                <i className='fa fa-user-circle'></i>{' '}
                {isSuccess && userData.body.firstName}
              </NavLink>
              <NavLink className='main-nav-item' onClick={logout}>
                <i className='fa fa-sign-out'></i> Sign Out
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </>
  )

  function logout() {
    dispatch(setAuthToken(null))
  }
}
