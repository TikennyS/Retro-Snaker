var c=document.getElementById("myCanvas")
var cxt=c.getContext("2d");

var up=document.getElementById("1")
var down=document.getElementById("2")
var left=document.getElementById("3")
var right=document.getElementById("4")
var buttonA=document.getElementById("5")

var x=Math.ceil(Math.random()*30);
var y=Math.ceil(Math.random()*40);

var food;       //食物坐标
var obstacle;   //障碍物坐标

var size=8;
var length=10;  //初始长度
var direction=Math.ceil(Math.random()*4);    //方向   1234，上下左右
var map=[];     //运动轨迹

var storage=window.localStorage;
storage['1'];
storage['2'];

x=x*8;
y=y*8;

if(storage['1']==null)
   storage['1']=0;
if(storage['2']==null)
   storage['2']=500;

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
        alert("GameOver!碰壁了!"+"当前速度："+(1000/storage['2']).toFixed(2)+"/s"+"\n"+"最高速:"+storage['1']+'/s'+storage['2']);
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

   
   up.addEventListener("click", function() {
    direction=1;});
   down.addEventListener("click", function() {
    direction=2;});
   left.addEventListener("click", function() {
    direction=3;});
   right.addEventListener("click", function() {
    direction=4;});
    //level提高按钮
  

   if((food*8)==x&&(food*8)==y){
       randomfood();
       length++;
   }
   if(Math.abs(obstacle*8-x)<24&&Math.abs(obstacle*8-y)<24){
       randomobstacle();
       alert("GameOver!撞到障碍物了!"+"当前速度："+(1000/storage['2']).toFixed(2)+"/s"+"\n"+"最高速:"+storage['1']+'/s');
       window.location.reload();
   }

}
 buttonA.addEventListener("click", function() {  
    storage['2']=storage['2']-20;
    window.location.reload() ;});
function randomfood(){
    food=Math.ceil(Math.random()*50);
    cxt.fillStyle = "#000000";
    cxt.strokeStyle = "#000000";
    cxt.fillRect(food*8,food*8,8,8);
}
function randomobstacle(){
    obstacle=Math.ceil(Math.random()*50);
    cxt.strokeStyle = "#000000";
    cxt.strokeRect(obstacle*8,obstacle*8,24,24);
}
randomfood();
randomobstacle();
interval = window.setInterval(move_snake,storage['2']); 