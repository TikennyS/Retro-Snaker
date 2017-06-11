  username = JSON.parse(localStorage.getItem('username'));
  password = JSON.parse(localStorage.getItem('password'));
  var i=-1;
  var j=0

    function buquan(){
        if(localStorage.getItem("state")==1&&document.getElementById("userName").value==username[i])
            document.getElementById("passWord").value=password[i];
        else
            document.getElementById("passWord").value="";
    }

    function savepassword(){
        for(j=0;j<username.length;j++)
            if(username[j]==document.getElementById("userName").value)
                i=j;
        if(document.getElementById("passWord").value==password[i]){
            window.open("index.html");
            if(document.getElementById("checkbox").checked==true){
                localStorage.setItem("state","1");
                }
            }
            else
                alert("账号或密码错误");

    }