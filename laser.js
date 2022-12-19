class Laser {
  constructor(shipPosition, shipHeading, shipR) {
    this.position = createVector(shipPosition.x, shipPosition.y);
    this.velocity = p5.Vector.fromAngle(shipHeading);
    this.velocity.mult(8);
    this.offSet = shipR;
  }

  update() {
    this.position.add(this.velocity);
  }

  render() {
    push();
    stroke(255);
    strokeWeight(2);
    point(this.position.x, this.position.y);
    pop();
  }
}
