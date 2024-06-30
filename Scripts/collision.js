
function lineCollide(x1, y1, x2, y2, x3, y3, x4, y4) {
    let uA = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3)) / ((y4-y3) * (x2-x1) - (x4-x3) * (y2-y1));

    let uB = ((x2-x1) * (y1-y3) - (y2-y1) * (x1-x3)) / ((y4-y3) * (x2-x1) - (x4-x3) * (y2-y1));

    return (uA >= 0 && uA <= 1 && uB >= 0 && uB <=1);
}

function polyLine(poly, x1, y1, x2, y2) {
    var arrayLength = poly.hitbox.points.length;
    var next = 0;
    for (let current = 0; current < arrayLength; current++) {
        next = current + 1;
        if (next == arrayLength) next = 0;
        var x3 = poly.hitbox.points[current].x;
        var y3 = poly.hitbox.points[current].y;
        var x4 = poly.hitbox.points[next].x;
        var y4 = poly.hitbox.points[next].y;
        var hit = lineCollide(x1, y1, x2, y2, x3, y3, x4, y4);
        if (hit) {
            return true;
            }
        }
    return false;
}

/* function polyPolyCollide(polyArray, poly2) {
    var arrayLength = polyArray.length;
    var obstacleList = [];
    for (let obstacle = 0; obstacle < arrayLength; obstacle++) {
        var next = 0;
        var polygonLength = polyArray[obstacle].hitbox.points.length;
        //collide = top, right, bottom, left
        var collide = [false, false, false, false, polyArray[obstacle]];
        for (let current = 0; current < polygonLength; current++) {
            next = current + 1;
            if (next == polyArray[obstacle].hitbox.points.length) next = 0;
            var vc = polyArray[obstacle].hitbox.points[current];    // c for "current"
            var vn = polyArray[obstacle].hitbox.points[next];       // n for "next"
            var collision = polyLine(poly2, vc.x,vc.y,vn.x,vn.y);
            if (collision) {
                switch (current) {
                    case (0):
                        collide[0] = true;
                        break;
                    case (1):
                        collide[1] = true;
                        break;
                    case (2):
                        collide[2] = true;
                        break;
                    case (3):
                        collide[3] = true;
                        break;           
                    }
                }
            }
            obstacleList.push(collide);
    }
    return obstacleList;
} */
function polyPolyCollide(poly1, poly2) {
    var next = 0;
    var polygonLength = poly1.hitbox.points.length;
    for (let current = 0; current < polygonLength; current++) {
        next = current + 1;
        if (next == polygonLength) next = 0;
        var vc = poly1.hitbox.points[current];    // c for "current"
        var vn = poly1.hitbox.points[next];       // n for "next"
        var collision = polyLine(poly2, vc.x,vc.y,vn.x,vn.y);
        if (collision) {
            return true;
            }
        }
    return false   
}
function playerCollide() {
    var arrayLength = environment.objects.length;
    for (let obstacle = 0; obstacle < arrayLength; obstacle++) {
        this.parent.groundCheck(environment.objects[obstacle]);
        var collide = polyPolyCollide(environment.objects[obstacle], this.parent);
        if (collide){
            return true;
        }
    }
    return false;
}
function floorCollide(obstacleObject) {
    var vc = obstacleObject.hitbox.points[0];
    var vn = obstacleObject.hitbox.points[1];
    var collision = polyLine(this, vc.x,vc.y,vn.x,vn.y);
    if (collision) {
        this.grounded = true;
        //console.log("está no chão");
        return true;
    }
    this.grounded = false;
    //console.log("não está no chão");
    return false;
}
function bulletCollide(obstacle){
	for (let currentPoint = 0; (currentPoint < this.geometry.hitbox.points.length); currentPoint++)
	{	nextPoint = (currentPoint+1)%this.geometry.hitbox.points.length;
		bulletLine = new Point(this.geometry.hitbox.points[nextPoint].x-this.geometry.hitbox.points[currentPoint].x, this.geometry.hitbox.points[nextPoint].y-this.geometry.hitbox.points[currentPoint].y);
		for (currentOtherPoint = 0; (currentOtherPoint < obstacle.hitbox.points.length); currentOtherPoint++)
		{	nextOtherPoint = (currentOtherPoint+1)%obstacle.hitbox.points.length;
			v = new Point(obstacle.hitbox.points[nextOtherPoint].x-obstacle.hitbox.points[currentOtherPoint].x, obstacle.hitbox.points[nextOtherPoint].y-obstacle.hitbox.points[currentOtherPoint].y);
			w = new Point(this.geometry.hitbox.points[currentPoint].x-obstacle.hitbox.points[currentOtherPoint].x, this.geometry.hitbox.points[currentPoint].y-obstacle.hitbox.points[currentOtherPoint].y);
			m = v.y*bulletLine.x-v.x*bulletLine.y;
			a = (v.x*w.y-v.y*w.x)/m;
			b = (bulletLine.x*w.y-bulletLine.y*w.x)/m;
			if ((a >= 0) && (a <= 1) && (b >= 0) && (b <= 1)) return(v);
		}
	}
	return(null);
}

function hookCollide(obstacle){
	for (let currentPoint = 0; (currentPoint < this.geometry.hitbox.points.length); currentPoint++)
	{	nextPoint = (currentPoint+1)%this.geometry.hitbox.points.length;
		bulletLine = new Point(this.geometry.hitbox.points[nextPoint].x-this.geometry.hitbox.points[currentPoint].x, this.geometry.hitbox.points[nextPoint].y-this.geometry.hitbox.points[currentPoint].y);
		for (currentOtherPoint = 0; (currentOtherPoint < obstacle.hitbox.points.length); currentOtherPoint++)
		{	nextOtherPoint = (currentOtherPoint+1)%obstacle.hitbox.points.length;
			v = new Point(obstacle.hitbox.points[nextOtherPoint].x-obstacle.hitbox.points[currentOtherPoint].x, obstacle.hitbox.points[nextOtherPoint].y-obstacle.hitbox.points[currentOtherPoint].y);
			w = new Point(this.geometry.hitbox.points[currentPoint].x-obstacle.hitbox.points[currentOtherPoint].x, this.geometry.hitbox.points[currentPoint].y-obstacle.hitbox.points[currentOtherPoint].y);
			m = v.y*bulletLine.x-v.x*bulletLine.y;
			a = (v.x*w.y-v.y*w.x)/m;
			b = (bulletLine.x*w.y-bulletLine.y*w.x)/m;
			if ((a >= 0) && (a <= 1) && (b >= 0) && (b <= 1)) return(v);
		}
	}
	return(null);
}