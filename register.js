 window.localStorage.getItem('userName');
    window.localStorage.getItem('password');
    function savepassword(){
        if(document.getElementById("userName").value=="")
            alert("用户名不能为空！");
        else{
            if(document.getElementById("passWord").value=="")
                alert("密码不能为空！");
            else{
                username = JSON.parse(localStorage.getItem('username'));
                password = JSON.parse(localStorage.getItem('password'));
                if(username==null)
                   username=[];
                if(password==null)
                   password=[];
                var i=-1;
                var j=0;
                for(j=0;j<username.length;j++)
                   if(username[j]==document.getElementById("userName").value)
                   i=j;
                if(i==-1){
                window.open("Log_In.html");
                username.push(document.getElementById("userName").value);
                password.push(document.getElementById("passWord").value);
                localStorage.setItem('username',JSON.stringify(username));
                localStorage.setItem('password',JSON.stringify(username));}
                else
                alert("用户已经存在");
            }
        }
    }