class Laser {
  constructor(shipPosition, shipHeading, shipR) {
    this.position = createVector(shipPosition.x, shipPosition.y);
    this.velocity = p5.Vector.fromAngle(shipHeading);
    this.velocity.mult(8);
    this.offSet = shipR;
  }

  hit(asteroid) {
    let distance = dist(this.position.x, this.position.y, asteroid.position.x, asteroid.position.y)
    if (distance < asteroid.r){
      return true;
    } else {
      return false;
    }
  }

  offScreen() {
    // Top and bottom edges.
    if (this.position.y > height || this.position.y <0 ) {
        return true;
      }
    // Left and right edges.
    if (this.position.x > width || this.position.y < 0) {
      return true;
    }

    return false;
  }

  update() {
    this.position.add(this.velocity);
  }

  render() {
    push();
    stroke(31, 81, 255);
    strokeWeight(3);
    point(this.position.x, this.position.y);
    pop();
  }
}
