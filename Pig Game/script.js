//'use strict';
let score0=document.querySelector("#score--0");
let score1=document.querySelector("#score--1");
let player0=document.querySelector(".player--0");
let player1=document.querySelector(".player--1");
let currplayer0=document.querySelector("#current--0");
let currplayer1=document.querySelector("#current--1");
let diceEle=document.querySelector(".dice");
let btnRoll=document.querySelector(".btn--roll");
let btnHold=document.querySelector(".btn--hold");
let btnNew=document.querySelector(".btn--new");
let currscore=0;
let score=[0,0];
let activeplayer=0;
let playing=true;

diceEle.classList.add("hidden");
score0.textContent=0;
score1.textContent=0;

function switchplayer(){
    document.getElementById(`current--${activeplayer}`).textContent=0;
    activeplayer^=1;
    currscore=0;
    player0.classList.toggle("player--active");
    player1.classList.toggle("player--active");
}
btnRoll.addEventListener("click",()=>{
    if(playing){
    //1.generating random dice roll
    let dice=Math.floor(Math.random()*6)+1;
    //2.display dice
    diceEle.classList.remove("hidden");
    diceEle.src=`dice-${dice}.png`;
    //3.check for roll 1 if yes then switch to other user
    if(dice!=1){
        currscore+=dice;
        document.getElementById(`current--${activeplayer}`).textContent=currscore;
    }else{
       switchplayer();
    }
}
});

btnHold.addEventListener("click",()=>{
    if(playing){
    //1.add current score to active player
    score[activeplayer]+=currscore;
    document.getElementById(`score--${activeplayer}`).textContent=score[activeplayer];
    //2.check if players score is >100 if yes then finish
    if(score[activeplayer]>=100){
        playing=false;
        document.querySelector(`.player--${activeplayer}`).classList.add("player--winner");
        document.querySelector(`.player--${activeplayer}`).classList.remove("player--active");
    }else{
        //3.switch to next player
        switchplayer();
    }
}
});

btnNew.addEventListener("click",()=>{
    score=[0,0];
    playing=true;
    diceEle.classList.add("hidden");
    document.querySelector(`.player--${activeplayer}`).classList.remove("player--winner");
    document.querySelector(`.player--0`).classList.add("player--active");
    currscore=0;
    activeplayer=0;
    document.getElementById(`current--0`).textContent=currscore;
    document.getElementById(`current--1`).textContent=currscore;
    document.getElementById(`score--0`).textContent=currscore;
    document.getElementById(`score--1`).textContent=currscore;
});