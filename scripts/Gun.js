class Gun{
    constructor(width,height){
        this.width = width;
        this.height = height;

        this.center = -1;
        this.angle = -1;
        this.ponta = {x: -1, y: -1};
        this.ball = {opacity: 0, size:0}
        this.particles = [];
        this.projectiles = [];
    }

    fire(width,height,velocity,kick,colision,type){ 
        this.projectiles.push(new Projectile(this.ponta.x, this.ponta.y, width, height, velocity, this.angle, kick, colision, type));
        this.ball.size = 0;
    }
    
    draw(center){
        this.center = center;
        this.angle = Math.atan2(mouseY - (this.center.y - camera.y), mouseX - (this.center.x - camera.x));
        this.ponta = {x: this.center.x + this.width*Math.cos(this.angle), y: this.center.y + this.width*Math.sin(this.angle)}

        ctx.save();
            ctx.translate((this.center.x - camera.x),(this.center.y - camera.y));
            ctx.rotate(this.angle);
            ctx.translate(-(this.center.x - camera.x),-(this.center.y - camera.y));
            ctx.strokeStyle = 'red';
            ctx.strokeRect((this.center.x - camera.x)-10,(this.center.y - camera.y)-5, this.width, this.height);
        ctx.restore();
    }

    particlesUpdate(){
        if(this.particles[this.particles.length-1]) this.ball.opacity = this.particles[this.particles.length-1].opacity;

        if(this.ball.opacity > 0.011)
        {   ctx.fillStyle = `rgba(0,255,0,${this.ball.opacity})`;
            ctx.beginPath();
            ctx.arc(this.ponta.x-camera.x, this.ponta.y-camera.y, Math.random()*this.ball.size, 0, 2*Math.PI);
            ctx.fill();
        }

        for(let i=0; i<this.particles.length; i++){

            this.particles[i].draw();

            if(this.particles[i].update()){
                this.ball.size+=0.1
                this.particles.splice(i,1);
                i--;
    }}}

    update(){
        if(player.amoo.charging > FPS/2)
        {   this.particles.push(new Particle(this.ponta.x,this.ponta.y,Math.random()*5,this.ponta,"rgba(0,255,0,", true));
            this.particles.push(new Particle(this.ponta.x,this.ponta.y,Math.random()*5,this.ponta,"rgba(0,255,0,", true));
        }
        this.particlesUpdate();

        for(let i = 0; i < this.projectiles.length; i++){            
            this.projectiles[i].draw('rgba(0,255,0');      
                
            if(this.projectiles[i].update(objs.concat(enemies.enemies))){
                this.projectiles.splice(i, 1);
                i--;
            }
    }}}