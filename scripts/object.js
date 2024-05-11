class Object{
    constructor(x,y,width,heigth,shape,collision,keys,gravidade,angle,speed)
    {
        this.x = x
        this.y = y
        this.width = width
        this.heigth = heigth
        this.shape = shape
        this.collision = collision
        this.keys = keys
        this.gravidade = gravidade
        this.angle = angle
        this.speed = speed

        if(shape.toLowerCase() == "polygon")
        {
            this.hitbox = new Polygon([
                                        new point(this.x,this.y),
                                        new point(this.x+this.width, this.y),
                                        new point(this.x+this.width, this.y+this.heigth),
                                        new point(this.x, this.y+this.heigth)
                                     ])
        }
        else if(shape.toLowerCase() == "circle"){
            this.hitbox = new Circle(new point(this.x,this.y),this.width/2)
        }

    }

    draw(objects,object,keys)
    {   
        for(var i = 0 ; i < objects.length; i++)
        {   
            if(objects.indexOf(object) != -1)
            {
                var index = objects.indexOf(object)
                objects.splice(index,1)
            }
        }
        this.keyboard(keys)
        for(var i = 0; i < objects.length; i++)
        {   
            console.log(this.hitbox.collide(objects[i]))
        }

        this.hitbox.draw()
    }

    move(x,y)
    {
        var dx = x
        var dy = y

        this.hitbox.translate(dx,dy)
    }

    keyboard(keys)
    {   if(keys[this.keys[0]])
        {   this.move(0,-this.speed)
        }
        if(keys[this.keys[1]])
        {   this.move(0,this.speed)
        }
        if(keys[this.keys[2]])
        {   this.move(this.speed,0)
        }
        if(keys[this.keys[3]])
        {   this.move(-this.speed,0)
        }
    }
}