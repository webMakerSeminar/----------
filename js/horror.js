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


let horrorPattern = "";

const character = document.getElementById("character");

const SCENE_START_KEY = "horror_scene_start";

let sceneStartTime = sessionStorage.getItem(SCENE_START_KEY);
if (!sceneStartTime) {
  sceneStartTime = Date.now();
  sessionStorage.setItem(SCENE_START_KEY, sceneStartTime);
} else {
  sceneStartTime = Number(sceneStartTime);
}


console.log(gender);
const IMAGE_SWITCH_TIME = 3* 60 * 1000;
let currentImageIndex = -1;
// ===== 設定 =====
let FULL_ROTATION_TIME = 3* 60 * 1000; // 10分
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
  let fixedIndex = Math.min(index, images.length - 1);

  if (fixedIndex === currentImageIndex) return;

  currentImageIndex = fixedIndex;

  console.log(fixedIndex);
  if (gender === "男") {
    horrorPattern = gender;
    console.log(horrorPattern);
    if(fixedIndex === 4){
        flag = 0;
        standImg.src = images[fixedIndex];
        horrorPattern = horrorPattern + fixedIndex;
        console.log(horrorPattern);
        standImg.style.display = "block";
        startHorrorTalk(horrorPattern);
    }else{
        console.log(fixedIndex);
        flag = 0;
        standImg.src = images[fixedIndex];
        horrorPattern = horrorPattern + fixedIndex;
        console.log(horrorPattern);
        standImg.style.display = "block";
        startHorrorTalk(horrorPattern);
    }
  } else {
    horrorPattern = gender;
    if(fixedIndex === 4){
        flag = 0;
        standImg2.src = images[fixedIndex];
        horrorPattern = horrorPattern + fixedIndex;
        console.log(horrorPattern);
        standImg2.style.display = "block";
        startHorrorTalk(horrorPattern);
    }else{
        standImg2.src = images[fixedIndex];
        flag = 0;
        horrorPattern = horrorPattern + fixedIndex;
        standImg2.style.display = "block";
    startHorrorTalk(horrorPattern);

    }
  }
}

function horrorTalkNext() {
  speak.textContent = horrorTalk[horrorPattern][flag];
  flag++;

  if (flag > horrorTalk[horrorPattern].length) {
    endHorror();
    window.talkMode = "normal";
  }
}

function endHorror() {
  HiddenUI();
  Human();
  skip.style.display = "none";
  localStorage.setItem("system", JSON.stringify(true));
  window.talkMode = "none";
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


function playSE(src, volume = 0.6) {
  const audio = new Audio(src);
  audio.volume = volume;
  audio.play();
}


function startHorrorTalk(pattern) {
  window.talkMode = "horror";
  window.canMove = false;   // ★ 停止

  flag = 0;
  horrorPattern = pattern;

  message.style.display = "block";
  speak.textContent = "";
  speak.style.display = "block";
  took.style.display = "block";

  if (character) character.style.display = "none";
}


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