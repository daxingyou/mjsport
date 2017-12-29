function Immediatepay(){
    this.render();
}
Immediatepay.prototype={
    render:function(){

        var goodsid=window.location.href.split("=")[1];
        var data={
            goodsid:goodsid
        }
        $.post(listUrl+"store/goods/detail",data,function(json){
            if(json.errCode==0){
                //console.log(json)
                var goodsInfo=json.goodsInfo;
                $("#goodsname").html(goodsInfo.name);
                $("#paymdmun").html(goodsInfo.beans);
                $("#goodsmemo").html(goodsInfo.memo);
                $.post(listUrl+"store/list",{pn:1,barid:100001},function(json){
                    if(json.errCode==0){
                        $("#mymdnum").html(json.memberBeanInfo.balanceBean);
                    }
                })
                $("#goodsexchangebtn").on("click",function(){
                    var data={
                        goodsid:goodsid
                    }
                    $.post(listUrl+"store/exchange/add",data,function(json){
                        if(json.errCode==0){
                            var orderid=json.orderInfo.id
                            window.location.href="completepay.html?mdnum="+goodsInfo.beans+"&oredrid="+orderid;
                        }else if(json.errCode==10074){
                            confirmtext(json.errMsg,"","bind.html")
                        }else{
                            confirmtext(json.errMsg,"前往充值魔豆","exchangeMd.html");
                        }
                    })
                });
            }else{
                alert(json.errMsg);
            }
        })
    }

};
new Immediatepay();