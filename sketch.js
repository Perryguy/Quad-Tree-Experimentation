let quadTree;
function setup() {
  createCanvas(1920, 1080);

  //Rectange x&y refer to the rects center point and the width and height (w&h) are half lengths from the center point.
  let boundary = new Rectangle(1920, 1080, 1920 ,1080)
  quadTree = new QuadTree(boundary, 4);
  console.log(quadTree);

  // for(let i = 0; i < 500; i++){
  //   let point = new Point(random(width), random(height))
  //   quadTree.insert(point);
  // }

  // Visualise
  background(0);
  quadTree.show();
}

function draw() {
    if (mouseIsPressed){
      let mousePositionPoint = new Point(mouseX, mouseY) 
      quadTree.insert(mousePositionPoint);
    }
    background(0);
    quadTree.show();
}
