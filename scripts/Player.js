class Player{
    constructor(x,y,width,height,sprite,teclas,speed)
    {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.sprite = new Image()
        this.sprite.src = sprite
        this.speed = speed
        this.hitbox = new Polygono([new Point(this.x,this.y),
                                   new Point(this.x+this.width, this.y),
                                   new Point(this.x+this.width, this.y+this.height),
                                   new Point(this.x, this.y+this.height)
                                  ])
        this.teclas = new keybinding(teclas)
    }

    move(dx,dy)
    {   
        for(var i = 0; i<this.hitbox.points.length; i++)
        {
            this.hitbox.points[i].x += dx*this.speed
            this.hitbox.points[i].y += dy*this.speed
        }
        this.x += dx*this.speed
        this.y += dy*this.speed
    }

    draw()
    {   
        this.hitbox.draw();
    }

    update()
    {   this.draw()
        this.teclas.pressed();
    }
}