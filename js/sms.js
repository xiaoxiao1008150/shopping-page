
function sendSms(){
    document.getElementById('zphone').removeAttribute('onclick');
    document.getElementById("yzmimg").click();
    var mobile = document.getElementById('extend_field5').value;
    var mobile_notice = document.getElementById('extend_field5_notice').innerText;
    var yzm_code = document.getElementById('yzmcode').value;
    //console.log(yzm_code);
    //alert(mobile_notice.indexOf("可以注册"));
    if (parseInt(mobile_notice.indexOf("可以注册")) > 0) {
        Ajax.call('sms.php?ajax=getvcod', 'mobile=' + mobile + '&yzm_code=' + yzm_code, sendSmsResponse, 'POST', 'JSON');
    }else{
        alert('请检查您的验证码或者手机号是否正确！')
    }
    document.getElementById('zphone').setAttribute('onclick','sendSms()');
}
function sendSmsResponse(result){
    if (result.code==0 && result.msg=='OK'){
        RemainTime();
        alert('手机验证码已经成功发送到您的手机!');
    }else{
        if(result.msg){
            alert(result.msg);
        }else{
            alert('手机验证码发送失败!');
        }

    }
}

function vcodecheck(){
    var mobile = document.getElementById('extend_field5').value;
    var mobile_code = document.getElementById('mobile_code').value;
    if (mobile != ''){
        var result = Ajax.call('sms.php?ajax=vcodecheck', 'mobile=' + mobile + '&mobile_code=' + mobile_code, null, 'POST', 'JSON', false);
        if (result.msg == '验证码错误!'){
            alert(result.msg);
            return false;
        }else{
            return true;
        }
    }else{
        alert('请输入手机号!');
        return false;
    }
}

var iTime = 59;
var Account;
function RemainTime(){
    //document.getElementById('zphone').disabled = true;
    document.getElementById('zphone').removeAttribute('onclick');
    var iSecond,sSecond="",sTime="";
    if (iTime >= 0){
        iSecond = parseInt(iTime%60);
        if (iSecond >= 0){
            sSecond = iSecond + "秒";
        }
        sTime=sSecond;
        if(iTime==0){
            clearTimeout(Account);
            sTime='获取验证码';
            iTime = 59;
            //document.getElementById('zphone').disabled = false;
            document.getElementById('zphone').setAttribute('onclick','sendSms()');
        }else{
            Account = setTimeout("RemainTime()",1000);
            iTime=iTime-1;
        }
    }else{
        sTime='没有倒计时';
    }
    document.getElementById('zphone').innerHTML = sTime;
}