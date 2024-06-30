class HUD {
    draw() {
        context.font = "20px Arial";
		context.textAlign = "left";
		context.textBaseline = "top";
        
        context.fillStyle = "white";
        context.fillText("Arma: "+player.currentWeapon.name, 10, canvas.height-70);
        context.fillText("Munição: "+player.currentWeapon.ammo.count+"/"+player.currentWeapon.ammo.max, 10,canvas.height-50);
        if (player.currentWeapon.ammo.count == 0 && player.currentWeapon.reloadCurrent < player.currentWeapon.reloadTime) {
            context.fillStyle = "blue";
            context.fillRect(player.center.x-player.width/2, player.center.y-player.height/2-6, player.width*player.currentWeapon.reloadPercent/100, 5);

            context.font = "10px Arial";
            context.textAlign = "left";
		    context.textBaseline = "top";

            context.fillStyle = "white";
            context.fillText("reloading...", player.center.x-23, player.center.y-player.height/2-20);
        }
    }
}