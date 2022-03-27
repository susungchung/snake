class Apple{
    constructor(){
        this.x = 8;
        this.y = 5;
    }
    draw(){
        console.log(this.x,this.y)
        ctx.beginPath();
        ctx.fillStyle = 'red'
        ctx.rect(GAMEX+this.x*SQUARESIZE,GAMEY+this.y*SQUARESIZE,SQUARESIZE,SQUARESIZE)
        ctx.fill()
    }
    
    appearNew(p_body){
        let new_x,new_y;
        let valid = false;
        while (!valid){
            valid = true;
            new_x = Math.floor(Math.random() * GAMEWIDTH);
            new_y = Math.floor(Math.random() * GAMEHEIGHT);
            for (const block of p_body){
                if (block.x == new_x && block.y == new_y){
                    valid = false;
                    break;
                }
            }
        }
        this.x = new_x;
        this.y = new_y;
    }

    checkEaten(p_cord,p_body){
        let p_x = p_cord.x;
        let p_y = p_cord.y;
        if (this.x == p_x && this.y == p_y){
            this.appearNew(p_body);
            return true;
        }
        else{
            return false;
        }
    }
}