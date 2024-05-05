import { Box, useTheme } from '@mui/material'
import React, { useState } from 'react'
import UserForm from './UserForm'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import usePostData from '../../../hooks/usePostData'
import Header from '../../tools/Header'
import * as Yup from "yup"
import { setUser } from '../../../toolkit/globalSlice'
import { getCookie } from '../../../hooks/cookies'
import { useUpdateUserProfileMutation } from '../../../toolkit/apis/UsersApi'

import AccountCircle from '@mui/icons-material/AccountCircle';
import PasswordIcon from '@mui/icons-material/Password';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import HouseIcon from '@mui/icons-material/House';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
export default function UpdateUserProfile() {
  const { lang } = useSelector(s => s.global)
  const theme = useTheme()
  const dispatch = useDispatch()
  const location = useLocation()

  const { user } = location.state
  const [formOptions, setFormOptions] = useState({ // if not modal use only 2 compose (default 3)
    isLoading: false,
    isShowModal: false,
    isDone: false,
    doneMessage: "",
    values: null,
  })

  const inputs = [
    {
      name: "_id",
      value: user._id,
      disabled: true,
      hidden: true
    },
    {
      name: "userName",
      label: lang.users.userName,
      validation: Yup.string().required("user name should be unique"),
      value: user.userName,
      disabled: true,
      icon: <VerifiedUserIcon sx={{color: theme.palette.success.light}} />
    }, {
      name: "name",
      label: lang.users.name,
      value: user.name,
      icon: <AccountCircle />
    }, {
      name: "email",
      label: lang.users.email,
      value: user.email,
      icon: <AttachEmailIcon />

    }, {
      name: "phone",
      label: lang.users.phone,
      type: "number",
      value: 0 + user.phone,
      icon: <ContactPhoneIcon />


    }, {
      name: "familyPhone",
      label: lang.users.familyPhone,
      value: 0 + user.familyPhone,
      icon: <HouseIcon />

    }, {
      name: "password",
      label: "new password",
      type: "password",
      placeholder: "new password",
      validation: Yup.string().min(6, "should be at least 6 characters"),
      icon: <PasswordIcon />

    }, {
      name: "avatar",
      label: "image",
      type: "file",
      validation: Yup.mixed()
        .test({
          message: 'Please provide a supported image typed(jpg or png)',
          test: (file, context) => {
            if (file) {
              const isValid = ['image/png', 'image/jpg', 'image/jpeg'].includes(file?.type);
              if (!isValid) context?.createError();
              return isValid;
            } else {
              return true
            }
          }
        })
        .test({
          message: lang.errors.less15mg,
          test: (file) => {
            if (file) {
              const isValid = file?.size < 15 * 1000000;
              return isValid;
            } else {
              return true
            }
          }
        })
    },]

  const [sendData] = useUpdateUserProfileMutation()
  const [updateUser] = usePostData(sendData, formOptions, setFormOptions)

  const trigger = async () => {
    setFormOptions({
      ...formOptions, isShowModal: false, isLoading: true
    })
    const res = await updateUser(formOptions.values, "multi")
    const updatedUser = { ...user, ...res, token: user.token }
    dispatch(setUser(updatedUser))
  }

  return (
    <Box>
      <Header title={"update profile"} />
      <UserForm inputs={inputs} formOptions={formOptions} setFormOptions={setFormOptions} trigger={trigger} />
    </Box>
  )
}

