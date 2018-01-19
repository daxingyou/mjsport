function Scratch(){
    this.render();
}
Scratch.prototype={
    render:function (){
        var listUrl='',list=listUrl+"guagua/index",json="../js/data.json";
        $.getJSON(json,function(json){
            console.log(json)
            if(json.errCode==10025){
                window.location.href=listUrl+"guagua/login"
            }
            if(!json.luckyPrize){
                $(".mask").show();
                $(".code").show();
            }else if(json.luckyPrize.id==10 ){
                    $(".award").html("很遗憾，你这次未中奖");
            }else{
                $("#awardname").html(json.luckyPrize.name)
                $("#chanceNum").html(json.chanceNum);
                $("#quanNo").html(json.luckyPrize.quanNo);
            }


            if(json.chanceNum>0){
                $(".havaeward").hide();
                $('#redux').eraser({
                    size: 50,   //设置橡皮擦大小
                    completeRatio: .5, //设置擦除面积比例
                    completeFunction: showResetButton   //大于擦除面积比例触发函数
                });
                function showResetButton() {
                    $.getJSON(listUrl+"guagua/lottery/draw",function(json){
                        console.log(json);
                    })
                    if(json.luckyPrize.id==10){
                        $(".noaward").html("很遗憾，你这次未中奖");
                    }else{
                        $(".noaward").fadeOut(100);
                        $(".havaeward").fadeIn(300);
                        $("#redux").fadeOut(300);
                    }
                    if(json.chanceNum-1<=0){
                        $(".mychance").addClass("active").html("刮奖次数已用完");
                    }

                }
            }else{
                $("#redux").hide();
                $(".mychance").addClass("active").html("刮奖次数已用完");
                if(!json.luckyPrize){
                    $('#redux').eraser({
                        size: 50,   //设置橡皮擦大小
                        completeRatio: .5, //设置擦除面积比例
                        completeFunction: showResetButton   //大于擦除面积比例触发函数
                    });
                    function showResetButton(){
                        consoel.log("123")
                    }
                }else{
                    if(json.luckyPrize.id==10){
                        $(".noaward").html("很遗憾，你这次未中奖");
                    }else{
                        $(".noaward").remove();
                    }
                }
            }
        });
    },
}
new Scratch();