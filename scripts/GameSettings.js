var keys = [];
var mouseY;
var mouseX;

function LoadGame(loop,fps){
    var FPS = fps;
    setInterval(loop, 1000/FPS);
    //requestAnimationFrame(loop);

    document.addEventListener("keydown", keydown);
    document.addEventListener("keyup", keyup);
    document.addEventListener("keypress", keypress);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mousedown",mouseDown);
    document.addEventListener("mouseup",mouseUp);
}
function keypress(event)
{
    if(event.key == 'g'){
        player.negativeGravity();
    }
}
function keydown(event)
{   keys[event.keyCode] = true;
    // console.log(event.keyCode)
}
function keyup(event)
{   keys[event.keyCode] = false;
}

function onMouseMove(event)
{	event.preventDefault();
    mouseX = event.clientX;
    mouseY = event.clientY;
}
function mouseDown()
{   keys[300] = true;
}
function mouseUp()
{   keys[300] = false;
}