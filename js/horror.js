//ここに、ホラー演出を集中させる。

const despairImage = {
    男:["/----------/speakImage/立ち絵男1.png",
      "/----------/speakImage/男違和感弱.png",
        "/----------/speakImage/男違和感中.png",
        "/----------/speakImage/男違和感強.png",
        "/----------/speakImage/狂乱の男.png"
    ],
    女:["/----------/speakImage/立ち絵女2.png",
      "/----------/speakImage/女違和感弱.png",
        "/----------/speakImage/女違和感中.png",
        "/----------/speakImage/女違和感強.png",
        "/----------/speakImage/女攻撃.png",
    ]
}

const horrorTalk = {
  男1:["実は、俺には妹がいたんだ。",
        "いたって言うのはそのままの意味だな。\n結構前に死んじまったんだ。",
        "え？なんで、そんな話をするんだって？",
        "……何となく話したくなったんだ"],
  男2:["顔色が変だって……？",
    "そりゃあ、こんなところに閉じ込められてたら\n顔色くらい悪くなってもいいだろ",
    "なんか、変だって？\n大丈夫だって、それより早く探索しようぜ"
  ],
  男3:["ここから脱出する方法なんてあんのかな……？",
    "ははっ、本当に気が狂ってきたのかもしれないな。",
    "あ？妹さんの話をしてほしいって……\n聞いてて楽しいもんじゃないぞ",
    "名前？",
    "ああ、名前は駒沢 零って言うんだ"
  ],
  男4:["思い出した","俺はとっくに死んでたのか",
    "だから、コンナに気分ガいいノカ",
    "なァ？オマエも一緒にこっちに来ようぜ",
    "拒否権はない！"
  ],
  女1:["実はね、私お兄ちゃんがいるの。",
    "少し前に死んじゃったんだけど……\nすごくかっこいいお兄ちゃんだったんだ",
    "え？急にどうしてその話をしたのって？",
    "うーん、何でだろ？\nお兄ちゃんなら諦めないと思ったから、かな？"
  ],
  女2:["え、顔色が変？",
    "そう、かな？私の顔に色なんてついてないと思うんだけど……",
    "……ああ、気分の話ね。\n確かに、少し悪いかな……でも、大丈夫！",
    "本当、本当！！\nそれより、早く出口を探そ！"
  ],
  女3:["……ははっ！",
    "うん？何でもないよ。\n笑い出したくなる気分になっただけだから",
    "私ね、わかっちゃったの。\nここの空間は入るたびに姿が変わる。",
    "いくら、いくら、いくら、いくら探してもね……",
    "出口なんて……なかったの"
  ],
  女4:["思い、出したの……",
    "私ってここの地縛霊みたいな存在だってことを",
  "もっと前に迷い込んで、その時にもう……",
  "ふっ、ははははははははははははは！！",
  "さ　よ　な　ら"
],
}

const SCENE_START_KEY = "horror_scene_start";
let sceneStartTime = sessionStorage.getItem(SCENE_START_KEY);

if (!sceneStartTime) {
  sceneStartTime = Date.now();
  sessionStorage.setItem(SCENE_START_KEY, sceneStartTime);
} else {
  sceneStartTime = Number(sceneStartTime);
}

const IMAGE_SWITCH_TIME = 3 * 60 * 1000; 
const FULL_ROTATION_TIME = 3 * 60 * 1000;

let currentImageIndex = -1;
let lastTriggeredIndex = -1;

// ==============================
// 時計生成
// ==============================

const clockWrapper = document.createElement("div");
clockWrapper.className = "horror-clock";
document.body.appendChild(clockWrapper);

const clockBase = document.createElement("img");
clockBase.src = "/----------/horrorImage/針のない時計.png";
clockBase.className = "clock-base";
clockWrapper.appendChild(clockBase);

const clockHand = document.createElement("img");
clockHand.src = "/----------/horrorImage/赤い針真っすぐ.png";
clockHand.className = "clock-hand";
clockWrapper.appendChild(clockHand);

// ==============================
// 絶望画像＆ホラー制御
// ==============================

function updateDespairImage() {
  const images = despairImage[gender];
  if (!images) return;

  const elapsed = Date.now() - sceneStartTime;
  const index = Math.floor(elapsed / IMAGE_SWITCH_TIME);
  const fixedIndex = Math.min(index, images.length - 1);

  if (fixedIndex === currentImageIndex) return;
  currentImageIndex = fixedIndex;

  // 表示更新
  const img = gender === "男" ? standImg : standImg2;
  img.src = images[fixedIndex];
  img.style.display = "block";

  // 0段階目は通常
  if (fixedIndex === 0) {
    window.talkMode = "normal";
    return;
  } 
  if(fixedIndex === 4){
    spawnBloodTexts();
  }

  // 同じ段階で何度も発火しない
  if (fixedIndex === lastTriggeredIndex) return;
  lastTriggeredIndex = fixedIndex;

  const pattern = gender + fixedIndex;
  startHorrorTalk(pattern);
}

// ==============================
// 会話制御
// ==============================

function startHorrorTalk(pattern) {
  if (!horrorTalk[pattern]) return;

  window.talkMode = "horror";
  window.canMove = false;

  horrorPattern = pattern;
  flag = 0;

  skip.style.display = "block";
  tutorial.style.display = "block";
  speak.textContent = ""
  message.style.display = "block";
  took.style.display = "block";
  speak.style.display = "block";
}

