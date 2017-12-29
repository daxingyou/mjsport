new Vue({
    el:"#app",
    data(){
        return {
            maskShow:false,
            contentShow:false,
            exchangeShow:false,
            wingiftShow:false,
            codeShow:false,
            listdraw:[],
            goodslist:[],
            order:1,
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
            memberBeans:0,
            chanceNum:0,
            exchangeList:[],
            qrcodeSrc:"",
            codeinfo:{},
            loginMemberId:null,
            netbarId:0,
            signinList:[],
            hasNextPage:false,
            pageNum:1,
            nextPage:0,
        }
    },
    created(){
        this.islogin();
        this.init();
        this.getsignininfo();
        this.getgoodslist();
        //this.getlistdraw();
    },
    methods:{
        islogin(){
            var _this =this;
            $.getJSON(listUrl+'islogin',function(json){
                if(json.loginMemberId !=0){
                    _this.loginMemberId=json.loginMemberId;
                    _this.netbarId=json.netbarId;
                }else{
                    window.location.href="activegologin.html"
                }
            })
        },
        getindex(){
            var _this=this
            $.getJSON(listUrl+"member/index",function(json){
                _this.memberBeans=json.memberBean.balanceBean;
            });
        },
        getsignininfo(){
            var _this=this;
            $.getJSON(listUrl+"signin/info",function(json){
                if(json.loginMemberId !=0){
                    function getarr(x){
                        var arr1=[];
                        var keys=Object.keys(x);
                        keys.forEach(function(item){
                            var img="",index=item*1+1;
                            if(x[item]==1){
                                img='http://static.jesport.com/sly/images/activeImg/punch/day'+ index +'.png';
                            }else{
                                img='http://static.jesport.com/sly/images/activeImg/punch/day'+ index +'_un.png';
                            }
                            var  obj={date:item*1+1,state:x[item],img:img}
                            arr1=arr1.concat(obj);
                        })
                        return arr1;
                    }
                    _this.signinList=getarr(json.info);
                    var itemnum=0;
                    _this.signinList.forEach(function(item,index){
                        if(item.state==1){
                            itemnum++;
                        }
                        if(item.state==0){
                            _this.signinList[itemnum-1].img='http://static.jesport.com/sly/images/activeImg/punch/today.png';
                            return false;
                        }
                    })
                }else{
                    window.location.href="activegologin.html"
                }
            })
        },
        submitSignin(){
            $.getJSON(listUrl+"signin/do",function(json){
                alert(json.errMsg);
                if(json.errCode==0){
                    window.location.reload();
                }
            })
        },
        getgoodslist(){
            var _this=this;
            $.getJSON(listUrl+"signin/lottery/goodslist",function(json){
                if(json.errCode==0){
                    //_this.listdraw=json.awardList;
                    _this.chanceNum=json.lotteryChanceNum;
                    _this.memberBeans=json.memberBeanInfo.balanceBean;
                    _this.goodslist=json.goodsList;
                    //json.goodsList.forEach(function(item,index){
                    //    $(".luck-unit-"+index).children("img").attr('src',item.img);
                    //    $(".luck-unit-"+index).attr("data-id",item.id);
                    //    //giftindex =giftindex+1;
                    //})
                }else{
                    window.location.href="activegologin.html"
                }
            })
        },
        //抽奖
        goroll(){
            var _this=this;
            var luck=this.luck;
            luck.times += 1;
            luck.roll();
            //console.log(_this.goodslist[luck.index].id)
            if (luck.times > luck.cycle+10 && _this.goodslist[luck.index].id) {
                function stop(){
                    luck.stop(luck.index)
                    _this.wingiftShow=true;
                    _this.maskShow=true;
                    _this.click=false;
                    _this.getgoodslist();
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
                $.getJSON(listUrl+"lottery/award/draw?isofficil=1",function(json){
                    if(json.errCode ==0){
                        luck.speed=100;
                        var giftid=json.luckyPrizeId;
                        _this.goodslist.forEach(function(item){
                            if(item.id==giftid){
                                _this.wingiftInfo=item;
                            }
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
                        alert("每天签到即可获得抽奖机会");
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
        //我的礼物
        getlistdraw(){
            var _this=this;
            //console.log(listUrl+"special/lottery/listdraw")
            var data={pn:_this.pageNum,isofficil:1};
            $.getJSON(listUrl+"lottery/award/list",data,function(json){
                if(json.awardList.hasNextPage){
                    _this.nextPage=json.awardList.nextPage;
                    _this.hasNextPage=json.awardList.hasNextPage;
                    _this.pageNum=json.awardList.nextPage;
                }
                _this.listdraw=json.awardList.list;
            })
        },
        abcd(){
            var allheight=document.getElementById("itemsList").scrollHeight,
                height=document.getElementById("itemsList").clientHeight,
                scrolltop=document.getElementById("itemsList").scrollTop,
                _this=this;
            if(allheight < height+scrolltop+10 && _this.hasNextPage){
                console.log("123123")
                var _this=this, data={pn:_this.pageNum,isofficil:1};
                $.getJSON(listUrl+"lottery/award/list",data,function(json){
                    if(json.awardList.hasNextPage){
                        _this.nextPage=json.awardList.nextPage;
                        _this.hasNextPage=json.awardList.hasNextPage;
                        _this.pageNum=json.awardList.nextPage;

                    }
                    _this.listdraw=_this.listdraw.concat(json.awardList.list);
                })
            }
        },
        maskShowclick(){
            this.maskShow=false;
            this.wingiftShow=false;
            this.exchangeShow=false;
        },
        //
        watchlist(){
            var _this=this;
            _this.getlistdraw();
            this.wingiftShow=false;
            this.exchangeShow=true;
            this.codeShow=false;
        },
        getExchangeList(){
            if(this.loginMemberId==0){
                window.location.href="activegologin.html"
            }else{
                this.maskShow=true;
                this.exchangeShow=true;
                var _this=this;
                _this.getlistdraw();
                //window.location.href="excrecord.html";
            }
        },
        //兑换商城
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
    }
})