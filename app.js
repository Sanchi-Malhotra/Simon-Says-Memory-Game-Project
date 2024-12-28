let gameSeq=[];
let userSeq=[];
let started=false;
let level=0;
let maxScore=0;
let btns=["yellow","red","purple","green"];
let h2=document.querySelector("h2");
let h3=document.querySelector("h3");
//step 1...koi bhi key press krne pe start game
document.addEventListener("keydown",function(){
    if(started==false){
        console.log("game started");
        started=true;

        levelUp();
    }
});

//step 2 level up and flash button
function levelUp(){
    userSeq=[];//step 5 imp..ie jaise hi level up hua userseq empty ho jaaega and starting se saare element daalo
    level++;
    h2.innerText=`Level ${level}`;
    //for any random button
    let randIdx=Math.floor(Math.random()*3);//to generate a random no. from 0 to 3 to access elements in btn array
    let randColor=btns[randIdx];//to get a random color from the btns array
    let randBtn=document.querySelector(`.${randColor}`)//accessing that random color button through its class
   //step 4..jo bhi random color generate hue h usko game sequence arr mein daal denge
   gameSeq.push(randColor);

    btnFlash(randBtn);
}
//btn flashing fucntion..flash class add krdo less than 1sec k liye toh uska bg color white ho jaaega fir uski cls hatado
function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}
//step 3...selecting all the buttons and making function of unko press krne pe kya hoga
let allBtns=document.querySelectorAll(".btn");
for (btn of allBtns){
    btn.addEventListener("click",btnPress);
}
function btnPress(){
    let btn=this;
    //jo btn press krega user bhi usko bhi flash krna h so call function
    btnFlash(btn);
    //step 4..user jo button press kr raha h usko userseq mein add krna padega
    let userColor=btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length-1);//kis level k liye check ho raha h ie userSeq.length-1
}

//step 5- matching sequence in userSeq and gameSeq
function checkAns(idx){
if(userSeq[idx]==gameSeq[idx]){
    //agar seq mein voh last index h toh level up hoga nhi toh bas ans check hote rahenge
   if(userSeq.length==gameSeq.length){
    //1 sec k delay k baad level up
    setTimeout(levelUp,1000);
   }
}
else{
    let score=level;
    h2.innerHTML=`Game over ! Your score was <b>${score}</b> . Press any key to restart`;
   
    highestScore(score);
    //game over hone pe kuch ms k liye scree ka bg color set to red
    document.querySelector("body").style.backgroundColor="red";
    setTimeout(function(){
        document.querySelector("body").style.backgroundColor="white";
    },150);
    //step 6..game over toh reset everything   
    reset();
}   
}
//step 6
function reset(){
    gameSeq=[];
    started=false;
    userSeq=[];
    level=0;
}

//highest score
function highestScore(score){
 if(maxScore<score){
    maxScore=score;
}
h3.innerHTML= `Highest score is ${maxScore}`;

}