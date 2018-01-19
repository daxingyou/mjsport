new Vue({
    el:"#app",
    data:{
        mobile:'',
        code:'',
        shareId:null,
        validate:'获取验证码',
        timer:null,
        clickstate:false,
    },
    created(){
        this.getSharelId();
    },
    methods:{
        getSharelId(){
            var url = window.location.href;
            var _this=this;
            if(url.indexOf('id=')>0){
                _this.shareId = url.match(/id=(\d*)/)[1];
            }
            console.log(this.shareId);
        },
        getCode(){
            var _this = this;
            _this.clickstate=true;
            if(_this.validate=='获取验证码' || _this.validate=='重新获取'){
                if(_this.clickstate){
                    if(  !/^1[34578]\d{9}$/.test(this.mobile) ){
                        alert("手机号码有误,请重填！");
                        return false;
                    }else {
                        var data  = {
                            act : 'login',
                            mobile: this.mobile
                        }
                        $.getJSON(listUrl+'member/sms/getcode',data,function(json){
                            if(!json.errCode){
                                _this.validate = 60;
                                _this.timer = setInterval(function(){
                                    _this.validate--;
                                    if(_this.validate == 0){
                                        _this.validate = '重新获取';
                                        _this.clickstate=false;
                                        clearInterval(_this.timer);
                                    }
                                },1000)
                            }
                            else {
                                alert(json.errMsg);
                            }
                        });
                    }
                }
            }


        },
        ajaxSubmit(){
            if(  !/^1[34578]\d{9}$/.test(this.mobile) ){
                alert("手机号码有误,请重填！");
                return false;
            }
            if( !this.code){
                alert("验证码不能为空！")
                return false;
            }
            var data = {
                mobile   : this.mobile,
                code     : this.code,
                memberid: this.shareId
            }
            $.getJSON(listUrl+"login",data,function(json){
                alert(json.errMsg);
                if(json.errCode==0){
                    //alert(json.loginMemberId)
                    if(getCookie('return')){
                        window.location.href=getCookie('return')+'?id='+json.loginMemberId;
                    }else{
                        window.location.href ='index.html'
                    }
                }
            });
        }
    }
})