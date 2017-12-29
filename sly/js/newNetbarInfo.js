new Vue({
    el:"#app",
    data(){
        return {
            netbarId:1,
            netbarInfo:{},
            balanceBean:0,
            memberInfo:{},
            adv1:[],
            adv2:[],
            broadcast:null,
            newestList:[],
            actList:[],
        }
    },
    created(){
        this.getId();
        this.getNetInfo();
        this.getMemberinfo();
        this.getAdv();
        //this.getBroadcast();
        this.getActList();
        this.getNewestList();
    },
    methods:{
        getNewestList(){
            var _this=this;
            data={
                pn:1,
                isbar:1,
            }
            $.getJSON(listUrl+"officil/guess/list",data,function(json){
                console.log(json)
                _this.newestList=json.guessList.list;
            })
        },
        getActList(){
            var _this=this;
            var data= {netbarid:this.netbarId}
            console.log(data)
            $.getJSON(listUrl+'sports/netbar/match/list',data,function(json){
                console.log(json)
                _this.actList=json.matchList;
            })
        },
        getId(){
            var id=decodeURI(window.location.href.split(/[? = &]/)[2]);
            //console.log(decodeURI(id))
            this.netbarId=id;
        },
        getNetInfo(){
            var _this=this;
            var data={id:this.netbarId}
            $.getJSON(listUrl+'channel/netbarinfo',data, function(json){
                _this.netbarInfo=json.netbarInfo;
            })
            //$.getJSON(listUrl+'layout/slider/list',data, function(json){
            //    console.log(json)
            //    _this.netbarInfo.pic=json.sliderList[0].img;
            //})
        },
        getMemberinfo(){
            var _this=this;
            $.getJSON(listUrl+'member/index', function(json){
                console.log(json)
                _this.balanceBean=json.memberBean.balanceBean;
                _this.memberInfo=json.memberInfo;
            })
        },
        getAdv(){
            var _this=this;
            $.post(listUrl+"layout/adv/list",{pid:1},function(json){
                if(json.errCode==0){
                    _this.adv1=json.advList;
                }
            })
            $.post(listUrl+"layout/adv/list",{pid:2},function(json){
                if(json.errCode==0){
                    _this.adv2=json.advList;
                }
            })
        },
        //getBroadcast(){
        //    var _this=this;
        //    function getdata(){
        //        $.getJSON(listUrl + "index/broadcast", function (json){
        //            _this.broadcast=json.broadcastList;
        //        })
        //    }
        //    getdata();
        //    var interval=setInterval(getdata,500000);
        //    //滚动效果
        //    var Mar = document.getElementById("bulletin-box");
        //    var child_div=Mar.getElementsByClassName("item")
        //    var picH = 70;//移动高度
        //    var scrollstep=1;//移动步幅,越大越快
        //    var scrolltime=15;//移动频度(毫秒)越大越慢
        //    var stoptime=1000;//间断时间(毫秒)
        //    var tmpH = 0;
        //    Mar.innerHTML += Mar.innerHTML;
        //    function start(){
        //        if(tmpH < picH){
        //            tmpH += scrollstep;
        //            if(tmpH > picH )tmpH = picH ;
        //            Mar.scrollTop = tmpH;
        //            setTimeout(start,scrolltime);
        //        }else{
        //            tmpH = 0;
        //            if(child_div[0]!=undefined){
        //                Mar.appendChild(child_div[0]);
        //            }
        //            Mar.scrollTop = 0;
        //            setTimeout(start,stoptime);
        //        }
        //    }
        //    onload=function(){setTimeout(start,stoptime)};
        //},
        gomatch(id){
            window.location.href="newGuessinfo.html?id="+id;
        }
    },
    mounted() {
        //this.getBroadcast()
    },
})

