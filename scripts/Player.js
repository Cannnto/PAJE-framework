class Player extends Poly{
    constructor(x,y,width,height,objs)
    {   super(x,y,width,height,polyCollide);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.objs = objs;
        this.particles = [];

        this.groundedHitbox = new Poly(this.x-camera.x,this.y+this.height-camera.y-10,this.width,11,polyCollide,'fill');
        this.grounded = false;
        this.gravity = 2;
        this.velocity = {x: 0, y: 0};
        this.acel = {x: 0, y: 0}; 
        
        this.jetPack = {fuel: {current: FPS*2, max: FPS*2}};
        this.gun = new Gun(60,10);
        this.amoo = {count: 10, max: 10, reloadTime: 0.5*FPS, reloadCurrent: 0, fireTime: 0, charging: 0, charginMax: 10*FPS};
        this.body = {head:-1, body: -1, legs: -1, berma: -1}
        this.kabom = {x:0, y:0};
    }

        jetPackUsing(angle,magnitude)
        {   this.jetPack.fuel.current--;
            this.acel.x = magnitude*Math.cos(angle*Math.PI/180);
            this.acel.y = magnitude*Math.sin(angle*Math.PI/180);

            this.particles.push(new Particle(this.x + this.width/2, this.y + this.height/2,5+Math.random()*10,null,"rgba(255,140,0,"));
        }

        jetPackRestore()
        {    if(this.jetPack.fuel.current <= this.jetPack.fuel.max)  this.jetPack.fuel.current++;
        }
    
    charging()
    {   if(this.amoo.charging < this.amoo.charginMax) this.amoo.charging++;
        this.chargingDraw();
    }

    fire(width,height,velocity,kick)
    {   if(this.amoo.count && this.amoo.fireTime>0.2*FPS && this.amoo.charging)
        {   
            // if(this.amoo.charging < this.amoo.charginMax/2) this.gun.fire(width, height, velocity, kick, projectileCollide);
            // else this.gun.fire(width*(this.amoo.charging*0.05/2), height*(this.amoo.charging*0.05), velocity*(this.amoo.charging*0.05/3),0, polyCollide, true);
            
            
            
            if(this.amoo.charging >= 1*FPS) this.gun.fire(width*5,height*10,velocity*3,0,polyCollide,true);
            else this.gun.fire(width,height,velocity,kick,projectileCollide);

            this.amoo.count--;
            this.amoo.fireTime = 0;
            this.amoo.charging = 0;
        }
    }

    chargingDraw(){
        ctx.fillStyle = 'white';
        ctx.fillRect(this.x-this.width/2 - camera.x,this.y-this.height/5 - camera.y,this.width*2,this.height/16);
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x-this.width/2 - camera.x,this.y-this.height/5 - camera.y,(this.width*2)*this.amoo.charging/(this.amoo.charginMax),this.height/16);
    }

        reloaDraw(){
            ctx.fillStyle = 'white';
            ctx.fillRect(this.x-this.width/2 - camera.x,this.y-this.height/5 - camera.y,this.width*2,this.height/16);
            ctx.fillStyle = 'blue';
            ctx.fillRect(this.x-this.width/2 - camera.x,this.y-this.height/5 - camera.y,(this.width*2)*this.amoo.reloadCurrent/this.amoo.reloadTime,this.height/16);
        }
        gunFunctions(){
            this.amoo.fireTime++;
            
            if(!this.amoo.count){
                this.amoo.reloadCurrent++;
                this.reloaDraw();
            }
            if(this.amoo.reloadCurrent == this.amoo.reloadTime){
                this.amoo.count = this.amoo.max;
                this.amoo.reloadCurrent = 0;
            }
        }

    particlesUpdate(){
        for(let i=0; i<this.particles.length; i++){

            this.particles[i].draw();

            if(this.particles[i].update()){
                this.particles.splice(i,1);
                i--;
    }}}

    move(angle,magnitude)
    {   this.velocity.x += magnitude*Math.cos(angle*Math.PI/180);
        this.velocity.y += magnitude*Math.sin(angle*Math.PI/180);
    }
    
    stopAcel()
    {   this.acel.x = 0;
        this.acel.y = 0;
    }

    draw()
    {   //super.draw('blue');
        this.body = {
            head: {x: this.x+this.width/2.5-camera.x+this.kabom.x, y: this.y+10-camera.y, width:this.width/4, height:this.height/6},
            body: {x: this.x+this.width/4-camera.x, y: this.y+25-camera.y, width: this.width/2, height: this.height/2.1},
            legs: {leftX: this.x+9+2-camera.x, rightX: this.x+21+2 - camera.x, y: this.y+this.height/1.2-camera.y, width: this.width/6, height: this.height/8},
            berma: {leftX: this.x+9-camera.x, rightX: this.x+21 - camera.x, y: this.y+this.height/1.35-camera.y, width: this.width/4, height: this.height/8} 
        };
            //head
            ctx.fillStyle = 'rgb(185,122,87)';
            ctx.fillRect(this.body.head.x + this.kabom.x, this.body.head.y + this.kabom.y, this.body.head.width, this.body.head.height);
            //legs
            ctx.fillStyle = 'rgb(185,122,87)';
            ctx.fillRect(this.body.legs.leftX + this.kabom.x, this.body.legs.y + this.kabom.y, this.body.legs.width, this.body.legs.height);
            ctx.fillStyle = 'rgb(185,122,87)';
            ctx.fillRect(this.body.legs.rightX + this.kabom.x, this.body.legs.y + this.kabom.y, this.body.legs.width, this.body.legs.height);
            //berma
            ctx.fillStyle = 'orange';
            ctx.fillRect(this.body.berma.leftX + this.kabom.x, this.body.berma.y + this.kabom.y, this.body.berma.width, this.body.berma.height);
            ctx.fillStyle = 'orange';
            ctx.fillRect(this.body.berma.rightX + this.kabom.x, this.body.berma.y + this.kabom.y, this.body.berma.width, this.body.berma.height);
            // body
            ctx.fillStyle = 'black';
            ctx.fillRect(this.body.body.x-1 + this.kabom.x, this.body.body.y-1 + this.kabom.y, this.body.body.width+2, this.body.body.height+2);
            ctx.fillStyle = 'rgb(200,191,231)';
            ctx.fillRect(this.body.body.x + this.kabom.x, this.body.body.y + this.kabom.y, this.body.body.width, this.body.body.height);
    }   
    
    update()
    {   this.x = this.points[0].x;
        this.y = this.points[0].y;
        this.center = {x: this.x + this.width/2, y: this.y + this.height/2};
        this.grounded = false;
        

        this.particlesUpdate(); 
        this.draw();
        this.gun.update();
        this.gun.draw(this.center);
        this.gunFunctions();
        
        this.velocity.x += this.acel.x;
        this.velocity.y += (this.acel.y + this.gravity);
        
        super.translate(this.velocity.x,this.velocity.y);
        this.groundedHitbox.translate(this.velocity.x,this.velocity.y)
        
        if(this.y+this.height+this.velocity.y>=camera.y+camera.height)
        {   super.translate(-this.x+canvas.width/2,-this.y+canvas.height*4/6);
            this.groundedHitbox.translate(-this.x+canvas.width/2,-this.y+canvas.height*4/6)
        }
        
        if(super.collide(this.objs))
        {   var colidiu = this.groundedHitbox.collide(this.objs);
            if(colidiu) this.grounded = true;

            super.translate(-this.velocity.x,-this.velocity.y);
            this.groundedHitbox.translate(-this.velocity.x,-this.velocity.y);

            this.velocity.y = 0;
            this.velocity.x = 0;
        }
    }
}