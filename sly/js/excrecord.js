function Excrecord(){
    this.render();
}
Excrecord.prototype={
    render:function(){
        var data={
            pn:1
        }
        $.getJSON(listUrl+'store/exchange/list',function(json, textStatus) {
            if(json.errCode==0){
                if(json.orderList.list.length>0){
                    var data    = json.orderList.list;
                    var str     = '';
                    var hasNext = json.orderList.hasNextPage;
                    var nextPage= json.orderList.nextPage;
                    var nowDate    = getNowDate();
                    var lastDate   = getLastDate();
                    var convertArr = {}
                    var content = '';
                    var convertArr = converDate(nowDate,lastDate,data,'createdDate');
                    for(key in convertArr){
                        content += '<div class="match_date">'+key+'</div>';
                        for(key2 in convertArr[key]) {
                            content += myexclist(convertArr[key][key2]);
                        }
                    }
                    $("#excrecord").append(content);
                    //console.log($(".status"))
                    $(".status").forEach(function(item){
                        switch ($(item).html()){
                            case "未使用":$(item).css("color","#FF4C4E");break;
                            case "已使用":$(item).css("color","#231815");break;
                            case "已过期":$(item).css("color","#868686");break;
                        }
                    })
                    $(".recorditem").off("tap").on("tap",function(){
                        //console.log($(this).attr("data-id"))
                        window.location.href="excdetail.html?orderid="+$(this).attr("data-id");
                    })
                    function timedMsg(){
                        var t=setTimeout(function(){
                            //console.log("123")
                            $("#mytip").hide();
                        },2000);
                    }
                    this.myScroll = new IScroll('#wrapper',{click:true,taps:true,mouseWheel:true});
                    myScroll.on('scrollEnd', function(){
                        if( hasNext  ){
                            $.getJSON(listUrl+'store/exchange/list?pn='+nextPage,function(json, textStatus) {
                                var data    = json.orderList.list;
                                var str     = $("#excrecord").html();
                                hasNext = json.orderList.hasNextPage;
                                nextPage= json.orderList.nextPage;
                                var nowDate    = getNowDate();
                                var lastDate   = getLastDate();
                                var convertArr = {}
                                var content = '';
                                var convertArr = converDate(nowDate,lastDate,data,'createdDate');
                                for(key in convertArr){
                                    content += '<div class="match_date">'+key+'</div>';
                                    for(key2 in convertArr[key]) {
                                        content += myexclist(convertArr[key][key2]);
                                    }
                                }
                                $("#excrecord").append(content);
                                $(".status").forEach(function(item){
                                    switch ($(item).html()){
                                        case "未使用":$(item).css("color","#FF4C4E");break;
                                        case "已使用":$(item).css("color","#231815");break;
                                        case "已过期":$(item).css("color","#868686");break;
                                    }
                                })
                                $(".recorditem").off("tap").on("tap",function(){
                                    //console.log($(this).attr("data-id"))
                                    window.location.href="excdetail.html?orderid="+$(this).attr("data-id");
                                })
                                setTimeout(function () {
                                    myScroll.refresh();
                                }, 0);
                            });
                        }
                        else{
                            $("#mytip").css("display","block");
                            if($("#tips").show() && getScrollTop() + getClientHeight() == getScrollHeight()){
                                timedMsg();
                            }
                        }
                    });
                }else
                {
                    $("#excrecord").html('<div class="nodata">暂无奖品</div>')
                }
            }

        });

    }
}
new Excrecord();