var c=document.getElementById("myCanvas")
var cxt=c.getContext("2d");

var up=document.getElementById("1")
var down=document.getElementById("2")
var left=document.getElementById("3")
var right=document.getElementById("4")

var x=Math.random()*300;
var y=Math.random()*300;
var time= 200;  //初始200ms移动一次
var food;       //食物坐标
var size=8;
var length=10;  //初始长度
var direction=Math.ceil(Math.random()*4);    //方向   1234，上下左右
var map=[];     //运动轨迹

var storage=window.localStorage;
storage['1']=5;

//x=500;
function move_snake(){
    switch(direction){
        case 1: y=y-size;break;
        case 2: y=y+size;break;
        case 3: x=x-size;break;
        case 4: x=x+size;break;
    }
    if(x>408 || x<0 || y<0 || y>408){
        if((1000/time)>storage['1']){
            storage['1']=(1000/time);
        }
        alert("GameOver!碰壁了!"+"当前速度："+(1000/time)+"/s"+"\n"+"最高速:"+storage['1']+'/s');
        window.location.reload();
    }
   for(var i=0;i<map.length;i++){
       if(map[i].x==x&&map[i].y==y){
            if((1000/time)>storage['1'])
             storage['1']=(1000/time);
            alert("GameOver!撞到自己!"+"当前速度："+(1000/time)+"/s"+"\n"+"最高速:"+storage['1']+'/s');
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

}
interval = window.setInterval(move_snake, time); 
