const play = document.getElementById("play");
const start = document.getElementById("start");
const again = document.getElementById("again");
const home = document.getElementById("home");

const startPage = document.getElementById("startPage");
const instructionPage = document.getElementById("instructionPage");
const gamePage = document.getElementById("gamePage");
const popUp = document.getElementById("popUp");
const finalPage = document.getElementById("finalPage");

const clickSound = document.getElementById("click")
const clap = document.getElementById("clap")
const completed = document.getElementById("correct")
const wrong = document.getElementById("wrong")
const lose = document.getElementById("lose")

const scoreCount = document.getElementById("score-count")
const questionCount = document.getElementById("question-count")
const change = document.getElementById("change")
const mark = document.getElementById("mark")
const checkAnswer = document.getElementById("checkAnswer")
const showAnswer = document.getElementById("showAnswer")
const correctAnswer = document.getElementById("correctAnswer")
const medal = document.getElementById("medal")
const words1 = document.getElementById("words1")
const words2 = document.getElementById("words2")
const scoreText = document.getElementById("scoreText")

//use this for selection page
const levelButtons = document.querySelectorAll(".levelButton");
const selectionPage = document.getElementById("selectionPage");

//here for selection page
let levelIndex;

let buttonSize;

//here for level buttons condition
const levels = [
    {background:"transparent", font:"black", numberOfRandom: 0},
    {background:"random", font:"white", numberOfRandom: 1},
    {background:"random", font:"random", numberOfRandom: 2}
]

let colors = [{name:"Blue", color:"#2F3F90"},
              {name:"Red", color:"#FC3800"},
              {name:"Green", color:"#03A343"},
              {name:"Yellow", color:"#FBCE59"},
              {name:"Pink", color:"#FF6DD6"},
              {name:"Grey", color:"#ADADAD"},
              {name:"Black", color:"#27030A"},
              {name:"Orange", color:"#FFAA26"}]

let current;
let total = 5;
let score;

let tempoArray = []

let answer = {answer:"", color: ""}

//here is answerBtn user can select
const answerBtn = document.querySelectorAll(".answerBtn");

//here is finalV2
const group1 = document.querySelector(".group1");

play.addEventListener("click", () => {
    playClickSound()
    setTimeout(() => {
        startPage.classList.add("hide")
        
        //use this for selection page
        selectionPage.classList.remove("hide")
        
        //else
        //instructionPage.classList.remove("hide")
    }, 200);
})

start.addEventListener("click", () => {
    playClickSound()
    setTimeout(() => {
        instructionPage.classList.add("hide")
        gamePage.classList.remove("hide")
        ready()
        Question()
    }, 200);
})

levelButtons.forEach(function(level){
    level.addEventListener('click', () => {
        playClickSound()
        setTimeout(() => {
            levelIndex = level.getAttribute("data-level") - 1
            selectionPage.classList.add("hide")
            instructionPage.classList.remove("hide")
        }, 200);
    })    
})

answerBtn.forEach(function(button){
    button.addEventListener('click', () => {
        playClickSound()
        console.log(answer.image, answer.answer)

        let data  = button.getAttribute("data")

        popUp.classList.remove("hide")
        
        //set anser width,height and color
        correctAnswer.style.backgroundColor = answer.color
        correctAnswer.style.height = buttonSize + "px"
        correctAnswer.style.width = buttonSize + "px"

        if(data == answer.answer){
            mark.src = "./img/correct.png"
            checkAnswer.textContent = "Correct!"
            showAnswer.classList.add("hide")
            score +=1
            scoreCount.textContent = score;
        }
        else{
            mark.src = "./img/wrong.png"
            checkAnswer.textContent = "Good try!"
            showAnswer.classList.remove("hide")
        }
        
        setTimeout(function(){
            popUp.classList.add("hide");
            if(current == total){
                gamePage.classList.add("hide")
                endGame()
            }
            else{
                Question()
            }
        }, 2000)
    })    
})

again.addEventListener("click", () => {
  playClickSound()
  //controls amd buttons visibility
  let delay = setTimeout(() => {
    startPage.classList.remove("hide");
    finalPage.classList.add("hide")
  }, 200);
});

home.addEventListener("click", () => {
  playClickSound()
  let delay = setTimeout(() => {
    location.assign('https://gimme.sg/activations/minigames/main.html');
  }, 200);
})


function ready(){
    //code here to get UI ready 
    //like number of point to zero and others
    current = 0;
    questionCount.textContent = current + "/" + total

    score = 0;
    scoreCount.textContent = score

    resetArray()
}

function resetArray(){
    tempoArray = []

    for(let i = 0; i < colors.length; i++){
        tempoArray.push(colors[i])
    }
}

