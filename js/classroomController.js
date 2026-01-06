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



const gender = localStorage.getItem("gender");


//会話パート

let flag = 0;
let pattern = 0;

const wareHouse = ["/----------/speakImage/立ち絵男1.png","/----------/speakImage/立ち絵女2.png"];

localStorage.setItem("system", JSON.stringify(false));

let talk ={
    三連棟朝:["あ","い","う","え","お",],
    三連棟昼:["外はもうお昼だな、昼はもう食べたのか？","食べていないなら食べた方が良いぞ！元気が出ないからな！","それにしても、テレビがたくさんあるな","だけど、もしかしたらテレビなら動画が見れるんじゃないか？"],
    三連棟夜:["あ","い","う","え","お",],
    中央の奴:["……ここは？","大きな教室みたいだけど……\nとりあえず、何かあるかもしれないからクリックして探してみよう"],
    左下の棟:["天井が高いな。それに全体的に綺麗な気がするな……\nもしかしたら、新築かもしれない","こんな教室で勉強できるなんて羨ましいよ"],
    左下の棟ダーク:["で、電気がつかない！？","もしかしたら、何か出てくるかも……なんてな"],
    右上の棟:["五号棟か","あまり調べるものはなさそうだが、妙に薄気味悪いな","もしかしたら、一度出て入りなおせば何か変化するかもしれないな"],
    右上の棟ダーク:["ここが、五号棟か……薄暗いな","ていうか、今扉の近くに人影があったような……？"],
    右下の棟朝:[],
    右下の棟昼:["もう夕方か……","この時間帯になると下校する人が出始めるから電車が混むんだよな",],
    右下の棟夜:[],
    三連棟朝1:["あ","い","う","え","お",],
    三連棟昼1:["何だかすごく明るい部屋だね","それにテレビも六個もある……\n黒板が見えなくなるくらいたくさん人が入るんだろうね",],
    三連棟夜1:["あ","い","う","え","お",],
    中央の奴1:["ホワイトボードがたくさん！？","触ってみたら何か起こるのかな？"],
    左下の棟1:["ここ、どこかの教場みたいだね！","うーん……？他の教室と比べて天井が高い気がする！"],
    左下の棟ダーク1:["な、何だか暗いんだけど！？","やっぱり電源はつかないし……"],
    右上の棟1:[
            "うんうん、ちゃんと明るくてよかったよかった",
    ],
    右上の棟ダーク1:["何だか薄暗いね……電気つけた方が良いんじゃないかな？",
                    "ってあれ、電気つかないんだけど！？",
                ],
    右下の棟朝1:[""],
    右下の棟昼1:["見てみて、外はお昼みたいだね","……他の時間だと変わるのかな？"],
    右下の棟夜1:[],
}
console.log(talk.length);

window.addEventListener("load",function(){
    if(storagePlane === "三連棟"){
        pattern = "三連棟";
        if(time === "朝"){
            pattern = pattern + time;
        }else if(time === "昼"){
            pattern = pattern + time;
        }else if(time === "夜"){
            pattern = pattern + time;
        }
    }else if(storagePlane === "中央の奴"){
        pattern = "中央の奴";
    }else if(storagePlane === "左下の棟"){
        pattern = "左下の棟";
        if(rightRandom === "ダーク"){
        pattern = pattern + rightRandom;
    }
    }else if(storagePlane === "右上の棟"){
        pattern = "右上の棟";
        if(rightRandom === "ダーク"){
        pattern = pattern + rightRandom;
    }
    }else if(storagePlane === "右下の棟"){
        pattern = "右下の棟";
        if(time === "朝"){
            pattern = pattern + time;
        }else if(time === "昼"){
            pattern = pattern + time;
        }else if(time === "夜"){
            pattern = pattern + time;
        }
    }
    if(gender === "男"){
        standImg2.style.display = "none";
    }else if(gender === "女"){
        standImg.style.display = "none";
        pattern = pattern + "1";
        console.log(pattern);
    }
})

standImg.addEventListener("click",function(){
    speak.textContent = talk[pattern][flag];
    flag++;
    if(flag === talk[pattern].length +1){
        HiddenUI();
        Human();
        localStorage.setItem("system", JSON.stringify(true));
    }
})
standImg2.addEventListener("click",function(){
    speak.textContent = talk[pattern][flag];
    flag++;
    if(flag === talk[pattern].length +1){
        HiddenUI();
        Human();
        localStorage.setItem("system", JSON.stringify(true));
    }
})
skip.addEventListener("click",function(){
    HiddenUI();
    Human();
    localStorage.setItem("system", JSON.stringify(true));
})

message.addEventListener("click",function(){
        console.log(flag);
        speak.textContent = talk[pattern][flag];
        flag++;
    if(flag === talk[pattern].length + 1){
        HiddenUI();
        Human();
        localStorage.setItem("system", JSON.stringify(true));
    }
})

function dark(){
    if(rightRandom === "ダーク"){
        pattern = pattern + rightRandom;
    }
}
function clock(){
        if(time === "朝"){
            pattern = pattern + time;
        }else if(time === "昼"){
            pattern = pattern + time;
        }else if(time === "夜"){
            pattern = pattern + time;
        }
}

function Human(){
    standImg.style.display = "none";
    standImg2.style.display = "none";
}
//試験2
function HiddenUI(){
    message.style.display = "none";
    speak.style.display = "none";
    skip.style.display = "none";
}
