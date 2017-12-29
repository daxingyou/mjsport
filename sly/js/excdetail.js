function Excdetail(){
    this.render();
}
Excdetail.prototype={
    render:function(){
        var orderid=window.location.href.split("=")[1];
        data={
            orderid:orderid
        }
        $.post(listUrl+"store/exchange/detail",data,function(json){
            console.log(json)
            var data=json.exchangeInfo;
            var status=""
            switch (data.status){
                case 1:status="未兑换",$("#orderstatus").css("color","#FF4C4E");break;
                case 2:status="成功兑换";break;
                case 3:status="已过期";break;
            }
            if(json.netbarId==100002){
                $("#nerbarname").html("魔杰电竞石家庄店")
            }else{
                $("#nerbarname").html("魔杰电竞深圳旗舰店")
            }
            $("#goodname").html(data.goodsInfo.name)
            $("#goodimg").attr("src",data.goodsInfo.img)
            $("#goodname").html(data.goodsInfo.name)
            $("#mdnum").html(data.goodsInfo.beans)
            $("#ordernum").html(data.id);
            $("#orderdate").html(excdate(data.createdDate))
            $("#orderstatus").html(status)
            $("#promptdate").html(data.invalidDate)
            if(data.type=="NET_TIME"){
                $(".codebox").html("<div class='nettime'>商品已经添加至您的账户,请到<a href='profile.html' style='color: blue;text-decoration: underline;'>个人页</a>查看。</div>")
            }else {
                var str = data.quanNo,
                    options = {
                    format:"CODE128",
                    displayValue:true,
                    fontSize:18,
                    height:100
                };
                $("#excnum").html(data.quanNo)
                $('#barcode').JsBarcode(str,options);
                new  QRCode(document.getElementById("exccode"),"http://m.jesport.com/backend/doChange.html?quanno="+data.quanNo);
            }
        })
        $("#goshop").click(function(){
            window.location.href="shop.html?id=100001"
        })
    }
}
new Excdetail();