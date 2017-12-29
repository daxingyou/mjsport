function Guess(){
    this.myScroll = null;
    this.renderGuess();
}
Guess.prototype={
    renderGuess:function(){
        $("#league").on("click",function(){
            $(".intbar").removeClass("mode_active");
            $(".league").addClass("mode_active");
            $("#match-box").hide();
            $("#match-box2").show();
            var page = 1;
            var page1 = 1;
            var page2 = 1;
            var data2={
                method:"bet.match.online",
                page:page,
                pagesize:"10"
            }
            $.post(listUrl+'third/match/online',data2,function(json){
                var type = 'online';
                var isData     = json.data ? json.data : null;
                var data       = json.data ? json.data.matches :[];
                var nowDate    = getNowDate();
                var lastDate   = getLastDate();
                var convertArr = {}
                var content = '';
                var convertArr = converDate(nowDate,lastDate,data,'start_at');
                for(key in convertArr){
                    content += '<div class="match_date">'+key+'</div>';
                    for(key2 in convertArr[key]) {
                        content += guessInfo3(convertArr[key][key2]);
                    }
                }
                $("#match-box2").append(content);
                this.myScroll = new IScroll('#wrapper',{click:true,tap:true,probeType: 1000});
                var isUp = false;
                var isDown = false;
                var isType   = 1;
                myScroll.on('scroll',function(){
                    $("#upTips").html("下拉加载更多").css({"background":"url(http://static.jesport.com/sly/images/icon-down.png)no-repeat 2rem center","background-size":".5rem .5rem"});
                    var height = this.y,
                        bottomHeight = this.maxScrollY - height;
                    if (height >= 100) {
                        isDown = true;
                        $("#upTips").html("释放立即刷新").css({"background":"url(http://static.jesport.com/sly/images/icon-up.png)no-repeat 2rem center","background-size":".5rem .5rem"});
                    }
                    else if (height < 100 && height >= 0) {
                        isDown = false;
                        $("#upTips").css({"display":"block"});
                    }
                    // 控制上拉显示s
                    if (bottomHeight >= 100) {
                        isUp = true;
                    }
                    else if (bottomHeight < 100 && bottomHeight >= 0) {
                        isUp = false;
                    }
                    var transform = parseInt(getTranslateY("#scroller"));
                    console.log(transform);
                    if(transform > 0){
                        isType = 1;
                    }
                    else {
                        isType = 0;
                    }
                });
                myScroll.on('scrollEnd', function(){
                        $("#upTips").css({"display":"none"});
                        console.log( isType );
                        console.log( isUp );
                        console.log( isDown);
                        var oUrl = '';
                        if( !isType && isUp ){
                            oUrl = 'third/match/online';
                            page1++;
                            page = page1;
                        }
                        else if( isType && isDown ) {
                            oUrl = 'third/bet/matchOnlineHistory';
                            page2++;
                            page = page2;
                            $("#nowTips").css({"display":"block"});
                        }
                        else {
                            return false;
                        }
                        var data2={
                            page:page,
                            pagesize:"10"
                        }
                        console.log("11111111"+listUrl+oUrl);
                        $.getJSON(listUrl+oUrl,data2,function(json, textStatus) {
                            isData     = json.data ? json.data : null;
                            var len       = json.data ? json.data.matches.length : 0;
                            var data       = json.data ? json.data.matches :[];
                            var nowDate    = getNowDate();
                            var lastDate   = getLastDate();
                            var convertArr = {}
                            var convertArr = converDate(nowDate,lastDate,data,'start_at');
                            var content = '';
                            var transY   = 0;
                            for(key in convertArr){
                                content += '<div class="match_date">'+key+'</div>';
                                for(key2 in convertArr[key]) {
                                    content += guessInfo2(convertArr[key][key2]);
                                }
                            }
                            if( !isType && isUp ){
                                $("#match-box2").append(content);
                            }
                            else if( isType && isDown ) {
                                $("#nowTips").css({"display":"none"});
                                $("#match-box2").prepend(content);
                                var oHei = $("#match-box2 .match_info").height();
                                var allLen = len * oHei;
                                console.log(parseInt($("#scroller").css("transform").substring(14)));
                                transY = transY - allLen ;
                                console.log(transY);
                                // $("#scroller").css({"transform" : "translate(0px, "+transY+"px)"})
                            }
                            $("#match-box2 .match_list").on("tap",function(){
                                var id = $(this).attr("data-id");
                                var olid = $(this).attr("data-olid");
                                if(id==olid){
                                    window.location.href = "matchfind.html?id="+id;
                                }else{
                                    window.location.href = "matchinfo.html?id="+id;
                                }
                            });
                            if(!json.data){
                                $("#tips").css({"display":"block"});
                                return false;
                            }
                            setTimeout(function () {
                                myScroll.refresh();
                            }, 1000);
                        });
                    });


                $("#match-box2 .match_list").on("tap",function(){
                    var id = $(this).attr("data-id");
                    var olid = $(this).attr("data-olid");
                    if(id==olid){
                        window.location.href = "matchfind.html?id="+id;
                    }else{
                        window.location.href = "matchinfo.html?id="+id+"type="+type;
                    }
                });
            })
        });
        $("#intbar").on("click",function(){
            //alert("功能暂未开放，敬请期待");
            $(".intbar").addClass("mode_active");
            $(".league").removeClass("mode_active");
            $("#match-box").show();
            $("#match-box2").hide();
            myScroll.refresh()
        });
        var data={
            page:"1",
            pagesize:"10"
        }
        $.post(listUrl+'third/match/netbar ',data,function(json){
            var type = 'netbar';
            if(json.data == null){
                var data={
                    page:"1",
                    pagesize:"10"
                }
                $.post(listUrl+'third/bet/history',data,function(json){
                    var type = 'netbar';
                    if(json.data == null){
                        $("#match-box").html('<div class="nodata" style="height: 4rem;line-height: 4rem;text-align: center;font-size: 0.42667rem;background-color: #FFFFFF;">暂无网吧</div>')
                    }
                    else{
                        var data       = json.data ? json.data.matches :[];
                        data.sort(compare('start_at'))
                        var nowDate    = getNowDate();
                        var lastDate   = getLastDate();
                        var convertArr = {}
                        var content = '';
                        var convertArr = converDate(nowDate,lastDate,data,'start_at');
                        for(key in convertArr){
                            content += '<div class="match_date">'+key+'</div>';
                            for(key2 in convertArr[key]) {
                                content += guessInfo3(convertArr[key][key2]);
                            }
                        }
                        $("#match-box").append(content);
                        var page = 1;
                        var page1 = 1;
                        var page2 = 1;
                        this.myScroll = new IScroll('#wrapper',{click:true,tap:true,probeType: 1000});
                        var isUp = false;
                        var isDown = false;
                        var isType   = 1;
                        myScroll.on('scroll',function(){
                            $("#upTips").html("下拉加载更多").css({"background":"url(http://static.jesport.com/sly/images/icon-down.png)no-repeat 2rem center","background-size":".5rem .5rem"});
                            var height = this.y,
                                bottomHeight = this.maxScrollY - height;
                            if (height >= 100) {
                                isDown = true;
                                $("#upTips").html("释放立即刷新").css({"background":"url(http://static.jesport.com/sly/images/icon-up.png)no-repeat 2rem center","background-size":".5rem .5rem"});
                            }
                            else if (height < 100 && height >= 0) {
                                isDown = false;
                                $("#upTips").css({"display":"block"});
                            }
                            // 控制上拉显示s
                            if (bottomHeight >= 100) {
                                isUp = true;
                            }
                            else if (bottomHeight < 100 && bottomHeight >= 0) {
                                isUp = false;
                            }
                            var transform = parseInt(getTranslateY("#scroller"));
                            //console.log(transform);
                            if(transform > 0){
                                isType = 1;
                            }
                            else {
                                isType = 0;
                            }
                        });
                        myScroll.on('scrollEnd', function(){
                            $("#upTips").css({"display":"none"});
                            var oUrl = '';
                            if( !isType && isUp ){
                                oUrl = 'third/match/netbar';
                                page1++;
                                page = page1;
                            }
                            else if( isType && isDown ) {
                                oUrl = 'third/bet/history';
                                page2++;
                                page = page2;
                                $("#nowTips").css({"display":"block"});
                            }
                            else {
                                return false;
                            }
                            var data2={
                                page:page,
                                pagesize:"10"
                            }
                            //console.log(listUrl+oUrl);
                            $.post(listUrl+oUrl,data2,function(json, textStatus) {
                                isData     = json.data ? json.data : null;
                                var len       = json.data ? json.data.matches.length : 0;
                                var data       = json.data ? json.data.matches :[];
                                data.sort(compare('start_at'))
                                var nowDate    = getNowDate();
                                var lastDate   = getLastDate();
                                var convertArr = {}
                                var convertArr = converDate(nowDate,lastDate,data,'start_at');
                                var content = '';
                                var transY   = 0;
                                for(key in convertArr){
                                    content += '<div class="match_date">'+key+'</div>';
                                    for(key2 in convertArr[key]) {
                                        content += guessInfo3(convertArr[key][key2]);
                                    }
                                }
                                if( !isType && isUp ){
                                    $("#match-box").append(content);
                                }
                                else if( isType && isDown ) {
                                    $("#nowTips").css({"display":"none"});
                                    $("#match-box").prepend(content);
                                    var oHei = $("#match-box .match_info").height();
                                    var allLen = len * oHei;
                                    console.log(parseInt($("#scroller").css("transform").substring(14)));
                                    transY = transY - allLen ;
                                    console.log(transY);
                                    // $("#scroller").css({"transform" : "translate(0px, "+transY+"px)"})
                                }
                                $("#match-box .match_list").on("tap",function(){
                                    var id = $(this).attr("data-id");
                                    var olid = $(this).attr("data-olid");
                                    if(id==olid){
                                        window.location.href = "matchfind.html?id="+id;
                                    }else{
                                        window.location.href = "matchinfo.html?id="+id+"&type="+type;
                                    }
                                });
                                if(!json.data){
                                    $("#tips").css({"display":"block"});
                                    return false;
                                }
                                setTimeout(function () {
                                    myScroll.refresh();
                                }, 1000);
                            });
                        });


                        $("#match-box .match_list").on("tap",function(){
                            var id = $(this).attr("data-id");
                            window.location.href = "matchinfo.html?id="+id+"&type="+type;
                        });
                    }
                })
            }
            else{
                var data       = json.data ? json.data.matches :[];
                var nowDate    = getNowDate();
                var lastDate   = getLastDate();
                var convertArr = {}
                var content = '';
                var convertArr = converDate(nowDate,lastDate,data,'start_at');
                for(key in convertArr){
                    content += '<div class="match_date">'+key+'</div>';
                    for(key2 in convertArr[key]) {
                        content += guessInfo3(convertArr[key][key2]);
                    }
                }
                $("#match-box").append(content);
                var page = 1;
                var page1 = 1;
                var page2 = 0;
                this.myScroll = new IScroll('#wrapper',{click:true,tap:true,probeType: 1000});
                var isUp = false;
                var isDown = false;
                var isType   = 1;
                myScroll.on('scroll',function(){
                    $("#upTips").html("下拉加载更多").css({"background":"url(http://static.jesport.com/sly/images/icon-down.png)no-repeat 2rem center","background-size":".5rem .5rem"});
                    var height = this.y,
                        bottomHeight = this.maxScrollY - height;
                    if (height >= 100) {
                        isDown = true;
                        $("#upTips").html("释放立即刷新").css({"background":"url(http://static.jesport.com/sly/images/icon-up.png)no-repeat 2rem center","background-size":".5rem .5rem"});
                    }
                    else if (height < 100 && height >= 0) {
                        isDown = false;
                        $("#upTips").css({"display":"block"});
                    }
                    // 控制上拉显示s
                    if (bottomHeight >= 100) {
                        isUp = true;
                    }
                    else if (bottomHeight < 100 && bottomHeight >= 0) {
                        isUp = false;
                    }
                    var transform = parseInt(getTranslateY("#scroller"));
                    //console.log(transform);
                    if(transform > 0){
                        isType = 1;
                    }
                    else {
                        isType = 0;
                    }
                });
                myScroll.on('scrollEnd', function(){
                    $("#upTips").css({"display":"none"});
                    var oUrl = '';
                    if( !isType && isUp ){
                        oUrl = 'third/match/netbar';
                        page1++;
                        page = page1;
                    }
                    else if( isType && isDown ) {
                        oUrl = 'third/bet/history';
                        page2++;
                        page = page2;
                        $("#nowTips").css({"display":"block"});
                    }
                    else {
                        return false;
                    }
                    var data2={
                        page:page,
                        pagesize:"10"
                    }
                    console.log(listUrl+oUrl);
                    $.post(listUrl+oUrl,data2,function(json, textStatus) {
                        isData     = json.data ? json.data : null;
                        var len       = json.data ? json.data.matches.length : 0;
                        var data       = json.data ? json.data.matches :[];
                        var nowDate    = getNowDate();
                        var lastDate   = getLastDate();
                        var convertArr = {}
                        var convertArr = converDate(nowDate,lastDate,data,'start_at');
                        var content = '';
                        var transY   = 0;
                        for(key in convertArr){
                            content += '<div class="match_date">'+key+'</div>';
                            for(key2 in convertArr[key]) {
                                content += guessInfo3(convertArr[key][key2]);
                            }
                        }
                        if( !isType && isUp ){
                            $("#match-box").append(content);
                        }
                        else if( isType && isDown ) {
                            $("#nowTips").css({"display":"none"});
                            $("#match-box").prepend(content);
                            var oHei = $("#match-box .match_info").height();
                            var allLen = len * oHei;
                            console.log(parseInt($("#scroller").css("transform").substring(14)));
                            transY = transY - allLen ;
                            console.log(transY);
                            // $("#scroller").css({"transform" : "translate(0px, "+transY+"px)"})
                        }
                        $("#match-box .match_list").on("tap",function(){
                            var id = $(this).attr("data-id");
                            var olid = $(this).attr("data-olid");
                            if(id==olid){
                                window.location.href = "matchfind.html?id="+id;
                            }else{
                                window.location.href = "matchinfo.html?id="+id+"&type="+type;
                            }
                        });
                        if(!json.data){
                            $("#tips").css({"display":"block"});
                            return false;
                        }
                        setTimeout(function () {
                            myScroll.refresh();
                        }, 1000);
                    });
                });


                $("#match-box .match_list").on("tap",function(){
                    var id = $(this).attr("data-id");
                    window.location.href = "matchinfo.html?id="+id+"&type="+type;
                });
            }

        })
    }
}

new Guess();