import { Alert, Box, Button } from '@mui/material'
import React, { useRef } from 'react'
import { buttonStyle } from '../../../styles/buttonsStyles'
import ShowFileSettings from './ShowFileSettings'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function MakeFile({ inputName, input, props, value }) {
    const fileRef = useRef(null)

    return (
        <Box m={"6px 0"}>
            <input
                ref={fileRef}
                type="file"
                label="file"
                hidden
                name={inputName}
                onChange={(e) => {
                    props.setFieldTouched(inputName, true)
                    props.setFieldValue(inputName, e.target.files[0])
                }}
            />
            <Button 
            sx={buttonStyle} 
            disabled={input.disabled ||false}
            style={{ width: "auto" }} onClick={() => fileRef.current.click()}>{input.label} <AddCircleOutlineIcon /> </Button>

            {props.errors[inputName] && props.touched[inputName] && (
                <Alert sx={{ mb: "5px" }} severity='error'>{props.errors[inputName]}</Alert>
            )}

            {value && (
                <ShowFileSettings file={value} />
            )}
        </Box>
    )
}

export default MakeFile
