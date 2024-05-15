class GameSettings{
    constructor(settings){
    this.settings = settings;
    this.paralaxVelocity = settings.paralaxVelocity;
    this.paralaxSize = settings.paralaxSize;
    this.Paralax = [];
    while (this.Paralax.length < 50)
        {	this.Paralax.push(new Paralax(Math.random()*canvas.width,this.paralaxVelocity,this.paralaxSize));
        }
    }
    paralax(){
        context.fillStyle = "rgb(0, 0, 0)";
		for (var i = 0; (i < this.Paralax.length); i++)
		{	this.Paralax[i].draw();

			this.Paralax[i].update();

			if (this.Paralax[i].x < 0)
			{	this.Paralax.splice(i, 1);
				i--;
				this.Paralax.push(new Paralax(canvas.width,this.paralaxVelocity,this.paralaxSize));
			}
		}
    }
}


























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
