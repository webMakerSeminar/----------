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
    三連棟朝:["朝か、どうやらこの世界は時間帯によって景色が変わるみたいだ。","変化し続ける空間ってことになるな","今気づいたんだが、こんなところに迷い込んだ俺ってかなりヤバいんじゃないか？"],
    三連棟昼:["外はもうお昼だな、昼はもう食べたのか？","食べていないなら食べた方が良いぞ！元気が出ないからな！","それにしても、テレビがたくさんあるな","だけど、もしかしたらテレビなら動画が見れるんじゃないか？"],
    三連棟夜:["夜空だよな……？","ああ、ごめん。\n一瞬、窓の外に銀河が見えたような気がしたんだ……","それにしても、夜の学校って妙に雰囲気あるよな","まさか、出てきたりして……なんて、そんなわけないか！"],
    中央の奴:["ここが一号棟か。一番中央にあって一番目立っている……\nきっとすごい”何か”が眠ってるんだろうな","大きな教室みたいだけど……\nよし、何かあるかもしれないからクリックして探してみよう！"],
    左下の棟:["天井が高いな。それに全体的に綺麗な気がするな……\nもしかしたら、新築かもしれない","こんな教室で勉強できるなんて羨ましいよ"],
    左下の棟ダーク:["で、電気がつかない！？","もしかしたら、何か出てくるかも……なんてな"],
    右上の棟:["五号棟か","あまり調べるものはなさそうだが、妙に薄気味悪いな","もしかしたら、一度出て入りなおせば何か変化するかもしれないな"],
    右上の棟ダーク:["ここが、五号棟か……薄暗いな","ていうか、今扉の近くに人影があったような……？"],
    右下の棟朝:["ふわぁぁ、そういえば俺ってこの世界からどうやって出ればいいんだろうな？","よく考えたら目覚めたらここにいたわけだし……","あれ？これって遭難ってやつ！？"],
    右下の棟昼:["もう夕方か……","この時間帯になると下校する人が出始めるから電車が混むんだよな",],
    右下の棟夜:["何というか、高校とは違いすぎるな。","雰囲気というか、大学の方が自由に見えるけど……\n俺の場合は、きっと毎日をいい加減に過ごすような気がするよ","自由な時間をどう使うか……\nそれを考えられる人が真の大学生ってやつになるのかもな"],
    
    三連棟朝1:["朝になっちゃったね……","どうすれば、ここから出られるんだろう","入れたりする部屋もあるし、入れない部屋もある。\nその入れない部屋に手がかりがあったらどうしよう……","なんて、弱気になっちゃいけないよね","よし、それじゃあ頑張って手がかりを探そう！"],
    三連棟昼1:["何だかすごく明るい部屋だね","それにテレビも六個もある……\n黒板が見えなくなるくらいたくさん人が入るんだろうね",],
    三連棟夜1:["見てみて、窓の外に銀河があるみたい……","何だか夜景って見ててロマンチックな気持ちになるよね","え？それよりもここから出る方法を探した方が良いんじゃな\nいかって？","あはは、そうでした。\n私たち、ここに閉じ込められてるんだったね……"],
    中央の奴1:["ホワイトボードが何でその場所に置かれてるの！？","明らかに授業の邪魔な気がするんだけど……\nもしかして、誰かが意図的に置いたのかな？","触ってみたら何か起こるのかもしれないね！",],
    左下の棟1:["ここ、どこかの教場みたいだね！","うーん……？他の教室と比べて天井が高い気がする！"],
    左下の棟ダーク1:["な、何だか暗いんだけど！？","やっぱり電源はつかないし……"],
    右上の棟1:[
            "うんうん、ちゃんと明るくてよかったよかった","暗いとお化けが出てくるような気がするんだよね。",
            "ま、まあ……まさか何か出てくるわけないよね？"
    ],
    右上の棟ダーク1:["何だか薄暗いね……電気つけた方が良いんじゃないかな？",
                    "ってあれ、電気つかないんだけど！？",
                ],
    右下の棟朝1:["ここはどうやら変化し続ける空間みたいだね。","朝、昼、晩、それだけじゃない。他の教室に行くと何か起こるんじゃないかな？"],
    右下の棟昼1:["見てみて、外はお昼みたいだね","……他の時間だと変わるのかな？"],
    右下の棟夜1:["夜はね……要注意だよ！！","何せね、お化けさんたちのホームページ？ってやつなんだから","何か物に触る時は慎重に……慎重にね！"],
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
    took.style.display = "none";
    skip.style.display = "none";
}
