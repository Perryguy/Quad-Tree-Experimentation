class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Rectangle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  contains(point) {
    //Function which checks whether a point is within the current boundary.
    return (
      point.x >= this.x - this.w &&
      point.x <= this.x + this.w &&
      point.y >= this.y - this.h &&
      point.y <= this.y + this.h
    );
  }

  intersects(range) {
    // Do these two rectangles overlap? Returns conditions are true they don't interect. This is why it is negated! 
    return !(
      range.x - range.w > this.x + this.w ||
      range.x + range.w < this.x - this.w ||
      range.y - range.h > this.y + this.h ||
      range.y + range.h < this.y - this.h);
  }
}

class QuadTree {
  constructor(boundary, capacity) {
    this.boundary = boundary;
    this.capacity = capacity;
    this.points = [];
    this.hasDivided = false;
  }

  subdivide() {
    let x = this.boundary.x;
    let y = this.boundary.y;
    let w = this.boundary.w / 2;
    let h = this.boundary.h / 2;

    let northEastRectangle = new Rectangle(x + w, y - h, w, h);
    this.northEast = new QuadTree(northEastRectangle, this.capacity);

    let northWestRectangle = new Rectangle(x - w, y - h, w, h);
    this.northWest = new QuadTree(northWestRectangle, this.capacity);

    let southEastRectangle = new Rectangle(x + w, y + h, w, h);
    this.southEast = new QuadTree(southEastRectangle, this.capacity);

    let southWestRectangle = new Rectangle(x - w, y + h, w, h);
    this.southWest = new QuadTree(southWestRectangle, this.capacity);

    this.hasDivided = true;
  }

  insert(point) {
    if (!this.boundary.contains(point)) {
      return false;
    }
    if (this.points.length < this.capacity) {
      this.points.push(point);
      return true;
    } else {
      if (!this.hasDivided) {
        this.subdivide();
      }

      if (this.northEast.insert(point)) {
        return true;
      }

      if (this.northWest.insert(point)) {
        return true;
      }

      if (this.southEast.insert(point)) {
        return true;
      }

      if (this.southWest.insert(point)) {
        return true;
      }
    }
  }

  query(range) {
    if (!this.boundary.intersects(range)) {
      return;
    }
  }

  show() {
    stroke(255);
    strokeWeight(1);
    noFill();
    rectMode(CENTER);
    rect(
      this.boundary.x,
      this.boundary.y,
      this.boundary.w * 2,
      this.boundary.h * 2
    );
    if (this.hasDivided) {
      this.northEast.show();
      this.northWest.show();
      this.southEast.show();
      this.southWest.show();
    }
    for (let p of this.points) {
      strokeWeight(4);
      point(p.x, p.y);
    }
  }
}
