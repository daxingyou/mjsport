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
            $.getJSON(listUrl+'islogin',function(json){
                var url=window.location.href;
                setCookie('return',url);
                _this.loginMemberId=json.loginMemberId;
                if(isWeiXin()){
                    shareWx('魔杰女神争霸赛开始啦!','报名参赛即可获得丰厚奖励，投票支持还能和女神近距离接触一起战斗哟~',url,'http://static.jesport.com/sly/images/activeImg/goddess/share2.png',url);
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
                $("#memo").on("change",function(){
                    var param = $("#memo").val();
                    var regRule = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g;
                    if(param.match(regRule)) {
                        param = param.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "");
                        alert("不支持表情");
                    }
                })
                $("#img").on("change",function(){
                    console.log(this.files[0]);
                    uploadFile(this,$("#imgShow"),80,80);
                })
            }
        },
        affirmSign(){
            if(document.getElementById("constellation").value=="选择星座"){
                alert("请填写完整信息！")
                return false;
            }
            $("#signboxform").ajaxSubmit({
                success:function(json){
                    if(json.errCode==10000){
                        alert("请填写完整信息！")
                    }else if(json.errCode==0) {
                        alert("您的资料已经提交成功，审核通过后我们会尽快与您联系");
                        //window.location.reload()
                    }else if(json.errCode==10068) {
                        alert("您已经报过名了，审核通过后我们会尽快与您联系");
                        //window.location.reload()
                    }else{
                        alert(json.errMsg);
                    }
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
