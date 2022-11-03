let Protag;
let Display;
let Scale;
let Rock = [];
let RockCount = 10;
let menuSelect = 0;
//screenspace is the type of screen the player is currently in
//0 is a title screen, 1 is navigating, 2 is fight screen, 3 is player menu
let screenSpace = 0;
let menuBuild = [];

function startGame() {
    myGameArea.start();
    Scale = myGameArea.canvas.width / 20;
    Protag = new Player();
    Display = new ScreenMode();
    for (i = 0; i < RockCount; i++) {
    Rock[i] = new Stone(Scale * parseInt(Math.random(1,myGameArea.canvas.width / Scale - 1)),Scale * parseInt(Math.random(1,myGameArea.canvas.height / Scale - 2)));
  }
  for (i = 0; i < 3; i++) {
    menuBuild[i] = new SelectionTier(Scale * 15, Scale * (1.5 * i + 9.5));
  }
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function updateGameArea() {
    myGameArea.clear();
    if (screenSpace === 0) {
        Display.title();
      }
      if (screenSpace == 1) {
        Display.game();
      }
      if (screenSpace == 2) {
        Display.fight();
      }
      if (screenSpace == 3) {
        Display.menu();
        for (i = 0; i < menuBuild.length; i++) {
          menuBuild[i].draw();
          menuBuild[i].selected = false;
          menuBuild[menuSelect].selected = true;
        }
    }
}

class Player {
    constructor() {
      this.position = [0, 0];
      this.exp = [0, 100];
      this.vitalMax = [100, 100, 10];
      this.currentVital = [100, 100];
      this.scale = Scale;
    }
    draw() {
      rect(this.position[0], this.position[1], this.scale, this.scale);
    }
    motion(direction) {
      //directions are 0 = up 1 = left 2 = down 3 = right
      if (direction === 0) {
        this.position[1] += this.scale * -1;
        if (this.position[1] < 0) {
          this.position[1] =myGame.canvas.height - this.scale * 2;
          regenField();
        }
        for (i = 0; i < RockCount; i++) {
          if (this.hitDetect(Rock[i])) {
            this.position[1] += this.scale;
          }
        }
      }
      if (direction == 1) {
        this.position[0] += this.scale * -1;
        if (this.position[0] < 0) {
          this.position[0] =myGameArea.canvas.width - this.scale;
          regenField();
        }
        for (i = 0; i < RockCount; i++) {
          if (this.hitDetect(Rock[i])) {
            this.position[0] += this.scale;
          }
        }
      }
      if (direction == 2) {
        this.position[1] += this.scale;
        if (this.position[1] >myGameArea.canvas.height - this.scale * 2) {
          this.position[1] = 0;
          regenField();
        }
        for (i = 0; i < RockCount; i++) {
          if (this.hitDetect(Rock[i])) {
            this.position[1] += this.scale * -1;
          }
        }
      }
      if (direction == 3) {
        this.position[0] += this.scale;
        if (this.position[0] >myGameArea.canvas.width - this.scale) {
          this.position[0] = 0;
          regenField();
        }
        for (i = 0; i < RockCount; i++) {
          if (this.hitDetect(Rock[i])) {
            this.position[0] += this.scale * -1;
          }
        }
      }
    }
    hitDetect(target) {
      if (
        this.position[0] == target.position[0] &&
        this.position[1] == target.position[1]
      ) {
        return true;
      }
    }
    damageDetect(damage) {
      this.currentVital[0] += -1 * damage;
    }
  }

  class ScreenMode {
    title() {
      rect(-1,-1,myGameArea.canvas.width,200);
      text(
        "Press Z to explore the shifting fields to battle monsters and get stronger",
        Scale * 5,
        200
      );
    }
    game() {
      background(200);
      fill(255);
      Protag.draw();
      fill(100);
      for (i = 0; i < RockCount; i++) {
        Rock[i].draw();
      }
    }
    fight() {}
    menu() {
      playerMenu();
    }
  }

  class Stone {
    constructor(x, y) {
      this.position = [x, y];
      this.scale = Scale;
    }
    draw() {
      rect(this.position[0], this.position[1], this.scale, this.scale);
    }
  }
  
  class SelectionTier {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.text = "";
      this.size = Scale;
      this.selected = false;
    }
    draw() {
      if (this.selected) {
        fill(20 * sin(frameCount / 20) + 200);
      } else {
        fill(255);
      }
      rect(this.x, this.y, this.size * 2, this.size);
      fill(0);
      text(this.text, this.x + 2, this.y + this.size / 2);
    }
  }