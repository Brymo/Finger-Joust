const playerA = document.getElementById('P1')
const playerB = document.getElementById('P2')
const goalbarA = document.getElementById('ga')
const goalbarB = document.getElementById('gb')
const startButton = document.getElementById('init')

const sounds = new class {
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
    this._dingACounter = (this._dingACounter + 1) % 10
  }

  playB () {
    this._dingB[this._dingBCounter].play()
    this._dingBCounter = (this._dingBCounter + 1) % 10
  }
}()

startButton.addEventListener('click', () => {
  startButton.innerHTML = 3

  let count = 3
  const countdown = setInterval(() => {
    count--
    if (count === 0) {
      startButton.style.visibility = 'hidden'
      clearInterval(countdown)
      document.addEventListener(
        'keyup',
        createListener(goalbarA, playerA, sounds.playA.bind(sounds))
      )
      document.addEventListener(
        'keyup',
        createListener(goalbarB, playerB, sounds.playB.bind(sounds))
      )
    } else {
      startButton.innerHTML = count
    }
  }, 1000)
})

let finished = false

function createListener (goal, elem, noiseFn) {
  let score = 0
  elem.innerText = randomCharButNot()

  return evt => {
    const key = event.key.toLowerCase() || event.keyCode

    if (key === elem.innerHTML && !finished) {
      noiseFn()

      score++
      goal.style.width = score * 10 + '%'
      if (score == 10) {
        elem.innerHTML = 'Winner'
        finished = true
        return
      }

      let oldKeys = [playerA.innerText, playerB.innerText]
      let key1 = randomCharButNot(...oldKeys)
      let key2 = randomCharButNot(...oldKeys, key1)
      playerA.innerText = key1
      playerB.innerText = key2
    }
  }
}

function randomCharButNot (...theseOnes) {
  let char = String.fromCharCode(97 + Math.floor(Math.random() * 26))
  return theseOnes.includes(char) ? randomCharButNot(...theseOnes) : char
}
