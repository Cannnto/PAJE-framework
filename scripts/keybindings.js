/* function pressedKey(event) {
    player.key[event.keyCode] = true;
}

function upKey(event) {
    player.key[event.keyCode] = false;
} */

function pressedKey(event) {
    switch (event.code) {
        case "Space":
            player.keys["jump"] = true;
            break;
        case "KeyA":
            player.keys["left"] = true;
            break;
        case "KeyD":
            player.keys["right"] = true;
            break;
        case "KeyR":
            player.keys["shoot"] = true;
            break;
        case "KeyF":
            player.keys["hook"] = true;
            break;
        case "Digit1":
            player.keys["switch1"] = true;
            break;
        case "Digit2":
            player.keys["switch2"] = true;
            break;             
    }
}
    
function upKey(event) {
    switch (event.code) {
        case "Space":
            player.keys["jump"] = false;
            break;
        case "KeyA":
            player.keys["left"] = false;
            break;
        case "KeyD":
            player.keys["right"] = false;
            break;
        case "KeyR":
            player.keys["shoot"] = false;
            break;
        case "KeyF":
            player.keys["hook"] = false;
            break;
        case "Digit1":
            player.keys["switch1"] = false;
            break;
        case "Digit2":
            player.keys["switch2"] = false;
            break;             
    }
}