import React from 'react'
import Adduser from '../../components/management/Adduser'
import Header from '../../components/tools/Header'
import { useSelector } from 'react-redux'

export default function AddUserPage() {
  const {lang} = useSelector(s => s.global)
  return (
    <div>
      <Header title= {lang.links.addUser} />
      <Adduser />
    </div>
  )
}
