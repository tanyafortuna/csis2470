// Helper variables
let space, pencil;
let stars = new Array(), mines = new Array(), homebase, ship, shipStart;
let overlapped;
let won = false, lost = false;
let starColors = ["plum", "lightblue", "palegoldenrod", "lightsalmon", "palegreen"];
let mineColors = ["#6D6968", "grey"];

// Home base and mines
class Rectangle {
  constructor(p, w, h, c) {
    this.pencil = p;
    this.w = w;
    this.h = h;
    this.c = c;
    this.x = Math.floor(Math.random() * (space.width - this.w));
    this.y = Math.floor(Math.random() * (space.height - this.h));
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
  constructor(p, x, y, r, c) {
    this.pencil = p;
    this.x = x;
    this.y = y;
    this.r = r;
    this.c = c;
  }

  show() {
    this.pencil.beginPath();
    this.pencil.fillStyle = this.c;
    this.pencil.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    this.pencil.fill();
    this.pencil.closePath();
  };
}

// Main
window.addEventListener("resize", setup);
setup();
draw();

// Functions
function setup() {
  won = false;
  lost = false;
  window.addEventListener("keydown", navigate);

  space = document.querySelector('canvas');
  space.width = window.innerWidth;
  space.height = window.innerHeight;

  pencil = space.getContext('2d');

  drawStars();
  drawShip();
  drawHomebase();
  drawMines();
  pencil.drawImage(ship.model, ship.x, ship.y);
}

function drawStars() {
  stars = [];
  for (let i = 0; i < 200; i++) {
    let tempx = space.width * Math.random();
    let tempy = space.height * Math.random();
    let tempr = 2 * Math.random() + .5;
    let tempc = starColors[Math.floor(starColors.length * Math.random())];

    stars.push(new Circle(pencil, tempx, tempy, tempr, tempc));
    stars[i].show();
  }
}

function drawShip() {
  ship = {
    x: undefined,
    y: undefined,
    h: 90,
    w: 87,
    speed: 15,
    model: document.querySelector("img"),
  }
  ship.x = space.width / 2 - ship.w / 2;
  ship.y = space.height - ship.h;

  // set up a phantom ship area so mines and the homebase do not overlap
  shipStart = new Rectangle(pencil, 90, 87, "transparent");
  shipStart.x = ship.x;
  shipStart.y = ship.y;
}

function drawHomebase() {
  // do not overlap ship
  overlapped = false;
  do {
    homebase = new Rectangle(pencil, 300, 200, "silver");
    overlapped = overlapping(shipStart, homebase);
  } while (overlapped);
  homebase.show();
}

function drawMines() {
  mines = [];
  for (let i = 0; i < 25; i++) {
    let tempc = mineColors[Math.floor(mineColors.length * Math.random())];
    let tempMine = new Rectangle(pencil, 50, 50, tempc);

    // mega overlapping check (do not overlap ship, homebase, or other mines)
    overlapped = false;
    if (overlapping(shipStart, tempMine) || overlapping(homebase, tempMine)) i--;
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

function draw() {
  pencil.clearRect(0, 0, space.width, space.height);
  requestAnimationFrame(draw);

  for (let star of stars) star.show();
  homebase.show();
  pencil.drawImage(ship.model, ship.x, ship.y);

  if (isHome()) { won = true; endGame(); }
  else if (collided()) { lost = true; endGame(); }
  else for (let mine of mines) mine.show();
}

function navigate(e) {
  switch (e.code) {
    case "ArrowUp": ship.y -= ship.speed; break;
    case "ArrowDown": ship.y += ship.speed; break;
    case "ArrowLeft": ship.x -= ship.speed; break;
    case "ArrowRight": ship.x += ship.speed; break;
  }
}

function isHome() {
  if (ship.x > homebase.x &&
    ship.x + ship.w < homebase.x + homebase.w &&
    ship.y > homebase.y &&
    ship.y + ship.h < homebase.y + homebase.h)
    return true;
  else return false;
}

function collided() {
  for (let mine of mines) if (overlapping(ship, mine)) return true;
  return false;
}

function endGame() {
  window.removeEventListener("keydown", navigate);
  window.addEventListener("keydown", replay);

  let text;
  if (won) text = "Yippee! Press ESC to play again.";
  if (lost) text = "Whoopsies! Press ESC to play again.";

  pencil.font = "70px Tahoma";
  pencil.fillStyle = "darkturquoise";
  if (won || lost) pencil.fillText(text, (space.width - pencil.measureText(text).width) / 2, space.height / 2);
}

function replay(e) {
  if (e.code == "Escape") {
    window.removeEventListener("keydown", replay);
    setup();
  }
}

function overlapping(obj1, obj2) {
  return !(obj1.x + obj1.w < obj2.x ||
    obj1.x > obj2.x + obj2.w ||
    obj1.y + obj1.h < obj2.y ||
    obj1.y > obj2.y + obj2.h);
}