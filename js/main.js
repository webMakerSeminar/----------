const character = document.getElementById("character");
const explainUI = document.getElementById("explainUI");
const scene = document.getElementById("scene");
const countX = document.getElementById("countX");
const countY = document.getElementById("countY");

const threeScience = document.getElementById("threeScience");
const centerThree = document.getElementById("centerThree");
const leftSmall = document.getElementById("leftSmall");
const firstScience = document.getElementById("firstScience");
const library = document.getElementById("library");

const innerImage = document.getElementById("innerImage");
const innerImage2 = document.getElementById("innerImage2");
const innerImage3 = document.getElementById("innerImage3");

const innerTitle = document.getElementById("innerTitle");
const innerTitle2 = document.getElementById("innerTitle2");
const innerTitle3 = document.getElementById("innerTitle3");

//localStorage.setItem("system",controller)
//const gender = localStorage.getItem("gender");

let x = 0,
    y = 0;
const speed = 15;

const innerPlane = {
  中央の奴:["/----------/駒大向上委員会/IMG_2951.jpg",
  "/----------/駒大向上委員会/IMG_2952.jpg",
  "/----------/駒大向上委員会/IMG_2950.jpg",
  "/----------/駒大向上委員会/IMG_2954.jpg",
  "/----------/駒大向上委員会/プロジェクションマッピング.png"
],
一号棟:["/----------/駒大向上委員会/IMG_2951.jpg",
  "/----------/駒大向上委員会/IMG_2952.jpg",
  "/----------/駒大向上委員会/IMG_2950.jpg",
  "/----------/駒大向上委員会/IMG_2954.jpg",
  "/----------/駒大向上委員会/プロジェクションマッピング.png"],
三連棟:["/----------/movie/カボチャ.png","/----------/movie/サトイモ.png","/----------/movie/料理.png"],
三号棟:["/----------/movie/カボチャ.png","/----------/movie/サトイモ.png","/----------/movie/料理.png"],
二号棟:["/----------/数学と美/QRコード.png",
  "/----------/数学と美/銅像.jpg",
  "/----------/数学と美/話し合い.jpg"
],
右下の棟:["/----------/数学と美/QRコード.png",
  "/----------/数学と美/銅像.jpg",
  "/----------/数学と美/話し合い.jpg"],
}

const walkImages = {
  up: ["/----------/img/学生背後.png"],
  down: ["/----------/img/学生正面.png"],
  left: [
    "/----------/walkImage/男左1.png",
    "/----------/walkImage/男左2.png"
  ],
  right: [
    "/----------/walkImage/男右1.png",
    "/----------/walkImage/男右2.png"
  ]
};

const womanWalkImages = {
  up: [
    "/----------/walkImage/女背面.png",
    "/----------/walkImage/女背後2.png"
  ],
  down: ["/----------/walkImage/女の子2.png"],
  left: [
    "/----------/walkImage/女左1.png",
    "/----------/walkImage/女左2.png"
  ],
  right: [
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
  if(window.innerHeight <500){
    character.style.display = "none";
  }
});

window.addEventListener("keydown", function (e) {
  const controller = JSON.parse(localStorage.getItem("system"));
  if (controller === false) {
    return;
  }

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

    if (gender === "男") {
      character.src = "/----------/img/学生正面.png";
    } else if (gender === "女") {
      character.src = "/----------/walkImage/女の子2.png";
    }
  }

  console.log(x);
  console.log(y);

  scene.style.left = x + "px";
  scene.style.top = y + "px";

  intoNext();
});

window.addEventListener("keyup", e => {
  direction = null;

  if ((e.key === "ArrowUp" || e.key === "w" || e.key === "W") && y < 410) {
    if (gender === "男") {
      character.src = "/----------/img/学生背後.png";
    } else if (gender === "女") {
      character.src = "/----------/walkImage/女背面.png";
    }
  }

  if ((e.key === "ArrowDown" || e.key === "s" || e.key === "S") && y > -410) {
    if (gender === "男") {
      character.src = "/----------/img/学生正面.png";
    } else if (gender === "女") {
      character.src = "/----------/walkImage/女の子2.png";
    }
  }

  if ((e.key === "ArrowLeft" || e.key === "a" || e.key === "A") && x < 450) {
    if (gender === "男") {
      character.src = "/----------/walkImage/男左1.png";
    } else if (gender === "女") {
      character.src = "/----------/walkImage/女左1.png";
    }
  }

  if ((e.key === "ArrowRight" || e.key === "d" || e.key === "D") && x > -450) {
    if (gender === "男") {
      character.src = "/----------/walkImage/男右1.png";
    } else if (gender === "女") {
      character.src = "/----------/walkImage/女右1.png";
    }
  }
});

