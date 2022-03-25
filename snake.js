class Snake{
    constructor(){
        this.x = 0
        this.y = 0
    }

}


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
ctx.rect(10,10,500,500);
ctx.fill();