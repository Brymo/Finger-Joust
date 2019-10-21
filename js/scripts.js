const playerA = document.getElementById('P1')
const playerB = document.getElementById('P2')
const goalbarA = document.getElementById('ga')
const goalbarB = document.getElementById('gb')
const startButton = document.getElementById('init')

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
        listener(goalbarA, playerA, './bellA.wav')
      )
      document.addEventListener(
        'keyup',
        listener(goalbarB, playerB, './bellB.wav')
      )
    } else {
      startButton.innerHTML = count
    }
  }, 1000)
})

let finished = false
function listener (goal, elem, noise) {
  let score = 0
  elem.innerHTML = randomCharButNot()

  return evt => {
    const key = event.key.toLowerCase() || event.keyCode

    if (key === elem.innerHTML && !finished) {
      new Audio(noise).play()

      score++
      goal.style.width = score * 10 + '%'
      if (score == 10) {
        elem.innerHTML = 'Winner'
        finished = true
        return
      }

      let oldKeys = [playerA.innerText, playerB.innerText]
      let key1 = randomCharButNot(oldKeys)
      let key2 = randomCharButNot([...oldKeys, key1])
      playerA.innerText = key1
      playerB.innerText = key2
    }
  }
}

function randomCharButNot (...theseOnes) {
  let char = String.fromCharCode(97 + Math.floor(Math.random() * 26))
  return theseOnes.includes(char) ? randomCharButNot(...theseOnes) : char
}
