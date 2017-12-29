function Dbnumber(){
    this.render();
}
Dbnumber.prototype = {
    render:function(){
        var urlarr=window.location.href.split(/[? = &]/);
        var reurl="profile.html"
        if(urlarr[1] =="return"){
            reurl=urlarr[2]+".html"
        }
        if(urlarr[3]){
            reurl=urlarr[2]+".html"+"?return="+urlarr[4];
        }

        $.getJSON(listUrl+"member/index",function(json){
            if(json.errCode==0){
                if(json.memberInfo.mobile){
                    $("#phoneNumber").attr("type","text");
                    $("#phoneNumber").attr("disabled","disabled");
                    $("#phoneNumber").val(json.memberInfo.secretMobile);
                    $("#getCode").off("click").on("click",function(){
                        var mobile = json.memberInfo.mobile
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
                        var mobile = json.memberInfo.mobile;
                        var code = $("#code").val();
                        if(!(/^1[34578]\d{9}$/.test(mobile))){
                            alert("手机号码有误，请重填");
                            return false;
                        }
                        else if( code.length == 0 ){
                            alert("验证码不能为空！");
                            return false;
                        }
                        $.getJSON(listUrl+'member/bindnetbar',{mobile:mobile,code:code}, function(json) {
                            if(json.wxUrl) {
                                window.location.href = json.wxUrl;
                            } else if(json.errCode == 0){
                                alert(json.errMsg);
                                window.location.href = reurl;
                            } else {
                                alert(json.errMsg);
                            }
                        });
                    });
                }else{
                    $("#getCode").off("click").on("click",function(){
                        var mobile = $("#phoneNumber").val()
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
                        $.getJSON(listUrl+'member/bindnetbar',{mobile:mobile,code:code}, function(json) {
                            if(json.wxUrl) {
                                window.location.href = json.wxUrl;
                            } else if(json.errCode == 0){
                                alert(json.errMsg);
                                window.location.href = reurl;
                            } else {
                                alert(json.errMsg);
                            }
                        });
                    });
                }
            }
        })


    }
}
new Dbnumber();

