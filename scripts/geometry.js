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

class Polygon
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

//Collision functions, lacks circle detection at the moment

function lineCollide(x1, y1, x2, y2, x3, y3, x4, y4) {
    let uA = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3)) / ((y4-y3) * (x2-x1) - (x4-x3) * (y2-y1));

    let uB = ((x2-x1) * (y1-y3) - (y2-y1) * (x1-x3)) / ((y4-y3) * (x2-x1) - (x4-x3) * (y2-y1));

    return (uA >= 0 && uA <= 1 && uB >= 0 && uB <=1);
}

function polyLine(poly, x1, y1, x2, y2) {
    var next = 0;
    for (let current = 0; current < poly.hitbox.length; current++) {
        next = current + 1;
        if (next == poly.hitbox.length) next = 0;
        var x3 = poly.hitbox[current].x;
        var y3 = poly.hitbox[current].y;
        var x4 = poly.hitbox[next].x;
        var y4 = poly.hitbox[next].y;
        var hit = lineCollide(x1, y1, x2, y2, x3, y3, x4, y4);
        if (hit) {
            return true;
            }
        }
        return false;
}

function polyPolyCollide(poly1, poly2) {
    var next = 0;
    for (let current = 0; current < poly1.hitbox.length; current++) {
        next = current + 1;
        if (next == poly1.hitbox.length) next = 0;
        var vc = poly1.hitbox[current];    // c for "current"
        var vn = poly1.hitbox[next];       // n for "next"
        var collision = polyLine(poly2, vc.x,vc.y,vn.x,vn.y);
        if (collision) {
            return true;
            }
        }
        return false;
}