setInterval(() => {
  if (direction) {
    if (gender === "男") {
      frame = (frame + 1) % walkImages[direction].length;
      character.src = walkImages[direction][frame];
      console.log("動いた");
    } else if (gender === "女") {
      frame = (frame + 1) % womanWalkImages[direction].length;
      character.src = womanWalkImages[direction][frame];
      console.log("動いた");
    }
  }
}, 150);

const title = document.getElementById("title");
const button = document.getElementById("button");

const build = [
  { plane: "三連棟", x1: 390, y1: -15, x2: 135, y2: 105 },
  { plane: "左下の棟", x1: 240, y1: -120, x2: 120, y2: -30 },
  { plane: "中央の奴", x1: 75, y1: -20, x2: -180, y2: 120 },
  { plane: "右下の棟", x1: -75, y1: -210, x2: -315, y2: -90 },
  { plane: "右上の棟", x1: 45, y1: 225, x2: -135, y2: 360 }
];

function intoNext() {
  let hit = false;

  for (const area of build) {
    if (x < area.x1 && x > area.x2 && y > area.y1 && y < area.y2) {
      hit = true;
      ShowUI();

      if (area.plane === "三連棟") {
        title.textContent = "三号棟";
      } else if (area.plane === "左下の棟") {
        title.textContent = "四号棟";
      } else if (area.plane === "中央の奴") {
        title.textContent = "一号棟";
      } else if (area.plane === "右下の棟") {
        title.textContent = "二号棟";
      } else if (area.plane === "右上の棟") {
        title.textContent = "五号棟";
      }

      button.addEventListener("click", function () {
        localStorage.setItem("storagePlane", area.plane);
        window.location.href = "/----------/html/classroom1.html";
      });

      console.log(area.plane);
      break;
    }
  }

  if (hit) ShowUI();
  else HideUI();
}

//スマホ用、無駄が多いので書き換える可能性アリ

//後でcssで触れられないように書き換えておく
threeScience.addEventListener("click", function () {
  title.textContent = threeScience.textContent;
  smartShowUI();
});

centerThree.addEventListener("click", function () {
  title.textContent = centerThree.textContent;
  smartShowUI();
});

leftSmall.addEventListener("click", function () {
  title.textContent = leftSmall.textContent;
  smartShowUI();
});

firstScience.addEventListener("click", function () {
  title.textContent = firstScience.textContent;
  smartShowUI();
});

library.addEventListener("click", function () {
  title.textContent = library.textContent;
  smartShowUI();
});

button.addEventListener("click", function () {
  localStorage.setItem("storagePlane", title.textContent);
  window.location.href = "/----------/html/classroom1.html";
});

function ShowUI() {
  console.log("起動しました");
  console.log(title.textContent);
  explainUI.style.display = "block";
  if(title.textContent === "一号棟"){
    innerImage.src = innerPlane[title.textContent][0];
    innerTitle.textContent = "駒大向上委員会！"
    innerImage2.src = innerPlane[title.textContent][1];
    innerTitle2.textContent = "P.M!?"
    innerImage3.src = innerPlane[title.textContent][4];
    innerTitle3.textContent = "プロジェクター"
  }else if(title.textContent === "三号棟"){
    innerImage.src = innerPlane[title.textContent][0];
    innerTitle.textContent = "音グループ！"
    innerImage2.src = innerPlane[title.textContent][1];
    innerTitle2.textContent = "野菜で音！？"
    innerImage3.src = innerPlane[title.textContent][2];
    innerTitle3.textContent = "美味しく食べました"
  }else if(title.textContent === "二号棟"){
    innerImage.src = innerPlane[title.textContent][2];
    innerTitle.textContent = "数学と美！"
    innerImage2.src = innerPlane[title.textContent][1];
    innerTitle2.textContent = "銅像たち…？"
    innerImage3.src = innerPlane[title.textContent][0];
    innerTitle3.textContent = "アンケート！！"
  }else if(title.textContent === "五号棟"){
    innerTitle.textContent = "入ルな"
    innerTitle2.textContent = "お前の隣……"
    innerTitle3.textContent = "逃ゲロ"
  }else{
    innerImage.src = "/----------/img/魔法未設定.png";
    innerTitle.textContent = "？？？"
    innerImage2.src = "/----------/img/魔法未設定.png";
    innerTitle2.textContent = "？？？"
    innerImage3.src = "/----------/img/魔法未設定.png";
    innerTitle3.textContent = "？？？"
  }
}

