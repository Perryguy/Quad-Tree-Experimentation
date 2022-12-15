class Particle {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.r = 8;
    }

    move() {
        this.x += random(-1, 1);
        this.y += random(-1,1);
    }

    render() {
        noStroke();
        fill(255);
        ellipse(this.x, this.y, this.r);
    }
}