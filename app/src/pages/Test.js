import React, { useState } from 'react'
import AddUserForm from '../components/user/actions/AddUserForm'
import MakeForm from '../components/tools/makeform/MakeForm'
import { useSendFileTestMutation } from '../toolkit/apiSlice'
import CircularWithValueLabel from '../components/tools/UploadingProgress'
import { CardMedia } from '@mui/material'
import ReactPlayer from 'react-player'

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
      name: "image",
      label: "image",
      type: "file"
    }]

  const send = (values, props) => {
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
      {video && (
        <ReactPlayer
          url={video}
          width="100%"
          height="100%"
          muted={true}
          controls
        />
      )}

    </div>
  )
}
