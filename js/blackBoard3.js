const blackBoardPlane = localStorage.getItem("blackBoardPlane");
const image3 = document.getElementById("image3");
const movie = document.getElementById("movie");

let type = "";

const TVImage = ["/----------/えちごimage/テレビ画像.png"];
const planeImage = ["/----------/えちごimage/ホワイトボード加工済み1.png",
                    "/----------/えちごimage/黒板強化後2枠アリ強化後.png",
                    "/----------/えちごimage/ホワイトボード右.png",
                    "/----------/えちごimage/ホワイトボード左.png"
                ];


const movieCollect = ["/----------/movie/カボチャ.MOV"]

//画面を決定する
window.addEventListener("load",function(){
    if(blackBoardPlane === "三連棟"){
        image3.src = TVImage[0];
        movie.src = movieCollect[0];
        type = "カボチャ";
    }else if(blackBoardPlane === "中央の奴"){
        image3.src = planeImage[2];
    }
})