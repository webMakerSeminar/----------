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
//戻るボタン
const backButton = document.getElementById("backButton");
//スキップボタン
const skip = document.getElementById("skip");

const gender = localStorage.getItem("gender");

let flag = 0;
let man = false;
let manSelecting = true;

const talk =[
    "展示するものを決め次第書く"
]

window.addEventListener("load",function(){
    if(gender === "男"){
        standImg2.style.display = "none";
    }else if(gender === "女"){
        standImg.style.display = "none";
    }
})

skip.addEventListener("click",function(){
    console.log("スキップ");
    message.style.display = "none";
    standImg.style.display = "none";
    standImg2.style.display = "none";
    skip.style.display = "none";
})

standImg.addEventListener("click",function(){
    speak.textContent = talk[flag];
    flag++;
    if(flag === talk.length +1){
        HiddenUI();
        Human();
        skip.style.display = "none";
    }
})
standImg2.addEventListener("click",function(){
    speak.textContent = talk[flag];
    flag++;
    if(flag === talk.length +1){
        HiddenUI();
        Human();
        skip.style.display = "none";
    }
})
message.addEventListener("click",function(){
    if(!manSelecting){
        return
    }
    console.log(flag);
    speak.textContent = talk[flag];
    flag++;
    if(flag === talk.length + 1){
        HiddenUI();
        Human();
        skip.style.display ="none";
    }
})

function Human(){
    standImg.style.display = "none";
    standImg2.style.display = "none";
}
//試験2
function HiddenUI(){
    message.style.display = "none";
}
