new Vue({
    el:"#app",
    data(){
        return {
            maskShow:false,
            addShow:false,
            widthdrawshow:false,
            loginMemberId:0,
            memberInfo:{},
            financeInfo:{},
            accountlist:{},
            pn:1,
            nextPage:1,
            lastPage:1,
            hasNextPage:false,
            hasPreviousPage:false,
            withdraw:[],
            accountdata:{account:'',realname:'',code:''},
            clickstate:false,
            validate:"获取验证码",
            timer:null,
            wirhdrawId:0,
            money:'',
        }
    },
    created(){
        this.islogin();
        this.withdrawList();
        this.accountList();
    },
    methods:{
        returnleft(){
            window.location.href="profile.html"
        },
        islogin(){
            var _this=this;
            $.getJSON(listUrl+"member/index",function(json){
                _this.loginMemberId=json.loginMemberId;
                _this.memberInfo=json.memberInfo;
                if(json.loginMemberId==0){
                    var url=window.location.href;
                    setCookie('return',url);
                    window.location.href="activegologin.html"
                }
            })
        },
        //设置提现账号
        addaccount(){
            this.maskShow=true;
            this.addShow=true;
        },
        getCode(){
            var _this = this;
            _this.clickstate=true;
            if(_this.clickstate){
                if(  !/^1[34578]\d{9}$/.test(_this.memberInfo.mobile) ){
                    _this.clickstate=false;
                    alert("手机号码有误,请重填！");
                    return false;
                }else {
                    var data  = {
                        act : 'setwithdrawaccount',
                    }
                    $.getJSON(listUrl+'member/sms/getcode',data,function(json){
                        if(!json.errCode){
                            _this.validate = 60;
                            _this.timer = setInterval(function(){
                                _this.validate--;
                                if(_this.validate == 0){
                                    _this.validate = '重新获取';
                                    _this.clickstate=false;
                                    clearInterval(_this.timer);
                                }
                            },1000)
                        }
                        else {
                            alert(json.errMsg);
                        }
                    });
                }
            }
        },
        setwidthdrawSubmit(){
            var _this=this;
            $.getJSON(listUrl+"member/withdraw/account/add",_this.accountdata,function(json){
                if(json.errCode==0){
                    alert(json.errMsg);
                    window.location.reload();
                }else{
                    alert(json.errMsg)
                }
            })
        },
        //提现账号列表
        accountList(){
            var _this=this;
            $.getJSON(listUrl+"member/withdraw/account/list",function(json){
                _this.financeInfo=json.financeInfo;
                _this.accountlist=json.accountList[0];
                _this.accountlist.accountInfo=json.accountList[0].accountInfo.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
                _this.accountlist.realName=json.accountList[0].realName.replace(/([\u4e00-\u9fa5]{1})([\u4e00-\u9fa5]{1})([\u4e00-\u9fa5]{1})/, '*$2$3')
            })
        },
        //提现列表
        withdrawList(){
            var _this=this;
            $.getJSON(listUrl+"member/withdraw/list?pn="+_this.pn,function(json){
                _this.withdraw=json.withdrawList.list;
                _this.hasNextPage=json.withdrawList.hasNextPage;
                _this.hasPreviousPage=json.withdrawList.hasPreviousPage;
                if(_this.hasNextPage){
                    _this.nextPage=json.withdrawList.nextPage
                }
                if(_this.hasPreviousPage){
                    _this.lastPage=json.withdrawList.prePage;
                }
                console.log(_this.withdraw);
            })
        },
        //列表翻页
        lastpageClick(){
            var _this=this;
            $.getJSON(listUrl+"member/withdraw/list?pn="+_this.lastPage,function(json){
                _this.withdraw=json.withdrawList.list;
                _this.hasNextPage=json.withdrawList.hasNextPage;
                _this.hasPreviousPage=json.withdrawList.hasPreviousPage;
                if(_this.hasNextPage){
                    _this.nextPage=json.withdrawList.nextPage
                }
                if(_this.hasPreviousPage){
                    _this.lastPage=json.withdrawList.prePage;
                }
                console.log(_this.withdraw);
            })
        },
        nextpageClick(){
            var _this=this;
            $.getJSON(listUrl+"member/withdraw/list?pn="+_this.nextPage,function(json){
                _this.withdraw=json.withdrawList.list;
                _this.hasNextPage=json.withdrawList.hasNextPage;
                _this.hasPreviousPage=json.withdrawList.hasPreviousPage;
                if(_this.hasNextPage){
                    _this.nextPage=json.withdrawList.nextPage
                }
                if(_this.hasPreviousPage){
                    _this.lastPage=json.withdrawList.prePage;
                }
                console.log(_this.withdraw);
            })
        },
        //发起提现
        widthdrawadd(){
            this.maskShow=true;
            this.widthdrawshow=true;
        },
        withdrawSubmit(){
            var _this=this;
            console.log(_this.accountlist.id)
            var data={
                id:_this.accountlist.id,
                money:_this.money
            }
            if(data.money<0){
                alert("请填入正确提现金额")
            }
            $.getJSON(listUrl+"member/withdraw/add",data,function(json){
                console.log(json.errCode);
                if(json.errCode==0){
                    alert(json.errMsg);
                    window.location.reload()
                }else{
                    alert(json.errMsg);
                }
            })
        },
        maskClick(){
            this.maskShow=false;
            this.addShow=false;
            this.widthdrawshow=false;
        },
    },
})