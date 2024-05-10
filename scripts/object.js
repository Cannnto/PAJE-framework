class Obstacle {
    constructor (x,y,width,height,type,sprite,gravity)
    {
        this.width = width;
        this.height = height;
        this.sprite = new Image();
        this.sprite.src = sprite;
        this.gravityAcel = 0;
        (gravity != undefined ? this.gravity = gravity : this.gravity = function(){});

        if(type.toLowerCase() == 'square'){
            this.hitbox = new Polygon([new Point(x-this.width/2,y-this.height/2),
                                        new Point(x+this.width/2, y-this.height/2),
                                        new Point(x+this.width/2, y+this.height/2),
                                        new Point(x-this.width/2, y+this.height/2)
                                       ]);
        }
        if(type.toLowerCase() == 'circle')  this.hitbox = new Circle(x-this.width/2,y-this.width/2,width);
    }

    draw()
    {
        this.hitbox.draw();
        this.x = this.hitbox.points[0].x;
        this.y = this.hitbox.points[0].y;
    }
    update(){
        this.draw();
        this.gravity()
    }
}
function gravity(){
    this.gravityAcel+=1;
    for(var i = 0; i<this.hitbox.points.length; i++) this.hitbox.points[i].translate(0,this.gravityAcel);
}