function horrorTalkNext() {
  const lines = horrorTalk[horrorPattern];

  // ===== 会話完全終了ポイント =====
  if (!lines || flag >= lines.length) {

    // 1回だけ GAME OVER

    if ((horrorPattern === "男4" || horrorPattern === "女4") &&!horrorGameOverTriggered) {
      horrorGameOverTriggered = true;

      window.canMove = false;
      window.talkMode = "none";
      speak.textContent = "";

      // 血文字 → 暗転
      spawnBloodTexts({ text: "逃げられない", count: 400 });

      setTimeout(() => {
        showGameOver();
      }, 1500);

      return; // endHorror() を呼ばせない
    }
    endHorror();
    character.style.display = "block";
  }

  // 通常ホラー会話進行
  speak.textContent = lines[flag];
  flag++;
}

function endHorror() {
  HiddenUI();
  Human();
  skip.style.display = "none";
  window.talkMode = "normal";
  window.canMove = true;
}

// ==============================
// 時計回転（永久ループ）
// ==============================

function rotate() {
  const elapsed = Date.now() - sceneStartTime;
  const angle = (elapsed % FULL_ROTATION_TIME) / FULL_ROTATION_TIME * 360;

  clockHand.style.transform =
    `translate(-50%, -100%) rotate(${angle}deg)`;

  updateDespairImage();
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

function playSE(src, volume = 0.6) { const audio = new Audio(src); audio.volume = volume; audio.play(); }

function spawnBloodTexts(options = {}) {
  const {
    text = "終わりだ",
    count = 300,
    minSize = 12,
    maxSize = 48,
    color = "#7a0000",
    zIndex = 99999,
    duration = null // ms（nullで消えない）
  } = options;

  // 既に存在してたら消す
  const old = document.getElementById("blood-text-layer");
  if (old) old.remove();

  const layer = document.createElement("div");
  layer.id = "blood-text-layer";
  layer.style.position = "fixed";
  layer.style.top = "0";
  layer.style.left = "0";
  layer.style.width = "100vw";
  layer.style.height = "100vh";
  layer.style.pointerEvents = "none";
  layer.style.zIndex = zIndex;
  document.body.appendChild(layer);

  for (let i = 0; i < count; i++) {
    const span = document.createElement("span");
    span.textContent = text;

    const size = Math.random() * (maxSize - minSize) + minSize;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const rotate = Math.random() * 360;
    const opacity = Math.random() * 0.6 + 0.2;

    span.style.position = "absolute";
    span.style.left = `${x}px`;
    span.style.top = `${y}px`;
    span.style.fontSize = `${size}px`;
    span.style.color = color;
    span.style.opacity = opacity;
    span.style.transform = `rotate(${rotate}deg)`;
    span.style.fontFamily = "serif";
    span.style.fontWeight = "bold";
    span.style.textShadow = "2px 2px 6px rgba(0,0,0,0.8)";

    layer.appendChild(span);
  }

  // 自動消去
  if (duration !== null) {
    setTimeout(() => {
      layer.remove();
    }, duration);
  }
}

// ===============================
// 血文字を消す関数
// ===============================
function clearBloodTexts() {
  const layer = document.getElementById("blood-text-layer");
  if (layer) layer.remove();
}
function showGameOver(options = {}) {
  const {
    text = "GAME OVER",
    buttonText = "最初から",
    redirect = "/----------/index.html",
    fadeTime = 1000
  } = options;

  // 二重生成防止
  if (document.getElementById("gameover-layer")) return;

  // 暗転レイヤー
  const layer = document.createElement("div");
  layer.id = "gameover-layer";
  layer.style.position = "fixed";
  layer.style.top = "0";
  layer.style.left = "0";
  layer.style.width = "100vw";
  layer.style.height = "100vh";
  layer.style.backgroundColor = "black";
  layer.style.opacity = "0";
  layer.style.zIndex = "100000";
  layer.style.display = "flex";
  layer.style.flexDirection = "column";
  layer.style.alignItems = "center";
  layer.style.justifyContent = "center";
  layer.style.transition = `opacity ${fadeTime}ms ease`;
  document.body.appendChild(layer);

  // GAME OVER 文字
  const title = document.createElement("div");
  title.textContent = text;
  title.style.color = "#8b0000";
  title.style.fontSize = "64px";
  title.style.fontFamily = "serif";
  title.style.fontWeight = "bold";
  title.style.marginBottom = "40px";
  title.style.textShadow = "0 0 20px #400000";
  layer.appendChild(title);

  // 戻るボタン
  const button = document.createElement("button");
  button.textContent = buttonText;
  button.style.fontSize = "20px";
  button.style.padding = "12px 32px";
  button.style.backgroundColor = "black";
  button.style.color = "#ffffff";
  button.style.border = "2px solid #8b0000";
  button.style.cursor = "pointer";
  button.style.fontFamily = "serif";
  button.style.transition = "all 0.2s ease";

  button.addEventListener("mouseenter", () => {
    button.style.backgroundColor = "#8b0000";
  });

  button.addEventListener("mouseleave", () => {
    button.style.backgroundColor = "black";
  });

  button.addEventListener("click", () => {
    window.location.href = redirect;
  });

  layer.appendChild(button);

  // フェードイン
  requestAnimationFrame(() => {
    layer.style.opacity = "1";
  });
}
