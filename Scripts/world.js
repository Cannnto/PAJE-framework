class World {
    constructor(objects) {
        this.objects = objects;
    }
    update() {
        var length = this.objects.length
        for (let i = 0; i < length; i++) {
            this.objects[i].update();
        }
    }
    pushObject(obj) {
        this.objects.push(obj);
    }
}