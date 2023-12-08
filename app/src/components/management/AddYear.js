import FormControlled from '../tools/FormControlled'
import { usePostSettingsMutation } from '../../toolkit/apiSlice'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setGrades } from '../../toolkit/globalSlice'

export default function AddYear({ setAlert }) {
  const [loading, setLoading] = useState(false)
  
  const [sendData] = usePostSettingsMutation()
  const { grades } = useSelector(s => s.global)
  const dispatch = useDispatch()

  // for form 
  const inputs = [{
    label: "grade name",
    id: "gradeName",
    name: "gradeName",
    required: true
  }]
  const newGrade = {
    gradeId: ``,
    gradeName: ""
  }

  // for submit
  const submit = (data, props) => {
    data.gradeId = `g${grades.length + 1}` || "g1"
    console.log(data)

    setLoading(true)
    sendData(data).then((res) => {
      // if sent
      if (res.data) {
        setLoading(false)
        setAlert({
          state: "success",
          message: res.data.message
        })
        dispatch(setGrades(data))
        props.resetForm()
      } else {
        // not sent
        setLoading(false)
        setAlert({
          state: "error",
          message: res.error.data.message
        })
      }
    }).catch((err) => {
      // proplem
      setLoading(false)
      setAlert({
        state: "error",
        message: err.message
      })
    })
  }


  return (
    <div>
      <FormControlled inputs={inputs} data={newGrade} onSubmit={submit} loading={loading} />
      {/* {isOpen && <ModalControlled title="send" description="are you sure" state={isOpen} close={handleClose} action={clicked} />} */}
    </div>
  )
}
