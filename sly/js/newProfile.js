new Vue({
    el:"#app",
    data(){
        return {
            netbarId:0,
            memberinfo:{},
            balance:{},
            memberFinance:{},
            channelInfo:null,
            maskShow:false,
            codeShow:false,
            firstAdvShow:false,
            firstAdv:{},
        }
    },
    created(){
        this.getMemberinfo();
        this.getChannel();
        this.getmemberbalance();
        this.getfirstAdv();
    },
    methods :{
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
        getMemberinfo(){
            var _this=this;
            $.getJSON(listUrl+"member/index",function(json){
                _this.memberinfo=json.memberInfo;
                _this.balance=json.memberBean;
                _this.netbarId=json.netbarId;
            })
        },
        getChannel(){
            var _this=this;
            $.getJSON(listUrl+"channel/info",function(json){
                if(json.channelInfo){
                    _this.channelInfo=json.channelInfo;
                }
            })
        },
        getmemberbalance(){
            var _this=this;
            $.getJSON(listUrl+"member/finance",function(json){
                _this.memberFinance=json.memberFinance;
            })
        },
        showQrcode(){
            //this.maskShow=true;
            //this.codeShow=true;
            window.location.href='withDraw.html'
        },
        maskShowclick(){
            this.maskShow=false;
            this.codeShow=false;
        },
        logout(){
            $.getJSON(listUrl+"logout",function(json){
                if(json.errCode==0){
                    alert(json.errMsg);
                    window.location.href="index.html"
                }
            })
        }
    }
})
