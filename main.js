
const btnAll = document.querySelectorAll('.btn');
const backGround = document.querySelector('body');
const buttonColors = ['red', 'blue','green', 'yellow'];
const title  = document.querySelector('h1');
let gamePattern = [];
let userPattern = [];



/*
Function created to re-assign random value to variable randomNumber range 0 - 3
 */
function nextSequence(){
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = randomNumber;
    gamePattern.push(randomChosenColour);
}



function selectedElement(randomChosenColour){
    return document.getElementById(buttonColors[randomChosenColour]);
}

let isStartkeyPresses = false;


document.addEventListener('keydown', function(e){
    if(e.key.toLowerCase() === 'a') {
        e.preventDefault();
        if(!isStartkeyPresses) {
            isStartkeyPresses = true;

            nextSequence();

            playStartGameSound();

            changeTitle();




            let correctChoice = true;

            // while(correctChoice){
            //     let score = 0;
            // }

            pressedAnimation();
            console.log(selectedElement(gamePattern[0]).attributes[1].nodeValue);
            btnAll.forEach(button => button.addEventListener("click",function(){
                let userClickChoice= button.getAttribute("id");
                if(userClickChoice === selectedElement(gamePattern[0]).getAttribute('id')){
                    console.log("Correct answer clicked");
                    correctPoint();
                }
                else{
                    wrongMove();

                }
            }));
        }

    }
    else{

        title.classList.add("game-over");
        let timeout = setTimeout(function (){
            title.classList.remove("game-over");
        },200)
        console.log(isStartkeyPresses);
    }

});



function playStartGameSound() {
    let sound = new Audio(`sounds/${selectedElement(gamePattern[0]).getAttribute('id')}.mp3`);
    sound.play();
}

function wrongMove(){
    let wrongSound = new Audio('/sounds/wrong.mp3');
    wrongSound.play();
    backGround.classList.add("game-over");
    setTimeout(function (){
        backGround.classList.remove("game-over");
    }, 200);
}

const correctPoint = ()=>{
    backGround.classList.add("green");
    setTimeout(function (){
        backGround.classList.remove("green");
    },100)
}



const pressedAnimation = ()=>{
    let item = selectedElement(gamePattern[0]);
    item.classList.add("pressed");
    setTimeout(function (){
        item.classList.remove("pressed");
    },400)
}
function changeTitle(){
    title.innerText = "Round 1";
}

