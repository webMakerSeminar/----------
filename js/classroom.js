
const storagePlane = localStorage.getItem("storagePlane");

const planeImage = {
    one:["/planeImage/1号館朝.jpg","/planeImage/1号館夕方.jpg","/planeImage/1号館夜.jpg"],
    two:["/planeImage/第二研究所朝.png","/planeImage/第二研究所夕方.png","/planeImage/第二研究所夜3.png"],
    three:["/えちごimage/図書館教場.jpg",
        "/えちごimage/図書館教場4.jpg",
        "/えちごimage/図書館教場5.jpg",
        "/えちごimage/図書館教場6.jpg",
        "/えちごimage/図書館教場7.jpg",
        "/えちごimage/図書館教場8.jpg",],
    four:["/planeImage/1号館1.jpg",
        "/planeImage/1号館2.jpg",
        "/planeImage/1号館3.jpg",
        "/planeImage/1号館4.jpg",
        "/planeImage/1号館5.jpg",
        "/planeImage/1号館6.jpg",],
    five:["/えちごimage/1号館二階大教室.jpg","/えちごimage/1号館二階大教室 6.jpg","/えちごimage/1号館二階大教室 7.jpg","/えちごimage/1号館二階大教室 8.jpg","/えちごimage/1号館二階大教室 10.jpg",]
}


//画面を決定する。
window.addEventListener("load", function () {
const now = new Date();
const hour = now.getHours();
const plane = document.getElementById("plane");
const allClass = document.querySelector(".button");
const allClass1 = document.querySelector(".button1");
const allClass2 = document.querySelector(".button2");
const allClass3 = document.querySelector(".button3");

allClass.classList.remove("button");
allClass1.classList.remove("button1");
allClass2.classList.remove("button2");
console.log(storagePlane);
console.log(hour);

//画面を決定する
if(storagePlane === "右下の棟"){
    allClass.classList.add("underRight");
    allClass1.classList.add("underRight2");
    allClass2.classList.add("underRight3");
    console.log(allClass);

    if(hour > 6 && 12 >hour){
        plane.src = planeImage.one[0];
        time = "朝";
        console.log("朝");
    }else if(hour > 12 && 18 > hour){
        plane.src = planeImage.one[1];
        time = "昼";
        console.log("夕方");
    }else{
        plane.src = planeImage.one[2];
        time = "夜";
        console.log("夜");
    }
}
if(storagePlane === "三連棟"){
    allClass.classList.add("threeBuild");
    allClass1.classList.add("threeBuild2");
    allClass2.classList.add("threeBuild3");

    console.log(storagePlane);
    if(hour > 6 && 12 >hour){
        time = "朝";
        plane.src = planeImage.two[0];

    }else if(hour > 12 && 18 > hour){
        time = "昼";
        plane.src = planeImage.two[1];
        console.log("夕方");
    } else{
        time = "夜";
        plane.src = planeImage.two[2];
        console.log("夜");
    }
}
if(storagePlane === "左下の棟"){
    const random = Math.floor(Math.random()*10 % 6);
    console.log(random);
        plane.src = planeImage.three[random];
        allClass.classList.add("button");
        allClass1.classList.add("button1");
        allClass2.classList.add("button2");

        if(random === 4 || random === 5){
            rightRandom ="ダーク";
            //びっくり予定地
        }else{
            rightRandom = ""
        }
    }
if(storagePlane === "右上の棟"){
    const random = Math.floor(Math.random()*10 % 6);
    console.log(random);
        plane.src = planeImage.four[random];
        allClass.classList.add("upRight");
        allClass1.classList.add("upRight1");
        allClass2.classList.add("upRight2");
        allClass3.classList.add("upRight3");

        if(random === 0 || random === 1 || random === 2){
            rightRandom ="ダーク";
            //びっくり予定地
        }else{
            rightRandom = ""
        }
}
if(storagePlane === "中央の奴"){
    const random = Math.floor(Math.random()*10 % 5);
    console.log(random);
        plane.src = planeImage.five[random];
        allClass.classList.add("center");
        allClass1.classList.add("center1");
        allClass2.classList.add("center2");
}
});

//ボタン
const button = document.querySelector(".button");
const button1 = document.querySelector(".button1");
const button2 = document.querySelector(".button2");

const horrorImage = document.getElementById("horrorImage");
const button3 = document.querySelector(".button3");

button.addEventListener("click",function(){
    checkButton();
    window.location.href = "/html/blackBoard.html"
})
button1.addEventListener("click",function(){
    checkButton();
    window.location.href = "/html/blackBoard2.html"
})
button2.addEventListener("click",function(){
    checkButton();
    window.location.href = "/html/blackBoard3.html"
})
//このボタンがびっくり用ボタン
button3.addEventListener("click",function(){
    horrorImage.classList.remove("active"); // 再発火対策
    void horrorImage.offsetWidth;           // アニメーションリセット
    horrorImage.classList.add("active");
})
function checkButton(){
    if(storagePlane === "左下の棟"){
        localStorage.setItem("blackBoardPlane",storagePlane);
    }
    if(storagePlane === "三連棟"){
        localStorage.setItem("blackBoardPlane",storagePlane);
    }
    if(storagePlane === "中央の奴"){
        localStorage.setItem("blackBoardPlane",storagePlane);
    }
    if(storagePlane === "右上の棟"){
        localStorage.setItem("blackBoardPlane",storagePlane);
    }
    if(storagePlane === "右下の棟"){
        localStorage.setItem("blackBoardPlane",storagePlane);
    }
}
