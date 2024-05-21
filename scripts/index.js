function updateGame(colliders,object){
    for(var i=0; i < object.length; i++)
    {
        object[i].update(colliders,keys)
    }
}