function smartShowUI() {
  console.log("起動しました");
  console.log(title.textContent);
  explainUI.style.display = "block";
  if(title.textContent === "中央の奴"){
    innerImage.src = innerPlane[title.textContent][0];
    innerTitle.textContent = "駒大向上委員会！"
    innerImage2.src = innerPlane[title.textContent][1];
    innerTitle2.textContent = "P.M!?"
    innerImage3.src = innerPlane[title.textContent][4];
    innerTitle3.textContent = "プロジェクター"
  }else if(title.textContent === "三連棟"){
    innerImage.src = innerPlane[title.textContent][0];
    innerTitle.textContent = "音グループ！"
    innerImage2.src = innerPlane[title.textContent][1];
    innerTitle2.textContent = "野菜で音！？"
    innerImage3.src = innerPlane[title.textContent][2];
    innerTitle3.textContent = "美味しく食べました"
  }else if(title.textContent === "右下の奴"){
    innerImage.src = innerPlane[title.textContent][2];
    innerTitle.textContent = "数学と美！"
    innerImage2.src = innerPlane[title.textContent][1];
    innerTitle2.textContent = "銅像たち…？"
    innerImage3.src = innerPlane[title.textContent][0];
    innerTitle3.textContent = "アンケート！！"
  }else if(title.textContent === "右上の棟"){
    innerImage.src = "/----------/img/魔法未設定.png";
    innerImage2.src = "/----------/img/魔法未設定.png";
    innerImage3.src = "/----------/img/魔法未設定.png";
    innerTitle.textContent = "入ルな"
    innerTitle2.textContent = "お前の隣……"
    innerTitle3.textContent = "逃ゲロ"
  }else{
    innerImage.src = "/----------/img/魔法未設定.png";
    innerTitle.textContent = "？？？"
    innerImage2.src = "/----------/img/魔法未設定.png";
    innerTitle2.textContent = "？？？"
    innerImage3.src = "/----------/img/魔法未設定.png";
    innerTitle3.textContent = "？？？"
  }
}

function HideUI() {
  explainUI.style.display = "none";
}



//デバッグ用
let keys = { ctrl: false, q: false, m: false, shift: false };

document.addEventListener("keydown", function (e) {
  if (e.key === "Control") keys.ctrl = true;
  if (e.key === "Shift") keys.shift = true;
  if (e.key.toLowerCase() === "q") keys.q = true;
  if (e.key.toLowerCase() === "m") keys.m = true;

  checkShortcut();
});

document.addEventListener("keyup", function (e) {
  if (e.key === "Control") keys.ctrl = false;
  if (e.key === "Shift") keys.shift = false;
  if (e.key.toLowerCase() === "q") keys.q = false;
  if (e.key.toLowerCase() === "m") keys.m = false;
});

function checkShortcut() {
  const boxes = document.querySelectorAll(".imageBox");

  if (keys.ctrl && keys.q && keys.m) {
    boxes.forEach(box => {
      box.classList.remove("hiddenUI");
      box.classList.add("show");
    });
    console.log("隠しコード起動");
  }

  if (keys.ctrl && keys.q && keys.shift) {
    boxes.forEach(box => {
      box.classList.remove("show");
      box.classList.add("hiddenUI");
    });
    console.log("隠しコード封印");
  }
}

document.getElementById("selection").addEventListener("change", function () {
  const location = this.value;
  console.log(location);
});

document.getElementById("imageDisplay").addEventListener("click", function () {
  console.log("こんにちは");
});
