document.getElementById("button").addEventListener("click",function(){ 
    window.location.href = "/----------/html/main.html";
    console.log("移動");
  localStorage.setItem("horror_clock_start", Date.now());
sessionStorage.removeItem("horror_scene_start");
currentImageIndex = -1;
})
document.getElementById("clockButton").addEventListener("click",function(){
    
})



//会話パート

let flag = 0;
let count = 0;
//どうにかする
let manSelecting = true;


const man = document.getElementById("man")
const woman =document.getElementById("woman")
const direction = document.getElementById("direction");

const talk = [
    ["教養ゼミ（１）の世界へようこそ","まずは性別から選んでね","男の子と女の子どっちにする？"],
    ["男の子を選んだんだね"],
    ["女の子を選んだんだね"],
    ["それじゃあ行こうか教養ゼミ（１）の世界に"]
]

sessionStorage.removeItem("tutorialSeen");

const speak = document.getElementById("speak");
const message = document.getElementById("message");
const cover = document.getElementById("cover");

direction.addEventListener("click",function(){
    window.location.href = "/----------/html/main.html";
  localStorage.setItem("horror_clock_start", Date.now());
sessionStorage.removeItem("horror_scene_start");
currentImageIndex = -1;
})

cover.addEventListener("click",function(){
    if(!manSelecting){
        return
    }else if(count === 0 && flag === 2){
        console.log(talk[count][flag]);
        woman.style.display = "block";
        man.style.display = "block";
        manSelecting = false;
        flag=0;
    }else if(count === 1 || count === 2){
        console.log(talk[count][flag]);
        count = 3;
        speak.textContent = talk[count][flag];
    }else if(count === 3){
        cover.style.display = "none";
        message.style.display = "none";
        speak.style.display = "none";
        direction.style.display = "block";
    }else{
        speak.textContent = talk[count][flag];
        flag++;
    }
})


man.addEventListener("click",function(){
   woman.style.display = "none";
   man.style.display = "none";
   manSelecting = true;
   count=1;
   speak.textContent =talk[count][flag];
   localStorage.setItem("gender","男");
})
woman.addEventListener("click",function(){
    woman.style.display = "none";
    man.style.display = "none";
    manSelecting = true;
    count=2;
    speak.textContent = talk[count][flag];
    localStorage.setItem("gender","女");
})

//試験2
function HiddenUI(){
    cover.style.display = "none";
}
