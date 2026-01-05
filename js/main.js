//---------- 初期取得 ----------
const character = document.getElementById("character");
const explainUI = document.getElementById("explainUI");
const scene = document.getElementById("scene");
const countX = document.getElementById("countX");
const countY = document.getElementById("countY");
const title = document.getElementById("title");
const button = document.getElementById("button");

//---------- 状態管理 ----------
let x = 0, y = 0;
const speed = 15;
let direction = null;
let frame = 0;

//const gender = localStorage.getItem("gender");

//---------- 歩行画像 ----------
const walkImages = {
  up: ["/----------/img/学生背後.png"],
  down: ["/----------/img/学生正面.png"],
  left: ["/----------/walkImage/男左1.png", "/----------/walkImage/男左2.png"],
  right: ["/----------/walkImage/男右1.png", "/----------/walkImage/男右2.png"]
};

const womanWalkImages = {
  up: ["/----------/walkImage/女背面.png", "/----------/walkImage/女背後2.png"],
  down: ["/----------/walkImage/女の子2.png"],
  left: ["/----------/walkImage/女左1.png", "/----------/walkImage/女左2.png"],
  right: ["/----------/walkImage/女右1.png", "/----------/walkImage/女右2.png"]
};

//---------- 初期表示 ----------
window.addEventListener("load", () => {
  if (gender === "男") {
    character.src = "/----------/img/学生正面.png";
  } else if (gender === "女") {
    character.src = "/----------/walkImage/女の子2.png";
  }
});

//---------- キー入力（移動） ----------
window.addEventListener("keydown", e => {
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
    if (gender === "男") character.src = "/----------/img/学生正面.png";
    if (gender === "女") character.src = "/----------/walkImage/女の子2.png";
  }

  scene.style.left = x + "px";
  scene.style.top = y + "px";

  intoNext();
});

//---------- キー離し ----------
window.addEventListener("keyup", e => {
  direction = null;

  if (e.key === "ArrowUp" && gender === "男") character.src = "/----------/img/学生背後.png";
  if (e.key === "ArrowDown" && gender === "男") character.src = "/----------/img/学生正面.png";
  if (e.key === "ArrowLeft" && gender === "男") character.src = "/----------/walkImage/男左1.png";
  if (e.key === "ArrowRight" && gender === "男") character.src = "/----------/walkImage/男右1.png";

  if (e.key === "ArrowUp" && gender === "女") character.src = "/----------/walkImage/女背面.png";
  if (e.key === "ArrowDown" && gender === "女") character.src = "/----------/walkImage/女の子2.png";
  if (e.key === "ArrowLeft" && gender === "女") character.src = "/----------/walkImage/女左1.png";
  if (e.key === "ArrowRight" && gender === "女") character.src = "/----------/walkImage/女右1.png";
});

//---------- 歩行アニメ ----------
setInterval(() => {
  if (!direction) return;

  if (gender === "男") {
    frame = (frame + 1) % walkImages[direction].length;
    character.src = walkImages[direction][frame];
  }

  if (gender === "女") {
    frame = (frame + 1) % womanWalkImages[direction].length;
    character.src = womanWalkImages[direction][frame];
  }
}, 150);

//---------- 当たり判定 ----------
const build = [
  { plane: "三連棟", x1: 390, y1: -15, x2: 135, y2: 105 },
  { plane: "左下の棟", x1: 240, y1: -120, x2: 120, y2: -30 },
  { plane: "中央の奴", x1: 75, y1: -20, x2: -180, y2: 120 },
  { plane: "右下の棟", x1: -75, y1: -210, x2: -315, y2: -90 },
  { plane: "右上の棟", x1: 45, y1: 225, x2: -135, y2: 360 }
];

//---------- 遷移処理 ----------
function intoNext() {
  let hit = false;

  for (const area of build) {
    if (x < area.x1 && x > area.x2 && y > area.y1 && y < area.y2) {
      hit = true;
      ShowUI();

      title.textContent =
        area.plane === "三連棟" ? "三号棟" :
        area.plane === "左下の棟" ? "四号棟" :
        area.plane === "中央の奴" ? "一号棟" :
        area.plane === "右下の棟" ? "二号棟" :
        "五号棟";

      button.onclick = () => {
        localStorage.setItem("storagePlane", area.plane);
        window.location.href = "/----------/html/classroom1.html";
      };
      break;
    }
  }

  if (!hit) HideUI();
}

//---------- UI制御 ----------
function ShowUI() {
  explainUI.style.display = "block";
}

function HideUI() {
  explainUI.style.display = "none";
}

//---------- 隠しコマンド ----------
let keys = { ctrl: false, q: false, m: false, shift: false };

document.addEventListener("keydown", e => {
  if (e.key === "Control") keys.ctrl = true;
  if (e.key === "Shift") keys.shift = true;
  if (e.key.toLowerCase() === "q") keys.q = true;
  if (e.key.toLowerCase() === "m") keys.m = true;
  checkShortcut();
});

document.addEventListener("keyup", e => {
  if (e.key === "Control") keys.ctrl = false;
  if (e.key === "Shift") keys.shift = false;
  if (e.key.toLowerCase() === "q") keys.q = false;
  if (e.key.toLowerCase() === "m") keys.m = false;
});

//---------- 隠し表示切替 ----------
function checkShortcut() {
  const boxes = document.querySelectorAll(".imageBox");

  if (keys.ctrl && keys.q && keys.m) {
    boxes.forEach(b => {
      b.classList.remove("hiddenUI");
      b.classList.add("show");
    });
  }

  if (keys.ctrl && keys.q && keys.shift) {
    boxes.forEach(b => {
      b.classList.remove("show");
      b.classList.add("hiddenUI");
    });
  }
}
