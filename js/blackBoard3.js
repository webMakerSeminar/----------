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


const movieCollect = ["/----------/movie/カボチャ.MOV",
        "/----------/駒大向上委員会/IMG_3405.MOV",
]

const komazawa = ["","/----------/駒大向上委員会/IMG_2950.jpg","/----------/駒大向上委員会/IMG_3403.jpg"]

//画面を決定する
window.addEventListener("load",function(){
    if(blackBoardPlane === "三連棟"){
        image3.src = TVImage[0];
        movie.src = movieCollect[0];
        type = "カボチャ";
    }else if(blackBoardPlane === "中央の奴"){
        image3.src = planeImage[2];
        const random = Math.floor(Math.random() * 3)
        console.log(random);
        if(random === 0){
            movie.src = movieCollect[1];
            type = "ムービー"
        }else if (random === 1 || random === 2){
            movie.style.display = "none";
            image3.src = komazawa[random];
            type = "カオス";
        }
    }
})