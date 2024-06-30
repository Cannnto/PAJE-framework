class Camera{
    constructor(){
        this.x = 0;
        this.y = 0;
        this.width = canvas.width;
        this.height = canvas.height;
        this.hitbox = new Poly(this.x,this.y,this.width,this.height,null,null,null,'cam');
        this.die = true;
    }
    update(){
        var magnitude = Math.sqrt((player.x+player.width/2 - (this.x+this.width/2))**2+(player.y+player.height/2 - (this.y+this.height/2))**2)/50;
        var areaAngle = Math.atan2((player.y+player.height/2 - (this.y+this.height/2)),(player.x+player.width/2 - (this.x+this.width/2))); 
        var areaVector = new Point(magnitude * Math.cos(areaAngle)*2,magnitude *Math.sin(areaAngle)*2);
        
        // ctx.beginPath();
        // ctx.moveTo(canvas.width/2,canvas.height/2);
        // ctx.lineTo(player.x+player.width/2-this.x, player.y+player.height/2-this.y);
        // ctx.stroke()

        if(this.die){
            this.x += areaVector.x;
            this.hitbox.translate(areaVector.x,0);
        }
        if((this.x < -1000 || this.x+this.width > canvas.width+1000)){
            this.x -= areaVector.x;
            this.hitbox.translate(-areaVector.x,0);
        }
    }
}