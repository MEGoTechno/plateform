import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ManageContent from '../../components/content/manage/ManageContent'
// import { lecturess } from '../../components/content/data'
import { useLazyGetLecturesQuery } from '../../toolkit/apiSlice'
import useLazyGetData from '../../hooks/useLazyGetData'
import LoaderSkeleton from "../../components/tools/LoaderSkeleton"
import { setLectures } from '../../toolkit/contentSlice'
import { Alert } from '@mui/material'
import useGetGrades from '../../hooks/useGetGrades'

export default function ManageContentPage() {


  const dispatch = useDispatch()
  const [getGrades, grades] = useGetGrades()
  const { content: { lectures } } = useSelector(s => s)
  const [error, setError] = useState(null)

  const [getData, { isLoading, }] = useLazyGetLecturesQuery()
  const [getLectures] = useLazyGetData(getData)

  const trigger = async () => {
    try {

      if (!grades) {
        await getGrades()
      }

      const res = await getLectures()
      dispatch(setLectures(res))
    } catch (error) {
      console.log(error)
      setError(error)
    }
  }

  useEffect(() => {
    if (!lectures) {
      trigger()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!lectures) {
    return <LoaderSkeleton />
  }

  if(!grades){
    return <>add new grade plz</>
  }

  if (error) {
    console.log(error)
    return <Alert severity='error'>connection confused</Alert>
  }

  return (
    <div>
      <ManageContent grades={grades} lectures={lectures} />
    </div>
  )
}
