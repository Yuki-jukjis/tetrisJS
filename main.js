var field;
var floating;
var floatingX, floatingY;
var count;
var next;
var hold;

function init() {
  field = new Array(22);
  for(var y=0; y<22; y++)
    field[y] = new Array(12), field[y].fill("");
  for(var x=0; x<12; x++)
    field[21][x] = "W";
  for(var y=0; y<22; y++)
    field[y][0] = field[y][11] = "W";
  posX = 3;
  posY = 0;
  next = []; shuffle();
  floating = generate(next[0]);
  hold = "";
}

function generate(type){
  switch(type){
    case "i":{
      return [
        ["" ,"" ,"" ,"" ],
        ["" ,"" ,"" ,"" ],
        ["i","i","i","i"],
        ["" ,"" ,"" ,"" ]];
    }
    case "o":{
      return [
        ["" ,"" ,"" ,"" ],
        ["" ,"o","o","" ],
        ["" ,"o","o","" ],
        ["" ,"" ,"" ,"" ]];
    }
    case "z":{
      return [
        ["" ,"" ,"" ,"" ],
        ["z","z","" ,"" ],
        ["" ,"z","z","" ],
        ["" ,"" ,"" ,"" ]];
    }
    case "t":{
      return [
        ["" ,"" ,"" ,"" ],
        ["" ,"t","" ,"" ],
        ["t","t","t","" ],
        ["" ,"" ,"" ,"" ]];
    }
    case "s":{
      return [
        ["" ,"" ,"" ,"" ],
        ["" ,"s","s","" ],
        ["s","s","" ,"" ],
        ["" ,"" ,"" ,"" ]];
    }
    case "l":{
      return [
        ["" ,"" ,"" ,"" ],
        ["l","" ,"" ,"" ],
        ["l","l","l","" ],
        ["" ,"" ,"" ,"" ]];
    }
    case "j":{
      return [
        ["" ,"" ,"" ,"" ],
        ["" ,"" ,"j","" ],
        ["j","j","j","" ],
        ["" ,"" ,"" ,"" ]];
    }
  }
}

function move(moveX, moveY){
  if(motionHit(moveX, moveY)) return false;
  posX += moveX, posY += moveY;

  show();
  return true;
}

function motionHit(moveX, moveY){
  for(var x=0; x<4; x++) for(var y=0; y<4; y++)
    if(floating[y][x] && field[posY+y+moveY][posX+x+moveX]) return true;
  return false;
}

function freezeAndPut(){
  for(var x=0; x<4; x++) for(var y=0; y<4; y++)
    if(floating[y][x]) field[posY+y][posX+x]=floating[y][x];

  next.shift();
  posX = 3;
  posY = 0;
  floating = generate(next[0]);
  if(next.length < 3) shuffle();

  show();
}

function hardDrop(){
  while(move(0, 1));
  freezeAndPut();
}

function check(){
  field.filter(x=>x.some(y=>y));
  var count = 22 - field.length;
  for(var i=0; i<count; i++)
    field.push(Array(12)), field.last.fill(""), field.last[0]="W",field.last[11]="W";
  return count;
}

function shuffle(){
  var m = ["i", "o", "s", "z", "l", "j", "t"];
  for(var i=0; i<7; i++)
    next.push(m.splice(Math.floor(Math.random()*m.length), 1)[0]);
}

function show() {
  buf = "";
  for(var y=0; y<22; buf+="\n", y++)
    for(var x=0; x<12; x++)
    buf += field[y][x]?field[y][x]:(posX<=x&&x<posX+4&&posY<=y&&y<4+posY&&floating[y-posY][x-posX]?floating[y-posY][x-posX]:" ");
  console.log(buf);
}
