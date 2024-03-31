import React from 'react'
import MakeForm from '../../tools/makeform/MakeForm'
import ModalControlled from '../../tools/ModalControlled'
import { useSelector } from 'react-redux'
import { Box, Paper, useTheme } from '@mui/material'

export default function GroupForm({ inputs, formOptions, setFormOptions, trigger }) {
    const theme = useTheme()
    const { lang } = useSelector(s => s.global)

    // for get values and pass to modal
    const handleSubmit = (values, props) => {
        setFormOptions({
            ...formOptions, values, isShowModal: true
        })
    }

    return (
        <Box >
            <MakeForm inputs={inputs} onSubmit={handleSubmit} formOptions={formOptions} setFormOptions={setFormOptions} />

            {/* ###### modal ###### */}
            {formOptions.isShowModal && <ModalControlled
                title={lang.modal.confirm} description="r u sure ?"
                action={trigger}
                isShowModal={formOptions?.isShowModal}
                setFormOptions={setFormOptions}
                close={() => setFormOptions({ ...formOptions, isShowModal: false })} />}
        </Box>
    )
}
