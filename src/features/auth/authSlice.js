import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userToken: null // for storing the JWT
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthToken: (state, action) => {
      state.userToken = action.payload
    }
  }
})

export const { setAuthToken } = authSlice.actions
export default authSlice.reducer
