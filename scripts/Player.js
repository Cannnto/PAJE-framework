class Player{
    constructor(x,y,width,height,sprite,speed,type,gravity)
    {
        this.width = width;
        this.height = height;
        this.sprite = new Image();
        this.sprite.src = sprite;
        this.speed = speed;
        this.gravityAcel = 0;
        (gravity != undefined ? this.gravity = gravity : this.gravity = function(){});
       
        if(type.toLowerCase() == 'square'){
            this.hitbox = new Polygon([new Point(x-this.width/2,y-this.height/2),
                                        new Point(x+this.width/2, y-this.height/2),
                                        new Point(x+this.width/2, y+this.height/2),
                                        new Point(x-this.width/2, y+this.height/2)
                                       ], undefined, polyPolyCollide);
        }
        if(type.toLowerCase() == 'circle')  this.hitbox = new Circle(x-this.width/2,y-this.width/2,width);
    }

    moveAxis(dx,dy)
    {   
        for(var i = 0; i<this.hitbox.points.length; i++)this.hitbox.points[i].translate(dx*this.speed,dy*this.speed)
    }

    jump(num){
        this.gravityAcel=0
        this.gravityAcel+=-num
        console.log(this.gravityAcel)
    }

    draw()
    {   
        this.hitbox.draw();
    }
    update()
    {   
        this.draw();
        this.gravity();
        this.hitbox.collide(player, square);
    }
}
function gravity(){
    this.gravityAcel+=1;
    for(var i = 0; i<this.hitbox.points.length; i++) this.hitbox.points[i].translate(0,this.gravityAcel);
}