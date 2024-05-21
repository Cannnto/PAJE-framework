
class Player{
    constructor(){
        this.x = canvas.width/2-25
        this.y = canvas.height/2-25
        this.img = new Image
        this.img.src = 'imgs/player2.png'
        this.width = 50
        this.height = 50
        this.center = {x:0,y:0}
    }


    draw(){
        context.save();
        this.center.x = this.x+this.width/2
        this.center.y = this.y+this.height/2
            this.angle = Math.atan2(mouseY - this.center.y, mouseX - this.center.x) + (Math.PI/2);
            context.translate(this.center.x,this.center.y)
            context.rotate(this.angle);
            context.translate(-this.center.x,-this.center.y)
            // context.strokeStyle = 'white';
            // context.strokeRect(this.x,this.y,this.width,this.height);
            context.drawImage(this.img,this.x,this.y,this.width,this.height);
        context.restore();
    }

    translate(dx,dy){
        this.x += dx
        this.y += dy
    }
}
