import React from 'react'

import InfoIcon from '@mui/icons-material/Info';
import ArticleIcon from '@mui/icons-material/Article';
import { Box, IconButton, ImageList, ImageListItem, ImageListItemBar, Stack } from '@mui/material';
import MakeTitle from '../tools/MakeTitle';

export default function LatestNews() {
    return (
        <Box>

            <MakeTitle title={"اخر الاخبار"}> <ArticleIcon color='warning' /> </MakeTitle>
            <Stack direction={"row"} justifyContent={"center"} gap={2} flexWrap={"wrap"}  >

                <ImageList sx={{ width: "333px", height: "auto" }}>
                    <ImageListItem cols={12} rows={12} >
                        <img
                            style={{ objectFit: 'contain' }}
                            src={`./images/img1.jpg`}
                            alt={"photoo"}
                        />
                        <ImageListItemBar
                            title={"اخبار"}
                            subtitle={"بعض الاخبار هنا ..."}
                            actionIcon={
                                <IconButton
                                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                    aria-label={`info about {item.title}`}
                                >
                                    <InfoIcon color='success' />
                                </IconButton>
                            }
                        />
                    </ImageListItem>
                </ImageList>

                <ImageList sx={{ width: "333px", height: "100%" }}>
                    <ImageListItem cols={12} rows={12}>
                        <img
                            style={{ objectFit: 'contain' }}
                            src={`./images/img2.jpg`}
                            alt={"photoo"}
                        />
                        <ImageListItemBar
                            title={"اخبار"}
                            subtitle={"بعض الاخبار هنا ..."}
                            actionIcon={
                                <IconButton
                                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                    aria-label={`info about {item.title}`}
                                >
                                    <InfoIcon color='success' />
                                </IconButton>
                            }
                        />
                    </ImageListItem>
                </ImageList>

            </Stack>

        </Box>

    )
}
