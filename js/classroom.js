const storagePlane = localStorage.getItem("storagePlane");

const planeImage = {
    one: [
        "/----------/planeImage/1号館朝.jpg",
        "/----------/planeImage/1号館夕方.jpg",
        "/----------/planeImage/1号館夜.jpg"
    ],
    two: [
        "/----------/planeImage/第二研究所朝.png",
        "/----------/planeImage/第二研究所夕方.png",
        "/----------/planeImage/第二研究所夜3.png"
    ],
    three: [
        "/----------/えちごimage/図書館教場.jpg",
        "/----------/えちごimage/図書館教場4.jpg",
        "/----------/えちごimage/図書館教場5.jpg",
        "/----------/えちごimage/図書館教場6.jpg",
        "/----------/えちごimage/図書館教場7.jpg",
        "/----------/えちごimage/図書館教場8.jpg"
    ],
    four: [
        "/----------/planeImage/1号館1.jpg",
        "/----------/planeImage/1号館2.jpg",
        "/----------/planeImage/1号館3.jpg",
        "/----------/planeImage/1号館4.jpg",
        "/----------/planeImage/1号館5.jpg",
        "/----------/planeImage/1号館6.jpg"
    ],
    five: [
        "/----------/えちごimage/1号館二階大教室.jpg",
        "/----------/えちごimage/1号館二階大教室 6.jpg",
        "/----------/えちごimage/1号館二階大教室 7.jpg",
        "/----------/えちごimage/1号館二階大教室 8.jpg",
        "/----------/えちごimage/1号館二階大教室 10.jpg"
    ]
};


horrorSpeak = {
    男:["うぉ！？、なんだアイツ！？",
    "どうやら、俺たちは歓迎されていないみたいだな。"
    ],

    女:["きゃっ！？私たちの味方……な、わけないよね",
    "出てけってことなのかな？"]
}

let time = "";
let rightRandom = "";

window.addEventListener("load", function () {
    const now = new Date();
    const hour = now.getHours();

    const plane = document.getElementById("plane");
    const allClass  = document.querySelector(".button");
    const allClass1 = document.querySelector(".button1");
    const allClass2 = document.querySelector(".button2");
    const allClass3 = document.querySelector(".button3");

    console.log(storagePlane, hour);

    // ===== 右下の棟 =====
    if (storagePlane === "右下の棟") {
        allClass?.classList.add("underRight");
        allClass1?.classList.add("underRight2");
        allClass2?.classList.add("underRight3");

        if (hour >= 6 && hour < 12) {
            plane.src = planeImage.one[0];
            time = "朝";
        } else if (hour >= 12 && hour < 18) {
            plane.src = planeImage.one[1];
            time = "昼";
        } else {
            plane.src = planeImage.one[2];
            time = "夜";
        }
    }

    // ===== 三連棟 =====
    if (storagePlane === "三連棟") {
        allClass?.classList.add("threeBuild");
        allClass1?.classList.add("threeBuild2");
        allClass2?.classList.add("threeBuild3");

        if (hour >= 6 && hour < 12) {
            plane.src = planeImage.two[0];
            time = "朝";
        } else if (hour >= 12 && hour < 18) {
            plane.src = planeImage.two[1];
            time = "昼";
        } else {
            plane.src = planeImage.two[2];
            time = "夜";
        }
    }

    // ===== 左下の棟 =====
    if (storagePlane === "左下の棟") {
        const random = Math.floor(Math.random() * planeImage.three.length);
        plane.src = planeImage.three[random];

        if (random >= 4) {
            rightRandom = "ダーク";
        }
    }

    // ===== 右上の棟 =====
    if (storagePlane === "右上の棟") {
        const random = Math.floor(Math.random() * planeImage.four.length);
        plane.src = planeImage.four[random];

        allClass?.classList.add("upRight");
        allClass1?.classList.add("upRight1");
        allClass2?.classList.add("upRight2");

        if (random <= 2) {
            rightRandom = "ダーク";
            allClass3?.classList.add("upRight3");
        }
    }

    // ===== 中央の奴 =====
    if (storagePlane === "中央の奴") {
        const random = Math.floor(Math.random() * planeImage.five.length);
        plane.src = planeImage.five[random];

        allClass?.classList.add("center");
        allClass1?.classList.add("center1");
        allClass2?.classList.add("center2");
    }
});

// ===== ボタン =====
const button  = document.querySelector(".button");
const button1 = document.querySelector(".button1");
const button2 = document.querySelector(".button2");
const button3 = document.querySelector(".button3");
const horrorImage = document.getElementById("horrorImage");

button?.addEventListener("click", () => {
    checkButton();
    location.href = "/----------/html/blackBoard.html";
});

button1?.addEventListener("click", () => {
    checkButton();
    location.href = "/----------/html/blackBoard2.html";
});

button2?.addEventListener("click", () => {
    checkButton();
    location.href = "/----------/html/blackBoard3.html";
});

button3?.addEventListener("click", () => {
    horrorImage.classList.remove("active");
    void horrorImage.offsetWidth;
    horrorImage.classList.add("active");
    HorrorTalk();
});

function checkButton() {
    localStorage.setItem("blackBoardPlane", storagePlane);
}

function HorrorTalk(){
    appearUI();
    pattern = gender;
    speak.textContent = horrorSpeak[pattern][flag];
    flag++;
    if(flag === talk[pattern].length + 1){
        HiddenUI();
        Human();
    }
}