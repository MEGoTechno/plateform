import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import ManageSearchSharpIcon from '@mui/icons-material/ManageSearchSharp';
import SourceIcon from '@mui/icons-material/Source';
import { lang } from '../tools/lang';
import AssignmentTurnedInSharpIcon from '@mui/icons-material/AssignmentTurnedInSharp';
import AssignmentSharpIcon from '@mui/icons-material/AssignmentSharp';
import NewspaperSharpIcon from '@mui/icons-material/NewspaperSharp';
import EditCalendarSharpIcon from '@mui/icons-material/EditCalendarSharp';
import { user_roles } from '../constants/roles';
import PaidIcon from '@mui/icons-material/Paid';
import HomeIcon from '@mui/icons-material/Home';
import MessageIcon from '@mui/icons-material/Message';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

export const navLinks = [
    {
        name: "الرئيسيه", icon: <HomeIcon />, to: "/", allowedTo: [user_roles.STUDENT, user_roles.SUBADMIN]
    }, {
        name: "البروفايل", icon: <AccountBoxIcon />, to: "/profile", allowedTo: [user_roles.STUDENT, user_roles.SUBADMIN]
    }, {
        name: lang.ar.links.exams, icon: <ListAltOutlinedIcon />, to: "/exams", allowedTo: [user_roles.STUDENT, user_roles.SUBADMIN, user_roles.ADMIN]
    }, {
        name: lang.ar.links.lectures, icon: <SchoolOutlinedIcon />, to: "/lectures", allowedTo: [user_roles.STUDENT, user_roles.SUBADMIN, user_roles.ADMIN]
    }, {
        name: "الرسائل", icon: <MessageIcon />, to: "/messages", allowedTo: [user_roles.STUDENT, user_roles.SUBADMIN]
    }, {
        name: lang.ar.links.usersInfo, icon: null, allowedTo: [user_roles.SUBADMIN, user_roles.ADMIN]
    }, {
        name: lang.ar.links.users, icon: <PersonOutlineOutlinedIcon />, to: "/management/users", allowedTo: [user_roles.ADMIN],
    }, {
        name: lang.ar.links.manageUsers, icon: <PersonAddAltIcon />, to: "/management/user", allowedTo: [user_roles.SUBADMIN, user_roles.ADMIN],
    }, {
        name: "اداره الدفع", icon: <PaidIcon />, to: "/management/payments", allowedTo: [user_roles.ADMIN],
    }, {
        name: lang.ar.links.management, icon: null, allowedTo: [user_roles.SUBADMIN, user_roles.ADMIN]
    }, {
        name: " الاحصائيات", icon: <BarChartRoundedIcon />, to: "/management/statistics", allowedTo: [user_roles.ADMIN],
    }, {
        name: lang.ar.links.manageExams, icon: <NewspaperSharpIcon />, to: "/management/exams", allowedTo: [user_roles.SUBADMIN, user_roles.ADMIN],
    }, {
        name: lang.ar.links.manageLectures, icon: <SourceIcon />, to: "/management/lectures", allowedTo: [user_roles.SUBADMIN, user_roles.ADMIN],
    }, {
        name: lang.ar.links.grades, icon: <EditCalendarSharpIcon />, to: "/management/years", allowedTo: [user_roles.ADMIN],
    }
]