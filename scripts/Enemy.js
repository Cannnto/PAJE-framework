class Enemy extends Poly{
    constructor(x, y, width, height){  
        super(x, y, width, height,polyCollide);

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.objs = [player];
        this.angle = 0;
        this.center = {x: 0, y: 0};
    }
    draw(){
        ctx.save();
        ctx.translate(this.center.x,this.center.y)
        ctx.rotate(this.angle - (90*Math.PI/180));
        ctx.translate(-this.center.x,-this.center.y)
            // super.draw('red');
            //body
            ctx.fillStyle = 'red';
            ctx.fillRect(this.center.x-15,this.y,30,15);

            //leftEye
            ctx.fillStyle = 'black';
            ctx.fillRect(this.center.x-10,this.y+4,5,5);
            //rightEye
            ctx.fillStyle = 'black';
            ctx.fillRect(this.center.x+4,this.y+4,5,5);
            //mouth
            ctx.fillStyle = 'white';
            ctx.fillRect(this.center.x-4,this.center.y-2,7,2);

            //LeftEyeBrow
            ctx.save();
                ctx.translate(this.center.x+6,this.y+3)
                ctx.rotate(45*Math.PI/180);
                ctx.translate(-this.center.x,-this.y+4)
                ctx.fillStyle = 'white';
                ctx.fillRect(this.center.x-10,this.y+4,5,2);
            ctx.restore()
            //RightEyeBrow
            ctx.save();
                ctx.translate(this.center.x-7,this.y+2)
                ctx.rotate(-45*Math.PI/180);
                ctx.translate(-this.center.x,-this.y+4)
                ctx.fillStyle = 'white';
                ctx.fillRect(this.center.x+4,this.y+4,5,2);
            ctx.restore()
            
            //leftHand
            ctx.fillStyle = 'black';
            ctx.fillRect(this.x+1-camera.x,this.center.y-1,20,15);
            ctx.fillStyle = 'red';
            ctx.fillRect(this.x-camera.x,this.center.y,20,13);
            //RightHand
            ctx.fillStyle = 'black';
            ctx.fillRect(this.center.x+3,this.center.y-1,20,13);
            ctx.fillStyle = 'red';
            ctx.fillRect(this.center.x+4,this.center.y,20,13);
        ctx.restore();
    }
    update(){
        this.x = this.points[0].x;
        this.y = this.points[0].y;

        this.center = {x: this.x + this.width/2 - camera.x, y: this.y + this.height/2 - camera.y};
        this.draw();

        this.angle = Math.atan2((player.center.y - (this.center.y) - camera.y),(player.center.x - (this.center.x) - camera.x)); 
        var vector = {x: 5*Math.cos(this.angle), y: 5*Math.sin(this.angle)};    

        // for(let i=0;i<5;i++){
            super.translate(vector.x,vector.y);
            if(this.collide(this.objs)) return 1;
        // }
    }
}