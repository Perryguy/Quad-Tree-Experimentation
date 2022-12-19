class Particle {
  constructor(x, y, velocityX, velocityY) {
    this.x = x;
    this.y = y;
    this.r = 4;
    this.highlight = false;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
  }

  intersects(otherParticle) {
    let distance = dist(this.x, this.y, otherParticle.x, otherParticle.y);
    return distance < this.r + otherParticle.r;
  }

  setHighlight(value) {
    this.highlight = value;
  }

  move() {
    this.x += this.velocityX;
    this.y += this.velocityY;

    if (this.x < 0) {
        this.velocityX = abs(this.velocityX);
      } else if (this.x > width) {
        this.velocityX = -abs(this.velocityX);
      }
      
      if (this.y < 0) {
        this.velocityY = abs(this.velocityY);
      } else if (this.y > height) {
        this.velocityY = -abs(this.velocityY);
      }
  }

  render() {
    noStroke();
    noFill();
    if (this.highlight) {
      fill(255, 255, 0);
    } else {
      fill(100);
    }
    ellipse(this.x, this.y, this.r *2);
  }
}
