class Player{
    constructor(x,y,width,height,sprite,speed,type,radius)
    {
        this.width = width;
        this.height = height;
        this.sprite = new Image();
        this.sprite.src = sprite;
        this.speed = speed;
        this.radius = radius;
        if(type.toLowerCase() == 'square'){
            this.hitbox = new Polygono([new Point(x,y),
                                        new Point(x+this.width, y),
                                        new Point(x+this.width, y+this.height),
                                        new Point(x, y+this.height)
                                       ])
        }
        if(type.toLowerCase() == 'circle'){
            this.hitbox = new Circle(x,y,radius)
        }
    }

    moveAxis(dx,dy)
    {   
        for(var i = 0; i<this.hitbox.points.length; i++)this.hitbox.points[i].translate(dx,dy)
    }


    moveAcel(){

    }
    moveGravity(){

    }



    draw()
    {   
        this.hitbox.draw();
    }

    update()
    {   
    }
}