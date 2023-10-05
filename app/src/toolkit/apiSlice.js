import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCookie } from '../hooks/cookies'

export const apiSlice = createApi({
    reducerPath: "api", //from state
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.URI_FOR_REACT,
        prepareHeaders: (headers) => {
            headers.set('authorization', getCookie("u") ? getCookie("u").token : "")
            return headers
        },
    }),

    endpoints: builder => ({
        getUsers: builder.query({
            query: () => "client"
        }),
        isAuthed: builder.query({
            query: () => "client/check"
        }),
        addUser: builder.mutation({
            query: data => ({
                url: '/client/add-user',
                method: 'POST',
                body: data
            })
        }),
        login: builder.mutation({
            query: data => ({
                url: '/client/login',
                method: 'POST',
                body: data
            }),
        }),
    })
})

export const { useGetUsersQuery, useAddUserMutation, useLoginMutation, useIsAuthedQuery } = apiSlice