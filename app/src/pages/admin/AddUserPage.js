import React from 'react'
import Header from '../../components/tools/Header'
import { useSelector } from 'react-redux'
import Adduser from '../../components/user/actions/AddUser'

export default function AddUserPage() {
  const { lang } = useSelector(s => s.global)
  return (
    <div>
      <Header title={lang.links.addUser} />
      <Adduser />
    </div>
  )
}
