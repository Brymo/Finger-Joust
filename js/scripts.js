const playerA = document.getElementById("P1");
const playerL = document.getElementById("P2");
const goalbarA = document.getElementById("ga");
const goalbarL = document.getElementById("gl");
const displays = {a: playerA, l:playerL};
const listenerA = document.addEventListener('keyup', listener(goalbarA,"a","./bellA.wav"));
const listenerL = document.addEventListener('keyup', listener(goalbarL,"l","./bellL.wav"));

let finished = false;
function listener(goal,displayKey,noise){
    let score = 0;
    displays[displayKey].innerHTML = displayKey;

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
                const randomChar = randomCharButNot(usedChars);
                usedChars.push(randomChar);
                setTimeout(()=>{displays[key].innerHTML = randomChar},0);
            });
        }
    }
}

function randomCharButNot(theseOnes){
    const getRandomInt = (max)=>{
        return Math.floor(Math.random() * Math.floor(max));
    }
    
    let char = String.fromCharCode(97 + getRandomInt(25));
    while(theseOnes.includes(char)){
        char = String.fromCharCode(97 + getRandomInt(25));
    }

    return char;
}



