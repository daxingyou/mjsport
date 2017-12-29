new Vue({
    el:"#app",
    data(){
        return {
            netbarname:"",
            loginMemberId:"",
            actList:[],
            netbarid:0,
        }
    },
    created(){
        this.getnetbarId();
    },
    methods:{
        getnetbarId(){
            var _this=this;
            $.getJSON(listUrl+"islogin",function(json){
                if(json.errCode==0){
                    _this.netbarid = json.netbarId;
                    _this.loginMemberId=json.loginMemberId;
                    $.getJSON(listUrl+"channel/netbarinfo?id=" + _this.netbarid,function(json){
                        _this.netbarname=json.netbarInfo.name;
                    });
                    $.getJSON(listUrl+'sports/netbar/match/list?netbarid='+_this.netbarid,function(json){
                        _this.actList=json.matchList;
                    })
                }else if(json.errCode==10025){
                    var url=window.location.href;
                    setCookie("return",url);
                    window.location.href="activegologin.html";
                }
            })
        },
        godetail(id){
            window.location.href="actSign.html?id="+id;
        },
        goleague(){
            console(this.loginMemberId);
            window.location.href="leagueIndex.html?id="+this.loginMemberId;
        },
    },

})