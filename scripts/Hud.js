class Hud{
    constructor(){
    }
    draw(){
        ctx.fillStyle = "white";
        ctx.textAlign = 'center';
        ctx.font = "30px Arial";

        ctx.fillText("Fuel:",35,40);
        ctx.fillStyle = 'white';
        ctx.fillRect(80,20,100,20)
        ctx.fillStyle = 'red';
        ctx.fillRect(80,20,100*player.jetPack.fuel.current/player.jetPack.fuel.max,20)

        ctx.fillStyle = "white";
		ctx.fillText("Munição: "+player.amoo.count+"/"+player.amoo.max, 105, 70);  
    }
}