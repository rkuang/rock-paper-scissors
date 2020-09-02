function computerPlay() {
    let rng = Math.random() * 3;
    if (rng < 1) return "Rock";
    else if (rng < 2) return "Paper";
    else return "Scissors";
}

function playRound(playerSelection, computerSelection) {
    let result = "";
    if ((playerSelection.toLowerCase() === "rock" && computerSelection === "Rock") ||
            (playerSelection.toLowerCase() === "paper" && computerSelection === "Paper") ||
            (playerSelection.toLowerCase() === "scissors" && computerSelection === "Scissors") ) {
        result = "Draw";
    } else if ((playerSelection.toLowerCase() === "rock" && computerSelection === "Scissors") ||
            (playerSelection.toLowerCase() === "paper" && computerSelection === "Rock") ||
            (playerSelection.toLowerCase() === "scissors" && computerSelection === "Paper") ) {
        result = "Win";
        winner = toTitleCase(playerSelection);
        loser = computerSelection;
    } else {
        result = "Lose";
        winner = computerSelection;
        loser = toTitleCase(playerSelection);
    }
    return result+"!";
}

function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

function game() {
    let input = "";
    for (let i=0; i<5; i++) {
        input = prompt("What's your move?");
        if (input.toLowerCase() !== "rock" && input.toLowerCase() !== "paper" && input.toLowerCase() !== "scissors") {
            alert("Invalid input. You must choose 'rock', 'paper', or 'scissors'. Try again.");
            i--;
            continue;
        }
        console.log(playRound(input, computerPlay()));
    }
}

function selectMove() {
    console.log(reset);
    if (!reset) return;
    reset = false;
    let playerSelection = this.id;
    this.classList.add('selected');
    computerSelection = computerPlay();
    computerMove.setAttribute('src', `images/${computerSelection}.png`)
    moves.forEach(move => {
        if (move.id !== playerSelection) move.classList.add('hidden');
    })
    resultDiv.textContent = playRound(playerSelection, computerSelection);
}

function onOpacityZero(e) {
    if (e.propertyName != 'opacity') return;
    this.classList.add('display-none');
    computerMove.classList.add('show');
    resultDiv.classList.add('show');
    computerMove.classList.remove('display-none');
    resultDiv.classList.remove('display-none');
    resetButton.parentElement.classList.remove('display-none');
}

const moves = document.querySelectorAll('.player-move');
moves.forEach(move => move.addEventListener('click', selectMove))
moves.forEach(move => move.addEventListener('transitionend', onOpacityZero))

const computerMove = document.querySelector('#computer-move');
let computerSelection = null;

const resultDiv = document.querySelector('.result');

let reset = true;
const resetButton = document.querySelector('#reset-btn');
resetButton.addEventListener('click', () => {
    reset = true;
    moves.forEach(move => move.classList.remove('hidden', 'display-none', 'selected'));
    computerMove.classList.remove('show');
    resultDiv.classList.remove('show');
    computerMove.classList.add('display-none');
    resultDiv.classList.add('display-none');
    resetButton.parentElement.classList.add('display-none');
})

