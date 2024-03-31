
export const getInputName = (nestedInputName, input) => {
    let inputName
    if (nestedInputName) {
        inputName = nestedInputName
    } else {
        inputName = input.name
    }
    return inputName
}
