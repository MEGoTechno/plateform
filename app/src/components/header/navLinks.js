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

export const navLinks = [
    {
        name: lang.ar.links.exams, icon: <ListAltOutlinedIcon />, to: "/exams"
    }, {
        name: lang.ar.links.lectures, icon: <SchoolOutlinedIcon />, to: "/content"
    }, {
        name: lang.ar.links.usersInfo, icon: null, isAdmin: true
    }, {
        name: lang.ar.links.users, icon: <PersonOutlineOutlinedIcon />, to: "/management/users", isSubAdmin: true, isAdmin: true
    }, {
        name: lang.ar.links.manageUsers, icon: <PersonAddAltIcon />, to: "/management/user", isSubAdmin: true, isAdmin: true
    }, {
        name: lang.ar.links.management, icon: null, isSubAdmin: true
    }, {
        name: lang.ar.links.manageExams, icon: <NewspaperSharpIcon />, to: "/management/exams", isSubAdmin: true, isAdmin: true
    }, {
        name: lang.ar.links.manageLectures, icon: <SourceIcon />, to: "/management/content", isSubAdmin: true, isAdmin: true
    }, {
        name: lang.ar.links.grades, icon: <EditCalendarSharpIcon />, to: "/management/years", isSubAdmin: true, isAdmin: true
    }
]