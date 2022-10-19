const input = document.getElementById('player-name');
const button = document.getElementById('play');
const form = document.querySelector('.login-form')

const validateInput = (event) => {
    if (event.target.value.length >= 3) {
        button.removeAttribute('disabled')
    } else {
        button.setAttribute('disabled', '')
    }
}

const handleSubmit = (event) => {
    event.preventDefault()
    localStorage.setItem('player', input.value)
    localStorage.setItem('time', 1000)
    localStorage.setItem('moves', 1000)
    window.location = 'pages/game.html'
}

input.addEventListener('input', validateInput)
form.addEventListener('submit', handleSubmit)