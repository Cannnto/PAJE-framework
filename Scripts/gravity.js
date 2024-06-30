function gravityFunc(){
    this.gravityAccel++
    this.translate(0,this.gravityAccel);
    if (this.hitbox.collide()) {
        this.translate(0,-this.gravityAccel);
        this.gravityAccel = 0;
    }
}