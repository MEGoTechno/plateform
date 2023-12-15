import React, { useEffect } from 'react'
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
    const [value, setValue] = React.useState(0);
    let exams = createdExams

    const [trigger, { data: EXAMSDB, isSuccess, isLoading, isError, error }] = useLazyGetExamsQuery()


    const handleGetData = async () => {
        try {
            if (!grades) {
                await getGrades()
            }
            const result = await trigger()
            if (result.data) {
                dispatch(getCreatedExams(result.data))
            }

        } catch (err) {
            console.log(err.message)
        }
    }
    // console.log(EXAMSDB)
    useEffect(() => {
        if (!exams || !grades) {
            handleGetData()
        }
    }, [exams])

    if (!exams || !grades) {
        return <LoaderSkeleton />
    }

    if (grades?.length === 0) {
        return <Box>
            <Header title={"Manage Exams"} />
            <Alert severity='error'>add grade plz</Alert>
            <Button sx={buttonStyle} onClick={() => navigate("/management/years")}>go to grade page</Button>
        </Box>
    }




    let getUnits = []
    let units = []
    if (exams) {
        exams.forEach(({ unitId, unitName, gradeId, gradeName, lessonId, lessonName, partId, partName }) => {
            if (gradeId === grades[value].gradeId) {
                getUnits.push({ unitId, unitName, gradeId, gradeName, lessonId, lessonName, partId, partName })
            }
        })
        units = getUnique(getUnits, "unitId")
    }

    return (
        <Box>
            {!grades ? "add grade first" : (
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


