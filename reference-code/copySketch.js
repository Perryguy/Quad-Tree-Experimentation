let quadTree;

function setup() {
  createCanvas(500, 500);
  background(0);
  for (let i = 0; i < 100; i++) {
    particles[i] = new Particle(random(width), random(height), random(10), random(10));
  }
}


function draw() {
  background(0);
  let boundary = new Rectangle(width/2, height/2, width, height);
  quadTree = new QuadTree(boundary, 4);

  for (let particle of particles) {
    let point = new Point(particle.x, particle.y, particle);
    quadTree.insert(point);

    particle.move();
    particle.render();
    particle.setHighlight(false);
    quadTree.show();
  }

  for (let particle of particles) {
    // This will only work if the particles are the same size.
    let range = new Circle(particle.x, particle.y, particle.r *2);
    // Note getting points back. Not Particles!
    let pointsWithinRange = quadTree.query(range);
    for (let otherPoints of pointsWithinRange) {
      let otherParticle = otherPoints.userData;
      if (particle !== otherParticle && particle.intersects(otherParticle)) {
        particle.setHighlight(true);
      }
    }
  }

  // Slow verison below
  //   for (let particle of particles) {
  //     for (let otherParticle of particles) {
  //       if (particle !== otherParticle && particle.intersects(otherParticle)) {
  //         particle.setHighlight(true);
  //       }
  //     }
  //   }
}
