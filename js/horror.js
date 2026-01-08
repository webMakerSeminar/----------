//ここに、ホラー演出を集中させる。

const despairImage = {
    男:["/----------/speakImage/男違和感弱.png",
        "/----------/speakImage/男違和感中.png",
        "/----------/speakImage/男違和感強.png",
        "/----------/speakImage/男首.png",
        "/----------/speakImage/男首白目.png",
    ],
    女:["/----------/speakImage/女違和感弱.png",
        "/----------/speakImage/女違和感中.png",
        "/----------/speakImage/女違和感強.png",
        "/----------/speakImage/女攻撃.png",
    ]
}




const SCENE_START_KEY = "horror_scene_start";

let sceneStartTime = sessionStorage.getItem(SCENE_START_KEY);
if (!sceneStartTime) {
  sceneStartTime = Date.now();
  sessionStorage.setItem(SCENE_START_KEY, sceneStartTime);
} else {
  sceneStartTime = Number(sceneStartTime);
}


console.log(gender);
const IMAGE_SWITCH_TIME = 1* 60 * 1000;
let currentImageIndex = -1;
// ===== 設定 =====
let FULL_ROTATION_TIME = 1 * 60 * 1000; // 10分
const STORAGE_KEY = "horror_clock_start";

// ===== 開始時刻を取得 or 保存 =====
let startTime = localStorage.getItem(STORAGE_KEY);
if (!startTime) {
  startTime = Date.now();
  localStorage.setItem(STORAGE_KEY, startTime);
} else {
  startTime = Number(startTime);
}

// ===== 時計DOMを生成 =====
const clockWrapper = document.createElement("div");
clockWrapper.className = "horror-clock";
document.body.appendChild(clockWrapper);

// 時計本体（針なし）
const clockBase = document.createElement("img");
clockBase.src = "/----------/horrorImage/針のない時計.png"; // ←針のない時計画像
clockBase.className = "clock-base";
clockWrapper.appendChild(clockBase);

// 血の針
const clockHand = document.createElement("img");
clockHand.src = "/----------/horrorImage/赤い針真っすぐ.png"; // ←血の針画像
clockHand.className = "clock-hand";
clockWrapper.appendChild(clockHand);


function updateDespairImage() {
  const images = despairImage[gender];
  if (!images) return;

  const elapsed = Date.now() - sceneStartTime;

  const index = Math.floor(elapsed / IMAGE_SWITCH_TIME);
  const fixedIndex = Math.min(index, images.length - 1);

  if (fixedIndex === currentImageIndex) return;

  currentImageIndex = fixedIndex;

  console.log(fixedIndex);
  if (gender === "男") {
    if(fixedIndex === 4){
        fixedIndex = 0;
        console.log("消去");
    }else{
        standImg.src = images[fixedIndex];
    }
  } else {
    if(fixedIndex === 4){
        fixedIndex = 0;
    }else{
        standImg2.src = images[fixedIndex];
    }
  }
}


// ===== 回転処理 =====
function rotate() {
  const now = Date.now();
  const elapsed = now - startTime;

  const angle =
    (elapsed % FULL_ROTATION_TIME) / FULL_ROTATION_TIME * 360;

  clockHand.style.transform =
    `translate(-50%, -100%) rotate(${angle}deg)`;

    
  // ★ これを必ず入れる
  updateDespairImage(elapsed);

  requestAnimationFrame(rotate);
}

rotate();




// ------------------------------
// 1. 警告用のHTMLをJSで生成
// ------------------------------
const warning = document.createElement("div");
warning.id = "orientation-warning";
warning.textContent = "このコンテンツは横向きでご覧ください";
document.body.appendChild(warning);

// ------------------------------
// 2. CSSもJSで注入
// ------------------------------
const style = document.createElement("style");
style.textContent = `
  #orientation-warning {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.85);
    color: white;
    font-size: 22px;
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 99999;
    text-align: center;
    padding: 20px;
  }
`;
document.head.appendChild(style);

// ------------------------------
// 3. 画面の向きを判定する関数
// ------------------------------
function checkOrientation() {
  const isPortrait = window.innerHeight > window.innerWidth;

  if (isPortrait) {
    warning.style.display = "flex";  // 縦 → 警告表示
  } else {
    warning.style.display = "none";  // 横 → 非表示
  }
}

// ------------------------------
// 4. イベント登録
// ------------------------------
window.addEventListener("resize", checkOrientation);
window.addEventListener("load", checkOrientation);