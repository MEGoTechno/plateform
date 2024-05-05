import { Alert, Box } from '@mui/material'
import React, { useEffect } from 'react'
import { DAYES } from '../../components/constants/dateConstants';
import Header from '../../components/tools/Header';

import { useDispatch, useSelector } from 'react-redux';
import useGetGrades from '../../hooks/useGetGrades';
import { useLazyGetGroupsQuery } from '../../toolkit/apiSlice';
import useLazyGetData from '../../hooks/useLazyGetData';

import ManageGroups from '../../components/groups/ManageGroups';
import { setGroups } from '../../toolkit/groupsSlice';
import LoaderSkeleton from '../../components/tools/LoaderSkeleton';


const groups = [
  {
    gradeName: "grade 1", gradeId: "g1", groupName: "saturday 02:03", stdNumbers: 10,
    days: [{ time: "13:03", dayIndex: 0 }, { time: "02:03", dayIndex: 0 }]
  },
  {
    gradeName: "grade 1", gradeId: "g1", groupName: "tuesday 10:00", stdNumbers: 50,
    days: [{ time: "10:00", dayIndex: 2 }, { time: "10:00", dayIndex: 6 }]
  },
  {
    gradeName: "grade 2", gradeId: "g2", groupName: "tuesday 10:00", stdNumbers: 50,
    days: [{ time: "10:00", dayIndex: 2 }, { time: "10:00", dayIndex: 6 }]
  },
  {
    gradeName: "grade 1", gradeId: "g1", groupName: "tuesday 10:00", stdNumbers: 50,
    days: [{ time: "10:00", dayIndex: 2 }, { time: "10:00", dayIndex: 6 }]
  },
  {
    gradeName: "grade 3", gradeId: "g3", groupName: "tuesday 10:00", stdNumbers: 50,
    days: [{ time: "10:00", dayIndex: 2 }, { time: "10:00", dayIndex: 6 }]
  }
]


export default function ManageGroupsPage() {

  const dispatch = useDispatch()
  const { groups, grades } = useSelector(s => s.groupsState)

  const [getGrades] = useGetGrades()

  const [getData, { isError, isLoading }] = useLazyGetGroupsQuery()
  const [getGroups] = useLazyGetData(getData)

  const trigger = async () => {

    if (!grades) {
      await getGrades()
    }

    if (!groups) {
      const res = await getGroups()
      if (res) {
        dispatch(setGroups(res))
      }
    }
  }

  useEffect(() => {
    if (!groups || !grades) {
      trigger()
    }
  }, [grades, groups])


  if (isLoading || !grades || !groups) return <LoaderSkeleton />

  if (isError) return <Alert sx={{ m: '20px ' }} severity='error'>connection confused</Alert>


  return (
    <Box>
      <Header title={"groups"} />
      <ManageGroups groups={groups} grades={grades} />
    </Box>
  )
}
