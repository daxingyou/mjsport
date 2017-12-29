function Lottery(){
    this.goback();
    this.renden();
    this.tab();
}
Lottery.prototype={
    goback:function(){
        $(".header-before").on("click",function(){
            console.log("111")
            window.history.go(-1);
        })
        $(".modou-btn").on("click",function(){
            window.location.href='myguess.html'
        })
    },
    renden:function(){
        var url=window.location.href;
        if(url.indexOf("&")>0){
            var issue=url.split("?")[1].split("&")[0].split("=")[1];
        }else{
            var issue=url.split("?")[1].split("=")[1];
        }
        var  id=issue.substring(issue.length-6,issue.length)
        console.log(id);
        var data={
            method:"bet.bonus.open",
            issueid:issue,
            //uid:7
        },
            data2={
                method:"bet.issue.bonus.notice",
                matchid:id,
                page:1,
                pagesize:10

            },
            data3={
                method:"bet.issue.rank",
                matchid:id
            },
            data4={
                method:"bet.issue.bonus.record",
                matchid:id,
                page:1,
                pagesize:10
            }
        //竞猜领奖
        $.post(listUrl+'member/bet/openbonus',data,function(json){
            if(json.errno == 0){
                var data=json.data;
                $("#single-modou").html(data.bonus_301);
                $("#single-mulit").html(data.pay_301);
                $("#arcard-modou").html(data.bonus_303);
                $("#arcard-mulit").html(data.pay_303);
                $("#matchname").html(data.matchname);
                if(data.bonus == 0){
                    console.log("123")
                    $("#lottery-header").removeClass("header");
                    $("#lottery-header").addClass("header2");

                }else{
                    //console.log(data)
                    $("#allbonus").html(data.bonus);


                }
            }else{
                $("#lottery-header").removeClass("header");
                $("#lottery-header").addClass("header2");
            }
        })
        //滚动公告
        function remainTime(){
            $.post(listUrl+'third/bet/issueNotice',data2,function(json){
                //json=JSON.parse(json);
                var str="";
                if(json.errno==0){
                    if(json.data!=null){
                        var data=json.data;
                        console.log(data);
                        data.notices.forEach(function(item){
                            str+=notices(item);
                        })
                        console.log(str);
                        $("#scul").html(str);
                        $("#scul2").html(str);
                    }
                }
            })
        }
        remainTime();
        setInterval(remainTime,50000);

        //得奖排名
        $.post(listUrl+'third/bet/issueRank',data3,function(json){
            if(json.errno==0){
                var data=json.data;
                //console.log(data)
                var str="";
                data.ranks.forEach(function(item){
                    str+=ranks(item);
                })
                $("#ranks-content").html(str);
            }else if(json.errno==1028){
                $("#ranks-content").html('<div class="nodata">暂无排名信息</div>')
            }
        })
        //奖金纪录
        var nextPage=1
        $.post(listUrl+'third/bet/issueRecord',data4,function(json){
            nextPage++;
            if(json.errno==0 && json.data!=null){
                var data=json.data;
                var str="";
                data.notices.forEach(function(item){
                    str+=records(item);
                })
                $("#record-content").append(str);
            }
            data5={
                method:"bet.issue.bonus.record",
                matchid:id,
                page:nextPage,
                pagesize:10
            }
            this.myScroll = new IScroll('#record',{click:true,taps:true});
            myScroll.on('scrollEnd', function(){
                    data5={
                        method:"bet.issue.bonus.record",
                        matchid:id,
                        page:nextPage,
                        pagesize:10
                    }
                    $.post(listUrl+'third/bet/issueRecord',data5,function(json){
                        //json=JSON.parse(json);
                        if(json.errno==0 &&json.data){
                            nextPage++;
                            var data1=json.data;
                            var str1="";
                            data1.notices.forEach(function(item){
                                str1+=records(item);
                            })
                            $("#record-content").append(str1);
                            nextPage++;
                        }
                        setTimeout(function () {
                            myScroll.refresh();
                        }, 0);
                    })
                    $("#tips").css({"display":"block"});
            });
        })
    },
    tab:function(){
        $(".tab").on("click",function(){
            if(!$(this).hasClass("active_tab")){
                $(this).addClass("active_tab");
                $(this).siblings().removeClass("active_tab");
            }
            if($(this).hasClass("rank-tab")){
                $(".rank-content").show()
                $(".record-content").hide()
            }else{
                $(".rank-content").hide()
                $(".record-content").show();
            }
        })
    }
}
new Lottery()