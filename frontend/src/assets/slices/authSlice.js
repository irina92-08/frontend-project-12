import { createSlice } from '@reduxjs/toolkit'

const token = localStorage.getItem('token')

const initialState = {
  isAuthenticated: token ? true : false,
  token: token || null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, { payload }) => {
      state.isAuthenticated = true
      state.token = payload.token
      localStorage.setItem('token', payload.token)
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.token = null
      localStorage.removeItem('token')
    },
  },
})

export const { actions } = authSlice
export default authSlice.reducer
