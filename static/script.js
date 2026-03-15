let runs = 0;
let wickets = 0;
let balls = 0;
let beats = 0;

let innings = 1;
let target = 0;

let history = [];
let currentOver = [];
let legalBalls = 0;

function update(){

document.getElementById("score").innerText = runs + " / " + wickets;
document.getElementById("balls").innerText = balls;

if(innings==2){

let need = target - runs;

if(need <= 0){
document.getElementById("target").innerText = "Team B Won 🎉";
return;
}

document.getElementById("target").innerText =
"Need " + need + " runs";

}

document.getElementById("thisover").innerText =
currentOver.join(" ");

}

function save(){
history.push([runs,wickets,balls,beats,[...currentOver],legalBalls]);
}

function addBall(symbol){
balls++;
legalBalls++;

currentOver.push(symbol);

if(legalBalls == 6){
currentOver = [];
legalBalls = 0;
}
}

function wide(){
save();
runs+=1;
currentOver.push("Wd");
update();
}

function noball(){
save();
runs+=1;
currentOver.push("Nb");
update();
}

function noballrun(){
save();
runs+=2;
currentOver.push("Nb+1");
update();
}

function dot(){
save();
addBall("0");
update();
}

function run1(){
save();
runs+=1;
addBall("1");
update();
}

function four(){
save();
runs+=4;
addBall("4");
update();
}

function beat(){
save();
beats+=1;
addBall("B");

if(beats==2){
wickets+=1;
beats=0;
currentOver[currentOver.length-1]="W";
}

update();
}

function wicket(){
save();
wickets+=1;
beats=0;
addBall("W");
update();
}

function undo(){

if(history.length>0){

let last = history.pop();

runs = last[0];
wickets = last[1];
balls = last[2];
beats = last[3];
currentOver = last[4];
legalBalls = last[5];

update();

}

}

function done(){

if(innings==1){

target = runs+1;

runs = 0;
wickets = 0;
balls = 0;
beats = 0;
currentOver = [];
legalBalls = 0;

innings = 2;

alert("Second Innings Start. Target: "+target);

update();

}

else{

alert("Match Finished");

}

}