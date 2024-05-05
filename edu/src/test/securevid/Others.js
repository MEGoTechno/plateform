import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { useLazyTestUriQuery } from '../toolkit/apiSlice'
import { useSelector } from 'react-redux'

export default function Test() {
  const [trigger] = useLazyTestUriQuery()
  const securedF = "http://192.168.1.13:5050/public/vid.mp4"
  const cloud = "http://res.cloudinary.com/djbmm1kfz/video/upload/v1703058372/admin/sja5fpyu1rbu5tdpi8bj.mp4"

  const { user } = useSelector(s => s.global)
  const [uri, setUri] = useState("")
  const httpVid = () => {
    let xhr = new XMLHttpRequest()
    xhr.open("GET", cloud)
    xhr.setRequestHeader('authorization', user.token);
    xhr.responseType = "arraybuffer"
    xhr.onload = () => {
      let blob = new Blob([xhr.response])
      let uri = URL.createObjectURL(blob)
      setUri(uri)
    }
    xhr.send()
  }

  const test2 = async () => {
    const uri = await trigger()
    console.log(uri)
  }

  const fetchVid = () => {
    fetch(securedF, {
      method: "GET",
      headers: {
        authorization: user.token
      }
    })
    .then((res) => res.blob())
    .then((blob) => {
      const file = new File([blob], "video", { type: blob.type })
      console.log(file)
      return file
    }).then(file => {
      videoReader(file)
    })
  }

  const videoReader = (file)=> {
    let blob = new Blob([file])
    let uri = URL.createObjectURL(blob)
    console.log(uri)
    setUri(uri)
  }

  useEffect(() => {
    if (!uri) {
      fetchVid()
    }
  }, [uri])
  return (
    <div>
      <ReactPlayer
        style={{
          maxHeight: "100%"
        }}
        url={uri}
        width="100%"
        muted={true}
        controls
      />
    </div>
  )
}
