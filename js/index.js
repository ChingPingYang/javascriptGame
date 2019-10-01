const title = document.getElementById("gameTitle");
title.innerHTML = "HIDING FROM BALLS"

const canvas = document.getElementById("display");
const Gwidth = 1100;
const Gheight = 500;
canvas.width = Gwidth;
canvas.height = Gheight;
const c = canvas.getContext("2d");
let gameStart = false;
let gameCount = 0;

//Temp welcome page
c.fillStyle = "#e0dfdf";
c.fillRect(0, 0, Gwidth, Gheight);
c.fillStyle = "#161E2B"
c.font = "30px Times New Roman";
c.fillText("Press Space To Start", ((Gwidth/2 -120)), 240);

//Timer Global Var
let interval;
let ms = 0;
let s = 0;
let m = 0;

//Plyer Global Var
let player;
let playerX = 20; 
let playerY = 20;
let platerR = 13;
let color = "#82DC35";
let velocity = 0;
let speedLimit = 10;
let accelerator = 0.1;
let direction = null;
let keypressed = false;
let left = false;
let up = false;
let right = false;
let down = false;
//Circle Global Var
let minRadius = 10;
let maxRadius = 20;
let speedMin = 2;
let speedMax = 5;
let numOfBall = 2;
let colors = ["#08415C", "#6B818C", "#F1BF98"];

//Level
let addingBall = 0;
let lv1 = 5;
let lv2 = 10;
let lv3 = 15;
let lv4 = 20;
let kill = false;

//------------------------------------- Utility functions
function addBall(){
    let newRadius = getRandomNum(minRadius, maxRadius);
    let ranX = 1050
    let ranY = 450

    if (s == 5 && addingBall == 0) { 
        for(addingBall ; addingBall < lv1; addingBall++){
            circleArray.push(new Circle(ranX, ranY, newRadius, getRandomNum(speedMin, speedMax), getRandomNum(speedMin, speedMax)));
        }
        console.log(addingBall +"  <<<inside");
    } else if(s == 6) {
        addingBall = 0;
    } else if(s == 15 && addingBall == 0) {
        for(addingBall ; addingBall < lv2; addingBall++){
            circleArray.push(new Circle(ranX, ranY, newRadius, getRandomNum(speedMin, speedMax), getRandomNum(speedMin, speedMax)));
        }
    } else if(s == 16) {
        addingBall = 0;
    } else if(s == 25 && addingBall == 0) {
        for(addingBall ; addingBall < lv3; addingBall++){
            circleArray.push(new Circle(ranX, ranY, newRadius, getRandomNum(speedMin, speedMax), getRandomNum(speedMin, speedMax)));
        }
    } else if(s == 26) {
        addingBall = 0;
    } else if(s == 50 && addingBall == 0) {
        for(addingBall ; addingBall < lv4; addingBall++){
            circleArray.push(new Circle(ranX, ranY, newRadius, getRandomNum(speedMin, speedMax), getRandomNum(speedMin, speedMax)));
        }
    }
    
    if((s >= 10 && s < 15) || (s >= 30 && s < 35) || (s >= 50 && s < 55)) {
        kill = true;
        color = "#CC2936";
        document.getElementsByTagName("canvas")[0].style.border = "solid rgb(204, 41, 54) 10px";
    } else{
        kill = false;
        color = "#82DC35"
        document.getElementsByTagName("canvas")[0].style.border = "solid rgb(250, 227, 100) 10px";    }
        
}

function getRandomNum(min, max){
    return Math.random() * (max - min) + min;
}


//------------------------------------- Timer Class
class TimerClass {
    constructor(){
    }
    start(){
        if(!interval){
            interval = setInterval(this.run, 10);
        }
    }
    run(){
        document.getElementById("timer").innerHTML = `${(m < 10 ? "0" + m : m)} : ${(s < 10 ? "0" + s : s)} : ${(ms < 10 ? "0" + ms : ms)}`;
        ms++;
        if(ms == 100) {
            ms = 0;
            s++;
        }
        if(s == 60) {
            s = 0;
            m++;
        }
    }
    stop(){
        clearInterval(interval);
    }
}

