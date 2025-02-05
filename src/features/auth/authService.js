import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setAuthToken } from './authSlice'

export const authApi = createApi({
  reducerPath: 'authApi',
  // QUERY
  baseQuery: fetchBaseQuery({
    // URL
    baseUrl: 'http://127.0.0.1:3001/api/v1',
    // HEADERS
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.userToken
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
        return headers
      }
    }
  }),
  tagTypes: ['user'],
  // ENDPOINTS
  endpoints: (builder) => ({
    // LOGIN
    logUserIn: builder.mutation({
      query: (credentials) => ({
        url: 'user/login',
        method: 'POST',
        body: credentials
      }),
      invalidatesTags: ['user'],
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled
          // Persist token into store
          dispatch(setAuthToken(data.body.token))
        } catch (error) {
          console.log(error)
          dispatch(setAuthToken(null))
        }
      }
    }),
    // GET PROFILE
    getProfile: builder.query({
      query: () => ({
        url: 'user/profile',
        method: 'POST'
      }),
      providesTags: ['user']
    }),
    // UPDATE PROFILE
    updateProfile: builder.mutation({
      query: (infos) => ({
        url: 'user/profile',
        method: 'PUT',
        body: infos
      }),
      invalidatesTags: ['user']
    })
  })
})

// export auto-generated hooks
export const {
  useLogUserInMutation,
  useGetProfileQuery,
  useUpdateProfileMutation
} = authApi
