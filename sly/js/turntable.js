function Turntable(){
    this.render();
    this.click();
}
Turntable.prototype={
    popuplogin:function(){
        //显示登录页面
        $(".mask").show();
        $("#logintable").show();
        $("#getCode").off("click").on("click",function(){
            var mobile = $("#phoneNumber").val();
            if(!(/^1[34578]\d{9}$/.test(mobile))){
                alert("手机号码有误，请重填");
                return false;
            }
            var _this = this;
            time(_this);
            $.getJSON(listUrl+'getcode',{mobile:mobile},function(json, textStatus) {
                if(json.errCode != 0){
                    alert(json.errMsg);
                    return false;
                }
            });
        });
        $("#validatePhone").off("click").on("click",function(){
            var mobile = $("#phoneNumber").val();
            var code = $("#code").val();
            if(!(/^1[34578]\d{9}$/.test(mobile))){
                alert("手机号码有误，请重填");
                return false;
            }
            else if( code.length == 0 ){
                alert("验证码不能为空！");
                return false;
            }
            $.getJSON(listUrl+'login',{username:mobile,password:code}, function(json, textStatus) {
                if(json.wxUrl) {
                    window.location.href = json.wxUrl;
                } else if(json.errCode == 0){
                    alert(json.errMsg);
                    window.location.href="turntable.html";
                } else {
                    alert(json.errMsg);
                }
            });
        });
    },
    render:function(){
        //this.popuplogin();
        //页面初始化
        var isbind=false;
        var url=window.location.href;

        $.getJSON(listUrl+"lottery/index",function(json){
            $("#startdate").html(datachange2(json.deadline.startDate));
            $("#enddate").html(datachange2(json.deadline.endDate));
                if(json.memberBeanInfo){
                    $("#memberBeanInfo").html(json.memberBeanInfo.balanceBean);
                    $("#myname").html(json.memberInfo.name.replace(/.(?=.)/, '*'));
                    $("#mynum").html(json.memberInfo.secretMobile);
                    $(".exc-btn").off("click").on("click",function(){
                        window.location.href="exchangeMd.html"
                        // if(json.memberInfo==null){
                        //     alert("请登录!")
                        // }else{
                        //     window.location.href="exchangeMd.html"
                        // }
                        // if(json.memberInfo.idCard){
                        //     window.location.href="exchangeMd.html"
                        // }else{
                        //     $(".mask").show();
                        //     $(".alertidcard").show();
                        // }
                    })
                }
                else{
                    //未登录状态
                    $("#md_num").html('<a id="login-btn" href="javascript:;">点击登录!</a>')
                    $("#login-btn").on("click",function(){
                        if(isWeiXin()) {
                            window.location.href='autologin?f=lottery';
                        } else {
                            Turntable.prototype.popuplogin();
                        }
                    })
                    $(".exc-btn").off("click").on("click",function(){
                        console.log("123")
                        if(json.memberInfo==null){
                            alert("请登录!")
                        }
                    })
                }
                if(json.errMsg == "成功"){
                    //中奖信息
                    var data=json;
                    var str=""
                    data.awardList.forEach(function(item){
                        str+='<li>'+item.memo+'</li>'
                    })
                    $("#ul1").html(str);
                    $(".ul2").html($(".ul1").html())

                    //抽奖奖品
                    var giftindex=0;
                    data.goodsList.forEach(function(item){
                        //item.logo="http://static.jesport.com/sly/images/lottery/"+item.id+".png";
                        $(".luck-unit-"+giftindex).children("img").attr('src',item.img);
                        $(".luck-unit-"+giftindex).attr("data-id",item.id);
                        giftindex =giftindex+1;
                    })
                    //console.log(giftindex);
                    //抽奖初始化
                    var luck={
                        index:-1,	//当前转动到哪个位置，起点位置
                        count:0,	//总共有多少个位置
                        timer:0,	//setTimeout的ID，用clearTimeout清除
                        speed:20,	//初始转动速度
                        times:0,	//转动次数
                        cycle:50,	//转动基本次数：即至少需要转动多少次再进入抽奖环节
                        prize:-1,	//中奖位置
                        init:function(id){
                            if ($("#"+id).find(".luck-unit").length>0) {
                                $luck = $("#"+id);
                                $units = $luck.find(".luck-unit");
                                this.obj = $luck;
                                this.count = $units.length;
                                $luck.find(".luck-unit-"+this.index).addClass("active");
                            };
                        },
                        roll:function(){
                            var index = this.index;
                            var count = this.count;
                            var luck = this.obj;
                            $(luck).find(".luck-unit-"+index).removeClass("active");
                            index += 1;
                            if (index>count-1) {
                                index = 0;
                            };
                            $(luck).find(".luck-unit-"+index).addClass("active");
                            this.index=index;
                            return false;
                        },
                        stop:function(index){
                            this.prize=index;
                            console.log(index);
                            var imgindex=null;
                            $(".luck-unit").forEach(function(item){
                                if($(item).attr("class").split(" ")[1].split("-")[2]==index){
                                    imgindex=$(item).attr("data-id")
                                }
                                return imgindex;
                            })
                            //console.log(this.prize)
                            //console.log($(".luck-unit-"+this.prize).eq(0).find("img")[0].src)
                            $("#wingiftimg").attr("src",$(".luck-unit-"+this.prize).eq(0).find("img")[0].src);
                            $(".mask").show();
                            $(".shine-star").show();
                            $(".haswin").show()
                            return false;
                        }
                    };
                    function roll(){
                        luck.times += 1;
                        luck.roll();
                        if (luck.times > luck.cycle+10 && luck.prize==luck.index) {
                            console.log(luck.index);
                            function stop(){
                                luck.stop(luck.index)
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
                            luck.timer = setTimeout(roll,luck.speed);
                        }
                        return false;
                    }
                    var click=false;
                    luck.init('luck');
                    //点击抽奖
                    $("#btn").click(function(){
                        if(click) {
                            return false;
                        }
                        else{
                            $.getJSON(listUrl+"lottery/award/draw",function(json){
                                if(json.errCode ==0){
                                    luck.speed=100;
                                    var giftid=json.luckyPrizeId;
                                    var x=null;
                                    $(".luck-unit").forEach(function(item){
                                        if($(item).attr("data-id")==giftid){
                                            x=$(item).attr("class").split(" ")[1].split("-")[2];
                                            //console.log(x)
                                        }
                                        return x;
                                    })
                                    luck.prize=x;
                                    roll();
                                    click=true;
                                    return false;
                                }
                                else if(json.errCode == 10025){
                                    if(isWeiXin()) {
                                        window.location.href='autologin?f=lottery';
                                    } else {
                                        Turntable.prototype.popuplogin();
                                    }
                                }else if(json.errCode==10005){
                                    confirmtext2(json.errMsg,"前往充值魔豆","exchangeMd.html");
                                }else{
                                    alert(json.errMsg);
                                }

                            })
                        }
                    });
                }
            })
        window.onload=function(){
            if(url.indexOf("m=bind")<0){
                isbind=true;
            }
            console.log(isbind);
            if(!isbind){
                alert("当前微信未绑定网吧账户。点击确定开始绑定")
                Turntable.prototype.popuplogin();
            }
        }

    },
    click:function(){
        $(".mask").on("click",function(){
            $(".mask").hide();
            $(".hadgift").hide();
            $("#logintable").hide();
            $(".alertidcard").hide();
            $(".winmessage").hide();
            $(".star").hide();
        })
        $(".mygift").on("click",function(){
            var data1={
                pn:1,
                type:"goods"
            }
            $.post(listUrl+"lottery/award/list",data1,function(json){
                if(json.errCode==10025){
                    if(isWeiXin()) {
                        window.location.href='autologin?f=lottery';
                    } else {
                        Turntable.prototype.popuplogin();
                    }
                }
                if(json.errCode==0){
                    if(json.awardList.length == 0){
                        $("#giftlist").html('<div class="nodata" style="width: 100%;background: none;font-size: 40px">暂无奖品</div>')
                    }else{
                        var str=""
                        json.awardList.list.sort(compare2("createdDate"));
                        json.awardList.list.forEach(function(item){
                            str+=mygiftlist(item);
                        })
                        $("#giftlist").html(str);
                    }
                    $(".mask").show()
                    $(".hadgift").show()
                }

            })

        })
        $(".mdtab").on("click",function(){
            $(this).addClass("active")
            $(".goodstab").removeClass("active")
            var data={
                pn:1,
                type:"bean"
            }
            $.post(listUrl+"lottery/award/list",data,function(json){
                if(json.errCode==10025){
                    $(".mask").show();
                    $("#logintable").show();
                    $("#getCode").off("click").on("click",function(){
                        var mobile = $("#phoneNumber").val();
                        if(!(/^1[34578]\d{9}$/.test(mobile))){
                            alert("手机号码有误，请重填");
                            return false;
                        }
                        var _this = this;
                        time(_this);
                        $.getJSON(listUrl+'getcode',{mobile:mobile},function(json, textStatus) {
                            if(json.errCode != 0){
                                alert(json.errMsg);
                                return false;
                            }
                        });
                    });
                    $("#validatePhone").off("click").on("click",function(){
                        var mobile = $("#phoneNumber").val();
                        var code = $("#code").val();
                        if(!(/^1[34578]\d{9}$/.test(mobile))){
                            alert("手机号码有误，请重填");
                            return false;
                        }
                        else if( code.length == 0 ){
                            alert("验证码不能为空！");
                            return false;
                        }
                        $.getJSON(listUrl+'login',{username:mobile,password:code}, function(json, textStatus) {
                            if(json.wxUrl) {
                                window.location.href = json.wxUrl;
                            } else if(json.errCode == 0){
                                alert(json.errMsg);
                                window.location.reload();
                            } else {
                                alert(json.errMsg);
                            }
                        });
                    });
                    $("#wechatlogin").on("click",function(){
                        if(isWeiXin()) {
                            window.location.href='autologin';
                        } else {
                            alert("请在微信中访问");
                        }
                    })
                }
                if(json.errCode==0){
                    if(json.awardList.length == 0){
                        $("#giftlist1").html('<div class="nodata" style="width: 100%;background: none;font-size: 40px">暂无奖品</div>')
                    }else{
                        var str=""
                        json.awardList.list.sort(compare2("createdDate"));
                        json.awardList.list.forEach(function(item){
                            str+=mygiftlist(item);
                        })
                        $("#giftlist1").html(str);
                    }
                    $(".mask").show()
                    $(".hadgift").show()
                }

            })

            $("#giftlist").hide();
            $("#giftlist1").css("display","flex");
        })
        $(".goodstab").on("click",function(){
            $(this).addClass("active")
            $(".mdtab").removeClass("active")
            $("#giftlist").show();
            $("#giftlist1").hide()
        })
        $(".know").on("click",function(){
            window.location.reload();
            $(".winmessage").hide();
            $(".mask").hide();
            $(".star").hide();
        })
        $(".idcard-btn").on("click",function(){
            $(".mask").hide();
            $(".alertidcard").hide();
        })
    }
}
new Turntable();