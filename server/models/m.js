const examSchema = {
    id: { type: String }, // grade + unit + lesson + part
    name: { type: String },
    units: [{
        id: { type: String }, // grade + unit
        name: { type: String },
        lessons: [{
            id: { type: String }, // grade + unit + lesson
            name: { type: String },
            parts: [{
                id: { type: String }, // grade + unit + lesson + part
                name: { type: String },
                description: { type: String },
                questions: [{
                    id: { type: String }, // grade + unit + lesson + part + question
                    title: { type: String },
                    hints: { type: String },
                    rtOption: { type: String },
                    rtOptionId: { type: String },
                    options: [{
                        id: { type: String }, // grade + unit + lesson + part + question + option
                        points: { type: String },
                        title: { type: String },
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