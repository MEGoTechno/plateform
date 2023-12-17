import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Alert, Box, Button } from '@mui/material';
import TabsControlled, { CustomTabPanel } from '../tools/TabsControlled';
import CreateUnit from './CreateUnit';
import { getUnique } from '../tools/commonFC';
import { useGetExamsQuery, useLazyGetExamsQuery } from '../../toolkit/apiSlice';
import LoaderSkeleton from '../tools/LoaderSkeleton';
import { addExamToCreated, getCreatedExams } from '../../toolkit/examSlice';
import { setCookie } from '../../hooks/cookies';
import useGetGrades from '../../hooks/useGetGrades';
import Header from '../tools/Header';
import { buttonStyle } from '../styles/buttonsStyles';
import { useNavigate } from 'react-router-dom';


export default function ManageExams() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [getGrades, grades] = useGetGrades()
    const { createdExams } = useSelector(s => s.exam)
    const { user, lang } = useSelector(s => s.global)
    const [value, setValue] = React.useState(0);
    const [exams, setExams] = useState(createdExams)
    // let exams = createdExams
    const [trigger, { data: EXAMSDB, isSuccess, isLoading, isError, error }] = useLazyGetExamsQuery()


    const handleGetData = async () => {
        try {
            if (!grades && user.isAdmin) {
                await getGrades()
            }
            const result = await trigger()
            dispatch(getCreatedExams(result.data))
            setExams(result.data)
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        if (!exams || !grades) {
            handleGetData()
        } else {
            setExams(createdExams)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [exams, grades, createdExams])

    if (isLoading || !grades) {
        return <LoaderSkeleton />
    }

    if (grades?.length === 0) {
        return <Box>
            <Alert severity='error'>اضف مجموعه اولا</Alert>
        </Box>
    }




    let getUnits = []
    let units = []
    if (exams && grades) {
        exams.forEach(({ unitId, unitName, gradeId, gradeName, lessonId, lessonName, partId, partName }) => {
            if (gradeId === grades[value].gradeId) {
                getUnits.push({ unitId, unitName, gradeId, gradeName, lessonId, lessonName, partId, partName })
            }
        })
        units = getUnique(getUnits, "unitId")
    }

    return (
        <Box>
            {grades && exams && (
                <Box sx={{ display: 'flex', justifyContent: "center", flexDirection: "column", mt: 5 }}>
                    <TabsControlled value={value} setValue={setValue} items={grades} by="gradeName" />
                    {grades && grades.map((grade, i) => {
                        return (
                            <CustomTabPanel key={i} value={value} index={i}>
                                <CreateUnit grade={grade} units={units} exams={exams} />
                            </CustomTabPanel>
                        )
                    })}
                </Box>
            )}
            {isLoading && <LoaderSkeleton />}
            {isError && <Alert severity='error'>{error.data.message}</Alert>}
        </Box>
    )
}


