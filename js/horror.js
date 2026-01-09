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
  男4:[""],
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
  女4:[""],
}

const SCENE_START_KEY = "horror_scene_start";
let sceneStartTime = sessionStorage.getItem(SCENE_START_KEY);

if (!sceneStartTime) {
  sceneStartTime = Date.now();
  sessionStorage.setItem(SCENE_START_KEY, sceneStartTime);
} else {
  sceneStartTime = Number(sceneStartTime);
}

const IMAGE_SWITCH_TIME = 0.1 * 60 * 1000; // 6秒
const FULL_ROTATION_TIME = 0.1 * 60 * 1000;

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
  if (!lines || flag >= lines.length) {
    endHorror();
    return;
  }

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