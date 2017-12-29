new Vue({
    el:"#app",
    data:{
        mobile:'',
        code:'',
        channelid:0,
        validate:'获取验证码',
        timer:null
    },
    created(){
        this.getChannelId();
    },
    methods:{
        getChannelId(){
            var url = window.location.href;
            if(url.indexOf('channelid=')!=-1){
                this.channelid = url.match(/channelid=(\d*)/)[1];
            }
            console.log(this.channelid);
        },
        getCode(){
            var _this = this;
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
                            clearInterval(_this.timer);
                        }
                    },1000)
                  }
                  else {
                    alert(json.errMsg);
                }
            });
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
                channelid: this.channelid
            }
            $.getJSON(listUrl+"login",data,function(json){
                alert(json.errMsg);
                if(!json.errCode){
                    window.location.href ='index.html';
                }
            });
        }
    }
})