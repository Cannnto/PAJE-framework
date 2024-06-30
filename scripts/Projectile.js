class Projectile extends Poly{
    constructor(x, y, width, height, velocity, angle, kick, colision, type)
    {   super(x - width/2, y - height/2, width, height, colision, 'fill');
        
        this.bean = type || false;

        this.velocity = velocity;
        this.step = {x: Math.cos(angle), y: Math.sin(angle)};
        this.angle = angle;
        
        this.atrito = 0.1;
        this.kick = 0;
        this.center = {x: -1, y: -1};
    }   

    draw(color)
    {   this.x = this.points[0].x;
        this.y = this.points[0].y;
        this.center = {x: this.x +this.width/2 - camera.x, y: this.y +this.height/2 - camera.y};

        ctx.save();
            ctx.translate(this.center.x, this.center.y);
            ctx.rotate(this.angle); 
            ctx.translate(-this.center.x, -this.center.y);
            super.draw(color);    
        ctx.restore();
    }

    update(rectangles)
    {   this.step.y += (2 / this.velocity);
        if(this.velocity) this.angle = Math.atan2(this.step.y, this.step.x);
        if(!this.velocity)  
        {   this.opacity*=0.95;
            if(this.opacity < 0.01) return true;
        }
        for(let i = 0; i < this.velocity; i++)
        {   super.translate(this.step.x, this.step.y);

            var wall = this.collide(rectangles);
            if (wall)
            {   console.log(wall)
                
                if(wall[1] instanceof Enemy)
                {   enemies.die(wall[1]);

                    if(!this.bean)  return true;
                    if(this.bean) break;
                }
                if(!this.bean)
                {   var angle = Math.atan2(wall[0].y, wall[0].x) + (Math.atan2(wall[0].y, wall[0].x) - Math.atan2(this.step.y, this.step.x));
                    this.step.x = Math.cos(angle);
                    this.step.y = Math.sin(angle) * 1+this.atrito;
                    this.atrito += 0.1;
                    
                    this.kick--;
                    if(this.kick == -1) return true;
                }   
                if(this.bean && !(wall[1] instanceof Enemy))   this.velocity = 0; 
}}}}