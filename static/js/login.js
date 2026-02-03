const serializeForm = (formNode) => {
    return new FormData(formNode)
}

const handleFormSubmit  = (event) => {
    event.preventDefault()
    const data = serializeForm(event.target)
    const response = sendData(data)
    console.log(response)
}

const loginForm = document.getElementById('login_form')

loginForm.addEventListener('submit', handleFormSubmit)

const sendData = async (data) => {
    return await fetch('', {
        method: 'POST',
        body: data,
    })
}




