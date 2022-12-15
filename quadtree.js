class Point {
  constructor(x, y, userData) {
    this.x = x;
    this.y = y;
    this.userData = userData;
  }
}

class Circle {
    constructor(x, y, r) {
      this.x = x;
      this.y = y;
      this.r = r;
      this.rSquared = this.r * this.r;
    }
  
    contains(point) {
      // check if the point is in the circle by checking if the euclidean distance of
      // the point and the center of the circle if smaller or equal to the radius of
      // the circle
      let d = Math.pow((point.x - this.x), 2) + Math.pow((point.y - this.y), 2);
      return (d <= this.rSquared);
    }
  
    intersects(range) {
  
      var xDist = Math.abs(range.x - this.x);
      var yDist = Math.abs(range.y - this.y);
  
      // radius of the circle
      var r = this.r;
  
      var w = range.w;
      var h = range.h;
  
      var edges = Math.pow((xDist - w), 2) + Math.pow((yDist - h), 2);
  
      // no intersection
      if (xDist > (r + w) || yDist > (r + h))
        return false;
  
      // intersection within the circle
      if (xDist <= w || yDist <= h)
        return true;
  
      // intersection on the edge of the circle
      return edges <= this.rSquared;
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
      range.y + range.h < this.y - this.h
    );
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

  query(range, pointsFound) {
    if (!pointsFound) {
      pointsFound = [];
    }

    if (!this.boundary.intersects(range)) {
      // Returns empty array.
      return pointsFound;
    } else {
      for (let point of this.points) {
        if (range.contains(point)) {
          pointsFound.push(point);
        }
      }

      if (this.hasDivided) {
        this.northWest.query(range, pointsFound);
        this.northEast.query(range, pointsFound);
        this.southWest.query(range, pointsFound);
        this.southEast.query(range, pointsFound);
      }
      return pointsFound;
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
    // for (let p of this.points) {
    //   strokeWeight(4);
    //   point(p.x, p.y);
    // }
  }
}
