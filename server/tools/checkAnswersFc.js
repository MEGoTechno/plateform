const checkAnswersFc = (answeredExam, exam) => {
    let mark = 0

    answeredExam.questions.forEach((question) => {
        const chosenOption = question.optionId

        const currentQuestion = exam.questions.filter(q => q._id === question._id)[0]
        const rtOption = currentQuestion.rtOptionId

        if (rtOption === chosenOption) {
            
            mark += currentQuestion.points
        }
    });
    return mark
}

module.exports = checkAnswersFc