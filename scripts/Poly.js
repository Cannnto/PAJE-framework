class Point{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }

    translate(dx,dy)
    {
        this.x+=dx;
        this.y+=dy;
    }
}


class Poly{
    constructor(x,y,width,height,collision,type,opacity,name){
        this.width = width;
        this.height = height;

        this.collision = collision;
        this.type = type;
        this.opacity = opacity || '1';
        this.name = name || null;
        this.points = [new Point(x,y),new Point(x+width,y),
                       new Point(x+width,y+height),new Point(x,y+height)];
    }

    translate(dx,dy)
    {   for(let i = 0; i < this.points.length; i++){
            this.points[i].translate(dx,dy);
        }
    }

    collide(rectangle){
        for(let i=0;i<(rectangle.length);i++){
            var colidiu =  this.collision(rectangle[i]);
            if(colidiu){
                return colidiu;
    }}}

    draw(color)
    {   if(this.type == 'fill')
        {   ctx.fillStyle = `${color},${this.opacity})`;;
            ctx.beginPath();
                ctx.moveTo(this.points[0].x - camera.x, this.points[0].y - camera.y);
                for (let point = 1; point < this.points.length; point++) {
                    ctx.lineTo(this.points[point].x - camera.x, this.points[point].y - camera.y)
                }
            ctx.closePath();
            ctx.fill();
        }
        else
        {   ctx.strokeStyle = `${color},${this.opacity})`;
            ctx.beginPath();
                ctx.moveTo(this.points[0].x - camera.x, this.points[0].y - camera.y);
                for (let point = 1; point < this.points.length; point++) {
                    ctx.lineTo(this.points[point].x - camera.x, this.points[point].y - camera.y)
                }
            ctx.closePath();
            ctx.stroke();
        }
    }
}



function projectileCollide(other)
{	var j, l, c, u, v, w, m, a, b;
    u = new Point(this.velocity*Math.cos(this.angle),this.velocity*Math.sin(this.angle));
    c = new Point((this.points[0].x+this.points[1].x)/2, (this.points[0].y+this.points[3].y)/2);
    for (j = 0; (j < other.points.length); j++)
    {	l = (j+1)%other.points.length;
        v = new Point(other.points[l].x-other.points[j].x, other.points[l].y-other.points[j].y);
        w = new Point(c.x-other.points[j].x, c.y-other.points[j].y);

        m = v.y*u.x-v.x*u.y;
        a = (v.x*w.y-v.y*w.x)/m;
        b = (u.x*w.y-u.y*w.x)/m;
        if ((a >= 0) && (a <= 1) && (b >= 0) && (b <= 1))   return([v,other,other.name]);
    }
    return(null);
}



function polyCollide(other)
{	var i, j, k, l, u, v, w, m, a, b;
    for (i = 0; (i < this.points.length); i++)
    {	k = (i+1)%this.points.length;
        u = new Point(this.points[k].x-this.points[i].x, this.points[k].y-this.points[i].y);
        for (j = 0; (j < other.points.length); j++)
        {	l = (j+1)%other.points.length;
            v = new Point(other.points[l].x-other.points[j].x, other.points[l].y-other.points[j].y);
            w = new Point(this.points[i].x-other.points[j].x, this.points[i].y-other.points[j].y);
            m = v.y*u.x-v.x*u.y;
            a = (v.x*w.y-v.y*w.x)/m;
            b = (u.x*w.y-u.y*w.x)/m;
            if ((a >= 0) && (a <= 1) && (b >= 0) && (b <= 1))   return([v,other,other.name]);    
        }
    }
    return(null);
}