//-------------------------------------Player Class
class SetPlayer {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }
    draw(){
        c.beginPath();
        c.arc(this.x, this.y, this.r, Math.PI * 2, false);
        c.fillStyle = color;
        c.fill();
    }
    update(){
        if(this.x + this.r >= Gwidth){
            right = false;
        } else if(this.x <= this.r){
            left = false;
        } else if(this.y + this.r >= Gheight){
            down = false;
        } else if(this.y <= this.r){
            up = false;
        }

        if(left === true){
            while(velocity > -speedLimit){
                velocity+= -accelerator;
                }
            playerX += velocity;
        }
        if(up === true){
            while(velocity > -speedLimit ){
                velocity+= -accelerator;
                }
            playerY += velocity;
        }
        if(right === true){
            while(velocity < speedLimit  ){
                velocity+= accelerator;
                }
            playerX += velocity;
        }
        if(down === true){
            while(velocity < speedLimit  ){
                velocity+= accelerator;
                }
            playerY += velocity;
        }
        
    }
}



//-------------------------------------Class for Circle
class Circle {
    constructor(x, y, r, speedX, speedY){
        this.x = x;
        this.y = y;
        this.r = r;
        this.speedX = speedX;
        this.speedY = speedY;
        this.color = colors[parseInt(getRandomNum(0,3))];
    }
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.r, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }
    
    update() {
        if (this.x + this.r > Gwidth || this.x < this.r) {
            this.speedX = -this.speedX;
        }
        if (this.y + this.r > Gheight || this.y < this.r) {
            this.speedY = -this.speedY;
        }
        this.x += this.speedX;
        this.y += this.speedY;
        this.draw();
    }
}

//------------------------------------- Circle Array
let circleArray = [];
for (let i = 0; i < numOfBall; i++){
    let newRadius = getRandomNum(minRadius, maxRadius);
    let ranX = getRandomNum(newRadius + playerX, (Gwidth - newRadius));
    let ranY = getRandomNum(newRadius + playerY, (Gheight - newRadius));
    circleArray[i] = new Circle(ranX, ranY, newRadius, getRandomNum(speedMin, speedMax), getRandomNum(speedMin, speedMax));
}


//------------------------------------- Function for checking collision
function collision() {
    this.mainX = player.x;
    this.mainY = player.y;
    this.mainR = player.r;
    
    for(let i = 0 ; i < circleArray.length; i++){
        let distanceX = (this.mainX - circleArray[i].x);
        let distanceY = (this.mainY - circleArray[i].y);
        let distanceR = (this.mainR + circleArray[i].r);
        if((distanceX * distanceX) + (distanceY * distanceY) <= (distanceR * distanceR)){
            console.log("boom");
            if(kill == false){
                gameStart = false;
            } else if(kill == true){
                circleArray.splice(i, 1);
            }
        }
    };
}

//------------------------------------- KeyListener

window.document.addEventListener("keydown", function(e){
    if (e.keyCode == 32 && gameStart == false){
        gameStart = true;
    }
    
    if(e.keyCode === 37){
        left = true;
    };
    if(e.keyCode === 38){
        up = true;
    };
    if(e.keyCode === 39) {
        right = true;
    };
    if(e.keyCode === 40) {
        down = true;
    };
});

document.addEventListener("keyup", function(e){
    if(e.keyCode === 37){
        left = false;
    };
    if(e.keyCode === 38){
        up = false;
    };
    if(e.keyCode === 39) {
        right = false;
    };
    if(e.keyCode === 40) {
        down = false;
    };
})



//------------------------------------- Game Loop
function update() {
    c.clearRect(0, 0, Gwidth, Gheight);
    c.fillStyle = "#161E2B";
    c.fillRect(0, 0, Gwidth, Gheight);

    timer = new TimerClass(); 
    timer.start();  

    player = new SetPlayer(playerX, playerY, platerR);
    player.update();
    player.draw();
        
    for (let i = 0; i < circleArray.length; i++){
        circleArray[i].update();
    }

    addBall()
    collision()

    if(gameStart == false) {
        timer.stop();
        return;
    }
    requestAnimationFrame(update);
}


//------------------------------------- Check game stage

function checkStart() {
    if(gameStart == true){
        update();  
        return;
    }
    requestAnimationFrame(checkStart);
    
}
checkStart();