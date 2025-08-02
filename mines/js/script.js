// Helper variables
let space, pencil;
let stars = new Array(), mines = new Array(), homebase, ship;
let overlapped;
let starColors = ["plum", "lightblue", "palegoldenrod", "lightsalmon", "palegreen"];
let mineColors = ["#6D6968", "grey"];

// Home base and mines
class Rectangle {
  constructor(p, w, h, c, ship = false) {
    this.pencil = p;
    this.w = w;
    this.h = h;
    this.c = c;
    this.ship = ship
    if (this.ship) {
      this.x = space.width / 2;
      this.y = space.height - this.h;
    }
    else {
      this.x = Math.floor(Math.random() * (space.width - this.w));
      this.y = Math.floor(Math.random() * (space.height - this.h));
    }
  }

  show() {
    this.pencil.beginPath();

    this.pencil.fillStyle = this.c;
    this.pencil.rect(this.x, this.y, this.w, this.h);
    this.pencil.fill();

    this.pencil.closePath();
  };
}

// Stars
class Circle {
  constructor(x, y, r, p) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.pencil = p;
  }

  show() {
    this.pencil.beginPath();

    let tempc = Math.floor(starColors.length * Math.random());
    this.pencil.fillStyle = starColors[tempc];
    this.pencil.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    this.pencil.fill();

    this.pencil.closePath();
  };

  // todo not really needed for this
  move() {
    this.x += 10;
    this.y += 5;
  };
}

// Canvas setup
window.addEventListener("resize", setupCanvas);
setupCanvas();

// Functions
function setupCanvas() {
  space = document.querySelector('canvas');
  space.width = window.innerWidth;
  space.height = window.innerHeight;

  pencil = space.getContext('2d');

  // draw stars
  stars = [];
  for (let i = 0; i < 200; i++) {
    let tempx = space.width * Math.random();
    let tempy = space.height * Math.random();
    let tempr = Math.floor(3 * Math.random()) + 1;

    stars.push(new Circle(tempx, tempy, tempr, pencil));
    stars[i].show();
  }

  // set ship starting position
  ship = new Rectangle(pencil, 90, 87, "black", true);
  ship.show();


  // draw homebase (do not overlap ship)
  overlapped = false;
  do {
    homebase = new Rectangle(pencil, 300, 200, "gainsboro");
    overlapped = overlapping(ship, homebase);
  } while (overlapped);
  homebase.show();

  // draw mines
  mines = [];
  for (let i = 0; i < 25; i++) {
    let tempc = mineColors[Math.floor(mineColors.length * Math.random())];
    let tempMine = new Rectangle(pencil, 50, 50, tempc);

    // mega overlapping check (do not overlap ship, homebase, or other mines)
    let overlapped = false;
    if (overlapping(ship, tempMine) || overlapping(homebase, tempMine)) i--;
    else {
      for (let x = 0; x < mines.length; x++) {
        if (overlapping(mines[x], tempMine)) {
          overlapped = true;
          break;
        }
      }

      if (overlapped) i--;
      else {
        mines.push(tempMine);
        mines[i].show();
      }
    }
  }
}

function overlapping(obj1, obj2) {
  return !(obj1.x + obj1.w < obj2.x ||
    obj1.x > obj2.x + obj2.w ||
    obj1.y + obj1.h < obj2.y ||
    obj1.y > obj2.y + obj2.h);
}

// function draw(obj) {
//   requestAnimationFrame(draw);
//   pencil.clearRect(0, 0, space.width, space.height);
//   obj.update();
//   obj.show();
// }

