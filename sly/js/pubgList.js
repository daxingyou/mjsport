new Vue({
    el:"#app",
    data(){
        return {
            loginMemberId:0,
            maskShow:false,
            tabindex:0,
            matchList:[],
        }
    },
    created(){
        this.islogin();
        this.getpbList();
    },
    methods:{
        islogin(){
            var _this =this;
            $.getJSON(listUrl+'islogin',function(json){
                var url=window.location.href;
                setCookie('return',url);
                _this.loginMemberId=json.loginMemberId;
                if(_this.loginMemberId==0){
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
                this.getpbList();
            }else{
                this.getmyList();
            }
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
