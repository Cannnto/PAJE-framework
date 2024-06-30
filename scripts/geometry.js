class Point {
    constructor(x,y) {
        this.x = x
        this.y = y
    }

    translate(dx,dy) {           
        this.x += dx
        this.y += dy
    }

    rotate(angle) {
        angle *= Math.PI / 180;
        let x = Math.cos(angle) * this.x - Math.sin(angle) * this.y;
        let y = Math.sin(angle) * this.x + Math.cos(angle) * this.y;
        this.x = x;
        this.y = y;
    }

    accel (angle, distance) {
        this.x += Math.cos(angle*Math.PI/180)*(distance);
        this.y += Math.sin(angle*Math.PI/180)*(distance);
    }

    angle (other) {
        return(Math.atan2(other.y, other.x)-Math.atan2(this.y, this.x));
    }
}

class Polygon {
    constructor(points,collision,parent,color)
    {   this.points = points;
        (collision != undefined ? this.collide = collision : this.collide = function(){});
        this.parent = parent;
        this.color = color;
    }

    draw() {
        var pointLength = this.points.length;   
        context.strokeStyle = this.color;
        context.beginPath();
        context.moveTo(this.points[0].x, this.points[0].y);
        for (let point = 1; point < pointLength; point++) {
            context.lineTo(this.points[point].x, this.points[point].y)
        }
        context.closePath();
        context.stroke();
    }
    translate(dx,dy,speed) {
        var pointLength = this.points.length; 
        for(var i = 0; i < pointLength; i++){
            this.points[i].translate(dx*speed,dy*speed);
        }
    }
}