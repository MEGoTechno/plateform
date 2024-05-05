import { Avatar, Box, Grid, Paper, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import GroupForm from './GroupForm'
import Header from '../../tools/Header'

import GroupWorkSharpIcon from '@mui/icons-material/GroupWorkSharp';
import { useCreateGradeMutation } from '../../../toolkit/apiSlice'
import usePostData from '../../../hooks/usePostData'
import { useDispatch } from 'react-redux'
import { resetGroupsState, setGroups } from '../../../toolkit/groupsSlice'

export default function CreateGrade() {
  const theme = useTheme()
  const location = useLocation()
  const gradeId = location?.state?.gradeId

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [formOptions, setFormOptions] = useState({
    isLoading: false,
    isError: false,
    isShowModal: false,
    isDone: false,
    doneMessage: "it is done",
    values: null,
    res: ""
  })


  const [sendData] = useCreateGradeMutation()
  const [createGrade] = usePostData(sendData, formOptions, setFormOptions)



  const inputs = [
    {
      name: "gradeId",
      value: gradeId,
      label: '...',
      disabled: true,
      hidden: true
    }, {
      name: "gradeName",
      value: "",
      label: 'grade name'
    }
  ]

  const trigger = async () => {
    setFormOptions({
      ...formOptions, isLoading: true, isShowModal: false
    })

    const res = await createGrade(formOptions.values)
    dispatch(resetGroupsState())
    navigate(-1)
    console.log(res)
  }

  const paperStyle = { padding: 20, width: "100%", margin: "20px auto", backgroundColor: theme.palette.background.alt }
  const avatarStyle = { backgroundColor: theme.palette.secondary[500], margin: "10px 0" }

  return (
    <Box >
      <Header title={"add grade"} />
      <Grid align="center">

        <Paper elevation={1} style={paperStyle} >

          <Avatar sx={avatarStyle}>
            <GroupWorkSharpIcon />
          </Avatar>

          <Typography>add grade</Typography>
          <GroupForm inputs={inputs} formOptions={formOptions} setFormOptions={setFormOptions} trigger={trigger} />
        </Paper>

      </Grid>
    </Box>
  )
}
