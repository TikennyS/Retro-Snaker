var c=document.getElementById("myCanvas"); 
var up = document.getElementById("up");
var left = document.getElementById("left");
var down = document.getElementById("down");
var right = document.getElementById("right");
var time = 200 ; //蛇的速度 
var cxt=c.getContext("2d"); 
var t = 20; //蛇身长 
var map = []; //记录蛇运行路径 
var size = 8; //蛇身单元大小 
var x = y = 8;
var direction = 4;
var one = 1;
interval = window.setInterval(set_game_speed, time); // 移动蛇 

function set_game_speed(){ // 移动蛇 
        switch(direction){ 
            case 1:y = y-size;break; //上
            case 4:x = x+size;break; //右
            case 2:x = x-size;break; //左
            case 3:y = y+size;break; //下
        } 
    if(x>408 || y>408 || x<0 || y<0){ 
        alert("你挂了，继续努力吧!失败原因：碰壁了.....");
        window.location.reload(); 
    } 
    for(var i=0;i<map.length;i++){ 
        if( parseInt(map[i].x)==x && parseInt(map[i].y)==y){ 
            alert("你挂了，继续努力吧！失败原因：撞到自己了.....");
            window.location.reload(); 
        } 
    } 
    if (map.length>t) { //保持蛇身长度 
        var cl = map.shift(); //删除数组第一项，并且返回原元素 
        cxt.clearRect(cl.x, cl.y, size+1, size+1); 
    }; 
    map.push({'x':x,'y':y}); //将数据添加到原数组尾部 
    cxt.fillStyle = "#006699";//内部填充颜色 
    cxt.strokeStyle = "#006699";//边框颜色 
    cxt.fillRect(x, y, size, size);//绘制矩形 

    if((a*8)==x&&(a*8)==y){
        rand_frog();
        t++;
    }

    up.addEventListener("click",function(){direction = 1;});
    left.addEventListener("click",function(){direction = 2;});
    down.addEventListener("click",function(){direction = 3;});
    right.addEventListener("click",function(){direction = 4;});
} 

function rand_frog(){ //随机出现食物
    a = Math.ceil(Math.random()*50);
    cxt.fillStyle = "#000000";
    cxt.strokeStyle = "#000000";
    cxt.fillRect(a*8,a*8,size,size);
}
rand_frog();