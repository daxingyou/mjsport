function Shoplist(){
    this.myScroll = null;
    this.render();
    this.click();
}
Shoplist.prototype={
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
                    //window.location.href="turntable.html";
                    window.location.reload();
                } else {
                    alert(json.errMsg);
                    return false;
                }
            });
        });
        $("#wechatlogin").on("click",function(){
            if(isWeiXin()) {
                window.location.href='autologin?f=shop';
            } else {
                alert("请在微信中访问");
                return false;
            }
        })
    },
    render:function(){
        var islogin=false;
        var netbarid;
        $.getJSON(listUrl+"member/index",function(json){
            if(json.errCode==0){
                islogin=true;
                netbarid=json.netbarId;
                $("#md_num").html(json.memberBean.balanceBean);
                $("#myuan_num").html(json.memberYuan);
                $("#mygift").on("click",function(){
                    window.location.href="excrecord.html?return=shop"
                })
                $(".exchange-btn,.goodimg").on("tap",function(){
                    var goodid=$(this).attr("data-id");
                    console.log(goodid)
                    window.location.href="goodinfo.html?goodid="+goodid;
                })
                $("#buymd").on("click",function(){
                    if(islogin){
                        window.location.href="exchangeMd.html?return=shop"
                    }else{
                        if(isWeiXin()) {
                            window.location.href='autologin?f=shop';
                        }else{
                            Shoplist.prototype.popuplogin();
                        }
                    }
                })
            }else if(json.errCode==10025){
                if(isWeiXin()) {
                    window.location.href='autologin?f=shop';
                }
                $(".exchange-btn").on("click",function(){
                    Shoplist.prototype.popuplogin();
                })
            }
        })
        var id=window.location.href.split(/[? = &]/)[2];
        var data={
            pn:1,
            barid:netbarid
        }
        $.post(listUrl+'store/list',data,function(json){
            if(json.errCode==0){
                $("#bar_name").html(json.netbarInfo.name+"--"+json.netbarInfo.address);
                if(json.goodsList.list.length!=0){
                    var data=json.goodsList.list,str="";
                    var hasNext = json.goodsList.hasNextPage;
                    var nextPage= json.goodsList.nextPage;
                    data.forEach(function(item){
                        str+=goodsList(item);
                    })
                    $("#goodsList").html(str);
                    $(".exchange-btn,.goodimg").on("tap",function(){
                        var goodid=$(this).attr("data-id");
                        console.log(goodid)
                        if(islogin){
                            window.location.href="goodinfo.html?goodid="+goodid;
                        }else{
                            Shoplist.prototype.popuplogin();
                        }
                    })

                    this.myScroll = new IScroll('#wrapper',{click:true,taps:true,mouseWheel:true});
                    myScroll.on('scrollEnd',function(){
                        if(hasNext){
                            $.post(listUrl+'store/list',{pn:nextPage,barid:id},function(json){
                                var str1=""
                                data.forEach(function(item){
                                    str1+=goodsList(item);
                                })
                                $("#goodsList").append(str1);
                                $(".exchange-btn").on("tap",function(){
                                    var goodid=$(this).attr("data-id");
                                    console.log(goodid)
                                    window.location.href="goodinfo.html?goodid="+goodid;
                                })
                                //滚动初始化
                                setTimeout(function () {
                                    myScroll.refresh();
                                }, 0);
                            })
                        }else{

                        }
                    })
                }else{
                    $("#goodsList").html('<div class="nodata" style="background: none">暂无商品</div>')
                }
            }
        })
    },
    click:function(){
        $(".mask").on("click",function(){
            $(".mask").hide();
            $("#logintable").hide();
        })

    }
}
new Shoplist();