function Question(){
    //game that starts the game like showing question and stuff
    console.log("Catch " + levels[levelIndex].winCondition + " flowers and they drop at " + levels[levelIndex].dropSpeed + " speed")
    current +=1;
    questionCount.textContent = current + "/" + total;
    let bcolor = {name: "", color:""}
    let tcolor = {name: "", color:""}

    bcolor.color = levels[levelIndex].background
    tcolor.color = levels[levelIndex].font

    console.log(bcolor,tcolor)
    //check if got enough colors
    if(tempoArray.length < 3){
        resetArray();
    }

    //change text
    correctColor = Math.floor(Math.random() * tempoArray.length)
    answer.answer = tempoArray[correctColor].name
    answer.color = tempoArray[correctColor].color
    tempoArray.splice(correctColor,1)

    change.textContent = answer.answer

    //number of color change in the question
    let rColorShow = levels[levelIndex].numberOfRandom

    //change color of text and background
    if(bcolor.color == "random"){
        let random = Math.floor(Math.random() * tempoArray.length)
        bcolor.color = tempoArray[random].color
        bcolor.name = tempoArray[random].name
        tempoArray.splice(random,1)
    }

    change.style.backgroundColor = bcolor.color


    if(tcolor.color == "random"){
        let random = Math.floor(Math.random() * tempoArray.length)
        tcolor.color = tempoArray[random].color
        tcolor.name = tempoArray[random].name
        tempoArray.splice(random,1)
    }
    console.log(tcolor)
    change.style.color = tcolor.color

    //set answers
    let buttonType = ["correct", "wrong"]
    answerBtn.forEach(function(button){
        let buttonTypeIndex = Math.floor(Math.random() * buttonType.length)
        
        let currentType = buttonType[buttonTypeIndex]

        let buttonColor;
        let colorName;
        
        if(currentType == "correct"){
            buttonColor = answer.color 
            colorName = answer.answer
        }
        else{
            if(rColorShow == 2){
                color = Math.random() > 0.5 ? bcolor:tcolor
                buttonColor = color.color 
                colorName = color.name
            }
            else if(rColorShow == 1){
                buttonColor = bcolor.color;
                colorName = bcolor.name;
            }
            else{
                let random = Math.floor(Math.random() * tempoArray.length)

                buttonColor = tempoArray[random].color
                colorName = tempoArray[random].name
                tempoArray.splice(random,1)
            }
            console.log("W", buttonColor)
        }

        button.style.backgroundColor = buttonColor
        button.setAttribute("data", colorName)
        buttonType.splice(buttonTypeIndex,1)

        //get and set button height depending on width
        let buttonDetails = button.getBoundingClientRect();
        buttonSize = buttonDetails.width
        button.style.height = buttonSize + "px"

    })

    console.log(tempoArray)

}

function playClickSound(){
    console.log(clickSound)
    clickSound.currentTime = 0
    clickSound.play()
}

function endGame(){
    finalPage.classList.remove("hide")

    let pass = total / 2

    //this is for first version
    /*if(score < pass){
        medal.classList.add("hidden")
        scoreText.textContent = "You tried!"
        words1.innerHTML = "Good try!"
        words2.textContent = "do better next time"
    }
    else{
        medal.classList.remove("hidden")
        scoreText.textContent = "Good job!"
        words1.innerHTML = `You got <br> ${score} right!`
        words2.textContent = ""
        setTimeout(function(){
            confetti.start()
            setTimeout(function(){
                confetti.stop()
            }, 2000)
        }, 500)
    }*/

    //this is for second version
    let starScore = total / 5;
    //change the star image according the score;
    if(score < pass){
        lose.currentTime = 0
        lose.play()
        if(score == starScore + starScore)
                medal.src = "./img/youTried.png"
            else if(score < starScore + starScore && score >= starScore) // score < 2 && score >= 1
                medal.src = "./img/youTried1.png"
            else
                medal.src = "./img/youTried2.png"
    
        group1.classList.add("group1V2")
        scoreText.textContent = "Good try!"
        scoreText.classList.add("scoreTextV2")
        words1.classList.add("words1V2")
        words2.classList.add("words2V2")
        words1.innerHTML = "Your score"
        words2.textContent = "0/5"
    }
    else{
        clap.currentTime = 0
        clap.play()
        if(score == total) // score = 5
            medal.src = "./img/excellent.png"
        else if(score < total && score >= total - starScore) // score < 5 && score >= 4
            medal.src = "./img/wellDone.png"
        else if(score < total - starScore && score >= (total - starScore - starScore)) // score < 4 && score >= 3
            medal.src = "./img/wellDone1.png"
    
        group1.classList.add("group1V2")
        words1.classList.add("words1V2")
        words2.classList.add("words2V2")
    
        scoreText.classList.add("scoreTextV2")
    
        if(score == total){
            scoreText.textContent = "Superstar!"
        }
        else{
            scoreText.textContent = "Good try!"
        }
    
        setTimeout(function(){
            confetti.start()
            setTimeout(function(){
                confetti.stop()
            }, 2000)
        }, 500)
    }
    words1.innerHTML = "Your score"
        words2.textContent = score + "/" + total
}

/*prevent double tag zoom*/
document.addEventListener('dblclick', function(event) {
    event.preventDefault();
    }, { passive: false });