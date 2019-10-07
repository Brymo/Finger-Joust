const playerA = document.getElementById("P1");
const playerB = document.getElementById("P2");
const goalbarA = document.getElementById("ga");
const goalbarB = document.getElementById("gb");
const displays = {a: playerA, b:playerB};
const startButton = document.getElementById("init");

startButton.addEventListener("click",()=>{
    startButton.innerHTML = 3;

    let count = 3;
    const countdown = setInterval(()=>{
        count--;
        if(count === 0){
            startButton.style.visibility = "hidden";
            clearInterval(countdown);
            document.addEventListener('keyup', listener(goalbarA,"a","./bellA.wav"));
            document.addEventListener('keyup', listener(goalbarB,"b","./bellB.wav"));
        }else{
            startButton.innerHTML = count;
        }
    },1000);

});

let finished = false;
function listener(goal,displayKey,noise){
    let score = 0;
    displays[displayKey].innerHTML = randomCharButNot()

    return ()=>{
        const key = event.key || event.keyCode;
        
        if(key === displays[displayKey].innerHTML  && !finished){
            new Audio(noise).play();

            score++;
            goal.style.width = score * 10 + "%";
            if(score == 10){
                displays[displayKey].innerHTML = "Winner";
                finished = true;
                return;
            }
            
            const usedChars = [];
            Object.keys(displays).forEach((key)=>{
                const randomChar = randomCharButNot(...usedChars);
                usedChars.push(randomChar);
                setTimeout(()=>{displays[key].innerHTML = randomChar},0);
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



