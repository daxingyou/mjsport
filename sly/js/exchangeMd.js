function ExchangeMd(){
    this.render();
    this.clicklisten();
}
ExchangeMd.prototype={
    render:function(){
        //处理地址
        var urlarr=window.location.href.split(/[? = &]/);
        var reurl="profile.html"
        var reurl2="profile"
        if(urlarr[1] =="return"){
            if(urlarr[2] == "shop"){
                reurl="shop.html?id=100001"
            }else{
                reurl=urlarr[2]+".html"
                reurl2=urlarr[2]
            }
        }
        //支付方式
        var wechatpay=true;
        var id= 0,url;
        //获取充值列表
        $.getJSON(listUrl+'setting/charge/list', function(json, textStatus){
            var data = json.settingList;
            var str  = '';
            //var index=0;
            var initnum=0;
            data.forEach(function(item,index ){
                if(index==0){
                    initnum=item.money;
                    id=item.id;
                    str  +=  '<div class="buy-item active" data-money="'+item.money+'" data-mid="'+item.id+'">'
                        +'<span class="mdnum">'+item.beanNum+'魔豆</span>'
                            //+'<span class="value">'+item.money+'元</span>'
                        +'</div>';

                }else{
                    str  +=  '<div class="buy-item" data-money="'+item.money+'" data-mid="'+item.id+'">'
                        +'<span class="mdnum">'+item.beanNum+'魔豆</span>'
                            //+'<span class="value">'+item.money+'元</span>'
                        +'</div>';
                }


            });
            $("#buy-panel").html(str);
            $("#paymoney").html(initnum);
            $(".buy-item").off("click").on("click",function(){
                //样式变化
                $(".buy-item").removeClass('active');
                $(this).toggleClass('active');
                //页面数据变化
                var paynum=$(this).attr("data-money");
                $("#paymoney").html(paynum);
                $("#mypay").html(paynum);
                id = $(this).attr("data-mid") ? $(this).attr("data-mid"):0;

            })
        })

        $.getJSON(listUrl+"member/index",function(json){
            if(json.errCode==0){
                if(!isWeiXin()){
                    $("#payment").html("支付宝支付");
                }
                if(json.memberInfo.idCard){
                    $("#zsjnum").html(json.memberYuan);
                    //选择支付方式
                    $(".choseicon").on("click",function(){
                        $(".choseicon").removeClass("active");
                        $(this).addClass("active");
                        if($(this).attr("id")=="yuanpay"){
                            wechatpay=false;
                            if(!json.memberInfo.idCard){
                                $(".choseicon").removeClass("active");
                                $(".mask").show();
                                $(".bind-idCard").show();
                            }else if(!json.memberInfo.mobile){
                                $(".choseicon").removeClass("active");
                                $("#secretmobile").html(json.memberInfo.secretMobile)
                                $(".mask").show();
                                alertwindow("请绑定网吧会员手机号后获取魔元信息","未查绑定网吧会员","立即绑定");
                                $(".close").click(function(){
                                    $(".mask").hide();
                                    $(".alertbind").hide();
                                })
                                $(".bind-btn").click(function(){
                                    $(".mask").hide();
                                    $(".alertbind").hide();
                                })
                                //$(".bind-mobile").show();
                            }else{
                                $(".paymoneybox.my").show();
                                $(".paymoneybox.wx").hide();
                            }
                        }else if($(this).attr("id")=="wechatpay"){
                            wechatpay=true;
                            $(".paymoneybox.my").hide();
                            $(".paymoneybox.wx").show();
                        }
                    })
                    //点击兑换
                    $("#exchange-btn").on("click",function(){
                        if(wechatpay){
                            //alert(id);
                            if( id == 0){
                                alert("请选择充值金额");
                                return false;
                            }
                            if(isWeiXin()){
                                url = listUrl+ 'weixin/pay?id='+id;
                            }
                            else {
                                url =listUrl+ 'alipay/pay?id='+id;
                            }
                            window.location.href=url;
                        }else{
                            var paymoney=$("#paymoney").html();
                            console.log(id)
                            $.getJSON(listUrl+"member/bean/exchange",{id:id},function(json){
                                if(json.errCode==10018){
                                    alertwindow(json.errMsg+'，网吧会员充值即可获得魔元',"",'确认');
                                    $(".close").click(function(){
                                        $(".mask").hide();
                                        $(".alertbind").hide();
                                    })
                                    $(".bind-btn").click(function(){
                                        $(".mask").hide();
                                        $(".alertbind").hide();
                                    })
                                    //alert(json.errMsg+'\n网吧会员充值即可获得魔元');
                                }
                                else if(json.errCode==0){
                                    alertwindow(json.errMsg,"","返回");
                                    $(".close,.bind-btn").click(function(){
                                        history.go(-1);
                                        location.reload();
                                    })
                                    //alert(json.errMsg)

                                }
                                else{
                                    alertwindow(json.errMsg,"",'确认');
                                    $(".close").click(function(){
                                        $(".mask").hide();
                                        $(".alertbind").hide();
                                    })
                                    $(".bind-btn").click(function(){
                                        $(".mask").hide();
                                        $(".alertbind").hide();
                                    })
                                }
                            })
                        }
                    })
                }
                else {
                    $("#barname").html("")
                    //未绑定身份证
                    $("#zsjnum").html("未绑定网吧会员");
                    //支付方式
                    $(".choseicon").on("click",function(){
                        $(".choseicon").removeClass("active");
                        $(this).addClass("active");
                        if($(this).attr("id")=="yuanpay"){
                            wechatpay=false;
                            $(".choseicon").removeClass("active");
                            if(json.memberInfo.mobile){
                                $(".mask").show();
                                alertwindow('很抱歉，未查询到'+json.memberInfo.secretMobile+'的网吧会员信息，请前往网吧核实。如您确认此手机号已绑定会员，请重新验证激活。',"未查询到会员记录","立即绑定")
                                //$(".bind-idCard").show();
                                $(".close").click(function(){
                                    $(".mask").hide();
                                    $(".alertbind").hide();
                                })
                                $(".bind-btn").click(function(){
                                    window.location.href="bind.html?return=exchangeMd&return2="+reurl2;
                                })
                            }else{
                                $("#secretmobile").html(json.memberInfo.secretMobile)
                                $(".mask").show();
                                alertwindow("请绑定网吧会员手机号后获取魔元信息","未查绑定网吧会员","立即绑定");
                                //$(".alertbind").show();
                                $(".close").click(function(){
                                    $(".mask").hide();
                                    $(".alertbind").hide();
                                })
                                $(".bind-btn").click(function(){
                                    window.location.href="bind.html?return=exchangeMd&return2="+reurl2;
                                })
                            }
                        }
                        else if($(this).attr("id")=="wechatpay"){
                            wechatpay=true;
                            $(".paymoneybox.my").hide();
                            $(".paymoneybox.wx").show();
                        }
                    })
                    //点击兑换
                    $("#exchange-btn").on("click",function(){
                        if(wechatpay){
                            console.log(id);
                            if( id == 0){
                                alert("请选择充值金额");
                                return false;
                            }
                            if(isWeiXin()){
                                url =listUrl+ 'weixin/pay?id='+id;
                            }
                            else {
                                url =listUrl+ 'alipay/pay?id='+id;
                            }
                            //alert(url);
                            window.location.href=url;
                        }else{
                            $(".mask").show();
                            alertwindow("检测到您暂未绑定身份证，将无法正确获取到您网吧账户下的完整信息，将会影响到您支付方面的操作，请联系网吧前台绑定身份证后重试","","知道了");
                            $(".close,.bind-btn").click(function(){
                                $(".mask").hide();
                                $(".alertbind").hide();
                            })
                            //$(".alertidcard").show();
                        }
                    })
                }
            }
            else if(json.errCode==10025){
                if(isWeiXin()){
                    window.location.href="autologin?f=exchange";
                }
                $(".mask").show();
                alertwindow("请登录后重试","未登录","前往登录");
                $(".close,.bind-btn").click(function(){
                    window.location.href="gologin.html?return=exchangeMd"
                })
            }else{
                alert(json.errMsg);
            }
        })
    },
    clicklisten:function(){
        $(".idcard-btn").on("tap",function(){
            $(".mask").hide();
            $(".alertidcard").hide();
        })
        $(".close").click(function(){
            $(".mask").hide();
            $(".alertbind").hide();
        })
        $(".bind-btn").click(function(){
            window.location.href="bind.html?return=exchangeMd&return2="+reurl2;
        })
    }
}
new ExchangeMd();