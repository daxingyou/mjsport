//var listUrl1 = 'http://192.168.1.128:8080/sly/';
//var listUrl = 'http://192.168.1.128:8080/sly/';
//var slyUrl   = 'http://192.168.1.128:8080/sly/';
new Vue({
    el:"#app",
    data(){
        return {
            maskShow:false,
            contentShow:false,
            pushShow:false,
            exchangeShow:false,
            shareShow:false,
            wingiftShow:false,
            signinBoxShow:false,
            rankListShow:false,
            codeShow:false,
            voteList:[],
            listdraw:[],
            goodslist:[],
            luck:{
            index:-1,	//当前转动到哪个位置，起点位置
            count:0,	//总共有多少个位置
            timer:0,	//setTimeout的ID，用clearTimeout清除
            speed:20,	//初始转动速度
            times:0,	//转动次数
            cycle:50,	//转动基本次数：即至少需要转动多少次再进入抽奖环节
            prize:-1,	//中奖位置
            active:null,
            init:function(id){
                if ($("#"+id).find(".luck-unit").length>0) {
                    $luck = $("#"+id);
                    $units = $luck.find(".luck-unit");
                    this.obj = $luck;
                    this.count = $units.length;
                    //$luck.find(".luck-unit-"+this.index).addClass("active");
                    this.active=this.index;
                };
            },
            roll:function(){
                var index = this.index;
                var count = this.count;
                var luck = this.obj;
                this.active=index;
                //index ++;
                if (index>count) {
                    index = 0;
                }else{
                    index++
                }
                //console.log(this.active);
                this.index=index;
                return false;
            },
            stop:function(index){
                this.prize=index;
                return false;
            }
        },
            wingiftInfo:{img:"",name:""},
            click:false,
            gameid:1,
            order:1,
            game:'game1VoteNum',
            game1SigninInfo:[],
            game2SigninInfo:[],
            memberBeans:0,
            chanceNum:0,
            exchangeList:[],
            qrcodeSrc:"",
            codeinfo:{},
            codeShow:false,
            loginMemberId:null,
            netbarId:0,
            rankList:[],
            realname:"",
            phone:"",
            nickname:"",
            score:"",
            school:"",
            type:"",
            teamname:"",
            game1date:0,
            game2date:0,
        }
    },
    created(){
        this.getSigninfo()
        this.getVotelist();
        this.getlistdraw();
        this.getGoodslist();
        this.init();
        this.islogin();
    },
    methods:{
        islogin(){
            var _this =this;
            var url=window.location.href;
            $.getJSON(listUrl+'islogin',function(json){
                _this.loginMemberId=json.loginMemberId;
                _this.netbarId=json.netbarId;
                if(url.indexOf("id")<0){
                    window.location.href=url+"?id="+json.loginMemberId;
                }else{
                    if(isWeiXin()){
                        shareWx('支持母校得好礼','魔杰高校电竞联赛，支持母校额外获得参加名额，还有机会抽iPhoneX哟。',url,'http://static.jesport.com/sly/images/activeImg/shellicon1.png',url);
                    }
                }
            })
        },
        livebtn(){
            alert("暂未开始")
        },
        goreload(){
            window.location.reload();
        },
        voteindex(){
            //window.location.href="leagueVote.html";
            this.maskShow=true;
            this.contentShow=true;
            console.log("123");
        },
        //报名
        gosign(){
            if(this.loginMemberId==0){
                alert("请先登录!")
                window.location.href="activegologin.html";
                return false;
            }
            this.maskShow=true;
            this.signinBoxShow=true;

            if (document.documentElement && document.documentElement.scrollTop) {
                 document.documentElement.scrollTop=0;
            }
            else if (document.body) {
                document.body.scrollTop=0;
            }
        },
        gocontact(){
            window.location.href="actContact.html"
        },
        signIn(){
            var _this=this;
            var data={
                realname:_this.realname,
                phone:_this.phone,
                nickname:_this.nickname,
                score:_this.score,
                school:_this.school,
                type:_this.type,
                teamname:_this.teamname,
            };
            $.getJSON(listUrl+"special/enroll",data,function(json){
                if(json.errCode==0){
                    alert(json.errMsg);
                    _this.signinBoxShow=false;
                    _this.maskShow=false;
                }else if(json.errCode==10000){
                    alert("请将信息填写完整");
                }else{
                    alert(json.errMsg);
                }
            })
        },
        //投票天数
        getSigninfo(){
            var _this=this;
            $.getJSON(listUrl+"special/vote/signininfo",function(json){
                //console.log(json)
                _this.memberBeans=json.memberBeans;
                function getarr(x){
                    var arr1=[];
                    var keys=Object.keys(x);
                    keys.forEach(function(item){
                        var  obj={date:item,state:x[item]}
                        arr1=arr1.concat(obj);
                    })
                    return arr1;
                }
                _this.game1SigninInfo=getarr(json.game1SigninInfo)
                _this.game2SigninInfo=getarr(json.game2SigninInfo)
                console.log(getarr(json.game1SigninInfo))
                var index1=0,index2=0;
                getarr(json.game1SigninInfo).forEach(function(item){
                    if(item.state==1){
                        index1++;
                    }
                })
                _this.game1date=index1;
                getarr(json.game2SigninInfo).forEach(function(item){
                    if(item.state==1){
                        index2++;
                    }
                })
                _this.game2date=index2;
            })
        },
        //投票列表
        getVotelist(){
            var _this=this;
            _this.gameid=1;
            //console.log(this.gameid)
            var data={gameid:_this.gameid,isshuffle:1}
            $.getJSON(listUrl+"special/vote/teamlist",data,function(json){
                _this.voteList=json.teamList;
                _this.game='game1VoteNum';

            })
        },
        getVotelist2(){
            var _this=this;
            _this.gameid=2;
            console.log(this.gameid)
            var data={gameid:_this.gameid,isshuffle:1}
            $.getJSON(listUrl+"special/vote/teamlist",data,function(json){
                _this.voteList=json.teamList;
                _this.game='game2VoteNum';
            })
        },
        getRank(){
            var _this=this;
            _this.rankListShow=true;
            _this.contentShow=false;
            var data={gameid:_this.gameid}
            $.getJSON(listUrl+"special/vote/teamlist",data,function(json){
                _this.rankList=json.teamList;
            })
        },
        //点击投票
        govote(id){
            this.contentShow=false;
            this.maskShow=false;
            var _this=this;
            var data={
                teamid:id,
                gameid:_this.gameid
            }
            $.getJSON(listUrl+'special/vote/publish',data,function(json){
                if(json.errCode==0){
                    _this.getSigninfo();
                    _this.maskShow=true;
                    _this.pushShow=true;
                }else if(json.errCode==10025){
                    var url=window.location.href;
                    if(url.indexOf("?")>0){
                        var id=url.split(/[? = &]/)[2];
                        window.location.href = 'activegologin.html?id='+id;
                    }else{
                        window.location.href = 'activegologin.html';
                    }
                }else{
                    alert(json.errMsg);
                }
            })
            console.log(id)
        },
        //我的礼物
        getlistdraw(){
            var _this=this;
            //console.log(listUrl+"special/lottery/listdraw")
            $.getJSON(listUrl+"special/lottery/listdraw",function(json){
                _this.listdraw=json.drawList
            })
        },
        //抽奖礼物列表
        getGoodslist(){
            var _this=this;
            $.getJSON(listUrl+"special/lottery/goodslist",function(json){
                _this.goodslist=json.goodsList;
                //console.log(_this.goodslist)
                _this.chanceNum=json.chanceNum;
                json.goodsList.forEach(function(item,index){
                    $(".luck-unit-"+index).children("img").attr('src',item.img);
                    $(".luck-unit-"+index).attr("data-id",item.id);
                    //giftindex =giftindex+1;
                })
            })
        },
        //抽奖
        goroll(){
            var _this=this;
            var luck=this.luck;
            luck.times += 1;
            luck.roll();
            if (luck.times > luck.cycle+10 && luck.prize==luck.index) {
                console.log(luck.index);
                function stop(){
                    luck.stop(luck.index)
                    _this.wingiftShow=true;
                    _this.maskShow=true;
                    _this.click=false;
                }
                setTimeout(stop,1000)
                clearTimeout(luck.timer);
                luck.prize=-1;
                luck.times=0;
                click=false;
            }else{
                if (luck.times<luck.cycle) {
                    luck.speed -= 10;
                }else if(luck.times==luck.cycle) {
                    //var index = Math.random()*(luck.count)|0;
                    //luck.prize = index;
                }else{
                    if (luck.times > luck.cycle+10 && ((luck.prize==0 && luck.index==7) || luck.prize==luck.index+1)) {
                        luck.speed += 110;
                    }else{
                        luck.speed += 20;
                    }
                }
                if (luck.speed<40) {
                    luck.speed=40;
                };
                luck.timer = setTimeout(_this.goroll,luck.speed);
            }
            return false;
        },
        draw(){
            var _this=this;
            var luck=this.luck;
            if(_this.click) {
                return false;
            } else{
                _this.click=true;
                $.getJSON(listUrl+"special/lottery/draw",function(json){
                    if(json.errCode ==0){
                        luck.speed=100;
                        var giftid=json.luckyPrizeId;
                        _this.goodslist.forEach(function(item){
                            if(item.id==giftid){
                                _this.wingiftInfo=item;
                            }
                        })
                        $.getJSON(listUrl+"special/lottery/goodslist",function(json){
                            _this.chanceNum=json.chanceNum;
                        })
                        _this.luck.prize=giftid;
                        _this.goroll();
                        return false;
                    }
                    else if(json.errCode==10025){
                        var url=window.location.href;
                        if(url.indexOf("?")>0){
                            var id=url.split(/[? = &]/)[2];
                            window.location.href = 'activegologin.html?id='+id;
                        }else{
                            window.location.href = 'activegologin.html';
                        }
                    }
                    else if(json.errCode==10005){
                        confirmtext(json.errMsg,"前往充值魔豆","exchangeMd.html");
                        _this.click=false;
                    }else if(json.errCode==10045){
                        alert("每天参与投票或邀请好友注册\n即可获得抽奖机会");
                        _this.click=false;
                    }else{
                        alert(json.errMsg);
                    }

                })
            }
        },
        init(){
            var _this=this;
            _this.luck.init("luck");
        },
        maskShowclick(){
            this.maskShow=false;
            this.contentShow=false;
            this.pushShow=false;
            this.exchangeShow=false;
            this.shareShow=false;
            this.wingiftShow=false;
            this.signinBoxShow=false;
            this.rankListShow=false;
        },
        //
        watchlist(){
            var _this=this;
            $.getJSON(listUrl+"/sly/special/lottery/listdraw",function(json){
                _this.listdraw=json.drawList
            })
            this.wingiftShow=false;
            this.exchangeShow=true;
            this.codeShow=false;
        },
        //兑换记录
        goExcrecord(){
            if(this.loginMemberId==0){
                window.location.href="activegologin.html"
            }else{
                window.location.href="excrecord.html";
            }
        },
        getExchangeList(){
            if(this.loginMemberId==0){
                window.location.href="activegologin.html"
            }else{
                this.maskShow=true;
                this.exchangeShow=true;
                var _this=this;
                $.getJSON(listUrl+"special/lottery/listdraw",function(json){
                    _this.exchangeList=json.drawList;
                })
                //window.location.href="excrecord.html";
            }
        },
        //兑换商城
        goshop(){
            if(this.loginMemberId==0){
                window.location.href="activegologin.html"
            }else{
                window.location.href="shop.html?id="+this.netbarId;
            }
        },
        //二维码
        findCode(item){
            var str=item.goodsName;
            if(str.indexOf("魔豆")<0) {
                var _this = this;
                _this.codeinfo = item;
                _this.codeShow = true;
                var quanNo = item.quanNo;
                Vue.nextTick(function () {
                    var qrcode = $("#findCodeModal").qrcode({
                        width: 256,     //设置宽度
                        height: 256,     //设置高度
                        typeNumber: -1,      //计算模式
                        background: "#ffffff",//背景颜色
                        foreground: "#000000", //前景颜色
                        text: "http://m.jesport.com/backend/doChange.html?quanno=" + quanNo
                    });
                    qrcode.hide();
                    var canvas = qrcode.find('canvas').get(0);
                    _this.qrcodeSrc = canvas.toDataURL('image/jpg')
                    var str = quanNo,
                        options = {
                            format: "CODE128",
                            displayValue: true,
                            fontSize: 20,
                            height: 300
                        };
                    // JsBarcode(barcode, str, options);//原生
                    $('#barcode').JsBarcode(str, options);//jQuery
                });
            }
        },
        goshare(){
            if(this.loginMemberId==0){
                alert("登陆后邀请朋友注册获得抽奖次数")
                window.location.href="activegologin.html"
            }
            this.shareShow=true;
            this.maskShow=true;
        },
    }
})