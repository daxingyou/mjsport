function Goodinfo(){
    this.render();
}
Goodinfo.prototype={
    render:function(){
        var id=window.location.href.split("=")[1];
        $.get(listUrl+"store/goods/detail?goodsid="+id,function(json){
            if(json.errCode==0){
                var data=json.goodsInfo;
                $("#goodimg").attr("src",data.img);
                $("#goodname").html(data.name);
                $("#cost").html(data.beans);
                $("#value").html(data.price);
                $("#ruleinfo").html(data.memo);
            }else{
                alert(json.errMsg);
            }
        })
        $(".tonerbar").on("click",function(){
            window.location.href="applynetbar.html?goodsid="+id;
        })
        $("#goodsexchange-btn").on("click",function(){
            $.post(listUrl+"store/list",{pn:1,barid:100001},function(json){
                var price=$("#cost").html();
                if(json.memberBeanInfo.balanceBean>=price){
                    window.location.href="immediatepay.html?goodsid="+id;
                }else{
                    confirmtext("","魔豆不足，请前往充值魔豆","exchangeMd.html");
                }
            })

        })
    }
}
new Goodinfo();