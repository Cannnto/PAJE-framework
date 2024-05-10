class Projectile{
    constructor(x,y,owner,width,height,velocity,ownerW,ownerH){
        this.x = x;
        this.y = y;
        this.owner = owner;
        this.width = width;
        this.height = height;
        this.velocity = velocity;
        this.ownerW = ownerW;
        this.ownerH = ownerH;
    }
    draw(){
        context.fillStyle = 'white';
        context.fillRect(this.x+this.ownerW/2,this.y+this.ownerH/2,this.width,this.height)
    }
    update(){
        this.x+=this.velocity;
    }
}