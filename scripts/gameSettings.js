var keys=[]
function LoadGame(loop,fps){
    var FPS = fps;
    var timer = setInterval(loop, 1000/FPS);

    document.addEventListener("keydown", keydown)
    document.addEventListener("keyup", keyup)
}
function keydown(event)
{   
    keys[event.keyCode] = true
    // console.log(event.keyCode)
}

function keyup(event)
{
    keys[event.keyCode] = false
}
