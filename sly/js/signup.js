function Signup(){
    this.click();
    this.render();
}
Signup.prototype={
    render:function(){
        var url = window.location.href;
        var id  = url.split("?")[1].split("=")[2];
        var barid  = url.split("?")[1].split("&")[0].split("=")[1];
        var  data={
            //"method":"netbar.match.signup",
            "barid":barid,
            "matchid":id,
            "isonline":false
        },
            data2={
                "method":"bet.match.detail",
                "id":id
            }
        new  QRCode(document.getElementById("jqcode"),url);
        $.post(listUrl+'third/match/detail',data2,function(json){
            if(!json.errno==0){
                alert(json.errmsg)
            }else{
                //var json=JSON.parse(json);
                console.log(json);
                $("#game").html(json.data.game);
                $("#name").html(json.data.name);
                $("#address").html(json.data.addr);
                $("#startTime").html(ge_time_format(json.data.start_at));
                $("#map").html(json.data.rule.map);
                $("#rule").html(json.data.rule.memtype+","+json.data.rule.ruletype);
                if(json.data.remark==undefined){
                    $("#remark").html("无");
                }
            }
        })
        $.post(listUrl+'third/match/signup',data,function(json){
            console.log(json);
            if(!json.errno==0){
                console.log(json.errmsg)
            }else{
                json=JSON.parse(json);
                console.log(json)
                console.log(json.data.type)
                if(json.data.type==1){
                    $(".isignup").on("click",function(){
                        $(".opacity").show();
                        $(".infoway").show();
                    })
                    var data3={
                        "method":"bet.match.signup",
                        "matchid":id,
                        "contact":"",
                        "accinfo":"",
                        "userinfo":"",
                        "age":"",
                        "name":"",
                        "uid":"1"
                    }
                    $(".confirm").on("click",function(){
                        data3.name=$("#signname").val();
                        data3.age=$("#signage").val();
                        data3.accinfo=$("#signaccinfo").val();
                        data3.contact=$("#signcontact").val();
                        data3.age=$("#signage").val();
                        data3.userinfo=$("#signuserinfo").val();
                        console.log(data3);
                        $.post(listUrl+'third/match/signup',data3,function(json){
                            var json=JSON.parse(json)
                            if(!json.errno==1025){
                                alert(json.errmsg)
                            }else{
                                alert(json.errmsg)
                                $(".opacity").hide();
                                $(".infoway").hide();
                                $(".callway").hide();
                            }
                        })
                    })
                }else {
                    $(".isignup").on("click",function(){
                        $(".opacity").show();
                        $(".callway").show();
                        $("#phonenum").html(json.data.phone);
                        $("#qqnum").html(json.data.phone);
                    })
                }
                new QRCode(document.getElementById("signcode"), json.data.qrcode);

            }
        });


    },
    click:function(){
        $(".cancel").on("click",function(){
            $(".opacity").hide();
            $(".infoway").hide();
            $(".callway").hide();
        })
        $(".mask").on("click",function(){
            $(".opacity").hide();
            $(".infoway").hide();
            $(".callway").hide();
        })
        $(".call-btn").on("click",function(){
            $(".opacity").hide();
            $(".infoway").hide();
            $(".callway").hide();
        })
        $(".share").on("click",function(){
            $(".opacity").show();
            $(".shareimg").show();
        })
        $(".iknow-btn").on("click",function(){
            $(".opacity").hide();
            $(".shareimg").hide();
        })
    }
}
new Signup();