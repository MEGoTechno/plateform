import React from 'react'
import AddUserForm from '../components/user/actions/AddUserForm'
import MakeForm from '../components/tools/makeform/MakeForm'
import { useSendFileTestMutation } from '../toolkit/apiSlice'
import CircularWithValueLabel from '../components/tools/UploadingProgress'

export default function Test() {
  const [sendFile] = useSendFileTestMutation()

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

      sendFile(formData).then((res, s) => {
        console.log(res)
      })

  }

  return (
    <div>
      <MakeForm inputs={inputs} onSubmit={send} />
      <CircularWithValueLabel value={"50%"} />
    </div>
  )
}
