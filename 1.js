var c=document.getElementById("myCanvas"); 
var time = 200 ; //蛇的速度 
var cxt=c.getContext("2d"); 
var t = 20; //舍身长 
var map = []; //记录蛇运行路径 
var size = 8; //蛇身单元大小 
var x = y = 8;
var direction = 2;
interval = window.setInterval(set_game_speed, time); // 移动蛇 

function set_game_speed(){ // 移动蛇 
        switch(direction){ 
            case 1:y = y-size;break; 
            case 2:x = x+size;break; 
            case 0:x = x-size;break; 
            case 3:y = y+size;break; 
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
    if (map.length>t) { //保持舍身长度 
        var cl = map.shift(); //删除数组第一项，并且返回原元素 
        cxt.clearRect(cl.x, cl.y, size+1, size+1); 
    }; 
    map.push({'x':x,'y':y}); //将数据添加到原数组尾部 
    cxt.fillStyle = "#006699";//内部填充颜色 
    cxt.strokeStyle = "#006699";//边框颜色 
    cxt.fillRect(x, y, size, size);//绘制矩形 
} 