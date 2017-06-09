var c=document.getElementById("myCanvas")
var cxt=c.getContext("2d");

var up=document.getElementById("1")
var down=document.getElementById("2")
var left=document.getElementById("3")
var right=document.getElementById("4")
var buttonA=document.getElementById("5")
var buttonB=document.getElementById("6")
var buttonreset=document.getElementById("7")

var x=Math.ceil(Math.random()*30);
var y=Math.ceil(Math.random()*40);

var foodx;       //食物坐标
var foody;

var obstaclex;   //障碍物坐标
var obstacley;
var obstaclewidth;
var obstacleheight;

var size=8;
var length=10;  //初始长度
var direction=Math.ceil(Math.random()*4);    //方向   1234，上下左右
var map=[];     //运动轨迹

var storage=window.localStorage;
storage['1'];
storage['2'];
storage['3'];

x=x*8;
y=y*8;

if(storage['1']==null)
   storage['1']=0;
if(storage['2']==null)
   storage['2']=500;
if(storage['3']==null||storage['3']<1||storage['3']>25)
   storage['3']=1;

function move_snake(){
    switch(direction){
        case 1: y=y-size;break;
        case 2: y=y+size;break;
        case 3: x=x-size;break;
        case 4: x=x+size;break;
    }
    if(x>408 || x<0 || y<0 || y>408){
        if((1000/storage['2'])>storage['1']){
            storage['1']=(1000/storage['2']).toFixed(2);
        }
        alert("GameOver!碰壁了!"+"当前速度："+(1000/storage['2']).toFixed(2)+"/s"+"\n"+"最高速:"+storage['1']+'/s');
        window.location.reload();
    }
   for(var i=0;i<map.length;i++){
       if(map[i].x==x&&map[i].y==y){
            if((1000/storage['2'])>storage['1'])
             storage['1']=(1000/storage['2']);
            alert("GameOver!撞到自己!"+"当前速度："+(1000/storage['2']).toFixed(2)+"/s"+"\n"+"最高速:"+storage['1']+'/s');
            window.location.reload();
       }
   }
   if(map.length>length){
       var drawmap=map.shift();
       cxt.clearRect(drawmap['x'],drawmap['y'],size,size);
   }
   map.push({'x':x,'y':y}); 
   cxt.fillStyle = "#000000";
   cxt.strokeStyle = "#000000";
   cxt.fillRect(x, y, size, size);
   
   document.onkeydown = function(e) { 
   var code = e.keyCode; 
   switch(code){ 
   case 38 : direction = 1;break;
   case 40 : direction = 2;break; 
   case 37 : direction = 3;break;
   case 39 : direction = 4;break;}}
   
   up.addEventListener("click", function() {
    direction=1;});
   down.addEventListener("click", function() {
    direction=2;});
   left.addEventListener("click", function() {
    direction=3;});
   right.addEventListener("click", function() {
    direction=4;});


   if((foodx*8)==x&&(foody*8)==y){
       randomfood();
       length++;
   }
   if(Math.abs(obstaclex*8-x)<24&&Math.abs(obstacley*8-y)<24){
       alert("GameOver!撞到障碍物了!"+"当前速度："+(1000/storage['2']).toFixed(2)+"/s"+"\n"+"最高速:"+storage['1']+'/s');
       window.location.reload();
   }
}
 buttonA.addEventListener("click", function() {  
    storage['2']=parseInt(storage['2'])-20;
    storage['3']=parseInt(storage['3'])+1;
    if(parseInt(storage['2'])<20){
    alert("已是最高难度，恭喜");
    storage['2']=500;}
    window.location.reload();;});
 buttonB.addEventListener("click", function() {  
    storage['2']=parseInt(storage['2'])+20;
    storage['3']=parseInt(storage['3'])-1;
    if(parseInt(storage['2'])>500){
    alert("已是最低难度");
    storage['2']=500;}
    window.location.reload();});
 buttonreset.addEventListener("click", function() {  
    storage['2']=500;
    storage['3']=1;
    window.location.reload() ;});

function randomfood(){
    foodx=Math.ceil(Math.random()*50);
    foody=Math.ceil(Math.random()*50);
    cxt.fillStyle = "#000000";
    cxt.strokeStyle = "#000000";
    cxt.fillRect(foodx*8,foody*8,8,8);
}
function randomobstacle(){
    console.log(obstaclex);
    cxt.clearRect(obstaclex*8-1,obstacley*8-1,obstaclewidth+2,obstacleheight+2);
    obstaclex=Math.ceil(Math.random()*50);
    obstacley=Math.ceil(Math.random()*50);
    obstaclewidth=Math.ceil(Math.random()*150);
    obstacleheight=Math.ceil(Math.random()*150);

    if(obstaclewidth<=16)
       obstaclewidth=obstaclewidth*8;
    if(obstacleheight<=16)
       obstacleheight=obstacleheight*8;
    cxt.strokeStyle = "#000000";
    cxt.strokeRect(obstaclex*8,obstacley*8,obstaclewidth,obstacleheight);
}
function timeout(){
    document.getElementById("level").innerHTML = "当前等级" + storage['3'];
}
randomfood();
timeout();
window.setInterval(randomobstacle,5*storage['2']); 
window.setInterval(move_snake,storage['2']); 