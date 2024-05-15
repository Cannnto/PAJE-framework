class Paralax extends Obstacle{
    constructor(x,velocity,size){
        var size = (1)+Math.random()*(5*size);
		super(x, Math.random()*canvas.height, size, size,'square');
        this.velocity = velocity
    }
    update(){
        for(var i = 0; i<this.hitbox.points.length; i++) this.hitbox.points[i].translate(-this.velocity,0);
    }
}