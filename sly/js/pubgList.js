new Vue({
    el:"#app",
    data(){
        return {
            loginMemberId:0,
            maskShow:false,
            nextPage:false,
            tabindex:0,
            memberFinance:0,
            balance:0,
            matchList:[],
            matchdata:{},
        }
    },
    created(){
        this.islogin();
        //this.getpbList();
        this.showPage();

    },
    methods:{
        islogin(){
            var _this =this;
            $.getJSON(listUrl+'islogin',function(json){
                var url=window.location.href;
                setCookie('return',url);
                _this.loginMemberId=json.loginMemberId;
                if(_this.loginMemberId==0 && url.indexOf('app=ios')<0){
                    window.location.href='activegologin.html'
                }
            })
        },
        maskShowclick(){
            this.maskShow=false;
        },
        //切换页卡
        tabclick(i){
            this.tabindex=i;
            if(i==0){
                setCookie("showPage","allList");
                this.getpbList();
            }else{
                setCookie("showPage","mylist");
                this.getmyList();
                this.matchData();
            }
        },
        //
        showPage(){
            if(getCookie("showPage")=="mylist"){
                this.tabindex=1;
                this.getmyList();
                this.matchData();
            }else{
                this.getpbList();
            }
        },
        matchData(){
            var _this=this;
            $.getJSON(listUrl+"pb/member/matchdata",function(json){
                _this.matchdata=json.matchRankTo;
            })
            $.getJSON(listUrl+"member/index",function(json){
                _this.balance=json.memberBean;
            })
            $.getJSON(listUrl+"member/finance",function(json){
                _this.memberFinance=json.memberFinance;
            })
        },
        //获取全部比赛列表
        getpbList(){
            var _this =this;
            $.getJSON(listUrl+"pb/match/list",function(json){
                var list=json.matchList;
                list.forEach(function(item){
                    var x=1 + Math.round(2 * Math.random());
                    item.picindex=x;
                })
                _this.matchList=list;
            })
        },
        getmyList(){
            var _this =this;
            $.getJSON(listUrl+"pb/match/mylist",function(json){
                var list=json.matchList;
                list.forEach(function(item){
                    var x=1 + Math.round(2 * Math.random());
                    item.picindex=x;
                })
                _this.matchList=list;
            })
        },
        goActivedetail(id){
            window.location.href="active-pb.html?id="+id;
        },
    },
})
