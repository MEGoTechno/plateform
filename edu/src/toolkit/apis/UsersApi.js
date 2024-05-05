import { apiSlice } from '../apiSlice'
import { store } from '../store'


// api/client ==>
const usersApi = apiSlice.injectEndpoints({

  endpoints: builder => ({
    getUsers: builder.query({
      query: (queries) => {
        const { page, limit, filter, sort } = queries
        // const { page, limit, grade, group, userName, name, email, phone, familyPhone, isActive, role } = queries
        let params = {}

        if (filter) params = { ...filter }
        if (sort) params = { ...sort }

        page ? params.page = page : params.page = 1
        limit ? params.limit = limit : params.limit = 5

        // if (grade) params.grade = grade
        // if (group) params.group = group
        // if (userName) params.userName = userName
        // if (name) params.name = name
        // if (email) params.email = email
        // if (phone) params.phone = phone
        // if (familyPhone) params.familyPhone = familyPhone
        // if (isActive) params.isActive = isActive
        // if (role) params.role = role

        return {
          url: "/client",
          params
        }
      },
      providesTags: (result, error, id) => [{ type: 'User', id }],
      // transformResponse: (response, meta, arg) => {
      //   const state = store.getState()
      //   return response
      // }
    }),
    getOneUser: builder.query({
      query: (userName) => `/client/${userName}`
    }),
    addUser: builder.mutation({
      query: data => ({
        url: '/client',
        method: 'POST',
        body: data
      })
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `/client`,
        method: 'PATCH',
        body: data
      })
    }),
    updateUserProfile: builder.mutation({
      query: (data) => ({
        url: `/client`,
        method: 'PUT',
        body: data
      })
    }),
    deleteUser: builder.mutation({
      query: (data) => ({
        url: `/client`,
        method: 'DELETE',
        body: data
      })
    }),
  }),
  overrideExisting: false,
})

export const {
  useLazyGetUsersQuery,
  useLazyGetOneUserQuery,

  useAddUserMutation,
  useUpdateUserMutation,
  useUpdateUserProfileMutation,

  useDeleteUserMutation,
} = usersApi