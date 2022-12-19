class Asteroid {
  constructor(position, r) {
    if (position){
    this.position = position.copy();
    } else{
    this.position = createVector(random(width), random(height));
    }
    this.r = r ?? random(30, 50);
    this.vertices = floor(random(5, 15));
    this.velocity = p5.Vector.random2D();
    this.offset = [];
    this.initOffsets();
  }

  update(){
    this.position.add(this.velocity);
  }

  render() {
    push();
    noFill();
    stroke(255);
    translate(this.position.x, this.position.y);
    this.generateProceduralAsteroid();
    pop();
  }
  
  initOffsets(){
    for(let i = 0; i <= this.vertices; i++){
        this.offset[i] = random(-this.r *0.5, this.r *0.5);
    }
  }

  generateProceduralAsteroid(){
    beginShape();
    for(let i = 0; i < this.vertices; i++){
        let angle = map(i, 0,this.vertices, 0, TWO_PI)
        let r = this.r + this.offset[i];
        let x = r * cos(angle);
        let y = r * sin(angle);
        vertex(x, y)
    }
    endShape(CLOSE)
  }

  breakUp(){
    let newAsteroids = [];
    newAsteroids[0] = new Asteroid(this.position, this.r * random(0.5,1));
    newAsteroids[1] = new Asteroid(this.position, this.r * random(0.5, 1));
    return newAsteroids;
  }

  //DRY might need refactoring later
  edges() {
    // Top and bottom edges.
    if (this.position.y > height + this.r) {
        this.position.y = -this.r;
      } else if (this.position.y < -this.r) {
        this.position.y = height - this.r;
      }

    // Left and right edges.
    if (this.position.x > width + this.r) {
      this.position.x = -this.r;
    } else if (this.position.y < -this.r) {
      this.position.x = width - this.r;
    }
  }
}
