import React, { useEffect, useState } from 'react'
import Content from '../../components/content/ShowUnits'
import { useDispatch, useSelector } from 'react-redux'
import AllContent from '../../components/content/AllContent'
import { useLazyGetLecturesQuery } from '../../toolkit/apiSlice'
import useLazyGetData from '../../hooks/useLazyGetData'
import LoaderSkeleton from '../../components/tools/LoaderSkeleton'
import { setLectures } from '../../toolkit/contentSlice'

export default function ContentPage() {
  const { user, grades } = useSelector(s => s.global)
  const { lectures } = useSelector(s => s.content)
  const dispatch = useDispatch()

  const [getData, { isLoading }] = useLazyGetLecturesQuery()
  const [getLectures] = useLazyGetData(getData)

  const trigger = async()=> {
    const lectures = await getLectures()
    dispatch(setLectures(lectures))
  }

  useEffect(() => {
    if (!lectures) {
      trigger()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) {
    return <LoaderSkeleton />
  }

  if(!lectures || lectures?.length === 0){
    return <>no lectures </>
  }
  if (user.isAdmin) {
    return <AllContent lectures={lectures} grades={grades} />
  }

  return (
    <div>
      <Content lectures={lectures} />
    </div>
  )
}
