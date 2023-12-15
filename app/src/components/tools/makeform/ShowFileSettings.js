import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShowVid from './ShowVid';
import ShowImg from './ShowImg';
import { Alert } from '@mui/material';


export default function ShowFileSettings({ file }) {
    const fileType = file?.resource_type || file?.type?.split("/")[0] || null

    const [realFile, setFile] = React.useState({})
    // original_filename secure_url url  size resource_type
    React.useEffect(() => {
        if (file?.resource_type) {
            setFile(file)
        } else if (file?.type) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setFile({
                    original_filename: file.name,
                    url: reader.result,
                    size: file.size,
                    format: file.type.split("/")[1]
                })
            }
            reader.readAsDataURL(file)
        }
    }, [file])

    if (fileType === "video") {
        return <ShowVid file={realFile} />
    }


    if (fileType === "image") {
        return <ShowImg file={realFile} />
    }
    return (
        <Alert severity='error'>sorry, un supported file</Alert>
    );
}