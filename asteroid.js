class Asteroid {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.r = random(15, 50);
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
        this.offset[i] = random(-15,15);
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
