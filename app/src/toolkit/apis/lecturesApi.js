import { apiSlice } from '../apiSlice'

// api/client ==>
const lecturesApi = apiSlice.injectEndpoints({

    endpoints: builder => ({
        getLectures: builder.query({
            query: (queries) => "lectures",
        }),
        createNewLecture: builder.mutation({
            query: data => ({
                url: '/lectures',
                method: 'POST',
                body: data
            }),
        }),
        UpdateLecture: builder.mutation({
            query: data => ({
                url: '/lectures',
                method: 'PUT',
                body: data
            }),
        }),
        removeLecture: builder.mutation({
            query: data => ({
                url: '/lectures',
                method: 'DELETE',
                body: data
            }),
        }),
    }),
    overrideExisting: false,
})

export const {
    useCreateNewLectureMutation, useUpdateLectureMutation, useRemoveLectureMutation, useLazyGetLecturesQuery,
} = lecturesApi