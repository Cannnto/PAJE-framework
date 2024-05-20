class Player extends Obstacle{
    constructor(x,y,width,height,type,speed,sprite,gravity,objs)
    {
        super(x,y,width,height,type,sprite,gravity,objs);
        this.objs = objs || false
        this.speed = speed;
        this.projec = [];
    }

    moveAxis(dx,dy){   
        for(var i = 0; i<this.hitbox.points.length; i++)this.hitbox.points[i].translate(dx*this.speed,dy*this.speed);
    }

    jump(num){
        this.gravityAcel=0;
        this.gravityAcel+=-num;
        // console.log(this.gravityAcel)
    }

    fire(width,height,velocity){
        this.projec.push(new Projectile(this.hitbox.points[0].x,this.hitbox.points[0].y,this,width,height,velocity,this.width,this.height));
    }

    update()
    {   
        super.draw();
        if(this.objs!=false)super.collide();
        this.gravity();
        // this.hitbox.collide(player, square);

        for(let i=0;i<this.projec.length;i++){
            
            this.projec[i].draw();

            this.projec[i].update();

            if (this.projec[i].x+this.projec[i].width > canvas.width)
                {	this.projec.splice(i, 1);
                    i--;
                }
        }
    }
}
