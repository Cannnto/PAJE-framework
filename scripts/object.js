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

    update(colliders,keys)
    {   
        this.hitbox.draw()

        if(!this.collide(colliders)){
            this.keyboard(keys)
        }


    }

    collide(colliders)
    {   var d = Date.now()
        if(colliders.indexOf(this) != -1)
        {
            var index = colliders.indexOf(this)
            colliders.splice(index,1)
        }
        //this.keyboard(keys)
        for(var i = 0; i < colliders.length; i++)
        {   
            if(colliders[i].hitbox.center().x-25 < this.hitbox.center().x+50  && colliders[i].hitbox.center().x+25 > this.hitbox.center().x-50 && colliders[i].hitbox.center().y-25 < this.hitbox.center().y+50  && colliders[i].hitbox.center().y+25 > this.hitbox.center().y-50)
            {   
                console.log(this.hitbox.collide(colliders[i]))
            }   
        }

        colliders.push(this)

        console.log(d+" - "+Date.now())
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