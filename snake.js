const GAMEX = 10;
const GAMEY = 10;
const SQUARESIZE = 50;
const GAMEWIDTH = 10;
const GAMEHEIGHT = 10;

class Snake{
    constructor(){
        this.x = 0
        this.y = 0
    }

    draw(){
        ctx.beginPath();
        ctx.fillStyle = 'white'
        ctx.strokeStyle = 'transparent'
        ctx.rect(GAMEX + this.x * SQUARESIZE,GAMEY + this.y * SQUARESIZE,SQUARESIZE,SQUARESIZE)
        ctx.fill();
        ctx.stroke();
    }
}




const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'black'
ctx.strokeStyle = 'black'
ctx.rect(GAMEX,GAMEY,SQUARESIZE * GAMEWIDTH, SQUARESIZE * GAMEHEIGHT);
ctx.fill();

snake = new Snake();
snake.draw();