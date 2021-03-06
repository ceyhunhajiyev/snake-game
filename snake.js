const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// create the unit

const box = 32;

// load images

const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

// load audio



// create snake

let snake = [];

snake[0] = {
    x : 9 * box,
    y : 10 * box
};

// create the food

let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}

// creat the score var

let score = 0;

// control the snake

let d;

document.addEventListener("keydown", direction);

function direction(event){
    let key = event.keyCode;
    if(key == 37 && d != "RIGHT") {
        left.play();
        d = "LEFT";
    }else if(key == 38 && d != "DOWN") {
        d ="UP";
        up.play();
    }else if(key == 40 && d != "LEFT") {
        d = "RIGHT"
        right.play();
    }else if(key == 40 && d != "UP") {
        d = "DOWN"
        down.play();
    }
}

//collision function

function collision(head,array) {
    for(let i = 0; i < array.length; i++) {
        if(head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    
    return false;
}


// draw all in canvas

function draw(){
    
    ctx.drawImage(ground,0,0);
    
    for(let i = 0; i < snake.length ; i++) {
        ctx.fillStyle = ( i == 0)? "green" : "white";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    
    ctx.drawImage(foodImg, food.x, food.y);
    
    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    // which direction
    if(d == "LEFT") snake -= box;
    if(d == "UP") snake -= box;
    if(d == "RIGHT") snake += box;
    if(d == "DOWN") snake += box;
    
    //if the snake eats the food
    if(snakeX == food.x && snakeY == food.y) {
        score++;
        eat.play();
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+1) * box
        }
        
        // we don't remove the tail
    } else{
        //remove the tail
        snake.pop();
    }
    
    // add new head
    
    let newHead = {
        x : snakeX,
        y : snakeY
    }
    
    
    // game over
    
    if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)) {
        clearInterval(game);
        dead.play();
    }
    
    snake.unshift(newHead);
    
    ctx.fillStyle = "white";
    ctx.font = "45px Change one";
    ctx.fillText(score,2*box,1.6*box);
}

// call draw function every 100 ms

let game = setInterval(draw,100);

















