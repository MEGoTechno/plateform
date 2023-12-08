import { useState } from "react"
import { usePostNewLectureMutation } from "../../../../toolkit/apiSlice"
import { useLocation, useNavigate } from "react-router-dom"
import usePostData from "../../../../hooks/usePostData"
import * as Yup from "yup"
import ContentForm from "./ContentForm"
import { useDispatch } from "react-redux"
import { setLectures } from "../../../../toolkit/contentSlice"

export default function CreateLecture() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formOptions, setFormOptions] = useState({
    isLoading: false,
    isError: false,
    isShowModal: false,
    isDone: false,
    doneMessage: "it is done",
    values: null,
    res: ""
  })

  const location = useLocation()
  const { gradeId, gradeName, unitId, unitName, lessonId, lessonName, partId } = location.state

  // inputs fc form option
  const inputs = [
    {
      name: "partId",
      label: "partId",
      value: partId,
      hidden: true,
      disabled: true
    }, {
      name: "gradeId",
      label: "gradeId",
      value: gradeId,
      hidden: true,
      disabled: true
    }, {
      name: "gradeName",
      label: "grade Name",
      value: gradeName || "",
      disabled: gradeName ? true : false
    }, {
      name: "unitId",
      label: "unitId",
      value: unitId,
      hidden: true,
      disabled: true
    }, {
      name: "unitName",
      label: "unit Name",
      value: unitName || "",
      disabled: unitName ? true : false
    }, {
      name: "lessonId",
      label: "lessonId",
      value: lessonId,
      hidden: true,
      disabled: true
    }, {
      name: "lessonName",
      label: "lesson Name",
      value: lessonName || "",
      disabled: lessonName ? true : false
    }, {
      name: "partName",
      label: "part Name",
    }, {
      name: "description",
      label: "description",
    }, {
      name: "video",
      label: "video",
      type: "file",
    }, {
      name: "thumbnail",
      label: "thumbnail",
      type: "file"
    },
  ]

  const [sendData] = usePostNewLectureMutation()
  const [sendLecture] = usePostData(sendData, formOptions, setFormOptions)

  const trigger = async () => {
    const newLecture = await sendLecture(formOptions.values, "multi")
    console.log(newLecture)
    dispatch(setLectures(null))
    navigate("/management/content")
  }


  return (
    <div>
      <ContentForm inputs={inputs} formOptions={formOptions} setFormOptions={setFormOptions} trigger={trigger} />
    </div>
  )
}
