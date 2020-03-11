var squares = [];
var turnCounter = 0; // 0 = player 1 turn
var mark1 = 'O';
var mark2 = 'X';
var winScreen = 0;
var winMsg = "";

function setup() {
  createCanvas(450, 450);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      squares.push(new Square(150 * i, 150 * j, 150, 3 * i + j));
    }
  }
}
function draw() {
  background(0);
  stroke(255);
  noFill();
  textSize(48);
  textAlign(CENTER, CENTER);
  rect(0, 0, 150, 150);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      squares[3 * i + j].show();
    }
  }
}

class Square {
  constructor(_x, _y, _size, _index) {
    this.x = _x;
    this.y = _y;
    this.size = _size;
    this.index = _index;
    this.content = this.index;
  }

  show() {
    rect(this.x, this.y, this.size, this.size);
    text(this.content, this.x + this.size / 2, this.y + this.size / 2);
    if(winScreen == 1){
      fill(0);
      rect(0,0,width,height);
      fill(255);
      text(winMsg, width / 2, height / 2);
    }
  }

  change() {
    if (turnCounter % 2 == 0) {
      this.content = mark1;
    }
    else {
      this.content = mark2;
    }
    turnCounter++;
  }
  checkWin() {
    for (let i = 0; i < 3; i++) {
      if (squares[i].content == squares[i + 3].content && squares[i].content == squares[i + 6].content) {
        this.victory(squares[i].content);
      }
      if (squares[3 * i].content == squares[3 * i + 1].content && squares[3 * i].content == squares[3 * i + 2].content) {
        this.victory(squares[3 * i].content);
      }
      if (squares[0].content == squares[4].content && squares[0].content == squares[8].content) {
        this.victory(squares[4].content);
      }
      if (squares[2].content == squares[4].content && squares[6].content == squares[4].content) {
        this.victory(squares[4].content);
      }
    }
  }
  victory(c) {
    winScreen = 1;
    if (c == mark1) {
      print("player one wins");
      fill(0);
      rect(-1, -1, width + 1, height + 1);
      // text("player one wins", width / 2, height / 2);
      winMsg = "player one wins";
    }
    if (c == mark2) {
      fill(0);
      print("player two wins");
      rect(-1, -1, width + 1, height + 1);
      // text("player two wins", width / 2, height / 2);
      winMsg = "player two wins";
    }
  }

  reset() {
    turnCounter = 0;
    for (let i = 0; i < squares.length; i++) {
      squares[i].content = squares[i].index;
    }
    winScreen = 0;
  }
}

function mouseClicked() {
  if (winScreen == 0) {
    let x = floor(mouseX / 150);
    let y = floor(mouseY / 150);
    squares[3 * x + y].change();
    if (turnCounter > 4) {
      squares[3 * x + y].checkWin();
    };
  }
  if(turnCounter > 9){
    squares[0].reset();
  }
}

function keyPressed(){
  if(key == 'r'){
    squares[0].reset();
  }
}