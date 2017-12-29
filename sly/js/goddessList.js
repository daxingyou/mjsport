new Vue({
    el:"#app",
    data(){
        return {
            loginMemberId:0,
            maskShow:false,
            signinBoxShow:false,
            signinf:{},
        }
    },
    created(){
        this.islogin();
    },
    methods:{
        islogin(){
            var _this =this;
            var url=window.location.href;
            $.getJSON(listUrl+'islogin',function(json){
                var url=window.location.href;
                setCookie('return',url);
                _this.loginMemberId=json.loginMemberId;
                if(url.indexOf("id")<0 && _this.loginMemberId!=0){
                    window.location.href=url+"?id="+json.loginMemberId;
                }else{
                    //if(isWeiXin()){
                    //    shareWx('支持母校得好礼','魔杰高校电竞联赛，支持母校额外获得参加名额，还有机会抽iPhoneX哟。',url,'http://static.jesport.com/sly/images/activeImg/shellicon1.png',url);
                    //}
                }
            })
        },
        signin(){
            if(this.loginMemberId==0){
                window.location.href='activegologin.html'
            }else{
                this.maskShow=true;
                $(".alert-signinBox").css({"display":"block"});
                //this.signinBoxShow=true;
                $("#img").on("change",function(){
                    console.log(this.files[0]);
                    uploadFile(this,$("#imgShow"),80,80);
                    //$("#imgShow").html("<img src='"+this.files[0]+"'alt='"+this.value+"'/>");
                })
            }
        },
        affirmSign(){
            $("#signboxform").ajaxSubmit({
                success:function(json){
                    alert(json.errMsg);
                },
                url: listUrl+'special/goddess/enroll',
                type:'post',
                dataType:"json"
            })
        },
        maskShowclick(){
            $(".alert-signinBox").css({"display":"none"});
            this.maskShow=false;
        },
    },
})
