import { useDispatch } from 'react-redux'
import { setGlobalMsg, setUser } from '../toolkit/globalSlice'

export default function usePostData(sendData, formOptions, setFormOptions) {
  const dispatch = useDispatch()
  let data

  const trigger = (values, dataType) => {
    if (values) {
      data = values
    } else {
      data = formOptions?.values
    }

    let formData = data

    if (dataType) {
      formData = new FormData()
      Object.keys(data).forEach(key => formData.append(key, data[key]))
    }

    return new Promise((resolve, reject) => {

      sendData(formData).then(res => {
        if (res.error) {
          // error ===> invalid jwt or not user
          if (res.error.data.isKick === true) {
            dispatch(setUser(null))
            return;
          }

          // error in form
          setFormOptions({
            isLoading: false, isDone: true, isError: true, values: null, doneMessage: res.error.data.message
          })
          //global error 
          dispatch(setGlobalMsg({ message: res.error.data.message, severity: "error" }))
          return;
        }

        // in success
        setFormOptions({
          doneMessage: res.data.message, isLoading: false, isDone: true, isError: false, values: null
        })
        dispatch(setGlobalMsg({ message: res.data.message, severity: "success" }))
        resolve(res.data.values)

        // in error in fc
      }).catch((error) => {
        dispatch(setGlobalMsg({ message: error.message, severity: "error" }))
        setFormOptions({
          isLoading: false, isDone: true, isError: true, values: null, doneMessage: error.message
        })
      })


    })
  }

  return [trigger]
}
