console.log('game on');
//Game constants aand variables
let inputDir={x:0, y:0};
const eatSound=new Audio('src/eatSound.wav');
const gameOverSound=new Audio('src/gameOver.wav');
const changeDirSound=new Audio('src/changeDir.wav');
const bgMusic=new Audio('src/bgMusic.mp3');
let speed=2;
let lastPaintTime=0;
let snakeArr=[
    { x:13, y:15}
];
let food={x:6, y:7};
let score=0;

//Game functions
const main=(ctime)=>{
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000 < (1/speed)){
        return;
    }
    lastPPaintTime=ctime;
    gameEngine();
}

const isCollide=(sarr)=>{
    return false;
}

const gameEngine=()=>{
    //Part 1: Updating snake array and food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        bgMusic.pause();
        inputDir={x:0, y:0};
        alert('Game Over! Press any key to play again.');
        snakeArr=[{ x:13, y:15}];
        bgMusic.play();
        score=0;
    }

    //Part 2: Display snake
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index===0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    //Part 3: Display food 
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}



//Main logic start here
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir={x:0, y:1}; //Start the game
    changeDirSound.play();
    switch(e.key){
        case "ArrowUp":
            console.log('Up');
            inputDir.x=0;
            inputDir.y=-1;
            break;
        case "ArrowDown":
            console.log('down');
            inputDir.x=0;
            inputDir.y=1;
            break;
        case "ArrowLeft":
            console.log('left');
            inputDir.x=-1;
            inputDir.y=0;
            break;
        case "ArrowRight":
            console.log('right');
            inputDir.x=1;
            inputDir.y=0;
            break;
    }
});