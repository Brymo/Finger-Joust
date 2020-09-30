const N_QUESTIONS = 10

const players = {
  playerA: {
    goal: document.getElementById('ga'),
    text: document.getElementById('P1'),
    score: 0
  },
  playerB: {
    goal: document.getElementById('gb'),
    text: document.getElementById('P2'),
    score: 0
  }
}

const startButton = document.getElementById('init')

let finished = true

const Sounds = new class {
  constructor () {
    this._dingA = []
    this._dingB = []

    this._dingACounter = 0
    this._dingBCounter = 0

    for (var i = 0; i < 10; i++) {
      this._dingA.push(new Audio('./bellA.wav'))
      this._dingB.push(new Audio('./bellB.wav'))
    }
  }

  playA () {
    this._dingA[this._dingACounter].play()
    this._dingACounter = (this._dingACounter + 1) % N_QUESTIONS
  }

  playB () {
    this._dingB[this._dingBCounter].play()
    this._dingBCounter = (this._dingBCounter + 1) % N_QUESTIONS
  }
}()

document.body.addEventListener('keyup', evt => {
  const key = event.key.toLowerCase() || event.keyCode
  if (key == ' ' && finished) {
    startButton.click()
  }
})

function resetGame () {
  finished = false
  for (player of Object.values(players)) {
    player.goal.style.width = '0%'
    player.text.innerText = ''
    player.score = 0
  }
}

startButton.addEventListener('click', () => {
  if (!finished) return
  startButton.style.visibility = 'visible'

  startButton.innerHTML = 3

  let count = 3
  const countdown = setInterval(() => {
    count--
    if (count === 0) {
      startButton.style.visibility = 'hidden'
      resetGame()

      randomiseCharacters()

      clearInterval(countdown)
    } else {
      startButton.innerHTML = count
    }
  }, 1000)
})

function randomiseCharacters () {
  let chars = Object.values(players).map(player => player.text.innerText)

  for (player of Object.values(players)) {
    let char = randomCharButNot(...chars)
    player.text.innerText = char
    chars.push(char)
  }
}

function createListener (playerID, noiseFn) {
  let goal = players[playerID].goal
  let elem = players[playerID].text

  return evt => {
    if (finished) return
    const key = event.key.toLowerCase() || event.keyCode

    if (key === elem.innerText) {
      noiseFn()

      players[playerID].score++
      goal.style.width = players[playerID].score * (100 / N_QUESTIONS) + '%'
      if (players[playerID].score == N_QUESTIONS) {
        elem.innerText = 'Winner'
        finished = true

        return
      }

      randomiseCharacters()
    }
  }
}

document.addEventListener(
  'keyup',
  createListener('playerA', Sounds.playA.bind(Sounds))
)
document.addEventListener(
  'keyup',
  createListener('playerB', Sounds.playB.bind(Sounds))
)

function randomCharButNot (...theseOnes) {
  let char = String.fromCharCode(97 + Math.floor(Math.random() * 26))
  return theseOnes.includes(char) ? randomCharButNot(...theseOnes) : char
}
