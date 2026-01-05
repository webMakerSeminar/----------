const blackBoardPlane = localStorage.getItem("blackBoardPlane");
const image2 = document.getElementById("image2");

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

//画面を決定する
window.addEventListener("load", function () {
    if (blackBoardPlane === "三連棟") {
        console.log(blackBoardPlane);
        image2.src = TVImage[0];
    } else if (blackBoardPlane === "中央の奴") {
        console.log(blackBoardPlane);
        image2.src = planeImage[3];
    } else if (blackBoardPlane === "右下の棟") {
        image2.src = TVImage[1];
    }
});
