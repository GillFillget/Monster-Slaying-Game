const ctx = document.getElementById('myCanvas').getContext('2d');
const canvas = document.getElementById('myCanvas');
let posValue = 0;
let Protag;
let Display;
let Scale;
let Rock = [];
let RockCount = 20;
let menuSelect = 0;
//screenspace is the type of screen the player is currently in
//0 is a title screen, 1 is navigating, 2 is fight screen, 3 is player menu
let screenSpace = 0;
let menuBuild = [];
let nightTime = 0;


function init(){
    Scale = canvas.width / 20;
    Protag = new Player();
    Display = new ScreenMode();
    for (i = 0; i < RockCount; i++) {
    Rock[i] = new Stone(Scale * parseInt(random(1, canvas.width / Scale - 1)),Scale * parseInt(random(1, canvas.height / Scale - 1)));
    }
     for (i = 0; i < 3; i++) {
        menuBuild[i] = new SelectionTier(Scale * 15, Scale * (1.5 * i + 11));
     }
    window.requestAnimationFrame(draw);
}

function draw(){
    ctx.globalCompositeOperation = 'destination-over';
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
        //looping code
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
            for (i = 0; i < menuBuild.length; i++) {
              menuBuild[i].draw();
              menuBuild[i].selected = false;
              menuBuild[menuSelect].selected = true;
            }
            Display.menu();
          }
    ctx.fillStyle = "rgba(200, 200, 200, 0.2)";
    rect(0,0,canvas.width,canvas.height);
    window.requestAnimationFrame(draw);
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
        ctx.fillStyle = "black";
        rect(this.position[0], this.position[1], this.scale, this.scale);
    }
    motion(direction) {
      //directions are 0 = up 1 = left 2 = down 3 = right
      if (direction === 0) {
        this.position[1] += this.scale * -1;
        if (this.position[1] < 0) {
          this.position[1] = canvas.height - this.scale;
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
          this.position[0] = canvas.width - this.scale;
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
        if (this.position[1] > canvas.height - this.scale) {
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
        if (this.position[0] > canvas.width - this.scale) {
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
      ctx.fillStyle = 'black';
      ctx.fillText("Press Z to explore the shifting fields to battle monsters and get stronger",Scale * 5,200);
    }
    game() {
      ctx.fillStyle = 'black';
      Protag.draw();
      for (i = 0; i < RockCount; i++) {
        ctx.fillStyle = 'grey';
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


function Affirm() {
    if (screenSpace == 3) {
      if (menuSelect == 0&&Protag.exp[1]>=100) {
        menuSelect = 0;
        levelUP();
      } else if (menuSelect == 1) {
        Protag.currentVital[0] += Protag.vitalMax[0] / 2;
        if (Protag.currentVital[0] > Protag.vitalMax[0]) {
          Protag.currentVital[0] = Protag.vitalMax[0];
        }
      } else if (menuSelect == 2) {
        screenSpace = 1;
        menuSelect = 0;
        while(menuBuild.length > 3){
          menuBuild.pop();
        }
      }
      if(Protag.exp[1]>=100&&menuSelect == 3){
        menuSelect = 0;
        Protag.exp[0] += 1;
        Protag.exp[1] += -100;
        Protag.vitalMax[0] += 10;
        Protag.currentVital[0] += 10;
        if(Protag.exp[1]<100){
            while(menuBuild.length > 3){
                menuBuild.pop();
            }
        }
      }
      if(Protag.exp[1]>=100&&menuSelect == 4){
        menuSelect = 0;
        Protag.exp[0] += 1;
        Protag.exp[1] += -100;
        Protag.vitalMax[1] += 10;
        Protag.currentVital[1] += 10;
        if(Protag.exp[1]<100){
            while(menuBuild.length > 3){
                menuBuild.pop();
            }
        }
      }
      if(Protag.exp[1]>=100&&menuSelect == 5){
        menuSelect = 0;
        Protag.exp[0] += 1;
        Protag.exp[1] += -100;
        Protag.vitalMax[2] += 5;
        if(Protag.exp[1]<100){
            while(menuBuild.length > 3){
                menuBuild.pop();
            }
        }
      }
    } else if (screenSpace == 1) {
      screenSpace = 3;
    }
  }
  
  function regenField() {
    for (i = 0; i < RockCount; i++) {
      Rock[i].position[0] = Scale * parseInt(random(1, (canvas.width / Scale - 1)));
      Rock[i].position[1] = Scale * parseInt(random(1, (canvas.height / Scale - 1)));
    }
  }
  
  function playerMenu() {
    
    ctx.fillStyle = 'black';
    ctx.fillText("Level: " + Protag.exp[0], Scale * 2, canvas.height - Scale * 5);
    ctx.fillText("Experience: " + Protag.exp[1], Scale * 2, canvas.height - Scale * 4);
    ctx.fillText("Health: " + Protag.currentVital[0] + "/" + Protag.vitalMax[0],Scale * 2, canvas.height - Scale * 3);
    ctx.fillText("Endurance: " + Protag.currentVital[1] + "/" + Protag.vitalMax[1],Scale * 2, canvas.height - Scale * 2);
    ctx.fillText("Strength: " + Protag.vitalMax[2], Scale * 2, canvas.height - Scale * 1);
    menuBuild[0].text = "Level UP";
    menuBuild[1].text = "Camp";
    menuBuild[2].text = "Exit";
    ctx.fillStyle = "rgba(180, 180, 180, 1)";
    rect(0, canvas.height - Scale * 6, canvas.width, Scale * 6);
    Protag.draw();
    for (i = 0; i < RockCount; i++) {
        ctx.fillStyle = 'grey';
        Rock[i].draw();
      }
  }
  
  function levelUP(){
    menuBuild[3] = new SelectionTier(Scale * 11, Scale * (11));
    menuBuild[4] = new SelectionTier(Scale * 11, Scale * (12.5));
    menuBuild[5] = new SelectionTier(Scale * 11, Scale * (14));
    
    menuBuild[3].text = "Health";
    menuBuild[4].text = "Endurance";
    menuBuild[5].text = "Strength"; 
  }
  
  //menu segments
  class SelectionTier {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.text = "";
      this.size = Scale;
      this.selected = false;
    }
    draw() {
      ctx.fillStyle = "black";
      ctx.fillText(this.text, this.x + 2, this.y + this.size / 2);
      if (this.selected) {
        ctx.fillStyle = "red";
      } else {
        ctx.fillStyle ="rgba(0, 0, 200, 0)";
      }
      rect(this.x, this.y, this.size * 2, this.size);
    }
  }

function random(min, max) {
    return Math.random() * (max - min) + min;
}
  


function rect(x,y,w,h){
    ctx.beginPath();
    ctx.fillRect(x,y,w,h);
    ctx.fillStyle = "black";
    ctx.rect(x,y,w,h);
    ctx.stroke();
}

//controls
window.addEventListener("keyup", function (e) {
    //gamescreen navigation
    //directions are 0 = up 1 = left 2 = down 3 = right
    if (screenSpace == 1) {
      if (e.key == "ArrowUp") {
        Protag.motion(0);
      }
      if (e.key == "ArrowLeft") {
        Protag.motion(1);
      }
      if (e.key == "ArrowDown") {
        Protag.motion(2);
      }
      if (e.key == "ArrowRight") {
        Protag.motion(3);
      }
    }
  
    //menu navigation
    if (screenSpace == 3) {
        if(menuBuild.length>3){
            if (e.key == "ArrowDown") {
                if (menuSelect == menuBuild.length - 1) {
                  menuSelect = 3;
                } else {
                  menuSelect += 1;
                }
              }
              if (e.key == "ArrowUp") {
                if (menuSelect == 3) {
                  menuSelect = menuBuild.length - 1;
                } else {
                  menuSelect += -1;
                }
              }
          }else{
      if (e.key == "ArrowUp") {
        if (menuSelect === 0) {
          menuSelect = menuBuild.length - 1;
        } else {
          menuSelect += -1;
        }
      }
      if (e.key == "ArrowDown") {
        if (menuSelect == menuBuild.length - 1) {
          menuSelect = 0;
        } else {
          menuSelect += 1;
        }
      }
      if (e.key == "ArrowLeft") {
        menuSelect = (menuBuild.length-1) - menuSelect;
        if(menuSelect<0){menuSelect = 0}
        console.log(menuSelect)
      }
    }
    }
  
    if (e.key == "z") {
      Affirm();

      if (screenSpace == 3&&menuBuild.length>3) {
        menuSelect = 3;
      }
      //game start button
      if (screenSpace === 0) {
        screenSpace = 1;
      }
    }
  });
  

init();