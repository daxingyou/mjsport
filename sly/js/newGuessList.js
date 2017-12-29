new Vue({
    el:"#app",
    data(){
        return {
            newestList:[],
            gametab:[],
            showListId:"",
            hasNextPage:false,
            nextPage:null,
            pageNum:1,
        }
    },
    created(){
        // 游戏列表
        this.gameList();
        //赛事
        this.getList();
    },
    methods:{
        //切换页卡
        toggleTab(status){
            this.gametab.forEach(function(item){
                if( item.id == status){
                    item.isActive = true;
                }else {
                    item.isActive = false;
                }
            });

            var _this=this;
            data={
                pn:1,
                gameid:status,
            }
            _this.showListId=status;
            $.getJSON(listUrl+"officil/guess/list",data,function(json){
                _this.newestList=json.guessList.list;
                _this.hasNextPage=json.guessList.hasNextPage;
                _this.pageNum=json.guessList.pageNum;
                if(json.guessList.hasNextPage){
                    _this.nextPage=json.guessList.nextPage;

                }
                //console.log(json)
            })

        },
        // 游戏列表
        gameList(){
            var _this=this;
            var i=(window.location.href).indexOf("?");
            var arr=[{"id": 0, "name": "全部竞猜 ", "logo": "",isActive:false}];
            $.getJSON(listUrl+"officil/game/list",function(json){
                json.gameList.forEach(function(item){
                    item.isActive=false;
                })
                _this.gametab=arr.concat(json.gameList);
                i>0 ? _this.gametab[1].isActive=true: _this.gametab[0].isActive=true
            })
        },
        getList(){
            var _this=this;
            var i=(window.location.href).indexOf("?");
            var data={};
            i>0?data={pn:1,gameid:1}:data;
            $.getJSON(listUrl+"officil/guess/list", data,function(json){
                _this.newestList=json.guessList.list;
                if(json.guessList.hasNextPage){
                    _this.hasNextPage=json.guessList.hasNextPage;
                    _this.pageNum=json.guessList.pageNum;
                    _this.nextPage=json.guessList.nextPage;

                }
                //console.log(json)
            })
        },
        scrollChange(x){
            document.onscroll=function(){
                //滚动条位置
                //console.log(document.body.scrollTop);
                //var scrollTop=document.body.scrollTop;
                //当前可视范围的高度
                //console.log(document.body.clientHeight);
                //var clientHeight=document.body.clientHeight;
                //文档完整的高度
                //console.log(document.body.scrollHeight);
                //var scrollHeight=document.body.scrollHeight;
                var _this=x;
                //console.log(_this);
                if(getScrollTop() + getClientHeight() == getScrollHeight()){
                    if(_this.hasNextPage){
                        console.log("加载");
                        data={
                            pn:_this.nextPage,
                            gameid:_this.showListId,
                        }
                        $.getJSON(listUrl+"officil/guess/list",data,function(json){
                            _this.newestList=_this.newestList.concat(json.guessList.list);
                            _this.hasNextPage=json.guessList.hasNextPage;
                            _this.pageNum=json.guessList.pageNum;
                            if(json.guessList.hasNextPage){
                                _this.nextPage=json.guessList.nextPage;

                            }
                            //console.log(json)
                        })

                    }
                }

            }
        }
    },
    mounted(){
        this.scrollChange(this);
    }
})

