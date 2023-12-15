import { useState } from "react"
import { usePostNewLectureMutation } from "../../../../toolkit/apiSlice"
import { useLocation, useNavigate } from "react-router-dom"
import usePostData from "../../../../hooks/usePostData"
import * as Yup from "yup"
import ContentForm from "./ContentForm"
import { useDispatch, useSelector } from "react-redux"
import { setLectures } from "../../../../toolkit/contentSlice"
import Header from "../../../tools/Header"
import { Box } from "@mui/material"


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
  const { lang } = useSelector(s => s.global)
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
      label: lang.form.gradeName,
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
      label: lang.form.unitName,
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
      label: lang.form.lessonName,
      value: lessonName || "",
      disabled: lessonName ? true : false
    }, {
      name: "partName",
      label: lang.form.partName,
    }, {
      name: "description",
      label: lang.form.description,
      validation: Yup.string().required("it is required")
    }, {
      name: "thumbnail",
      label: lang.form.thumbnail,
      type: "file",
      validation: Yup.mixed().required(lang.errors.requireImg)
        .test({
          message: 'Please provide a supported image typed(jpg or png)',
          test: (file, context) => {
            const isValid = ['image/png', 'image/jpg', 'image/jpeg'].includes(file?.type);
            if (!isValid) context?.createError();
            return isValid;
          }
        })
        .test({
          message: lang.errors.less15mg,
          test: (file) => {
            const isValid = file?.size < 15 * 1000000;
            return isValid;
          }
        })
    }, {
      name: "video",
      label: lang.form.video,
      type: "file",
      validation: Yup.mixed().required(lang.errors.requireVid)
        .test({
          message: 'Please provide a supported video typed(mp4)',
          test: (file, context) => {
            const isValid = ['video/mp4'].includes(file?.type);
            if (!isValid) context?.createError();
            return isValid;
          }
        })
        .test({
          message: lang.errors.less15mg,
          test: (file) => {
            const isValid = file?.size < 15 * 1000000;
            return isValid;
          }
        })
    },
  ]

  const [sendData] = usePostNewLectureMutation()
  const [sendLecture] = usePostData(sendData, formOptions, setFormOptions)

  const trigger = async () => {
    setFormOptions({
      ...formOptions, isLoading: true, isShowModal: false
    })
    await sendLecture(formOptions.values, "multi")
    dispatch(setLectures(null))
    navigate("/management/content")
  }


  return (
    <Box sx={{ direction: lang.direction }}>
      <Header title={lang.form.addLecture} description={`${gradeName && gradeName} > ${lessonName ? lessonName : "new lesson"}`} />
      <ContentForm inputs={inputs} formOptions={formOptions} setFormOptions={setFormOptions} trigger={trigger} />
    </Box>
  )
}
