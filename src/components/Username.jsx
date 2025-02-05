import { useSelector } from 'react-redux'
import {
  useGetProfileQuery,
  useUpdateProfileMutation
} from '../features/auth/authService'
import { skipToken } from '@reduxjs/toolkit/query'
import { useState } from 'react'

export default function Username() {
  // Boolean toggle for editing mode
  const [isEditing, setEditing] = useState(false)
  function toggleEditing() {
    setEditing(!isEditing)
  }

  // Retrieving auth token and user informations
  const authToken = useSelector((state) => state.auth.userToken)
  const { data: userData, isSuccess } = useGetProfileQuery(
    !authToken ? skipToken : null
  )

  // Hooks and functions for saving the edits
  const [updateInfos] = useUpdateProfileMutation()
  function updateUsername() {
    const newInfos = {
      firstName: document.getElementById('firstname').value,
      lastName: document.getElementById('lastname').value
    }
    updateInfos(newInfos)
    toggleEditing()
  }

  return isEditing ? (
    <div className='header'>
      <h1>
        Welcome back
        <br />
        {isSuccess && (
          <div>
            <input
              type='text'
              id='firstname'
              defaultValue={userData.body.firstName}
            />

            <input
              type='text'
              id='lastname'
              defaultValue={userData.body.lastName}
            />
          </div>
        )}
      </h1>
      <button className='edit-button' onClick={updateUsername}>
        Save
      </button>
      <button className='edit-button' onClick={toggleEditing}>
        Cancel
      </button>
    </div>
  ) : (
    <div className='header'>
      <h1>
        Welcome back
        <br />
        {isSuccess &&
          userData.body.firstName + ' ' + userData.body.lastName + ' !'}
      </h1>
      <button className='edit-button' onClick={toggleEditing}>
        Edit Name
      </button>
    </div>
  )
}
