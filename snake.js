const GAMEX = 10;
const GAMEY = 10;
const SQUARESIZE = 50;
const GAMEWIDTH = 10;
const GAMEHEIGHT = 10;

class Snake{
    constructor(){
        this.x = 5;
        this.y = 5;
        this.dir = "down";
        this.speed = 0.3;
    }

    draw(){
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'transparent';
        ctx.rect(GAMEX + this.x * SQUARESIZE,GAMEY + this.y * SQUARESIZE,SQUARESIZE,SQUARESIZE);
        ctx.fill();
        ctx.stroke();
    }

    move(){
        let new_x = this.x;
        let new_y = this.y;
        switch (this.dir){
            case 'left':
                new_x -= this.speed;
                break;
            case 'right':
                new_x += this.speed;
                break;
            case 'up':
                new_y -= this.speed;
                break;
            case 'down':
                new_y += this.speed;
                break;
        }
        if (this.tempCheckColision(new_x,new_y)){
            // TODO: allow it to move & change game state to gameover
            
        }
        else{
            this.x = new_x;
            this.y = new_y;
        }
    }

    tempCheckColision(){
        if (this.x <= 0 || this.x > GAMEX-2){
            return true;
        }
        if (this.y <= 0 || this.y > GAMEY-2){
            return true;
        }
        return false;
    }

    CheckColision(){
        if (this.x < 0 || this.x > GAMEX-1){
            return true;
        }
        if (this.y < 0 || this.y > GAMEY-1){
            return true;
        }
        return false;
    }
}




const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

snake = new Snake();


animate()
function background(){
    ctx.fillStyle = 'black'
    ctx.strokeStyle = 'black'
    ctx.rect(GAMEX,GAMEY,SQUARESIZE * GAMEWIDTH, SQUARESIZE * GAMEHEIGHT);
    ctx.fill();
}
function animate(){
    window.requestAnimationFrame(animate);
    background();
    snake.move();
    snake.draw();
}
