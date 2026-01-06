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

let type = "";

let pattern = "";
let flag = 0;

const talk = {
    三連棟カボチャ:["これ、カボチャ！？\n野菜で楽器を作ってるってことか",
        "確かに打楽器なら叩けば行けるのか？",
        "どんな音が出るんだろうな"],
    三連棟カボチャ1:["か、カボチャが楽器になってる！？",
        "楽器ってすごく高い物が多いのに、野菜で出来るのかな？",
        "うーん、それにしてもお腹が空いてきちゃうね！"],
    三連棟サトイモ:["サトイモか",
        "まだ、料理になっていないサトイモを見るのは久しぶりだな",
        "それにしても、意外といい音なるんだな。\nほら、聞いてみな"
    ],
    三連棟サトイモ1:["サトイモだ！",
        "何だかこうやって見ると叩かれてる。\nサトイモを見るのって新鮮だね",
        "うーん、やっぱりお腹が空いて来たなぁ"
    ],
    三連棟料理:["おっ、ちゃんと楽器になった野菜たちはしっかり\n食べられてるんだな。",
        "ぐー",
        "……そういえば、この世界に迷い込んでから何も食べてないんだった。",
        "くっそ、こんなの見せられたらお腹がすくに決まってるだろ！"
    ],
    三連棟料理1:["あー！ちゃんと、料理になってる！",
        "ぐぅぅぅぅぅぅぅ",
        "……あはは、鳴っちゃった。\nこの世界に迷い込んで何も食べてないんだよね",
        "帰ったら、お腹いっぱいになるまで食べるぞー！"
    ],
    中央の奴長編:["これ、凄すぎないか！？",
        "テレビとかでしか見ないプロジェクションマッピングってやつだよな！？",
        "くーここから出られたら絶対に見に行くって言うのに！",
        "ほら、お前も見てみろよ"
    ],
    中央の奴長編1:["わぁ！？プロジェクトマネジメント……？だっけ？",
        "とにかく、すごいのはよくわかるよ。\nなんていうか、なんていうか凄い！ってことだけはね",
        "ほら、君も見て見なよ！"
    ],

}



window.addEventListener("load", function () {
    if(blackBoardPlane === "三連棟"){
        pattern = blackBoardPlane;
        if(type === "カボチャ"){
            pattern = pattern + type;
        }else if (type ==="サトイモ"){
            pattern = pattern +type;
        }else if (type === "料理"){
            pattern = pattern + type;
        }
    }if(blackBoardPlane === "中央の奴"){
        pattern = blackBoardPlane;
        if(type === "長編"){
            pattern = pattern + type;
        }
    }
    if (gender === "男") {
        standImg2.style.display = "none";
    } else if (gender === "女") {
        standImg.style.display = "none";
        pattern = pattern + "1";
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
    speak.textContent = talk[pattern][flag];
    flag++;
    if(flag === talk[pattern].length +1){
        HiddenUI();
        Human();
        skip.style.display = "none";
    }
}

function Human() {
    standImg.style.display = "none";
    standImg2.style.display = "none";
}

function HiddenUI() {
    message.style.display = "none";
    took.style.display = "none";
    speak.style.display = "none";
    skip.style.display = "none";
}
