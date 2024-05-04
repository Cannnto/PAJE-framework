class keybinding{
    constructor(teclas)
    {   this.teclas = teclas
    }

    pressed()
    {
        if(teclas[this.teclas[0]])
        {
            player.move(0,-1)
        }
        if(teclas[this.teclas[1]])
        {
            player.move(0,1)
        }
        if(teclas[this.teclas[2]])
        {
            player.move(-1,0)
        }
        if(teclas[this.teclas[3]])
        {
            player.move(1,0)
        }
    }
}

var teclas = []

document.addEventListener("keydown", keydown)
document.addEventListener("keyup", keyup)

function keydown(Event)
{   
    teclas[Event.keyCode] = true
}

function keyup(Event)
{
    teclas[Event.keyCode] = false
}
