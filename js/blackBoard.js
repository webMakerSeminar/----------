const blackBoardPlane = localStorage.getItem("blackBoardPlane");
const image = document.getElementById("image");

const planeImage = ["/えちごimage/ホワイトボード加工済み1.png",
                    "/えちごimage/黒板強化後2枠アリ強化後.png",
                ];

//画面を決定する
window.addEventListener("load",function(){
    if(blackBoardPlane === "右下の棟"){
        image.src = planeImage[0];
        document.body.style.background = "bisque";
    }else if(blackBoardPlane === "中央の奴"){
        image.src = planeImage[0];
        document.body.style.background = "bisque";
    }else if(blackBoardPlane === "三連棟"){
        image.src = planeImage[1];
    }else if(blackBoardPlane === "右上の棟"){
        image.src = planeImage[1];
    }
})