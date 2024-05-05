import React, { useEffect } from 'react'
import Login from '../../components/user/Login'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const { user } = useSelector(s => s.global)
  const { lang } = useSelector(s => s.global)
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate("/")
    }
  }, [user, navigate])

  return (
    <div>
      <Login lang={lang} />
    </div>
  )
}
