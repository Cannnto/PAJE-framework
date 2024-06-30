class Particle{
    constructor(x,y,radius,center,color,move){
        this.x = x;
        this.y = y;
        this.center = center;
        this.radius = radius;
        this.color = color;
        this.move = move;
        this.opacity = 1;
        if(move)
        {   var magnitudePOS = 20+Math.random()*40;
            var anglePOS = Math.random()*(2*Math.PI); 
            var vectorPOS = {x: magnitudePOS*Math.cos(anglePOS), y: magnitudePOS*Math.sin(anglePOS)}
            this.x += vectorPOS.x;
            this.y += vectorPOS.y;
        }
    }
    draw(){
        ctx.fillStyle = `${this.color}${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x - camera.x, this.y - camera.y, this.radius, 0, 2*Math.PI);
        ctx.fill();
    }
    update(){
        if(this.move)
        {   var magnitude = Math.sqrt((this.center.x - this.x)**2 + (this.center.y - this.y)**2)/50;
            var angle = Math.atan2((this.center.y - this.y)*2,(this.center.x - this.x)*2); 
            var vector = new Point(magnitude * Math.cos(angle)*3, magnitude * Math.sin(angle)*3);
        }

        if(this.move)
        {   this.x+=vector.x;
            this.y+=vector.y;
        }

        this.opacity*=0.9;
        if(this.opacity < 0.01) return true
    }
}