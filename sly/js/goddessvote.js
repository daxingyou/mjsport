new Vue({
    el:"#app",
    data(){
        return {
            loginMemberId:0,
            maskShow:false,
            voteShow:false,
            voteList:[],
            nowitem:{},

        }
    },
    created(){
        this.islogin();
        this.getVoteList();
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
                    if(isWeiXin()){
                        shareWx('魔杰女神争霸赛开始投票了!','选择你心仪的女神，投票支持还能女神近距离接触一起战斗哟~',url,'http://static.jesport.com/sly/images/activeImg/goddess/share2.png',url);
                    }
                }
            })
        },
        getVoteList(){
            var _this =this;
            $.getJSON(listUrl+"special/goddess/listenroll",function(json){
                if(_this.loginMemberId==0){
                    window.location.href='activegologin.html'
                }else{
                    _this.voteList=json.enrollList
                }
            })
        },
        goVote(i){
            var _this=this;
            _this.nowitem=i;
            _this.maskShow=true;
            _this.voteShow=true;
            console.log(_this.nowitem)
        },
        pushvote(){
            var _this=this;
            var data={id:_this.nowitem.id}
            $.getJSON(listUrl+"special/goddess/vote",data,function(json){
                if(json.errCode==0){
                    alert(json.errMsg);
                    window.location.reload();
                }else if(json.errCode==10080){
                    alert("您今天已经投过票了，请明天再来吧~")
                    _this.maskShow=false;
                    _this.voteShow=false;
                }else{
                    alert(json.errMsg);
                }
            })
        },
        maskShowclick(){
            this.maskShow=false;
            this.voteShow=false;
        },
    },
})
