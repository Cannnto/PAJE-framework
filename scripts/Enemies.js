class Enemies{
    constructor(){
        this.enemies = [];
        this.width = 50;
        this.height = 25;
    }
    iterate(){
        (Math.random()<0.05 ? (Math.random()<0.8 ? 
        (Math.random()<0.5 ? this.enemies.push(new Enemy(camera.x,Math.random()*camera.height,this.width,this.height)) :
        this.enemies.push(new Enemy(camera.x+camera.width,Math.random()*camera.height,this.width,this.height))) : 
        this.enemies.push(new Enemy(Math.random()*camera.width,camera.y,this.width,this.height))) : null);

        for(let i=0; i<this.enemies.length; i++){
            
            if(this.enemies[i].update()){
                this.enemies.splice(i,1);
                i--;
            }
        }
    }
    die(enemy){
        this.enemies.splice(this.enemies.indexOf(enemy), 1);
    }
}