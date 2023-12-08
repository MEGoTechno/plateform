import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'



export default function useAuth() {
    const location = useLocation()
    const navigate = useNavigate()
    const { user } = useSelector(s => s.global)


    const authorize = () => {
        if (user && user?.role === "subAdmin") {
            
        } else if (!user && location.pathname !== "login") {
            navigate("/login")
        }
    }

    return [authorize]
}
