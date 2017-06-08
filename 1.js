var c=document.getElementById("myCanvas"); 
var up = document.getElementById("up");
var left = document.getElementById("left");
var down = document.getElementById("down");
var right = document.getElementById("right");
var totaletime = document.getElementById("total_time");
var time = 200 ; //蛇的速度 
var cxt=c.getContext("2d"); 
var t = 20; //蛇身长 
var map = []; //记录蛇运行路径 
var size = 8; //蛇身单元大小 
var x = y = 8;
var direction = 4; 
var food_state = false; //食物类型
var total_time = 60; //倒计时
var total_score = 10; //总分
var score = 0; //得分


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
    if(total_time<0 && score<total_score){
        alert("时间到了，你输了！");
        window.location.reload();
    }
    if(score>=total_score){
        alert("你赢了，即将进入下一关！");
        score = 0;
        t = 20;
        total_score = total_score + 20;
        if(total_time>=0)
            total_time = 60 + total_time;
    }
    if (map.length>t) { //保持蛇身长度 
        var cl = map.shift(); //删除数组第一项，并且返回原元素 
        cxt.clearRect(cl.x, cl.y, size+1, size+1); 
    }; 
    map.push({'x':x,'y':y}); //将数据添加到原数组尾部 
    cxt.fillStyle = "#006699";//内部填充颜色 
    cxt.strokeStyle = "#006699";//边框颜色 
    cxt.fillRect(x, y, size, size);//绘制矩形 

    if((a*8)==x&&(a*8)==y){ //吃食物
        if(food_state)
            score = score + 5;
        else
            score = score + 1;
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
    if(a%3==0){
        cxt.fillStyle = "#FF0000";
        cxt.strokeStyle = "#FF0000";
        cxt.fillRect(a*8,a*8,size,size);
        food_state = true;
        //total_time = total_time + 5;
    }
    else{
        cxt.fillStyle = "#000000";
        cxt.strokeStyle = "#000000";
        cxt.fillRect(a*8,a*8,size,size);
        food_state = false;
    }
}
rand_frog();

function timeout(){
    document.getElementById("total_time").innerHTML = "时间为" + total_time + "s," + "当前得分：" + score + "，总分：" + total_score;
    total_time = total_time - 1;
    setTimeout("timeout();",1000);
}
timeout();