import React, { useEffect, useState } from 'react'

function BlobHook(vidUri, token) {
    const [uri, setUri] = useState(null)
    const [error, setError] = useState(null)

    const fetchVid = () => {
        fetch(vidUri, {
            method: "GET",
            headers: {
                authorization: token
            }
        }).then((res) => res.blob())
            .then((blob) => {
                const file = new File([blob], "video", { type: blob.type })
                return file
            }).then(file => {
                videoReader(file)
            }).catch(e => {
                setError(e)
            })
    }

    const videoReader = (file) => {
        let blob = new Blob([file])
        let uri = URL.createObjectURL(blob)
        setUri(uri)
    }

    return [fetchVid, uri, error]
}

export default BlobHook
