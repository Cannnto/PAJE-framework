class Point
{
    constructor(x,y)
    {   this.x = x
        this.y = y
    }

    translate(dx,dy)
    {           
        this.x += dx
        this.y += dy
    }

    rotate(center,angle)
    {   angle = Math.PI / 180;
        let x = Math.cos(angle) * center.x - Math.sin(angle) * center.y;
        let y = Math.sin(angle) * center.x + Math.cos(angle) * center.y;
        this.x = x;
        this.y = y;
    }
}

class Polygono
{
    constructor(Points,radius)
    {   this.points = Points
        this.radius = radius
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

    collide()
    {

    }
}
class Circle{
    constructor(x,y,radius){
        this.points = [new Point(x,y)]
        this.radius = radius;
    }
    draw(){
        context.strokeStyle = "white";
        context.beginPath();
        context.arc(this.points[0].x+this.radius/2, this.points[0].y+this.radius/2, this.radius/2, 0, Math.PI*2, true);
        context.closePath();
        context.stroke();
    }
}