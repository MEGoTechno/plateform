import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { useLazyTestUriQuery } from '../toolkit/apiSlice'
import { useSelector } from 'react-redux'
import Video from './securevid/Video'

export default function Test() {

  return (
    <div>
      <Video />
    </div>
  )
}
