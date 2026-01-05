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
//戻るボタン
const backButton = document.getElementById("backButton");
//スキップボタン
const skip = document.getElementById("skip");

const gender = localStorage.getItem("gender");

let flag = 0;

const talk = [
    "展示するものを決め次第書く"
];

window.addEventListener("load", function () {
    if (gender === "男") {
        standImg2.style.display = "none";
    } else if (gender === "女") {
        standImg.style.display = "none";
    }
});

skip.addEventListener("click", function () {
    message.style.display = "none";
    standImg.style.display = "none";
    standImg2.style.display = "none";
    skip.style.display = "none";
});

standImg.addEventListener("click", nextTalk);
standImg2.addEventListener("click", nextTalk);
message.addEventListener("click", nextTalk);

function nextTalk() {
    if (flag >= talk.length) {
        HiddenUI();
        Human();
        skip.style.display = "none";
        return;
    }
    speak.textContent = talk[flag];
    flag++;
}

function Human() {
    standImg.style.display = "none";
    standImg2.style.display = "none";
}

function HiddenUI() {
    message.style.display = "none";
}
