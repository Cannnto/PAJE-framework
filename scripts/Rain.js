class Rain{
    constructor(objs){
            this.objs = [];
            for(let i=0;i<objs.length;i++){
                this.objs[i] = objs[i]
            }

        this.objs.pop();
        this.gotas = [];
        this.count=0;
        while (this.gotas.length < 1000)
            {	this.gotas.push(new Projectile(camera.x+Math.random()*camera.width*1.5, camera.y+Math.random()*camera.height, 20, 1, 10, -180, 0,projectileCollide));
            }
    }


    update(){
        for(let i = 0; i < this.gotas.length; i++){
            
            this.gotas[i].draw('rgba(0,0,255');

            if(this.gotas[i].update(this.objs) || this.gotas[i].y>camera.height){

                this.gotas.splice(i, 1);
                i--;
                this.gotas.push(new Projectile(camera.x+Math.random()*camera.width*1.5, 0, 20, 1, 10, -180, 0,projectileCollide));
}}}}