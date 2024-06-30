class Player extends Obstacle{
    constructor(x,y,color,width,height,gravity,collision)
    {
        super(x,y,color,width,height,gravity);
        this.hitbox.collide = collision;
        this.groundCheck = floorCollide;
        this.grounded = false;
        this.weapons = [new Weapon(this, "revolver"), new Weapon(this,"rifle")];
        this.currentWeapon = this.weapons[1];
        this.aimAngle = 0;
        this.projectiles = [];
        this.keys = {
            jump: false,
            left: false,
            right: false,
            shoot: false,
            hook: false,
            switch1: false,
            switch2: false
        }
        this.angle = 0
        this.gravityAccel = 0;
        this.hitbox.collide = collision
        //trigonometry shit
        this.velocity = {x:0, y:0};
        this.accel = {x:0, y:0};
        //grappling hook shit
        this.hook = [];
    }
    translate(dx, dy){
        this.center.translate(dx,dy);
        for (let point of this.hitbox.points) point.translate(dx, dy);
        for (let weapon of this.weapons) weapon.translate(dx,dy);
    }

    move(angle, magnitude) {
        this.velocity.x = magnitude*Math.cos(angle*Math.PI/180);
        this.velocity.y = magnitude*Math.sin(angle*Math.PI/180);
    }

    stopAccel() {
        this.accel.x = 0;
        this.accel.y = 0;
        this.velocity.x = 0;
        this.velocity.y = 0;
    }

    moveAccel(angle, distance){
        for (let point of this.hitbox.points) point.accel(angle, distance);
        for (let point of this.weapon.hitbox.points) point.accel(angle, distance);
        if (this.hitbox.collide()) {
            for (let point of this.hitbox.points) point.accel(angle, -distance);
            for (let point of this.weapon.hitbox.points) point.accel(angle, -distance);
        }
    
    }
    speedTracker() {
        context.strokeStyle = "red";
        context.beginPath();
        context.moveTo(this.center.x,this.center.y);
        context.lineTo(this.center.x+this.velocity.x,this.center.y+this.gravityAccel);
        context.stroke(); 
    }
    jump(num){
        this.gravityAccel=0;
        this.gravityAccel-=num;
    }
    fire(){
        this.currentWeapon.fire();
    }
    weaponUpdate() {
        this.currentWeapon.update();
    }
    projectileUpdate() {
        for(let i=0;i<this.projectiles.length;i++){

            this.projectiles[i].update();

            if (this.projectiles[i].deleteable)
                {	this.projectiles.splice(i, 1);
                    i--;
                }
        }
    }
    fireHook(){
        if(this.hook.length<1) {
            this.hook.push(new Hook(this));
        }
    }
    hookOff(){
        if(this.hook.length == 1 && this.hook[0].hooked){
            this.hook.splice(0,1);
        }
    }
    update() {   
        /* if (this.reloadCurrent == this.reloadTime) {
        this.ammo.count = this.ammo.max;
        this.reloadCurrent = 0;
        } */
        this.center = this.centerFunc();
        this.aimAngle = Math.atan2(mouseY - this.center.y, mouseX - this.center.x) * 180/Math.PI;
        this.gravityFunc();
        //this.stopAccel();
        /* this.key[65] ? this.move(180, 6) : this.move(180,0);
        if(this.key[68]) this.move(0, 6);
        if(this.key[32] && this.grounded) this.jump(19);
        if(this.key[82]) this.fire();
        this.key[70] ? (!this.hook[0] ? this.fireHook() : this.hookOff()) : undefined;
        if(this.key[49]) this.currentWeapon = this.weapons[0];
        if(this.key[50]) this.currentWeapon = this.weapons[1]; */
        if (this.keys["jump"] && this.grounded) this.jump(19);
        this.keys["left"] ? this.move(180,6) : this.move(180,0);
        if (this.keys["right"]) this.move(0,6);
        if (this.keys["shoot"]) this.fire();
        this.keys["hook"] ? (!this.hook[0] ? this.fireHook() : this.hookOff()) : undefined;
        if(this.keys["switch1"]) this.currentWeapon = this.weapons[0];
        if(this.keys["switch2"]) this.currentWeapon = this.weapons[1];

        /* this.velocity.x += this.accel.x;
        this.velocity.y += this.accel.y; */
        this.translate(this.velocity.x, this.velocity.y);
        if (this.hitbox.collide()) {
            this.translate(-this.velocity.x, -this.velocity.y);
        }
        super.draw();
        this.speedTracker();
        this.weaponUpdate();
        this.projectileUpdate();
        this.hook[0] ? this.hook[0].update() : undefined;
    }
}