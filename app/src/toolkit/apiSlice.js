import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCookie } from '../hooks/cookies'
// https://mradel-biology.onrender.com
// "http://192.168.1.13:5050"

export const apiSlice = createApi({
    reducerPath: "api", //from state
    baseQuery: fetchBaseQuery({
        baseUrl: "https://mradel-biology.onrender.com",
        prepareHeaders: (headers) => {
            headers.set('authorization', getCookie("u") ? getCookie("u").token : "")
            return headers
        },
    }),

    endpoints: builder => ({ // client fcs #########
        getUsers: builder.query({
            query: () => "client"
        }),
        getUser: builder.query({
            query: (id) => `client/${id}`
        }),
        addUser: builder.mutation({
            query: data => ({
                url: '/client/add-user',
                method: 'POST',
                body: data
            })
        }),
        updateUser: builder.mutation({
            query: data => ({
                url: '/client/update-user',
                method: 'PUT',
                body: data
            })
        }),
        inActivateUser: builder.mutation({
            query: data => ({
                url: '/client/inactivate-user',
                method: 'put',
                body: data
            })
        }),
        makeAdmin: builder.mutation({
            query: data => ({
                url: '/client/makeadmin',
                method: 'put',
                body: data
            })
        }),
        sendFileTest: builder.mutation({
            query: data => ({
                url: '/upload',
                method: 'post',
                body: data
            })
        }),
        deleteUser: builder.mutation({
            query: data => ({
                url: '/client/delete-user',
                method: 'delete',
                body: data
            })
        }),
        login: builder.mutation({
            query: data => ({
                url: '/client/login',
                method: 'POST',
                body: data
            }),
        }), // fcs of settings #########  ====> grades and groupes
        getSettings: builder.query({
            query: () => "settings",
        }),
        updateSettings: builder.mutation({
            query: data => ({
                url: '/settings',
                method: 'put',
                body: data
            }),
        }),
        postSettings: builder.mutation({
            query: data => ({
                url: '/settings',
                method: 'POST',
                body: data
            }),
        }),
        deleteSettings: builder.mutation({
            query: data => ({
                url: '/settings',
                method: 'delete',
                body: data
            }),
        }),// exams fcs ###############
        getExams: builder.query({
            query: () => "exams",
        }),
        postNewExam: builder.mutation({
            query: data => ({
                url: '/exams/add-exam',
                method: 'POST',
                body: data
            }),
        }),
        updateExam: builder.mutation({
            query: data => ({
                url: '/exams/update',
                method: 'POST',
                body: data
            }),
        }),
        removeExam: builder.mutation({
            query: data => ({
                url: '/exams/delete',
                method: 'DELETE',
                body: data
            }),
        }), // lectures fcs ###################
        getLectures: builder.query({
            query: () => "content",
        }),
        postNewLecture: builder.mutation({
            query: data => ({
                url: '/content/add-lecture',
                method: 'POST',
                body: data
            }),
        }),
        UpdateLecture: builder.mutation({
            query: data => ({
                url: '/content/update',
                method: 'PUT',
                body: data
            }),
        }),
        removeLecture: builder.mutation({
            query: data => ({
                url: '/content/delete',
                method: 'DELETE',
                body: data
            }),
        }),
        testUri: builder.query({
            query: (id) => `/public/${id}`
        })
    })
})
export const {
    useGetUsersQuery, useLazyGetUsersQuery, useAddUserMutation, useLoginMutation, useDeleteUserMutation, useInActivateUserMutation, useUpdateUserMutation, useMakeAdminMutation,
    useLazyGetSettingsQuery, usePostSettingsMutation, useUpdateSettingsMutation, useDeleteSettingsMutation,
    usePostNewExamMutation, useRemoveExamMutation, useLazyGetExamsQuery, useUpdateExamMutation,
    usePostNewLectureMutation, useUpdateLectureMutation, useRemoveLectureMutation, useLazyGetLecturesQuery, useSendFileTestMutation,
    useLazyTestUriQuery
} = apiSlice