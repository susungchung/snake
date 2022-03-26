const GAMEX = 10;
const GAMEY = 10;
const SQUARESIZE = 50;
const GAMEWIDTH = 10;
const GAMEHEIGHT = 10;

class Snake{
    constructor(){
        this.x = 5;
        this.y = 5;
        this.dir = "left";
        this.speed = 1;
        this.length = 8;
        this.turnPoints = [];
    }

    draw(){
        ctx.beginPath();
        ctx.fillStyle = 'white';
        //ctx.strokeStyle = 'transparent';
        let cur_x = this.x;
        let cur_y = this.y;
        let cur_dir = this.reverseDir(this.dir);
        let tp_index = 0;
        for (var i = 0;i<this.length;i++){
            ctx.rect(GAMEX + cur_x * SQUARESIZE,GAMEY + cur_y * SQUARESIZE,SQUARESIZE,SQUARESIZE);
            ctx.fill();
            let new_cord = this.updateCordinate(cur_x,cur_y,cur_dir,1);
            cur_x = new_cord.x;
            cur_y = new_cord.y;
            if (tp_index < this.turnPoints.length && cur_x == this.turnPoints[tp_index].x && cur_y == this.turnPoints[tp_index].y){
                console.log(this.turnPoints[tp_index]);
                cur_dir = this.reverseDir(this.turnPoints[tp_index].dir);
                tp_index += 1;
            }
        }
        while(tp_index < this.turnPoints.length){
            this.turnPoints.pop();
        }
        ctx.stroke();
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
        //console.log(this.dir,this.x,this.y);
        let new_x = this.x;
        let new_y = this.y;
        let new_cord = this.updateCordinate(new_x,new_y,this.dir,this.speed);
        new_x = new_cord.x;
        new_y = new_cord.y;

        // TODO: change it to proper collision detector
        if (this.tempCheckColision(new_x,new_y)){ 
            //TODO: even in case of collision allow it to move and change game state to gameover
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

    logTurn(key){
        if (this.dir != key && this.dir != this.reverseDir(key)){
            
            this.turnPoints.unshift( {x : this.x, y : this.y, dir : this.dir} )
            this.dir = key
        }
    }
}




const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

player = new Snake();



function background(){
    ctx.fillStyle = 'black'
    ctx.strokeStyle = 'black'
    ctx.rect(GAMEX,GAMEY,SQUARESIZE * GAMEWIDTH, SQUARESIZE * (GAMEHEIGHT));
    ctx.fill();
}


let start, previousTimeStamp;

function draw(){
    background();
    player.move();
    player.draw();
}

function animate(){
    timestamp = Date.now()
    

    if (previousTimeStamp == undefined){
        previousTimeStamp = timestamp;
        draw();
    }
    const elapsed = timestamp - previousTimeStamp;

    if (elapsed > 200) { 
        previousTimeStamp = timestamp
        draw();
    }
    window.requestAnimationFrame(animate);
    


}
animate()

window.addEventListener('keydown', (e) => {
    console.log(e);
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
