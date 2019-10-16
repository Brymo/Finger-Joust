const playerA = document.getElementById("P1");
const playerB = document.getElementById("P2");
const goalbarA = document.getElementById("ga");
const goalbarB = document.getElementById("gb");
const startButton = document.getElementById("init");

startButton.addEventListener("click",()=>{
    [playerA, playerB].forEach(player => player.usedChars = []);

    startButton.innerHTML = 3;

    let count = 3;
    const countdown = setInterval(()=>{
        count--;
        if(count === 0){
            startButton.style.visibility = "hidden";
            clearInterval(countdown);
            document.addEventListener('keyup', listener(goalbarA,playerA,"./bellA.wav"));
            document.addEventListener('keyup', listener(goalbarB,playerB,"./bellB.wav"));
        }else{
            startButton.innerHTML = count;
        }
    },1000);

});

let finished = false;
function listener(goal,elem,noise){
    let score = 0;
    elem.innerHTML = randomCharButNot()

    return (evt)=>{
        const key = event.key.toLowerCase() || event.keyCode;
        
        if(key === elem.innerHTML && !finished){
            new Audio(noise).play();

            score++;
            goal.style.width = score * 10 + "%";
            if(score == 10){
                elem.innerHTML = "Winner";
                finished = true;
                return;
            }
            
            [playerA, playerB].forEach(player => {
                let randomChar = randomCharButNot(...player.usedChars);
                player.usedChars.push(randomChar);
                player.innerHTML = randomChar;
            });
        }
    }
}

function randomCharButNot(...theseOnes){
    const getRandomInt = (max)=>{
        return Math.floor(Math.random() * Math.floor(max));
    }
    
    let char = String.fromCharCode(97 + getRandomInt(25));
    while(theseOnes.includes(char)){
        char = String.fromCharCode(97 + getRandomInt(25));
    }

    return char;
}



