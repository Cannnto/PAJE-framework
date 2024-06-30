class Projectile{
    constructor(owner,type){
        this.owner = owner;
        this.type = type;
        this.x = this.owner.owner.center.x; //owner.owner é acústico eu sei
        this.y = this.owner.owner.center.y;
        this.angle = this.owner.angle;
        this.collide = bulletCollide;
        this.bounceCount = 0;
        this.bounceLimit = 10;
        this.x += Math.cos(this.angle*Math.PI/180)*(this.owner.width*1.3);
        this.y += Math.sin(this.angle*Math.PI/180)*(this.owner.width*1.3);
        switch (this.type) {
            case ("bullet"):
                this.width = 15;
                this.height = 10;
                this.image = new Image(this.width,this.height);
                this.image.src = "Sprites/bullet.png"
                this.velocity = 40;
                break;
            case ("balaço"):
                this.width = 20;
                this.height = 20;
                this.image = new Image(this.width,this.height);
                this.image.src = "Sprites/bullet.png"
                this.velocity = 10;
                break;   
        }
        this.geometry = new Obstacle(this.x, this.y, "yellow", this.width, this.height, undefined);
        this.geometry.rotate(this.angle);
    }
    draw(){
        //this.geometry.draw();
        this.geometry.center = this.geometry.centerFunc();
        context.save();
        context.translate(this.geometry.center.x,this.geometry.center.y);
        context.rotate(this.angle/180*Math.PI);
        context.translate(-this.geometry.center.x,-this.geometry.center.y);
        context.drawImage(this.image,this.x-this.width/2,this.y-this.height/2,this.width,this.height);
        context.restore();
        //for (let point of this.geometry.hitbox.points) point.accel(this.angle, this.velocity);
        var angle = this.angle*Math.PI/180;
		var velocity = new Point(this.velocity*Math.cos(angle), this.velocity*Math.sin(angle));
        /* context.strokeStyle = this.geometry.color;
        context.beginPath();
        context.moveTo(this.x,this.y);
        context.lineTo(this.x+velocity.x,this.y+velocity.y);
        context.stroke(); */
    }
    update(){
        this.draw();
        var angle = this.angle*Math.PI/180;
		var step = new Point(Math.cos(angle), Math.sin(angle));
        for (var velocity = 0; velocity < this.velocity; velocity++) {
            this.x += step.x
            this.y += step.y
            for (let point of this.geometry.hitbox.points) point.accel(this.angle, 1);
            for (var obstacle = 0; obstacle < environment.objects.length; obstacle++) {
                var wall = this.collide(environment.objects[obstacle]);
                if (wall) {
                    this.bounceCount++
                    angle = Math.atan2(wall.y, wall.x)+step.angle(wall);
                    step.x = Math.cos(angle);
                    step.y = Math.sin(angle);
                    this.angle = angle*180/Math.PI;
                }
            }
        }
    }
}