class Polygon{
    constructor(points)
    {   this.points = points
    }

    draw()
    {   
            context.strokeStyle = "white";
            context.beginPath();
            context.moveTo(this.points[0].x, this.points[0].y);
            for (let point = 1; point < this.points.length; point++) {
                context.lineTo(this.points[point].x, this.points[point].y)
            }
            context.closePath();
            context.stroke();
    }

    translate(dx,dy)
    {   for(let point of this.points)
        {   point.translate(dx, dy)
        }
    }

    collide(other)
    {   
        (other.shape == "polygon" ? this.collide_polygon(other) : this.collide_circle(other))
    }

    collide_polygon(other)
    {
        for(let i=0; i < this.points.length; i++)
            {   let x1 = this.points[i].x;
                let y1 = this.points[i].y;
                let x2 = this.points[(i+1)%this.points.length].x;
                let y2 = this.points[(i+1)%this.points.length].y;

                for(let n=0; n< other.hitbox.points.length; n++)
                {
                    let x3 = other.hitbox.points[n].x;
                    let y3 = other.hitbox.points[n].y;
                    let x4 = other.hitbox.points[(n+1)%other.hitbox.points.length].x;
                    let y4 = other.hitbox.points[(n+1)%other.hitbox.points.length].y;
    
                    let uA = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1))
                    let uB = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1))
    
                    if(uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1)
                    {               console.log("oi")
                        return true
                    }
                }
            }
            return false
    }

    collide_circle(other)
    {   
        return false
    }

}

class Circle{
    constructor(point,radius){
        this.point = point
        this.radius = radius;
    }

    draw(){
        context.strokeStyle = "white";
        context.beginPath();
        context.arc(this.point.x+this.radius, this.point.y+this.radius, this.radius, 0, Math.PI*2, true);
        context.closePath();
        context.stroke();
    }

    translate(dx,dy)
    {   this.point.translate(dx, dy)
    }

    collide(other)
    {   
        (other.shape == "polygon" ? this.collide_polygon(other) : this.collide_circle(other))
    }

    collide_polygon(other)
    {

    }

    collide_circle(other)
    {
        var x = this.point.x
        var y = this.point.y

        var x2 = other.x
        var y2 = other.y


        var distX = x-x2
        var distY = y-y2
        console.log(x + " " + x2 + " / " + distX)
        var distance = Math.sqrt((distX*distX) + (distY*distY));

        if (distance <= this.radius+other.width/2) {
            console.log("oi")
            return true;
        }

        return false;

    }
}