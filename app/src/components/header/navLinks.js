import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import ManageSearchSharpIcon from '@mui/icons-material/ManageSearchSharp';
import SourceIcon from '@mui/icons-material/Source';
import { lang } from '../tools/lang';

export const navLinks = [
    {
        name: lang.ar.links.exams, icon: <ListAltOutlinedIcon />, to: "/exams"
    }, {
        name: lang.ar.links.study, icon: <SchoolOutlinedIcon />, to: "/content"
    }, {
        name: lang.ar.links.usersInfo, icon: null
    }, {
        name: lang.ar.links.users, icon: <PersonOutlineOutlinedIcon />, to: "/management/users", isAdmin: true
    }, {
        name: "manage user", icon: <PersonAddAltIcon />, to: "/management/users/show", isAdmin: true
    }, {
        name: lang.ar.links.management, icon: null, isAdmin: true
    }, {
        name: lang.ar.links.manageExams, icon: <ManageSearchSharpIcon />, to: "/management/exams", isAdmin: true
    }, {
        name: "add videos", icon: <SourceIcon />, to: "/management/content", isAdmin: true
    }, {
        name: lang.ar.links.manageContent, icon: <SourceIcon />, to: "/management/years", isAdmin: true
    }
]