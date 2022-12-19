let asteroids = [];
let lasers = [];
let ship;
let score = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  ship = new Ship();

  for (var i = 0; i < 10; i++) {
    asteroids.push(new Asteroid());
  }
}

//Controls
function keyPressed() {
  if (keyCode == RIGHT_ARROW) {
    ship.setRotation(0.1);
  } else if (keyCode == LEFT_ARROW) {
    ship.setRotation(-0.1);
  } else if (keyCode == UP_ARROW) {
    ship.Thrusting(true);
  }
}

function keyReleased() {
  if (keyCode == RIGHT_ARROW) {
    ship.setRotation(0);
  } else if (keyCode == LEFT_ARROW) {
    ship.setRotation(0);
  } else if (keyCode == UP_ARROW) {
    ship.Thrusting(false);
  } else if (keyCode == 32) {
    //spacebar
    lasers.push(new Laser(ship.position, ship.heading, ship.r));
  }
}

function draw() {
  background(0);
  noStroke();
  fill(255);
  textSize(40);
  text(score, width / 2, 50);

  for (var i = 0; i < asteroids.length; i++) {
    if (ship.hits(asteroids[i])) {
      console.log("shit..");
      //find a better place for the score
      score = 0;
    }
    asteroids[i].render();
    asteroids[i].update();
    asteroids[i].edges();
  }

  for (let i = lasers.length - 1; i >= 0; i--) {
    lasers[i].render();
    lasers[i].update();

    if (lasers[i].offScreen()) {
      lasers.splice(i, 1);
    } else {
      for (let j = asteroids.length - 1; j >= 0; j--) {
        if (lasers[i].hit(asteroids[j])) {
          //find a better place for the score.
          score += 1;

          if (asteroids[j].r > 25) {
            let newAsteroids = asteroids[j].breakUp();
            asteroids.push.apply(asteroids, newAsteroids);
          }
          asteroids.splice(j, 1);
          lasers.splice(i, 1);
          break;
        }
      }
    }
  }

  ship.render();
  ship.turn();
  ship.update();
  ship.edges();
}
