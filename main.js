const btnAll = document.querySelectorAll('.btn');
const backGround = document.querySelector('body');
const buttonColors = ['red', 'blue','green', 'yellow'];
const title  = document.querySelector('h1');

let gamePattern = [];
let userPattern = [];
let isStartkeyPresses = false;
let round = 1;

/*
Function created to re-assign random value to variable randomNumber range 0 - 3
*/
function nextSequence() {
    userPattern = [];  // clean previues sequence

    let randomNumber = Math.floor(Math.random() * 4);
    let randomColor = buttonColors[randomNumber];
    gamePattern.push(randomColor);

    // Reproduce toda la secuencia acumulada
    let i = 0;
    let interval = setInterval(() => {
        let color = gamePattern[i];
        flash(color);
        playSound(color);
        i++;
        if (i >= gamePattern.length) {
            clearInterval(interval);
        }
    }, 800);
}

function flash(color) {
    const el = document.getElementById(color);
    el.classList.add("pressed");
    setTimeout(() => el.classList.remove("pressed"), 300);
}

function playSound(color) {
    let sound = new Audio(`sounds/${color}.mp3`);
    sound.play();
}

document.addEventListener('keydown', function(e){
    if(e.key.toLowerCase() === 'a') {
        e.preventDefault();
        if(!isStartkeyPresses) {
            isStartkeyPresses = true;

            nextSequence();
            changeTitle();
            pressedButton();
        }
    } else {
        title.classList.add("game-over");
        setTimeout(() => title.classList.remove("game-over"), 200);
    }
});

function wrongMove(){
    let wrongSound = new Audio('sounds/wrong.mp3');
    wrongSound.play();
    backGround.classList.add("game-over");
    setTimeout(() => backGround.classList.remove("game-over"), 200);
}

function pressedAnimation(color){
    let item = document.getElementById(color);
    item.classList.add("pressed");
    setTimeout(() => item.classList.remove("pressed"), 400);
}

function changeTitle(){
    title.innerText = `Round ${round}`;
    round++;
}

function pressedButton() {
    btnAll.forEach(button => {
        button.addEventListener("click", function () {
            let userClickChoice = button.getAttribute("id");
            userPattern.push(userClickChoice);

            console.log(userPattern);
            console.log("You clicked:", userClickChoice);

            let currentIndex = userPattern.length - 1;

            if (gamePattern[currentIndex] === userPattern[currentIndex]) {
                console.log("Correct!" + correctPoint());

                if (userPattern.length === gamePattern.length) {
                    console.log("Round completo, siguiente secuencia");
                    setTimeout(() => {
                        nextSequence();
                        changeTitle();
                    }, 1000);
                }
            } else {
                console.log("Error!");
                wrongMove();
            }
        });
    });
}

const correctPoint = () => {
    backGround.classList.add("green");
    setTimeout(() => backGround.classList.remove("green"), 100);
}
