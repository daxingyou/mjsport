
function Matchfind(){
    this.goback();
    this.renderMatch();
    this.tabClick();
}
Matchfind.prototype={
    goback:function(){
        $(".back").on("click",function(){
            window.history.go(-1);
        })
    },
    renderMatch:function(){
        var url = window.location.href;
        var id  = url.split("?")[1].split("=")[1];
        var data={
            id:id,
            isonline:true
        }
        $.post(listUrl+'third/match/detail',data,function(json){
            if(json.errno !=0 ){
                return;
            }
            var data = json.data,str1="",str2=""
            //console.log(data)
            $("#match_name").html(data.name);
            $("#time").html(data.start_at.split(" ")[1]);
            $("#lname,#p1Name").html(data.teaminfo.blue.name);
            $("#rname,#p2Name").html(data.teaminfo.red.name);
            $("#win1").html(parseFloat((data.teaminfo.blue.win*100).toFixed(10))+"%")
            $("#win2").html(parseFloat((data.teaminfo.red.win*100).toFixed(10))+"%")
            if(data.teaminfo.blue.logo){
                $(".team1img").attr("src",data.teaminfo.blue.logo);
            }
            if(data.teaminfo.red.logo){
                $(".team2img").attr("src",data.teaminfo.red.logo);
            }
            data.teaminfo.blue.member.forEach(function(item){
                str1+=meminfo(item);
            })
            $("#left-mem").html(str1);
            data.teaminfo.red.member.forEach(function(item){
                str2+=meminfo(item);
            })
            $("#right-mem").html(str2);
        })
    },
    tabClick:function(){
        $(".tab").off("click").on("click",function(){
            if(!$(this).hasClass("info_active"))
            {
                $(this).siblings(".tab").removeClass("info_active");
                $(this).addClass("info_active");
                if($(this).hasClass("statab")){
                    //技术统计
                    var id  = window.location.href.split("?")[1].split("=")[1];
                    var data={
                        "method":"bet.match.statistics",
                        "matchid":id,
                        "isonline":true
                    }
                    $.post(listUrl+'third/match/statistics',data,function(json){
                        if(!json.data){
                            $("#allmatch").html('<div class="nodata">暂无技术统计</div>');
                            return;
                        }
                        var data=json.data.rounds;
                        $("#allmatch").html("")
                        for(var x=0;x<data.length;x++ ){
                            //console.log(x)
                            //console.log(data[x].teams)
                            var  arr=[];
                            for( key in data[x].teams){
                                arr.push(key);
                            }
                            //console.log(arr)
                            $("#allmatch").append('<div class="one-match" id="onematch'+ x +'">' +
                                '<div class="all-header">' +
                                '<div class="match-session">第' + DX(x) + '场</div>' +
                                '<div class="session-score"><div>' +
                                '<img class="small-img" src="http://static.jesport.com/sly/images/item1.png" alt="">' +
                                '</div><div class="session-score-txt">'+ data[x].teams[arr[0]].hero_kill +' : '+ data[x].teams[arr[1]].hero_kill +'</div><div>' +
                                '<img class="small-img" src="http://static.jesport.com/sly/images/item2.png" alt="">' +
                                '</div></div><div class="match-time">比赛用时:'+ duration(data[x].duration) +'</div></div>' +
                                '<div class="all-bottom"><div class="all-bottom-team">' +
                                '<img class="images" src="'+ data[x].teams[arr[0]].team.logo +'" alt="">' +
                                '<p class="team-name">'+ data[x].teams[arr[0]].team.name +'</p>' +
                                '</div>' +
                                '<div class="all-bottom-info">' +
                                '<div class="killnum">击杀总数:'+ data[x].teams[arr[0]].hero_kill +'</div>' +
                                '<div class="money">金币数:'+ data[x].teams[arr[0]].money +'</div>' +
                                '<div class="mosternum">' +
                                '<div class="s-txt b-dragon">大龙数 :'+ data[x].teams[arr[0]].big_dragon_kill +'</div>' +
                                '<div class="s-txt s-dragon">小龙数 :'+ data[x].teams[arr[0]].small_dragon_kill +'</div>' +
                                '<div class="s-txt tower">推塔数 :'+ data[x].teams[arr[0]].tower_pushdown +'</div>' +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                                '<div class="detail" id="detail1">' +
                                '<table>' +
                                '<thead>' +
                                '<tr class="detail-thead-tr">' +
                                '<th class="detail-player">参赛选手</th>' +
                                '<th class="detail-hero">英雄</th>' +
                                '<th class="detail-record">击杀/死亡/助攻</th>' +
                                '<th class="detail-money">金钱</th>' +
                                '<th class="detail-budao">补刀</th>' +
                                '</tr></thead>' +
                                '<tbody class="tbody'+ x +'">' +//第一个队伍成员信息
                                '</tbody>' +
                                '</table>'+
                                '</div>' +
                                '<div class="all-bottom"><div class="all-bottom-team">' +
                                '<img class="images" src="'+ data[x].teams[arr[1]].team.logo +'" alt="">' +
                                '<p class="team-name">'+ data[x].teams[arr[1]].team.name +'</p>' +
                                '</div>' +
                                '<div class="all-bottom-info">' +
                                '<div class="killnum">击杀总数:'+ data[x].teams[arr[1]].hero_kill +'</div>' +
                                '<div class="money">金币数:'+ data[x].teams[arr[1]].money +'</div>' +
                                '<div class="mosternum">' +
                                '<div class="s-txt b-dragon">大龙数 :'+ data[x].teams[arr[1]].big_dragon_kill +'</div>' +
                                '<div class="s-txt s-dragon">小龙数 :'+ data[x].teams[arr[1]].small_dragon_kill +'</div>' +
                                '<div class="s-txt tower">推塔数 :'+ data[x].teams[arr[1]].tower_pushdown +'</div>' +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                                '<div class="detail" id="detail2">' +
                                '<table>' +
                                '<thead>' +
                                '<tr class="detail-thead-tr">' +
                                '<th class="detail-player">参赛选手</th>' +
                                '<th class="detail-hero">英雄</th>' +
                                '<th class="detail-record">击杀/死亡/助攻</th>' +
                                '<th class="detail-money">金钱</th>' +
                                '<th class="detail-budao">补刀</th>' +
                                '</tr></thead>' +
                                '<tbody  class="tbody'+ x +'">' +//第二个队伍成员信息
                                '</tbody></table>'+
                                '</div>' +
                                '</div>')
                            //console.log(data[x].members[arr[1]]);
                            if(data[x].members[arr[0]]){
                                var items=data[x].members[arr[0]];
                                var str="";
                                items.forEach(function(item){
                                    str+=memlist(item);
                                })
                                $(".tbody"+x).eq(0).html(str);
                                if(data[x].members[arr[1]]){
                                    var items=data[x].members[arr[1]];
                                    var str="";
                                    items.forEach(function(item){
                                        str+=memlist(item);
                                    })
                                    $(".tbody"+x).eq(1).html(str);
                                }else{
                                    $(".tbody"+x).eq(1).html("");
                                }
                            }else{
                                $(".tbody"+x).eq(0).html("");
                                if(data[x].members[arr[1]]){
                                    var items=data[x].members[arr[1]];
                                    var str="";
                                    items.forEach(function(item){
                                        str+=memlist(item);
                                    })
                                    $(".tbody"+x).eq(1).html(str);
                                }else{
                                    $(".tbody"+x).eq(1).html("");
                                }
                            }
                        }
                    })

                    $("#footer").css({"display":"none"});
                    $("#guessheader").css("display","none");
                    $(".tecinfo").css("display","block").siblings(".info").css("display","none");
                    $("#arcard_answer,#single_answer").css({"display":"none"});
                }
                else if($(this).hasClass("guesstab"))
                {
                    $(".guessinfo").css("display","block").siblings(".info").css("display","none")
                    $("#footer").css({"display":"none"});


                    var id  = window.location.href.split("?")[1].split("=")[1];
                    var data={
                        "method":"netbar.match.issue.all",
                        "page":"1",
                        "pagesize":"10",
                        "matchid":id
                    }
                    var str="";
                    $.post(listUrl+'third/match/issueall',data,function(json){
                        console.log(json)
                        if(!json.errno==0 || json.data==null ){
                            //console.log(json.errmsg)
                            $("#barlist").html('<div class="nodata">暂无网吧开启竞猜</div>')
                        }else
                        {
                            //json=JSON.parse(json);
                            //console.log(json.data)
                            var bars=json.data.bars;
                            //console.log(bars)
                            bars.forEach(function(item){
                                //console.log(item)
                                var picurl=item.netbar.logo;
                                if(picurl==null){
                                    picurl="images/pic2.jpg"
                                }
                                str += barlist(item,picurl);
                            })
                            $("#barlist").html(str);
                            $(".gobar-btn").on("click",function(){
                                //console.log($(this).attr('data-barid'));
                                //console.log(id);
                                window.location.href = "barDetail.html?id="+$(this).attr('data-barid')+"&matchid="+id;
                            })
                        }
                    })
                }else if($(this).hasClass("matchtab")){

                    $("#footer").css({"display":"block"});
                    $("#arcard_answer,#single_answer").css({"display":"none"});
                    $(".matchinfo").css("display","block").siblings(".info").css("display","none")
                    $("#guessheader").css("display","none");

                }
            }
        })
    },

}

new Matchfind();