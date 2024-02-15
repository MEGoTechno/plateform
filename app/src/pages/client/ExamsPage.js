import { Alert, Box } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import GradeExams from '../../components/exams/GradeExams'
import UnitExams from '../../components/exams/UnitExams'
import { useLazyGetExamsQuery } from '../../toolkit/apiSlice'
import useLazyGetData from '../../hooks/useLazyGetData'
import { setExams } from '../../toolkit/examSlice'
import useGetGrades from '../../hooks/useGetGrades'
import LoaderSkeleton from '../../components/tools/LoaderSkeleton'
import Header from '../../components/tools/Header'
import { user_roles } from '../../components/constants/roles'

export default function ExamsPage() {

    const dispatch = useDispatch()
    const { user, lang } = useSelector(s => s.global)
    const { exams } = useSelector(s => s.examsState)
    const { grades } = useSelector(s => s.groupsState)

    const [getGrades] = useGetGrades()

    const [getData, { isLoading, error }] = useLazyGetExamsQuery()
    const [getExams] = useLazyGetData(getData)

    const trigger = async () => {
        if (!grades && user.role !== user_roles.STUDENT) {
            await getGrades()
        }

        if (!exams) {
            const exams = await getExams()
            dispatch(setExams(exams))
        }

    }

    useEffect(() => {
        if (!exams || !grades) {
            trigger()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [exams, grades])


    if (isLoading || !exams) return <LoaderSkeleton />

    if (!grades && user.role !== user_roles.STUDENT) return <LoaderSkeleton />

    if (grades?.length === 0) {
        return <Box sx={{ direction: 'rtl' }}>
            <Header title={lang.links.content} />
            <Alert severity='error'>اضف مجموعه</Alert>
        </Box>
    }

    if (error) {
        return <Alert severity='error'>{lang.errors.connection}</Alert>
    }



    if (user.role !== user_roles.STUDENT) {
        return <Box>
            <Header title={"exams"} />
            <GradeExams exams={exams} grades={grades} />
        </Box>
    }

    return (
        <Box>
            <Header title={"exams"} />
            <UnitExams exams={exams} />
        </Box>
    )
}
