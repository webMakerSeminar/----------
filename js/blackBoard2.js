const blackBoardPlane = localStorage.getItem("blackBoardPlane");
const image2 = document.getElementById("image2");
const movie = document.getElementById("movie");

const TVImage = [
    "/----------/えちごimage/テレビ画像.png",
    "/----------/えちごimage/テレビ画像2拡大後2着色後.png",
    "/----------/えちごimage/テレビ画像3強化後.png",
];

const planeImage = [
    "/----------/えちごimage/ホワイトボード加工済み1.png",
    "/----------/えちごimage/黒板強化後2枠アリ強化後.png",
    "/----------/えちごimage/ホワイトボード右.png",
    "/----------/えちごimage/ホワイトボード左.png"
];

const komazawa = [
    "/----------/駒大向上委員会/IMG_2951.jpg",
    "/----------/駒大向上委員会/IMG_2952.jpg",
    "/----------/駒大向上委員会/IMG_2953.jpg",
    "/----------/駒大向上委員会/IMG_2954.jpg",
]

let random = 0;

const movieCollect = ["/----------/movie/サトイモ.MOV"];

//画面を決定する
window.addEventListener("load", function () {
    if (blackBoardPlane === "三連棟") {
        console.log(blackBoardPlane);
        image2.src = TVImage[0];
        movie.src = movieCollect[0];
        type = "サトイモ"
    } else if (blackBoardPlane === "中央の奴") {
        console.log(blackBoardPlane);
        random = Math.floor(Math.random() *komazawa.length)
        image2.src = komazawa[random];
        type = "マッピング";
        movie.style.display = "none";
    } else if (blackBoardPlane === "右下の棟") {
        image2.src = TVImage[1];
    }
});
