const character = document.getElementById("character");
const explainUI = document.getElementById("explainUI");
const scene = document.getElementById("scene");

const countX = document.getElementById("countX");
const countY = document.getElementById("countY");

let x = 0, y = 0;
const speed = 15;

const walkImages = {
  up:   ["/----------/img/学生背後.png"],
  down: ["/----------/img/学生正面.png"],
  left: [
    "/----------/walkImage/男左1.png",
    "/----------/walkImage/男左2.png"
  ],
  right:[
    "/----------/walkImage/男右1.png",
    "/----------/walkImage/男右2.png"
  ]
};

const womanWalkImages = {
  up: [
    "/----------/walkImage/女背面.png",
    "/----------/walkImage/女背後2.png"
  ],
  down:["/----------/walkImage/女の子2.png"],
  left:[
    "/----------/walkImage/女左1.png",
    "/----------/walkImage/女左2.png"
  ],
  right:[
    "/----------/walkImage/女右1.png",
    "/----------/walkImage/女右2.png"
  ]
};

let direction = null;
let frame = 0;

window.addEventListener("load", function () {
  if (gender === "男") {
    character.src = "/----------/img/学生正面.png";
  } else if (gender === "女") {
    character.src = "/----------/walkImage/女の子2.png";
  }
});

window.addEventListener("keydown", function (e) {
  const controller = JSON.parse(localStorage.getItem("system"));
  if (controller === false) return;

  if ((e.key === "ArrowUp" || e.key === "w" || e.key === "W") && y < 330) {
    y += speed;
    direction = "up";
    countY.textContent = y;
  }

  if ((e.key === "ArrowDown" || e.key === "s" || e.key === "S") && y > -330) {
    y -= speed;
    direction = "down";
    countY.textContent = y;
  }

  if ((e.key === "ArrowLeft" || e.key === "a" || e.key === "A") && x < 450) {
    x += speed;
    direction = "left";
    countX.textContent = x;
  }

  if ((e.key === "ArrowRight" || e.key === "d" || e.key === "D") && x > -450) {
    x -= speed;
    direction = "right";
    countX.textContent = x;
  }

  if (e.code === "Space") {
    x = 0;
    y = 0;
    character.src =
      gender === "男"
        ? "/----------/img/学生正面.png"
        : "/----------/walkImage/女の子2.png";
  }

  scene.style.left = x + "px";
  scene.style.top = y + "px";

  intoNext();
});

window.addEventListener("keyup", e => {
  direction = null;

  if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
    character.src =
      gender === "男"
        ? "/----------/img/学生背後.png"
        : "/----------/walkImage/女背面.png";
  }

  if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") {
    character.src =
      gender === "男"
        ? "/----------/img/学生正面.png"
        : "/----------/walkImage/女の子2.png";
  }

  if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
    character.src =
      gender === "男"
        ? "/----------/walkImage/男左1.png"
        : "/----------/walkImage/女左1.png";
  }

  if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
    character.src =
      gender === "男"
        ? "/----------/walkImage/男右1.png"
        : "/----------/walkImage/女右1.png";
  }
});

setInterval(() => {
  if (!direction) return;

  if (gender === "男") {
    frame = (frame + 1) % walkImages[direction].length;
    character.src = walkImages[direction][frame];
  } else {
    frame = (frame + 1) % womanWalkImages[direction].length;
    character.src = womanWalkImages[direction][frame];
  }
}, 150);

function intoNext() {
  let hit = false;

  for (const area of build) {
    if (x < area.x1 && x > area.x2 && y > area.y1 && y < area.y2) {
      hit = true;
      ShowUI();

      button.onclick = () => {
        localStorage.setItem("storagePlane", area.plane);
        window.location.href = "/----------/html/classroom1.html";
      };
      break;
    }
  }

  if (!hit) HideUI();
}

function ShowUI() {
  explainUI.style.display = "block";
}

function HideUI() {
  explainUI.style.display = "none";
}
