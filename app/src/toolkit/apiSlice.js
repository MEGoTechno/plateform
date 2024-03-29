import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCookie } from '../hooks/cookies'
// https://mradel-biology.onrender.com
// "http://192.168.1.13:5050"
// git push -u origin main   


export const apiSlice = createApi({
    reducerPath: "api", //from state
    baseQuery: fetchBaseQuery({
        baseUrl: "https://mradel-biology.onrender.com/api",
        prepareHeaders: (headers) => {
            headers.set('authorization', getCookie("u") ? getCookie("u").token : "")
            return headers
        },
    }),

    endpoints: builder => ({ // client fcs #########
        getUsers: builder.query({
            query: (queries) => {
                const { page, limit, gradeId, role } = queries
                return `/client?page=${page}&limit=${limit}&gradeId=${gradeId}&role=${role}`
            }
        }),
        addUser: builder.mutation({
            query: data => ({
                url: '/client',
                method: 'POST',
                body: data
            })
        }),
        getOneUser: builder.query({
            query: (userName) => `/client/${userName}`
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: `/client`,
                method: 'PATCH',
                body: data
            })
        }), updateUserProfile: builder.mutation({
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
        getPayments: builder.query({
            query: () => `/payments`
        }),
        getPaymentsByGrade: builder.query({
            query: (grade) => `/payments/${grade}`
        }),
        createPayment: builder.mutation({
            query: data => ({
                url: '/payments',
                method: 'POST',
                body: data
            })
        }),
        checkUsersPayment: builder.mutation({
            query: (data) => ({
                url: `/payments`,
                method: 'PATCH',
                body: data
            })
        }),
        deletePayment: builder.mutation({
            query: (data) => ({
                url: `/payments`,
                method: 'DELETE',
                body: data
            })
        }),
        login: builder.mutation({
            query: data => ({
                url: '/client/login',
                method: 'POST',
                body: data
            }),
        }), // fcs of grades #########  ====> grades and groupes
        getGrades: builder.query({
            query: () => "/grades",
        }),
        createGrade: builder.mutation({
            query: data => ({
                url: '/grades',
                method: 'POST',
                body: data
            }),
        }),
        updateGrade: builder.mutation({
            query: (data) => ({
                url: '/grades',
                method: 'PATCH',
                body: data
            }),
        }),
        deleteGrade: builder.mutation({
            query: data => ({
                url: '/grades',
                method: 'DELETE',
                body: data
            }),
        }), // groups
        getGroups: builder.query({ //
            query: () => "/groups",
        }),
        createGroup: builder.mutation({
            query: data => ({
                url: '/groups',
                method: 'POST',
                body: data
            }),
        }),
        updateGroup: builder.mutation({
            query: (data) => ({
                url: '/groups',
                method: 'PATCH',
                body: data
            }),
        }),
        deleteGroup: builder.mutation({
            query: data => ({
                url: '/groups',
                method: 'DELETE',
                body: data
            }),
        }),// exams fcs ###############
        getExams: builder.query({
            query: () => "exams",
        }),
        getOneExam: builder.query({
            query: (id) => "exams/" + id,
        }),
        postNewExam: builder.mutation({
            query: data => ({
                url: '/exams',
                method: 'POST',
                body: data
            }),
        }),
        updateExam: builder.mutation({
            query: data => ({
                url: '/exams',
                method: 'PATCH',
                body: data
            }),
        }),
        removeExam: builder.mutation({
            query: data => ({
                url: '/exams',
                method: 'DELETE',
                body: data
            }),
        }),// attempts Fcs #######
        getExamAttempts: builder.query({
            query: (queries) => {
                const examId = queries.examId || "All"

                const page = queries.page || 1
                const limit = queries.limit || 10000


                return `/attempts?examId=${examId}&page=${page}&limit=${limit}`
            },
        }),
        addAttempt: builder.mutation({
            query: data => ({
                url: '/attempts',
                method: 'POST',
                body: data
            }),
        }),
        getUserAttempts: builder.query({
            query: (queries) => {
                const userId = queries.userId
                const examId = queries.examId || "All"

                const page = queries.page || 1
                const limit = queries.limit || 10000


                return `/attempts/${userId}?examId=${examId}&page=${page}&limit=${limit}`
            },
        }),
        // lectures fcs ###################
        getLectures: builder.query({
            query: () => "lectures",
        }),
        postNewLecture: builder.mutation({
            query: data => ({
                url: '/lectures/add-lecture',
                method: 'POST',
                body: data
            }),
        }),
        UpdateLecture: builder.mutation({
            query: data => ({
                url: '/lectures/update',
                method: 'PUT',
                body: data
            }),
        }),
        removeLecture: builder.mutation({
            query: data => ({
                url: '/lectures/delete',
                method: 'DELETE',
                body: data
            }),
        }),
        getMessages: builder.query({
            query: (userName) => `/messages?user=${userName}`,
        }),
        createMessage: builder.mutation({
            query: data => ({
                url: '/messages',
                method: 'POST',
                body: data
            }),
        }),
        updateMessage: builder.mutation({
            query: data => ({
                url: '/messages',
                method: 'PATCH',
                body: data
            }),
        }),
        deleteMessage: builder.mutation({
            query: data => ({
                url: '/messages',
                method: 'DELETE',
                body: data
            }),
        }),
        getUsersStatistics: builder.query({
            query: (grade) => `/statistics/users?grade=${grade}`,
        }),
        getExamStatistics: builder.query({
            query: (queries) => {

                const examId = queries.examId
                const grade = queries.grade
                const filterGt = queries.filterGt || 0

                return `/statistics/exam?examId=${examId}&grade=${grade}&filterGt=${filterGt}`
            },
        }),
        getHomeStatistics: builder.query({
            query: () => {
                return `/statistics/home`
            },
        }),
        testUri: builder.query({
            query: () => `/public/vid.mp4`,
        }),
        sendFileTest: builder.mutation({
            query: data => ({
                url: '/upload',
                method: 'post',
                body: data
            })
        }),
    })
})
export const {
    useLazyGetUsersQuery, useAddUserMutation, useLoginMutation, useDeleteUserMutation, useUpdateUserMutation, useLazyGetOneUserQuery, useUpdateUserProfileMutation,
    useLazyGetGradesQuery, useCreateGradeMutation, useUpdateGradeMutation, useDeleteGradeMutation,
    useLazyGetGroupsQuery, useCreateGroupMutation, useUpdateGroupMutation, useDeleteGroupMutation,
    usePostNewExamMutation, useRemoveExamMutation, useLazyGetExamsQuery, useUpdateExamMutation, useLazyGetOneExamQuery,
    useAddAttemptMutation, useLazyGetUserAttemptsQuery, useLazyGetExamAttemptsQuery,
    usePostNewLectureMutation, useUpdateLectureMutation, useRemoveLectureMutation, useLazyGetLecturesQuery, useSendFileTestMutation,
    useLazyTestUriQuery,
    useLazyGetMessagesQuery, useCreateMessageMutation, useUpdateMessageMutation, useDeleteMessageMutation,
    useLazyGetPaymentsQuery, useLazyGetPaymentsByGradeQuery, useCreatePaymentMutation, useCheckUsersPaymentMutation, useDeletePaymentMutation,
    useLazyGetUsersStatisticsQuery, useLazyGetExamStatisticsQuery, useLazyGetHomeStatisticsQuery
} = apiSlice