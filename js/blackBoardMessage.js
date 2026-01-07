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

let patternPlane= "";
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
        "テレビとかでしか見ないプロジェクションマッピングって\nやつだよな！？",
        "くーここから出られたら絶対に見に行くって言うのに！",
        "ほら、お前も見てみろよ"
    ],
    中央の奴長編1:["わぁ！？プロジェクトマネジメント……？だっけ？",
        "とにかく、すごいのはよくわかるよ。\nなんていうか、なんていうか凄い！ってことだけはね",
        "ほら、君も見て見なよ！"
    ],
    中央の奴マッピング:["すごいな、プロジェクションマッピング。\nでも、出来れば写真じゃなくて動画で見たかったな",
        "いや、もしかしたらどこかにあるのかもしれないな"
    ],
    中央の奴マッピング1:["おー、プロジェクションマッピングってこんな感じなんだ。","色とりどりで綺麗だし……あれ？\nもしかして、ここも風景が変わるのかな？"],
    中央の奴カオス:["これは……プロジェクションマッピングを出すための機械かな？","プロジェクターだと思うけど\nこんな小さな機械から大きな映像が出てくるのは不思議なことだな。"],
    中央の奴カオス1:["あっ！これ、授業で使ってる所みたことあるよ！","小さな機会なのに大きな映像を映し出せるなんてすごいね！","もしかして、私の姿もプロジェクターに写したら大きくなるの\nかな？"],
    中央の奴ムービー:["映像が縦になって浮いてる！？","もう正直何でもありと思っていたが\nここまで摩訶不思議なことが起こるなんてな。",
        "どうやら、これはプロジェクションマッピングの動画らしい。",
        "人が踊っているのか？",
        "とにかく見てみよう"
    ],
    中央の奴ムービー1:["わー映像が縦だ！？\nホワイトボードを突き抜けて映像が浮くことがあるんだね……",
        "これ、プロジェクションマッピングの動画みたい",
        "なんか動いてるような……？",
        "って、ここもなんか変だね。\nもしかしたら、もう一度来てみたら何か起こるかもしれないね"
    ],
    右下の棟銅像:["粘土の像……なのか？",
        "すごい独特というか、癖のある作品だな。\nただ、不思議と引き込まれるものもある。",
        "あれ？何か紙が落ちてるな……なになに？",
        "「数学と美のアンケート実施中です。協力お願いします」",
        "だそうだ、確かに左上にQRコードが見えるな。\nなら、読み取って協力アンケートってやつに答えるか"
    ],
    右下の棟銅像1:["おー何だかすごい像がたくさん置いているね。",
        "どうすごいのかって？……う、うーん、とにかくすごそうに見えるの！",
        "ちなみに、私のお気に入りは一番右にある像だよ。\n何だか、不思議と引き込まれちゃうんだよね",
        "あら？何か、紙が落ちてるね……ふむふむ",
        "「数学と美のアンケート実施中です。協力お願いします」",
        "だって、確かに左上にQRコードが見えるね。\nなら、せっかくだし読み取って協力しよ！",
        "え？携帯で助けを求めればいいんじゃないかって？",
        "……不思議と出来ないんだよね。"
    ],
    ごめんなさい:["準備中って書いてあるな。","仕方ない、引き返すとしよう"],
    ごめんなさい1:["うーん、準備中かー","こんな時に！クレームを入れてやりたいところだけど……\n仕方ない、引き帰そ"]
}



window.addEventListener("load", function () {
    if(blackBoardPlane === "三連棟"){
        patternPlane = blackBoardPlane;
        if(type === "カボチャ"){
            patternPlane = patternPlane + type;
        }else if (type ==="サトイモ"){
            patternPlane = patternPlane +type;
        }else if (type === "料理"){
            patternPlane = patternPlane + type;
        }
    }else if(blackBoardPlane === "中央の奴"){
        patternPlane = blackBoardPlane;
        if(type === "長編"){
            patternPlane = patternPlane + type;
        }else if (type === "マッピング"){
            patternPlane = patternPlane + type;
        }else if (type === "カオス"){
            patternPlane = patternPlane +type;
        }else if (type === "ムービー"){
            patternPlane = patternPlane +type ;
        }
    }else {
        patternPlane = "ごめんなさい"
        movie.style.display = "none";
    }

    if (gender === "男") {
        standImg2.style.display = "none";
    } else if (gender === "女") {
        standImg.style.display = "none";
        patternPlane = patternPlane + "1";
    }
});

skip.addEventListener("click", function () {
    Human();
    HiddenUI();
});

standImg.addEventListener("click", nextTalk);
standImg2.addEventListener("click", nextTalk);
message.addEventListener("click", nextTalk);

function nextTalk() {
    speak.textContent = talk[patternPlane][flag];
    flag++;
    if(flag === talk[patternPlane].length +1){
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
