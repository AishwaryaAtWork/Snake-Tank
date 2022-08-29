//Game constants aand variables
let inputDir={x:0, y:0};
let btn=document.getElementById('btn');
let incBtn=document.getElementById('incBtn');
let decBtn=document.getElementById('decBtn');
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
bgMusic.play();
const main=(ctime)=>{
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
}

const isCollide=(snake)=>{
    //If snake bump into itself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
            gameOverSound.play();
            return true;
        }
    }
    //If snake bump into wall
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
        gameOverSound.play();
        return true;
    }
}

const gameEngine=()=>{
    //Part 1: Updating snake array and food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        bgMusic.pause();
        inputDir={x:0, y:0};
        document.getElementById('confirm').style.display='block';
        btn.addEventListener('click',(e)=>{
            document.getElementById('confirm').style.display='none';
            bgMusic.play();
            scoreBox.innerHTML='SCORE : 0';
            return true;
        })
        snakeArr=[{ x:13, y:15}];
        score=0;
    }

    // If you have eaten the food, increment the score and regenerate the food
    if (snakeArr[0].y===food.y && snakeArr[0].x===food.x) {
        eatSound.play();
        score+=1;
        if(score>highScoreVal){
            highScoreVal=score;
            localStorage.setItem('highScore',JSON.stringify(highScoreVal));
            highScoreBox.innerHTML='HIGH SCORE : '+highScoreVal;
        }
        scoreBox.innerHTML='SCORE : '+score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a=2;
        let b=16;
        food={x: Math.round(a+ (b-a)* Math.random()), y: Math.round(a+ (b-a)* Math.random())};
    } 

    // Moving the snake
    for(let i=snakeArr.length-2;i>=0;i--){
        snakeArr[i+1]={...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

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
let highScore=localStorage.getItem('highScore ');
if(highScore===null){
    highScoreVal=0;
    localStorage.setItem('highScore',JSON.stringify(highScoreVal));
}
else{
    highScoreVal=JSON.parse(highScore);
    highScoreBox.innerHTML='HIGH SCORE : '+highScore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    bgMusic.play();
    changeDirSound.play();
    inputDir={x:0, y:1}; //Start the game
    switch(e.key){
        case "ArrowUp":
            inputDir.x=0;
            inputDir.y=-1;
            break;
        case "ArrowDown":
            inputDir.x=0;
            inputDir.y=1;
            break;
        case "ArrowLeft":
            inputDir.x=-1;
            inputDir.y=0;
            break;
        case "ArrowRight":
            inputDir.x=1;
            inputDir.y=0;
            break;
    }
});

//Speed functions
incBtn.addEventListener('click',()=>{
    if(speed>=1 && speed<=9){
        speed+=1; // increases the speed
    }
    else{
        speed=1; // default speed
    }
});
decBtn.addEventListener('click',()=>{
    if(speed>=2 && speed<=9){
        speed-=1; // decreases the speed
    }
    else{
        speed=9; // default speed
    }
});