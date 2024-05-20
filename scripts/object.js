class Obstacle {
    constructor (x,y,width,height,type,sprite,gravity,objs)
    {
        this.width = width;
        this.height = height;
        this.sprite = new Image();
        if(sprite!=undefined)this.sprite.src = sprite;
        this.gravityAcel = 0;
        this.gravity = gravity || function(){};
        if(type.toLowerCase() == 'square'){
            if(objs!=undefined) this.objs = objs.unshift(this);
            this.hitbox = new Polygon([new Point(x-this.width/2,y-this.height/2),
                                        new Point(x+this.width/2, y-this.height/2),
                                        new Point(x+this.width/2, y+this.height/2),
                                        new Point(x-this.width/2, y+this.height/2)
                                       ],polyPolyCollide,objs);

        }
        if(type.toLowerCase() == 'line'){
            this.hitbox = new Line([new Point(x,y),new Point(x+this.width,y)],polyLine);
        }
        if(type.toLowerCase() == 'circle')  this.hitbox = new Circle(x-this.width/2,y-this.width/2,width);
    }

    draw()
    {
        this.hitbox.draw();
        this.x = this.hitbox.points[0].x;
        this.y = this.hitbox.points[0].y;
    }
    collide(){
        this.hitbox.collide();
    }
    update(){
        this.draw();
        this.gravity();
    }
}
function gravityOn(){
    this.gravityAcel+=1;
    for(var i = 0; i<this.hitbox.points.length; i++) this.hitbox.points[i].translate(0,this.gravityAcel);
}
function gravityFalse(){}