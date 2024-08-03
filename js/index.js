//Game Constants
let direction ={x:0,y:0};
const foodSound = new Audio("media/Food.wav");
const overSound = new Audio("media/Over.wav");
const moveSound = new Audio("media/Move.wav");
const bgSound = new Audio("media/BGmusic.wav");
let speed = 7;
let lastPaintTime =0 ;
let score = 0;
let snakeArr=[
    {x : 13, y :15}
];
let food = {x:6 , y:15};


//Game Functions

function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}
function isCollide(snake){
    //if you bump into yourself
    for (let i = 1; i < snake.length; i++){   
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        } 
    } 
    //if you bump into wall
    if(snake[0].x >=18 || snake[0].x <=0 || snake[0].y >=18 || snake[0].y <=0){
            return true;
    }  
    
    return false;
}

function gameEngine(){
    //Part 1 Updating the snake array
    if(isCollide(snakeArr)){
        overSound.play();
        bgSound.pause();
        direction ={x:0,y:0};
        // alert("Game Over ! Press any Key to Play AGAIN!");
        snakeArr= [{x : 13, y :15}];
        bgSound.play();
        score = 0;
    }

    // If you have eaten the food , incerement the score and regenrate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score +=1;
        if(speed>4){
            speed -= 0.1;
        }
        console.log(speed);
        scoreboard.innerHTML = "Score : " + score;
        snakeArr.unshift({x: snakeArr[0].x + direction.x , y: snakeArr[0].y + direction.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)*Math.random()), y: Math.round(a + (b-a)*Math.random())}
    }

    //Moving the Snake
    for (let i = snakeArr.length-2; i >= 0 ; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += direction.x;
    snakeArr[0].y += direction.y;
    
    //Part 2 Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index == 0){
            snakeElement.classList.add("head");
        }
        else{
            snakeElement.classList.add("snake");
        }
        board.appendChild(snakeElement);

    });

    //Part 3 Display Food

    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
}

// Main Logic
window.requestAnimationFrame(main);

window.addEventListener("keydown" , e=>{
    direction = {x:0 , y:0}; //start the game
    bgSound.play();
    bgSound.loop = true;
    moveSound.play();
    switch(e.key){
        case "ArrowUp" :
            direction.x = 0;
            direction.y = -1;
            break;

        case "ArrowDown" :
                direction.x = 0;
                direction.y = 1;
                break;

        case "ArrowRight" :
            direction.x = 1;
            direction.y = 0;
            break;

        case "ArrowLeft" :
            direction.x = -1;
            direction.y = 0;
            break;

        default:
            break;
    }
});