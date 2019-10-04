const playerA = document.getElementById("P1");
let targetA = randomChar();
playerA.innerHTML = targetA;
let scoreA = 0;

const playerB = document.getElementById("P2");
let targetB = randomChar();
playerB.innerHTML = targetB;
let scoreB = 0;

document.onkeypress = function (e) {
    const evnt = e || window.event;
    const key = event.key || event.keyCode;
    const goalbarA = document.getElementById("ga");
    const goalbarB = document.getElementById("gb");

    console.log(key+" "+targetA);

    if(key === targetA){
        scoreA++;
        targetA = randomChar();
        playerA.innerHTML = targetA;
        targetB = randomChar();
        playerB.innerHTML = targetB;
        goalbarA.style.width = scoreA * 10 + "%";
    }

    if(key === targetB){
        scoreB++;
        targetA = randomChar();
        playerA.innerHTML = targetA;
        targetB = randomChar();
        playerB.innerHTML = targetB;
        goalbarB.style.width = scoreB * 10 + "%";
    }

    if(scoreA == 10){
        setTimeout(() => {
            playerA.innerHTML = "Winner";
        }, 0);
    }

    if(scoreB == 10){
        setTimeout(() => {
            playerB.innerHTML = "Winner";
        }, 0);
    }
    
};

function randomChar(){

    const getRandomInt = (max)=>{
        return Math.floor(Math.random() * Math.floor(max));
    }

    return String.fromCharCode(97 + getRandomInt(25));

}



