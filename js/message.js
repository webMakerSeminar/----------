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

const wareHouse = ["/speakImage/立ち絵男1.png","/speakImage/立ち絵女2.png"];

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
    [],
    [],
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
    sessionStorage.setItem("tutorialSeen", "true");
} else {
    Human();
    HiddenUI();
    tutorial.style.display = "none";
}

window.addEventListener("load",function(){
    character.style.display = "none"
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
        localStorage.setItem("system",JSON.stringify(true));
    }
})

standImg.addEventListener("click",function(){
    speak.textContent = talk[pattern][flag];
    flag++;
    if(flag === talk[pattern].length +1){
        HiddenUI();
        Human();
        skip.style.display = "none";
        character.style.display = "block";
        localStorage.setItem("system", JSON.stringify(true));
    }
})
standImg2.addEventListener("click",function(){
    speak.textContent = talk[pattern][flag];
    flag++;
    if(flag === talk[pattern].length +1){
        HiddenUI();
        Human();
        skip.style.display = "none";
        character.style.display = "block";
        localStorage.setItem("system", JSON.stringify(true));
    }
})
skip.addEventListener("click",function(){
    HiddenUI();
    Human();
    character.style.display = "block";
    localStorage.setItem("system", JSON.stringify(true));
})

message.addEventListener("click",function(){
        console.log(flag);
        speak.textContent = talk[pattern][flag];
        flag++;
    if(flag === talk[pattern].length + 1){
        HiddenUI();
        Human();
        skip.style.display = "none";
        character.style.display = "block";
        localStorage.setItem("system", JSON.stringify(true));
    }
})

function Human(){
    standImg.style.display = "none";
    standImg2.style.display = "none";
}
//試験2
function HiddenUI(){
    message.style.display = "none";
    speak.style.display = "none";
    took.style.display ="none";
    skip.style.display = "none";
}
