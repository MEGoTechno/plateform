import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'



export default function useAuth() {
    const location = useLocation()
    const navigate = useNavigate()
    const { user } = useSelector(s => s.global)
    const [isAccessed, setAccess] = useState(false)
    const locations = location.pathname.split("/")
    const path = `${locations[1]}/${locations[2]}`
    const userPath = `${locations[1]}`

    const authorize = () => {
        if (user && user?.role === "admin") {
            setAccess(true)
        } else if (user && user?.role === "subAdmin") {
            path === 'management/users' ? setAccess(false) :
                location.pathname === `/management/years` ? setAccess(false) : setAccess(true)

        } else if (user) {
            userPath === "management" ? setAccess(false) : setAccess(true)
        } else if (!user && location.pathname !== "login") {
            setAccess(true)
            navigate("/login")
        }
    }

    return [authorize, isAccessed]
}
