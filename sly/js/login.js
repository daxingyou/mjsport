function Dbnumber(){
    this.render();
}
Dbnumber.prototype = {
    render:function(){
        var urlarr=window.location.href.split(/[? = &]/);
        var ismatch=false,isnetbar=false;
        var reurl="profile.html"
        if(urlarr[1] =="matchId"){
            ismatch=true;
        }
        if(urlarr[1] =="return"){
            reurl=urlarr[2]+".html"
        }
        if(urlarr[4] =="netbar"){
            isnetbar=true;
        }
        $("#getCode").off("click").on("click",function(){
            var mobile = $("#phoneNumber").val();
            if(!(/^1[34578]\d{9}$/.test(mobile))){
                alert("手机号码有误，请重填");
                return false;
            }
            var _this = this;
            time(_this);
            $.getJSON(listUrl+'getcode',{mobile:mobile},function(json, textStatus) {
                if(json.errCode != 0){
                    alert(json.errMsg);
                    return false;
                }
            });
        });
        $("#validatePhone").off("click").on("click",function(){
            var mobile = $("#phoneNumber").val();
            var code = $("#code").val();
            if(!(/^1[34578]\d{9}$/.test(mobile))){
                alert("手机号码有误，请重填");
                return false;
            }
            else if( code.length == 0 ){
                alert("验证码不能为空！");
                return false;
            }
            $.getJSON(listUrl+'login',{username:mobile,password:code}, function(json, textStatus) {
				if(json.wxUrl) {
					window.location.href = json.wxUrl;
                } else if(json.errCode == 0){
                    alert(json.errMsg);
                    if(ismatch){
                        if(isnetbar){
                            window.location.href="matchinfo.html?matchId="+urlarr[2]+"&type=netbar";
                        }else{
                            window.location.href="matchfind.html?matchId="+urlarr[2];
                        }
                    }else{
                        window.location.href = reurl;
                    }
                } else {
                    alert(json.errMsg);
                }
            });
        });
        $("#wechatlogin").on("click",function(){
            if(isWeiXin()) {
                window.location.href='autologin?matchid='+urlarr[2];
            } else {
                alert("请在微信中访问");
            }
        })
    }
}
new Dbnumber();

