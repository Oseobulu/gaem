let playerText =document.getElementById('playerText');
let restartBtn=document.getElementById('restartBtn');
let boxes= Array.from(document.getElementByClassName('box'));

let winnerIndicator = getComputedstyle(document.body).getPropertyValue('--winning-blocks')

const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer =X_TEXT;
let space = Array(9).fill(null); 
let isGameOver = false; // Added flag to track game over state 

const startGame =() => {
    boxes.forEach(box => box.addEventListener('click',boxClicked));
}

function boxClicked(e){
    if (isGameOver) return; 
    const id = e.target.id;

    if(!spaces[id]){
        spaces[id] =currentPlayer;
        e.target.innerText =currentPlayer;

        if(playerHaswon() !==false){
            playerText ='${currentPlayer} has won!';
            let winning_blocks = playerHaswon();

            winning_blocks.map( box => boxes[box].style.backgroundColor=winnerIndicator);
            isGameOver=true;
            return;
        }

        currentPlayer=currentPlayer== X_TEXT ? O_TEXT : X_TEXT;
    }
}

const winningcombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]

function playerHaswon() {
    for (const condition of winningcombos){
        let [a,b,c]= condition;

        if(space[a] && (space[a] == space[b] && space[a] == space[c])){
            return[a,b,c];
        }   
    }
    return false;
}

restartBtn.addEventListener('click',restart);

function restart(){
    space.fill(null);

    boxes.forEach( box => {
        box.innerText ='';
        box.style.backgroundColor='';
    })

    playerText = 'Tic Tac Toe';

    currentPlayer = X_TEXT;
    isGameOver = false;
}

startGame();
wordle 