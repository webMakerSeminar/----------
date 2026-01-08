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


// ===== 設定 =====
const FULL_ROTATION_TIME = 10 * 60 * 1000; // 10分
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

// ===== 回転処理 =====
function rotate() {
  const now = Date.now();
  const elapsed = now - startTime;

  const angle =
    (elapsed % FULL_ROTATION_TIME) / FULL_ROTATION_TIME * 360;

  clockHand.style.transform =
    `translate(-50%, -100%) rotate(${angle}deg)`;

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