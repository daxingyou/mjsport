new Vue({
    el:"#app",
    data(){
        return {
            netbarId:0,
            memberinfo:{},
            balance:{},
            financeInfo:{},
            channelInfo:null,
            maskShow:false,
            codeShow:false,
        }
    },
    created(){
        this.getMemberinfo();
        this.getChannel();
    },
    methods :{
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
                    //if(json.channelInfo.financeInfo){
                    //    _this.financeInfo=json.channelInfo.financeInfo;
                    //}
                    $.getJSON(listUrl+"member/finance",function(json){
                        _this.financeInfo=json.memberFinance;
                    })
                }else{
                    _this.financeInfo={balanceMoney:0}
                }
            })
        },
        showQrcode(){
            this.maskShow=true;
            this.codeShow=true;
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
