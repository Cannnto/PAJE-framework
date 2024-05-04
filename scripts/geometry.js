class Point
{
    constructor(x,y)
    {   this.x = x
        this.y = y
    }

    Translate(dx,dy)
    {   this.x += dx
        this.y += dy
    }

    Rotate(center,angle)
    {   angle = Math.PI / 180;
        let x = Math.cos(angle) * center.x - Math.sin(angle) * center.y;
        let y = Math.sin(angle) * center.x + Math.cos(angle) * center.y;
        this.x = x;
        this.y = y;
    }
}

class Polygono
{
    constructor(Points)
    {   this.points = Points
    }

    draw()
    {   context.strokeStyle = "black";
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

/*class circle
{   constructor()
    {

    }
}*/