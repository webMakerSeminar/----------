const blackBoardPlane = localStorage.getItem("blackBoardPlane");
const image = document.getElementById("image");
const movie = document.getElementById("movie");

const planeImage = [
    "/----------/えちごimage/ホワイトボード加工済み1.png",
    "/----------/えちごimage/黒板強化後2枠アリ強化後.png",
];

const movieCollect = [
    "/----------/movie/IMG_2843.MOV",
    "/----------/駒大向上委員会/IMG_3398.MOV"
]

const ImageCollect = [
    "/----------/数学と美/QRコード.png",
    "/----------/数学と美/銅像.jpg",
    "/----------/数学と美/話し合い.jpg"
]

const img = document.createElement("img");
img.src = ImageCollect[0];
img.alt = "説明文";
img.style.position = "absolute";
img.style.width = "100px";
img.style.height = "100px";



//画面を決定する
window.addEventListener("load", function () {
    if (blackBoardPlane === "中央の奴") {
        image.src = planeImage[0];
        document.body.style.background = "bisque";
        movie.src = movieCollect[1];
        type = "長編"
    } else if (blackBoardPlane === "三連棟") {
        image.src = planeImage[1];
        movie.src = movieCollect[0];
        type = "料理"
    }else if (blackBoardPlane === "右下の棟"){
        movie.style.display = "none";
        image.src = ImageCollect[1];
        document.body.appendChild(img);
        type = "銅像"
    }else{
        image.src = "/謝罪の紙.png"
    }
});