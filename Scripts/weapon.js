class Weapon{
    constructor(owner, type) {
        this.owner = owner;
        this.type = type;
        this.color = "white";
        this.ammo = {count: 0, max: 0};
        this.reloadCurrent = 0;
        this.fireRateCount = 0;
        switch (this.type) {
            case ("revolver"):
                this.name = "Revólver";
                this.center = new Point(this.owner.center.x+40, this.owner.center.y);
                this.width = 60;
                this.height = 25;
                this.image = new Image(this.width, this.height);
                this.image.src = "Sprites/revolver.png";
                this.ammo.max = 6
                this.fireRate = 10*FPS/FPS;
                this.reloadTime = 0.6*FPS;
                this.projectileType = "balaço";
                break;
            case ("rifle"):
                this.name = "Metralhadora";
                this.center = new Point(this.owner.center.x+20, this.owner.center.y);
                this.width = 110;
                this.height = 35;
                this.image = new Image(this.width, this.height);
                this.image.src = "Sprites/assault_rifle.png";
                this.ammo.max = 30
                this.fireRate = 3*FPS/FPS;
                this.reloadTime = 2*FPS;
                this.projectileType = "bullet";
                break;
        }
        this.ammo.count = this.ammo.max;
        this.reloadPercent = (this.reloadCurrent/this.reloadTime)*100;
        this.geometry = new Obstacle(this.center.x, this.center.y, this.color, this.width, this.height, undefined);
        this.angle = 0;
    }
    translate(dx,dy){
        this.center.translate(dx,dy);
        for (let point of this.geometry.hitbox.points) point.translate(dx, dy);
    }
    update() {
        this.reloadPercent = (this.reloadCurrent/this.reloadTime)*100;
        this.angle = this.owner.aimAngle;
        context.save();
        context.translate(this.owner.center.x,this.owner.center.y);
        context.rotate(this.angle/180*Math.PI);
        context.translate(-this.owner.center.x,-this.owner.center.y);
        this.geometry.draw();
        if (this.angle < -90 || this.angle > 90) {
            context.scale(1,-1);
            context.drawImage(this.image, this.geometry.hitbox.points[0].x, -this.geometry.hitbox.points[0].y-this.height, this.width, this.height+5);
        } else {
            context.drawImage(this.image, this.geometry.hitbox.points[0].x, this.geometry.hitbox.points[0].y, this.width, this.height+5);
        }
        context.restore();
        if (this.reloadCurrent == this.reloadTime) {
            this.ammo.count = this.ammo.max;
            this.reloadCurrent = 0;
        }

        if (this.ammo.count == 0 && this.reloadCurrent < this.reloadTime) {
            this.reloadCurrent++;
        }

        if (this.fireRateCount < this.fireRate) {
            this.fireRateCount++;
        }
    }
    fire() {
        if (this.ammo.count > 0 && this.fireRateCount == this.fireRate) {
            this.owner.projectiles.push(new Projectile(this, this.projectileType));
            this.ammo.count--;
            this.fireRateCount = 0;
        }
    }
}