const serializeForm = (formNode) => {
    return new FormData(formNode)
}

const handleFormSubmit  = (event) => {
    event.preventDefault()
    const data = serializeForm(event.target)
    console.log(Array.from(data.entries()))
    const response = sendData(data)
    console.log(response)
}

const registrationForm = document.getElementById('registration_form')

registrationForm.addEventListener('submit', handleFormSubmit)

const sendData = async (data) => {
    return await fetch('', {
        method: 'POST',
        body: data,
    })
}

const maleCheckbox = document.getElementById("male-checkbox")
const femaleCheckbox = document.getElementById("female-checkbox")
const maleLabel = document.getElementById("male-label")
const femaleLabel = document.getElementById("female-label")

const handleCheckboxClick = (event) => {
    event.preventDefault()
    if (event.target.id === 'male-checkbox') {
        maleCheckbox.setAttribute("disabled", "")
        femaleCheckbox.removeAttribute("disabled")
        femaleLabel.setAttribute('class', 'sex_check')
        maleLabel.setAttribute('class', 'sex_check-checked')
    } else if (event.target.id === 'female-checkbox') {
        femaleCheckbox.setAttribute("disabled", "")
        maleCheckbox.removeAttribute("disabled")
        maleLabel.setAttribute('class', 'sex_check')
        femaleLabel.setAttribute('class', 'sex_check-checked')
    }
}

maleCheckbox.addEventListener('change', handleCheckboxClick)
femaleCheckbox.addEventListener('change', handleCheckboxClick)

