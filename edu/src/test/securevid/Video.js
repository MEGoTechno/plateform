import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import BlobHook from './BlobHook'
import { useSelector } from 'react-redux'
import LoaderSkeleton from "../../components/tools/LoaderSkeleton"

function Video() {
    const securedF = "http://192.168.1.13:5050/public/vid.mp4"

    const { user } = useSelector(s => s.global)
    const [getUri, uri, error] = BlobHook(securedF, user.token)

    useEffect(() => {
        if (!uri) {
            getUri()
        }
    }, [getUri, uri, user.token])

    if (error) {
        return <div>
            error
        </div>
    }

    return (
        <div>
            {uri ? (
                <>
                    <ReactPlayer
                        style={{
                            maxHeight: "100%"
                        }}
                        url={uri}
                        width="100%"
                        muted={true}
                        controls
                    />
                </>
            ) : (
                <>
                    <LoaderSkeleton />
                </>
            )}
        </div>
    )
}

export default Video
