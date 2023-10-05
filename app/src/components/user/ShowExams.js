import { Box, Tab, Tabs } from '@mui/material'
import React, { useState } from 'react'
import Header from '../tools/Header'

export default function ShowExams() {
    const [value, setValue] = useState(0)
    console.log(value)
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const examMangement = [{
        gradeId: "grade1",
        gradeName: "1st grade"
    }, {
        gradeId: "grade2",
        gradeName: "2nd grade"
    }, {
        gradeId: "grade3",
        gradeName: "3rd grade"
    }]

    const gradeExams = [
        {
        id: "grade1unit1lesson1part1", // grade + unit + lesson + part
        gradId: "grade1", // number
        unitId: "grade1unit1", // grade + unit
        lessonId: "grade1unit1lesson1", // grade + unit + lesson
        partId: "grade1unit1lesson1part1", // grade + unit + lesson + part
        grade: "grade 1",
        unitName: "Genetics",
        lessonName: "DNA & RNA",
        partName: "DNA", // == exam name
        description: "we will study formation of DNA",
        degree: 50,
        questions: [{
            id: { type: String }, // grade + unit + lesson + part + question
            name: { type: String },
            title: { type: String },
            hints: { type: String },
            rtOption: { type: String },
            rtOptionId: { type: String },
            points: { type: String },
            options: [{
                id: { type: String }, // grade + unit + lesson + part + question + option
                title: { type: String },
            }],
        },]
    },{
        id: "grade1unit1lesson1part1", // grade + unit + lesson + part
        gradId: "grade1", // number
        unitId: "grade1unit1", // grade + unit
        lessonId: "grade1unit1lesson1", // grade + unit + lesson
        partId: "grade1unit1lesson1part1", // grade + unit + lesson + part
        grade: "grade 1",
        unitName: "Genetics",
        lessonName: "DNA & RNA",
        partName: "DNA", // == exam name
        description: "we will study formation of DNA",
        degree: 50,
        questions: [{
            id: { type: String }, // grade + unit + lesson + part + question
            name: { type: String },
            title: { type: String },
            hints: { type: String },
            rtOption: { type: String },
            rtOptionId: { type: String },
            points: { type: String },
            options: [{
                id: { type: String }, // grade + unit + lesson + part + question + option
                title: { type: String },
            }],
        },]
    },{
        id: "grade1unit1lesson1part1", // grade + unit + lesson + part
        gradId: "grade1", // number
        unitId: "grade1unit1", // grade + unit
        lessonId: "grade1unit1lesson1", // grade + unit + lesson
        partId: "grade1unit1lesson1part1", // grade + unit + lesson + part
        grade: "grade 1",
        unitName: "Genetics",
        lessonName: "DNA & RNA",
        partName: "DNA", // == exam name
        description: "we will study formation of DNA",
        degree: 50,
        questions: [{
            id: { type: String }, // grade + unit + lesson + part + question
            name: { type: String },
            title: { type: String },
            hints: { type: String },
            rtOption: { type: String },
            rtOptionId: { type: String },
            points: { type: String },
            options: [{
                id: { type: String }, // grade + unit + lesson + part + question + option
                title: { type: String },
            }],
        },]
    },{
        id: "grade1unit1lesson1part1", // grade + unit + lesson + part
        gradId: "grade2", // number
        unitId: "grade1unit1", // grade + unit
        lessonId: "grade1unit1lesson1", // grade + unit + lesson
        partId: "grade1unit1lesson1part1", // grade + unit + lesson + part
        grade: "grade 1",
        unitName: "Genetics",
        lessonName: "DNA & RNA",
        partName: "DNA", // == exam name
        description: "we will study formation of DNA",
        degree: 50,
        questions: [{
            id: { type: String }, // grade + unit + lesson + part + question
            name: { type: String },
            title: { type: String },
            hints: { type: String },
            rtOption: { type: String },
            rtOptionId: { type: String },
            points: { type: String },
            options: [{
                id: { type: String }, // grade + unit + lesson + part + question + option
                title: { type: String },
            }],
        },]
    },{
        id: "grade1unit1lesson1part1", // grade + unit + lesson + part
        gradId: "grade2", // number
        unitId: "grade1unit1", // grade + unit
        lessonId: "grade1unit1lesson1", // grade + unit + lesson
        partId: "grade1unit1lesson1part1", // grade + unit + lesson + part
        grade: "grade 1",
        unitName: "Genetics",
        lessonName: "DNA & RNA",
        partName: "DNA", // == exam name
        description: "we will study formation of DNA",
        degree: 50,
        questions: [{
            id: { type: String }, // grade + unit + lesson + part + question
            name: { type: String },
            title: { type: String },
            hints: { type: String },
            rtOption: { type: String },
            rtOptionId: { type: String },
            points: { type: String },
            options: [{
                id: { type: String }, // grade + unit + lesson + part + question + option
                title: { type: String },
            }],
        },]
    }]


    // const lessons = gradeExams.filter(unit => unit.unitId)
    const lessons = new Set(gradeExams.unitId)
    console.log(lessons)
    return (
        <Box>
            <Header title="Exams" />

            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        {examMangement.map(grade => {
                            return (
                                <Tab key={grade.gradeId} label={grade.gradeName} />
                            )
                        })}
                    </Tabs>

                </Box>
                <Box id="">

                </Box>
            </Box>
        </Box>
    )
}
