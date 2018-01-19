//$("#app").prepend(headerTitle('首页','JavaScript:;',true));
new Vue({
    el:"#app",
    data(){
        return {
            netbarid:"",
            slider:[],
            newestList:[],
            gametab:[],
            showListId:"",
            firstAdv:{},
            firstAdvShow:false,
        }
    },
    created(){
        //    轮播
        this.getSlider();
        //this.getSwiper();
        //活动广告位
        this.getfirstAdv();
         // 游戏列表
        this.gameList();
         //赛事
        this.getList();
        this.getNetbarid();
    },
    methods:{
        getfirstAdv(){
            var _this=this;
            $.getJSON(listUrl+"layout/adv/list?pid=3",function(json){
                console.log(json)
                if(json.advList.length>0){
                    _this.firstAdvShow=true;
                    _this.firstAdv=json.advList[0];
                }
            })
        },
        getNetbarid(){
            var _this=this;
            $.getJSON(listUrl+"islogin",function(json){
                _this.netbarid=json.netbarId;
            })
        },
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
            $.getJSON(listUrl+"officil/guess/list",data,function(json){
                _this.newestList=json.guessList.list;
            })

        },
        // 游戏列表
        gameList(){
            var _this=this;
            var arr=[{"id": 0, "name": "最新竞猜 ", "logo": "",isActive:true}];
            $.getJSON(listUrl+"officil/game/list",function(json){
                json.gameList.forEach(function(item){
                    item.isActive=false;
                })
                _this.gametab=arr.concat(json.gameList);
                //console.log(_this.gametab);
            })
        },
        //    获取轮播
        getSlider(){
            var _this=this;
            $.getJSON(listUrl+"layout/slider/list",function(json){
                _this.slider=json.sliderList;
            })
        },
        getSwiper(){
            this.$nextTick(function(){
                var mySwiper=new Swiper('.swiper-container',{
                    pagination : '.swiper-pagination',
                    //paginationClickable:true,
                    observeParents:true,//修改swiper的父元素时，自动初始化swiper
                    observer:true,//修改swiper自己或子元素时，自动初始化swiper
                    //loop: true,
                    //loopedSlides :1,
                    //slidesPerView: 1,
                    //autoplay: 2500,
                });
            })
        },
        getList(){
            var _this=this;
            $.getJSON(listUrl+"officil/guess/list",function(json){
                _this.newestList=json.guessList.list;
                //console.log(json)
            })
        }
    },
    mounted(){
        this.getSwiper()
    }
})
//if(isWeiXin()){
//    var url=window.location.href;
//    shareWx("魔圣电竞大师","热门赛事竞猜，更多幸运大奖",url, "http://static.jesport.com/sly/html/favicon.ico",url);
//}
