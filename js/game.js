const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const spanTimer = document.querySelector('.timer');
const spanMoves = document.querySelector('.moves');
const restart = document.querySelector('.restart');

const characters = [
    'eevee',
    'espeon',
    'flareon',
    'glaceon',
    'jolteon',
    'leafeon',
    'sylveon',
    'umbreon',
    'vaporeon',
]


let firstCard = '', secondCard = '', moves = 0

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');
    console.log(disabledCards.length);
    if (disabledCards.length === 18) {
        clearInterval(this.loop)
        setTimeout(() => {
            swal.fire(
                `Parabéns ${spanPlayer.textContent}!`,
                ` Tempo: ${spanTimer.textContent} segundos. Total de jogadas: ${moves}.`
            )
        }, 1000)
    }
}

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if (firstCharacter === secondCharacter) {
        firstCard.firstChild.classList.add('disabled-card')
        secondCard.firstChild.classList.add('disabled-card')
        firstCard = ''
        secondCard = ''
        checkEndGame()
    } else {

        setTimeout(() => {
            firstCard.classList.remove('reveal-card')
            secondCard.classList.remove('reveal-card')
            firstCard = ''
            secondCard = ''
        }, 500)

    }
}

const revealCard = ({ target }) => {

    if (target.parentNode.className.includes('reveal-card')) return

    if (firstCard === '') {
        target.parentNode.classList.add('reveal-card')
        firstCard = target.parentNode
    } else if (secondCard === '') {
        target.parentNode.classList.add('reveal-card')
        secondCard = target.parentNode
        moves++
        spanMoves.textContent = moves
        checkCards()
    }
}

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

const createCard = (character) => {
    const card = createElement('div', 'card')
    const front = createElement('div', 'face front')
    const back = createElement('div', 'face back')

    front.style.backgroundImage = `url(../img/${character}.png)`

    card.appendChild(front)
    card.appendChild(back)

    card.addEventListener('click', revealCard)
    card.setAttribute('data-character', character)

    return card
}

loadGame = () => {

    const duplicateCharacters = [...characters, ...characters]

    const shuffledCharacters = duplicateCharacters.sort(() => Math.random() - 0.5)

    shuffledCharacters.forEach((character) => {
        const card = createCard(character)
        grid.appendChild(card)
    })
}

const startTimer = () => {
    this.loop = setInterval(() => {
        const currentTime = +spanTimer.innerHTML
        spanTimer.innerHTML = currentTime + 1
    }, 1000)
}

const restartGame = () => {
    window.location.reload()
}

restart.addEventListener('click', restartGame)

window.onload = () => {

    const playerName = localStorage.getItem('player')
    spanPlayer.textContent = playerName
    spanMoves.textContent = moves

    startTimer()
    loadGame()
}
