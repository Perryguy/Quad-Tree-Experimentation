class Ship {
  constructor() {
    this.position = createVector(width / 2, height / 2);
    this.r = 10;
    this.heading = 0;
    this.rotation = 0;
    this.isThrusting = false;
    this.velocity = createVector(0, 0);
    this.velocityMultiplier = 0.2;
  }

  update() {
    this.applyThrust();
    this.position.add(this.velocity);
    // Damping by 2% per frame. (Friction)
    this.velocity.mult(0.98);
  }

  render() {
    // push and pop are p5 functions to stop translation a style based shenanigans. Ref: https://p5js.org/reference/#/p5/push 
    push();
    translate(this.position.x, this.position.y);
    // In Radians ( this.heading + correction for heading. So it thusts in the correct direction)
    rotate(this.heading + PI / 2);
    fill(0);
    stroke(255);
    triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
    pop();
  }

  Thrusting(value) {
    this.isThrusting = value;
  }

  applyThrust() {
    if (!this.isThrusting) return;
    let force = p5.Vector.fromAngle(this.heading);
    force.mult(this.velocityMultiplier);
    this.velocity.add(force);
  }

  setRotation(angle) {
    this.rotation = angle;
  }

  turn() {
    this.heading += this.rotation;
  }

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
