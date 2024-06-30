class Obstacle {
    constructor (x,y,color,width,height,gravity)
    {
        this.center = new Point(x,y);
        this.color = color;
        this.width = width;
        this.height = height;
        this.angle = 0;
        this.gravityAcel = 0;
        //(gravity != undefined ? this.gravity = gravity : this.gravity = function(){});
        this.gravityFunc = gravity || function(){};
        this.hitbox = new Polygon([new Point(x-this.width/2,y-this.height/2),
                                    new Point(x+this.width/2, y-this.height/2),
                                    new Point(x+this.width/2, y+this.height/2),
                                    new Point(x-this.width/2, y+this.height/2)
                                    ], undefined, this, this.color);
    }
    centerFunc() {
        let center = new Point(0, 0);
        for (let point of this.hitbox.points) {
            center.x += point.x;
            center.y += point.y;
        }
        center.x /= this.hitbox.points.length;
        center.y /= this.hitbox.points.length;
        return (center);
    }
    translate(dx, dy){
        for (let point of this.hitbox.points) point.translate(dx, dy);
    }
    rotate(angle){
        this.translate(-this.center.x, -this.center.y);
        this.angle = (angle + this.angle % 360);
        for (let point of this.hitbox.points) point.rotate(angle);
        this.translate(this.center.x, this.center.y);
    }
    draw()
    {
        this.hitbox.draw();
    }
    update(){
        this.center = this.centerFunc();
        this.draw();
        //this.gravity();
    }
}