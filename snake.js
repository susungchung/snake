const GAMEX = 10;
const GAMEY = 10;
const SQUARESIZE = 50;
const GAMEWIDTH = 10;
const GAMEHEIGHT = 10;

class Snake{
    constructor(){
        this.x = 3;
        this.y = 5;
        this.dir = "right";
        this.speed = 1;
        this.length = 4;
        this.turnPoints = [];
        this.turnLogged = false;
        this.body = []
    }

    draw(){
        ctx.beginPath();
        ctx.fillStyle = 'white';

        for (const block of this.body){
            ctx.rect(GAMEX + block.x * SQUARESIZE,GAMEY + block.y * SQUARESIZE,SQUARESIZE,SQUARESIZE);
            ctx.fill();
            ctx.stroke();
        }
    }

    reverseDir(dir){
        switch (dir){
            case 'left':
                return 'right';
                break;
            case 'right':
                return 'left';
                break;
            case 'up':
                return 'down';
                break;
            case 'down':
                return 'up';
                break;
                    
        }
    }
    updateCordinate(x,y,dir,delta){
        switch (dir){
            case 'left':
                x -= delta;
                break;
            case 'right':
                x += delta;
                break;
            case 'up':
                y -= delta;
                break;
            case 'down':
                y += delta;
                break;
        }
        return {x,y}
    }

    move(){
        let new_cord = this.updateCordinate(this.x,this.y,this.dir,this.speed);
        this.x = new_cord.x;
        this.y = new_cord.y;
    }

    CheckCollision(){
        if (this.x < 0 || this.x > GAMEX-1){
            return true;
        }
        if (this.y < 0 || this.y > GAMEY-1){
            return true;
        }

        // fill in this.body as part of collision detection, and use it later to draw body
        let cur_x = this.x;
        let cur_y = this.y;
        let cur_dir = this.reverseDir(this.dir);
        let tp_index = 0;
        this.body = [];
        for (var i = 0;i<this.length;i++){
            this.body.unshift({x:cur_x, y:cur_y});
            let new_cord = this.updateCordinate(cur_x,cur_y,cur_dir,1);
            cur_x = new_cord.x;
            cur_y = new_cord.y;

            if (cur_x == this.x && cur_y == this.y){
                return true;
            }

            if (tp_index < this.turnPoints.length && cur_x == this.turnPoints[tp_index].x && cur_y == this.turnPoints[tp_index].y){
                cur_dir = this.reverseDir(this.turnPoints[tp_index].dir);
                tp_index += 1;
            }
        }
        while(tp_index < this.turnPoints.length){
            this.turnPoints.pop();
        }

        return false;

    }

    logTurn(key){
        if (!this.turnLogged){
            if (this.dir != key && this.dir != this.reverseDir(key)){
                this.turnPoints.unshift( {x : this.x, y : this.y, dir : this.dir} );
                this.dir = key;
                this.turnLogged = true;
            }
        }
    }

    resetTurnLogged(){
        this.turnLogged = false;
    }

    getCord(){
        return {x:this.x,y:this.y};
    }

    getBody(){
        return this.body;
    }

    increaseLength(){
        this.length+=1;
    }
}




const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

player = new Snake();
a = new Apple();


function background(){
    ctx.fillStyle = 'black'
    ctx.strokeStyle = 'black'
    ctx.rect(GAMEX,GAMEY,SQUARESIZE * GAMEWIDTH, SQUARESIZE * (GAMEHEIGHT));
    ctx.fill();
    ctx.stroke();
}


let start, previousTimeStamp;
var gameOver = false;
var ate = false;

function moveAndDraw(){
    player.resetTurnLogged();
    player.move();
    let collision = player.CheckCollision();
    if (!collision){
        background();
        player.draw();

        if (ate = a.checkEaten(player.getCord(),player.getBody())){
            player.increaseLength();
        }
        console.log(ate);
        a.draw();
    }
    return collision
}

function animate(){
    timestamp = Date.now()
    
    if (previousTimeStamp == undefined){
        previousTimeStamp = timestamp;
        gameOver = moveAndDraw();
    }
    const elapsed = timestamp - previousTimeStamp;

    if (elapsed > 200) { 
        previousTimeStamp = timestamp
        gameOver = moveAndDraw();
    }
    if (!gameOver){
        window.requestAnimationFrame(animate);
    }
}
animate()

window.addEventListener('keydown', (e) => {
    switch(e.key){
        case 'ArrowRight':
            player.logTurn ('right');
            break;
        case 'ArrowLeft':
            player.logTurn('left');
            break;
        case 'ArrowUp':
            player.logTurn('up');
            break;
        case 'ArrowDown':
            player.logTurn('down');
            break;
    };
});
