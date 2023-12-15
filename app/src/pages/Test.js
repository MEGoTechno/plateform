import React, { useState } from 'react'
import AddUserForm from '../components/user/actions/AddUserForm'
import MakeForm from '../components/tools/makeform/MakeForm'
import { useSendFileTestMutation } from '../toolkit/apiSlice'
import CircularWithValueLabel from '../components/tools/UploadingProgress'
import { CardMedia } from '@mui/material'
import ReactPlayer from 'react-player'
import * as Yup from "yup"

export default function Test() {
  const [sendFile] = useSendFileTestMutation()
  const [video, setVid] = useState(false)
  const [thumbnail, setThubmnail] = useState(false)
  const [formOptions, setForm] = useState({
    isLoading: false
  })

  const inputs = [
    { name: "userName", value: "elawadii" },
    {
      name: "thumbnail",
      label: "thumbnail",
      type: "file",
      validation: Yup.mixed().required('image is required').test("fileSize", "The file is too large", (value) => {
        return value.size <= 15 * 1000000
      })

    }, {
      name: "video",
      label: "video",
      type: "file",
      validation: Yup.mixed().required('image is required').test("fileSize", "The file is too large", (value) => {
        return value.size <= 15 * 1000000
      }),
    }]

  // original_filename secure_url url  size resource_type
  const send = (values, props) => {
    console.log(values)

    const formData = new FormData()

    Object.keys(values).forEach(key => formData.append(key, values[key]))
    setForm({ isLoading: true })
    sendFile(formData).then((res, s) => {
      console.log(res)
      setVid(res.data)
      setForm({ isLoading: false })
    })

  }

  return (
    <div>
      <MakeForm inputs={inputs} onSubmit={send} formOptions={formOptions} />
    </div>
  )
}
