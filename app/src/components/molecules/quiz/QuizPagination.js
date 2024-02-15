import { Box, Pagination, PaginationItem, useTheme } from '@mui/material'
import React, { memo, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

function QuizPagination({ count, index, setIndex, isLoading, examQuestions }) {

    const theme = useTheme()

    const [questions, setQuestions] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        setQuestions(examQuestions)
    }, [index])

    if (questions.length <= 0) return "loading ..."

    return (
        <Box sx={{ display: "flex", justifyContent: "center", m: "10px" }}>
            <Pagination
                variant='outlined'
                disabled={isLoading || false}
                count={count}
                page={index + 1 || 1}
                shape="rounded" color='success' siblingCount={count}
                renderItem={(item) => {

                    const isRight = item.type === "page" && questions[item.page - 1].chosenOptionId

                    const isError = item.type === "page" &&
                        questions[item.page - 1].chosenOptionId !==
                        questions[item.page - 1].rtOptionId &&
                        questions[item.page - 1].rtOptionId &&
                        searchParams.get("attempt")

                    // not answered - ritht - wrong - lsa
                    return (
                        <PaginationItem
                            sx={{
                                mb: "6px",
                                color: item.type === "page" && theme.palette.grey[50],
                                '&.Mui-selected': {
                                    background: isError ? theme.palette.error.dark : theme.palette.success.dark,
                                    color: theme.palette.grey[50]
                                },
                                bgcolor: isError ? theme.palette.error.light : isRight ? theme.palette.success.light : 'transparent',
                            }}
                            {...item}
                        />
                    )
                }}
                onChange={(e, v) => setIndex(v - 1)}
            />
        </Box>
    )
}

export default memo(QuizPagination)
