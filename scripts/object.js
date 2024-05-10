class Obstacle {
    constructor (x,y,width,height,sprite,type)
    {
        this.width = width;
        this.height = height;
        this.sprite = new Image();
        this.sprite.src = sprite;

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
    }
}