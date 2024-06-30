class Hook {
    constructor(owner){
        this.owner = owner;
        this.x = owner.center.x;
        this.y = owner.center.y;
        this.hookAngle = owner.aimAngle;
        this.collide = polyPolyCollide;
        this.length;
        this.hooked = false;
        this.geometry = new Obstacle(this.x,this.y,"purple",10,10,undefined);
        this.geometry.rotate(this.hookAngle);
        this.bob = new Point(0,0);
        this.angle = 0;
        this.velocityAngle = 0;
        this.accelAngle = 0;
        //this.ropeForce = 0;
        this.hookVelocity = 20;
    }
    draw(){
        this.geometry.draw();
        context.strokeStyle = this.geometry.color;
        context.beginPath();
        context.moveTo(this.owner.center.x,this.owner.center.y);
        context.lineTo(this.x,this.y);
        context.lineTo(this.x, this.owner.center.y);
        context.lineTo(this.owner.center.x, this.owner.center.y);
        context.stroke();
    }
    lengthCalc(){
        var x1 = this.owner.center.x;
        var y1 = this.owner.center.y;
        var x2 = this.x;
        var y2 = this.y;
        var length = Math.sqrt((Math.pow(x2-x1,2)+Math.pow(y2-y1,2)));
        return(length);
    }
    update(){
        this.draw();
        if (!this.hooked){
            var angle = this.hookAngle*Math.PI/180;
            var arrayLength = environment.objects.length;
		    var step = new Point(Math.cos(angle), Math.sin(angle));
            for (var velocity = 0; velocity < this.hookVelocity; velocity++) {
            this.x += step.x
            this.y += step.y
            for (let point of this.geometry.hitbox.points) point.accel(this.hookAngle, 1);
            for (var obstacle = 0; obstacle < arrayLength; obstacle++) {
                var wall = this.collide(this.geometry,environment.objects[obstacle]);
                if (wall) {
                    this.hooked = true;
                    this.length = this.lengthCalc();
                    this.angle = Math.cos(Math.atan2(this.y - this.owner.center.y, this.x - this.owner.center.x)*180/Math.PI);
                    }
                }
            }
        } else {
            let force = this.owner.gravityAccel*Math.sin(this.angle);
            this.accelAngle = (-1*force)/this.length;
            this.velocityAngle+=this.accelAngle;
            this.angle+=this.velocityAngle
            this.bob.x = this.length*Math.sin(this.angle)+this.x;
            this.bob.y = this.length*Math.cos(this.angle)+this.y;
            context.beginPath();
            context.rect(this.bob.x, this.bob.y, 50, 50);
            context.stroke();
        }
    }
}    