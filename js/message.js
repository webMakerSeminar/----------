//main.htmlで使ってる

//吹き出し
const took = document.getElementById("took");
//白い膜
const cover = document.getElementById("cover");
//会話
const speak = document.getElementById("speak");
//ここをいじればすべてを変える。
const message = document.getElementById("message");
//立ち絵
const standImg = document.getElementById("standImg");
const standImg2 = document.getElementById("standImg2");
//キャラクターの動きを封じる
const skip = document.getElementById("skip");

const tutorial = document.getElementById("tutorial");

const gender = localStorage.getItem("gender");

//会話パート

let flag = 0;
let pattern = 0;


// どこか1箇所だけ（message.js が適切）
window.talkMode = "normal";
// "normal" | "horror" | "none"

window.canMove = true;

localStorage.setItem("system", JSON.stringify(false));

const talk =[
    ["教養ゼミ（１）の世界にようこそ！\n実は、ここにはびっくり要素があるみたいなんだ……",
        "心臓の弱い人は注意してくれ！",
        "それじゃあ、操作を説明するぞ。\n緊張しなくてもいい、チュートリアルってやつだから",
        "W/↑で上に、A/←で左に、D/→で右、S/↓で下にそれぞれ\n移動することができる",
        "まあ、これはスマホで操作する奴には関係がないんだけどな。"
        ,"だが、何か気になるなと思ったらとにかくクリックしよう！！\nそうすれば、新たなページに行けるかも……？",
        "それじゃあ、自己紹介だな。俺の名前は駒沢 優（こまざわ ゆう）\nよろしくな。",
        "寝て、夢の中で扉の外に出て気づいたらここに迷い込んでいたんだ。",
        "え！？お前もそうなのか……なら、協力してこの世界から脱出しよう",
        "早速、探索スタートだ！！"
    ],
    ["教養ゼミ（１）の世界にようこそ！\n実は、ここにはびっくり要素があるみたい……",
        "心臓の弱い人は注意してね！",
        "それじゃあ、早速……操作を説明するね！\n緊張しないで、チュートリアルだから！",
        "W/↑で上に、A/←で左に、D/→で右、S/↓で下にそれぞれ\n移動することができるんだ",
        "まあ、これってスマホで操作する人は何にも関係がないんだよね",
        "もしも、何か気になるなと思ったらとにかくクリックしてね。\nそうすれば、新たなページに行けるかもしれないからね！",
        "それじゃあ、初めまして！。\n私の名前は駒沢 零（こまざわ れい）って言うんだ。よろしく！",
        "実は、夢の中でどこかにいたと思ったら扉の外に出たの！\nそしたら、気づいたらここにいたんだ。",
        "えー！？君もそうなんだ。なら、一緒に脱出しよう！",
        "うんうん、いい返事だね",
        "それじゃあ、早速探索スタートだよ！！"
    ],
    ["どうやら、入れないみたいだ。\n何か条件を満たしたら……？",
        "なんてRPGじゃあるまいし、あるわけないか"
    ],
    ["えぇ！？入れないね、ここ。\nうーん、めちゃくちゃ怪しいけど……",
        "条件を満たしたら入れる……とか、なのかな？"
    ],
    [],
    [],
    [],
    [],
    [],
    [],
]
console.log(talk.length);

if (!sessionStorage.getItem("tutorialSeen")) {
    tutorial.style.display = "block";
    skip.style.display = "block";

    sessionStorage.setItem("tutorialSeen", "true");
    sessionStorage.setItem("game_state", "intro"); // ← これを追加
} else {
    standImg.style.display = "none";
    standImg2.style.display = "none";
    tutorial.style.display = "none";
    //本編でも直しておく
    HiddenUI();
    Human();
}

window.addEventListener("load",function(){
    const state = sessionStorage.getItem("game_state");

  if (state === "intro") {
    // 最初の会話を優先
    window.canMove = false;
    character.style.display = "none";
    message.style.display = "block";
    speak.style.display = "block";
    took.style.display = "block";
    return;
  }

  // それ以外は探索状態
  resetToExploreState();
  window.talkMode = "normal"
    console.log("消去");
    //スマホ用
    if(window.innerHeight <= 450){

    }
    if(gender === "男"){
        standImg2.style.display = "none";
    }else if(gender === "女"){
        standImg.style.display = "none";
        pattern++;
    }
    if(standImg.style.display === "none" && standImg2.style.display === "none" && window.innerHeight > 500){
        character.style.display = "block";
        console.log("起動");
        localStorage.setItem("system",JSON.stringify(true));
    }
})


standImg.addEventListener("click",function(){
  if (window.talkMode === "normal") {
    normalTalk();
  }
  else if (window.talkMode === "horror") {
    horrorTalkNext2();
  }
});

standImg2.addEventListener("click",function(){
  if (window.talkMode === "normal") {
    normalTalk();
  }
  else if (window.talkMode === "horror") {
    horrorTalkNext2();
  }
});

skip.addEventListener("click",function(){
    standImg.style.display = "none";
    standImg2.style.display = "none";
    took.style.display = "none";
    speak.textContent = "";
    speak.style.display = "none";
    message.style.display ="none";
    skip.style.display = "none";
    character.style.display = "block";
    localStorage.setItem("system", JSON.stringify(true));
})

message.addEventListener("click", () => {
  console.log(window.talkMode);
  if (window.talkMode === "normal") {
    character.style.display = "none";
    normalTalk();
  }
  else if (window.talkMode === "horror") {
    character.style.display = "none";
    horrorTalkNext2();
  }
});

function normalTalk() {
  speak.textContent = talk[pattern][flag];
  flag++;

  if (flag >= talk[pattern].length) {
    // 会話終了処理
    sessionStorage.setItem("game_state", "explore");

    tutorial.style.display = "none";
    took.style.display = "none";
    message.style.display = "none";
    speak.style.display = "none";
    standImg.style.display = "none";
    standImg2.style.display = "none";
    skip.style.display = "none";

    character.style.display = "block";
    window.canMove = true;

    flag = 0; // ← 超重要（次の会話のため）
  }
}

function horrorTalkNext2() {
  const lines = horrorTalk[horrorPattern];
  if (!lines || flag >= lines.length) {
    endHorror();
    character.style.display = "block";
    return;
  }

  speak.textContent = lines[flag];
  flag++;
}

function Human(){
    standImg.style.display = "none";
    standImg2.style.display = "none";
}
//試験2
function HiddenUI(){
    message.style.display = "none";
    speak.style.display = "none";
    took.style.display = "none";
}
function resetToExploreState() {
  character.style.display = "block";
  standImg.style.display = "none";
  standImg2.style.display = "none";

  message.style.display = "none";
  speak.style.display = "none";
  took.style.display = "none";
  skip.style.display = "none";

  window.talkMode = "normal";
  window.canMove = true;

  localStorage.setItem("system", JSON.stringify(true));
}