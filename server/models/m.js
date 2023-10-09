const examSchema = {
    gradeId: { type: String }, // grade + unit + lesson + part
    gradeName: { type: String },
    units: [{
        unitId: { type: String }, // grade + unit
        unitName: { type: String },
        lessons: [{
            lessonId: { type: String }, // grade + unit + lesson
            lessonName: { type: String },
            parts: [{
                partId: { type: String }, // grade + unit + lesson + part
                partName: { type: String },
                description: { type: String },
                questions: [{
                    questionId: { type: String }, // grade + unit + lesson + part + question
                    questionTitle: { type: String },
                    hints: { type: String },
                    rtOptionId: { type: String },
                    options: [{
                        optionId: { type: String }, // grade + unit + lesson + part + question + option
                        points: { type: Number, default: 1 },
                        OptionTitle: { type: String },
                    }]
                }]
            }]
        }]
    }],
}



const examSchema2 = {
    id: { type: String }, // grade + unit + lesson + part
    gradId: { type: String }, // number
    unitId: { type: String }, // grade + unit
    lessonId: { type: String }, // grade + unit + lesson
    partId: { type: String }, // grade + unit + lesson + part
    grade: { type: String },
    unitName: { type: String },
    lessonName: { type: String },
    partName: { type: String }, // == exam name
    description: { type: String },
    degree: { type: String },
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
}