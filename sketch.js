let quadTree;
let asteroids = [];
let lasers = [];
let ship;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  ship = new Ship();

  for (var i = 0; i < 10; i++){
  asteroids.push(new Asteroid);
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
  } else if (keyCode == 32){
    //spacebar
    lasers.push(new Laser(ship.position, ship.heading, ship.r))
  }
}

function draw() {
  background(0);

  let boundary = new Rectangle(windowWidth/2, windowHeight/2, windowWidth/2, windowHeight/2);
  quadTree = new QuadTree(boundary, 2);
  
  for (var i = 0; i < asteroids.length; i++){
    asteroids[i].render();
    asteroids[i].update();
    asteroids[i].edges();
    let point = new Point(asteroids[i].position.x, asteroids[i].position.y, asteroids[i]);
    quadTree.insert(point);
  }
  console.log(quadTree)
  quadTree.show();


  for (var i = 0; i < lasers.length; i++){
    lasers[i].render();
    lasers[i].update();
  }

  ship.render();
  ship.turn();
  ship.update();
  ship.edges();
}
