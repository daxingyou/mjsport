
function Match(){
    this.goback();
    this.renderMatch();
    this.tabClick();
    this.guessTabClick();
}
Match.prototype={
    goback:function(){
       $(".back").on("click",function(){
           window.location.href="guess.html";
       })
   },
    renderMatch:function(){
        //比赛详情信息
        var url = window.location.href;
        if(url.indexOf("&")>0){
            var id  = url.split("?")[1].split("&")[0].split("=")[1];
            var data={
                id:id,
                isonline:false
            }
        }else{
            var id  = url.split("?")[1].split("=")[1];
            var data={
                id:id,
                isonline:false
            }
        }
        $.post(listUrl+'third/match/detail',data,function(json){
            var data = json.data;
            //console.log(data);
            $("#match_name").html(data.name);
            $("#time").html(data.start_at.split(" ")[1]);
            $("#lname,#p1Name").html(data.teaminfo.blue.name);
            $("#rname,#p2Name").html(data.teaminfo.red.name);
            $("#startTime").html(data.start_at);
            $("#address").html(data.addr);
            $("#gamename").html(data.game)
            $("#rule1").html(data.rule.ruletype);
            $("#rule2").html(data.rule.memtype);
            $("#rule3").html(data.rule.map);
            if(data.teaminfo.blue.logo){
                $(".team1img").attr("src",data.teaminfo.blue.logo);
            }
            if(data.teaminfo.red.logo){
                $(".team2img").attr("src",data.teaminfo.red.logo);
            }
        })
    },
    tabClick:function(){
        $(".tab").off("click").on("click",function(){
            if(!$(this).hasClass("info_active")) {
                $(this).siblings(".tab").removeClass("info_active");
                $(this).addClass("info_active");
                //技术统计
                if($(this).hasClass("statab")){
                    var url=window.location.href;
                    if(url.indexOf("&")>0){
                        var id  = url.split("?")[1].split("&")[0].split("=")[1];
                        var data={
                            id:id,
                            isonline:true
                        }
                    }else{
                        var id  = url.split("?")[1].split("=")[1];
                        var data={
                            id:id,
                            isonline:false
                        }
                    }
                    var data={
                        "method":"bet.match.statistics",
                        "matchid":id,
                        "isonline":false
                    }
                    $.post(listUrl+'third/match/statistics',data,function(json){
                        if(!json.data){
                            $("#allmatch").html('<div class="nodata">暂无技术统计</div>');
                            return;
                        }
                        var data=json.data.rounds;
                        for(var x=0;x<data.length;x++ ){

                            var  arr=[];
                            for( key in data[x].teams){
                                arr.push(key);
                            }
                            $("#allmatch").append('<div class="one-match" id="onematch'+ x +'">' +
                                '<div class="all-header">' +
                                '<div class="match-session">第' + DX(x) + '场</div>' +
                                '<div class="session-score"><div>' +
                                '<img class="small-img" src="http://static.jesport.com/sly/images/item1.png" alt="">' +
                                '</div><div class="session-score-txt">'+ data[x].teams[arr[0]]["hero_kill"] +'：'+ data[x].teams[arr[1]]["hero_kill"] +'</div><div>' +
                                '<img class="small-img" src="http://static.jesport.com/sly/images/item2.png" alt="">' +
                                '</div></div><div class="match-time">比赛用时：'+ duration(data[x].duration) +'</div></div>' +
                                '<div class="all-bottom"><div class="all-bottom-team">' +
                                '<img class="images" src="'+ data[x].teams[arr[0]].team.logo +'" alt="">' +
                                '<p class="team-name">'+ data[x].teams[arr[0]].team.name +'</p>' +
                                '</div>' +
                                '<div class="all-bottom-info">' +
                                '<div class="killnum">击杀总数：'+ data[x].teams[arr[0]].hero_kill +'</div>' +
                                '<div class="money">金币数：'+ data[x].teams[arr[0]].money +'</div>' +
                                '<div class="mosternum">' +
                                '<div class="s-txt b-dragon">大龙数 ：'+ data[x].teams[arr[0]].big_dragon_kill +'</div>' +
                                '<div class="s-txt s-dragon">小龙数 ：'+ data[x].teams[arr[0]].small_dragon_kill +'</div>' +
                                '<div class="s-txt tower">推塔数 ：'+ data[x].teams[arr[0]].tower_pushdown +'</div>' +
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
                            if(data[x].members[arr[0]]){
                                var items=data[x].members[arr[0]];
                                var str="";
                                items.forEach(function(item){
                                    str+=memlist(item);
                                })
                                $(".tbody"+x).eq(0).html(str);
                                if(data[x].members[arr[1]]){
                                    var items=data[x].members[arr[1]];
                                    //console.log(items);
                                    var str="";
                                    items.forEach(function(item){
                                        str+=memlist(item);
                                    })
                                    $(".tbody"+x).eq(1).html(str);
                                }else{
                                    $(".tbody"+x).eq(1).html("");
                                }
                            }else{
                                $(".tbody"+x).eq(0).html("");}
                                if(data[x].members[arr[1]]){
                                    var items=data[x].members[arr[1]];
                                    //console.log(items);
                                    var str="";
                                    items.forEach(function(item){
                                        str+=memlist(item);
                                    })
                                    $(".tbody"+x).eq(1).html(str);
                                }else{
                                    $(".tbody"+x).eq(1).html("");
                                }
                        }

                    })

                    $("#footer").css({"display":"none"});
                    $("#guessheader").css("display","none");
                    $(".tecinfo").css("display","block").siblings(".info").css("display","none");
                    $("#arcard_answer,#single_answer,#result-box").css({"display":"none"});
                }
                //有奖竞猜
                else if($(this).hasClass("guesstab")) {
                    $("#footer").css({"display":"none"});
                    var stopPropagation =  function(e){
                        if (e.stopPropagation) 
                            e.stopPropagation(); 
                        else 
                            e.cancelBubble = true; 
                    }
                    $(document).on('tap',function(){ 
                        $(".guess-mask").css({"display":"none"});
                        $(".guess-rule-modal").css({"display":"none"});
                    }); 
                    $('.rule-btn').on('tap',function(e){ 
                        stopPropagation(e); 
                        $(".guess-mask").css({"display":"block"});
                        $(".guess-rule-modal").css({"display":"block"});
                        
                    }); 
                    $("#guessheader").css("display","block");
                    $("#result-box").css({"display":"none"});
                    var url = window.location.href;
                    if(url.indexOf("&")>0){
                        var id=url.split("?")[1].split("&")[0].split("=")[1];
                    }else{
                        var id  = url.split("?")[1].split("=")[1];
                    }
                    var issueid="";
                    $(".guessinfo").css("display","block").siblings(".info").css("display","none")
                    var data3={
                        method:"bet.match.bet",
                        matchid:id,
                        betid:303
                    }
                    //检查状态
                    $.getJSON(listUrl+'member/match/bet',data3,function(json){
                        if(json.errno==0){
                            var issue=json.data.issue;
                            if(json.data.close){
                                var num=0;
                                json.data.questions.forEach(function(item){
                                    num+=item.total_modou;
                                })
                                $("#arcard-modou").html(num);
                                $("#arcard-mulit").html(num/10);
                                $("#result-box").css({"display":"flex"});
                            }else{
                                $("#arcard_answer").css({"display":"block"});
                            }
                            if(json.data.complete){
                                if(json.data.bonus_open){
                                    $("#over").show();
                                }else{
                                    if(json.data.bonus==0){
                                        $("#losing").show();
                                    }else{
                                        $("#hadopen").show();
                                    }
                                }
                            }else{

                                $("#wait").show();
                            }
                            //$("#golottery").on("click",function(){
                            //    window.location.href = 'lottery.html?issueid='+issue;
                            //    console.log(window.location.href);
                            //})
                            $(".result-btn").on("click",function(){
                                if($("#wait").css("display")=="none"){
                                    window.location.href = 'lottery.html?issueid='+issue;
                                }
                            })
                        }

                    });
                    //默认过关竞猜
                    $("#single_answer").css({"display":"none"});
                    $(".singleinfo").hide();
                    $(".arcardinfo").show();
                    var data3={
                        method:"bet.match.bet",
                        matchid:id,
                        betid:303
                    }
                    $.getJSON(listUrl+'member/match/bet',data3,function(json){
                        if(json.errCode == 10025){
                            alert(json.errMsg);
                            window.location.href = 'gologin.html?matchId='+id+"&type=netbar";
                            return false;
                        }
                        if(json.data.issue.id){
                            var issue = json.data.issue.id;
                        }else{
                            var issue = json.data.issue;
                        }
                        //监听倍数
                        var num = $("#multiple2").val()* $("#total_num_span2").html() * 100;
                        $("#total_num2").html(num);
                        $("#total_num3").html(json.data.total_modou);
                        $("#all_mdnum").html(num+json.data.total_modou)
                        //渲染题目列表
                        if(json.data.questions){
                            var data=json.data.questions;
                            var str='';
                            data.forEach(function(item,index){
                                if(index >=6)
                                    return false;
                                else {
                                    str += question3(item);
                                }
                            });
                            $("#items2").html(str);
                        }

                        $(".look_btn").off("click").on("click",function(){
                            $(this).children(".look_icon").toggleClass("look_icon_active");
                            $(this).prev(".q_details").toggleClass("q_details_show");
                        });

                        //选择答案
                        $(".option").off("click").on("click",function(){
                            var arr=[];
                            var num = 1;
                            $(this).toggleClass("option_active");
                            var item_index=$(this).closest(".item").index(),
                                myanswer=$(this).parent().find(".option_active");
                            for(var i=0;i<myanswer.length;i++){
                                var one=$(this).parent().find(".option_active").eq(i).children(".option_name").html();
                                arr.push(one);
                            }
                            //console.log(arr);
                            if(arr.length>1){
                                $("#double_options .answer_option").eq(item_index).html(arr.join(","));
                            }else{
                                $("#double_options .answer_option").eq(item_index).html(arr)
                            }
                            var arr = $('#double_options .answer_option');
                            for( var i=0; i<arr.length; i++){
                                var str = $(arr[i]).html().match(/[A-Z]/g);
                                if(str){
                                    num*=str.length;
                                }
                            }
                            $("#total_num_span2").html(num);
                            var b = ($("#multiple2").val() == 0 || $("#multiple2").val() == ' ') ? 1 : $("#multiple2").val();
                            var num = b * $("#total_num_span2").html()*100;
                            $("#total_num2").html(num);
                            $("#all_mdnum").html(num+json.data.total_modou)
                        });

                        //清空所有
                        $(".answer_clear").off("click").on("click",function(){
                            $(".option").removeClass("option_active");
                            $(".answer_option").html("");
                            $("#total_num_span2").html(0);
                            $("#total_num2").html(0);
                            $("#all_mdnum").html(json.data.total_modou)
                            $("#multiple2").val('');
                        });
                        //提交
                        $("#submit2").off("click").on("click",function(){
                            if( $("#multiple2").val() > 99){
                                alert("投注倍数不能大于99！");
                                return false;
                            }
                            var arr  = $('#double_options .answer_option');
                            var str = '';
                            for( var i=0; i<arr.length; i++){
                                if( $(arr[i]).html() ){
                                    var arr2 = $(arr[i]).html().match(/[A-Z]/g);
                                    var s = '';
                                    arr2.forEach(function(item,index){
                                        if(index == arr2.length-1){
                                            s+=converGuess(item);
                                        }
                                        else {
                                            s+=converGuess(item)+',';
                                        }

                                    });
                                    str +='0'+(i+1)+'=['+s+']|';
                                }

                            }
                            if(!str.length){
                                alert("所选注数不能为空！");
                                return false;
                            }
                            var data={
                                issue : issue,
                                betid : '303',
                                betbody : str.substring(0,str.length-1),
                                multi   : ($("#multiple2").val() == 0 || $("#multiple2").val() == ' ') ? 1 : $("#multiple2").val()
                            };
                            $.post(listUrl+'member/bet',data,function(json){
                                if(json.errCode == 0){
                                    alert("投注成功");
                                    window.location.href="index.html";
                                }else
                                if(json.errCode==10005){
                                    alert(json.errMsg);
                                    window.location.href="exchangeMd.html?return=matchinfo&matchid="+id;
                                }

                                else {
                                    alert(json.errMsg);
                                    if(json.payUrl)
                                    {
                                        window.location.href = json.payUrl;
                                    }
                                }

                            });

                        })

                    });
            }else if($(this).hasClass("matchtab")){
                    //比赛详情
                    $("#footer").css({"display":"block"});
                    $("#arcard_answer,#single_answer,#result-box").css({"display":"none"});
                    $(".matchinfo").css("display","block").siblings(".info").css("display","none")
                    $("#guessheader").css("display","none");
}
            }
        })
    },
    guessTabClick:function(){
   var url = window.location.href;
        if(url.indexOf("&")>0){
            var id  = url.split("?")[1].split("&")[0].split("=")[1];
            var data={
                id:id,
                isonline:true
            }
        }else{
            var id  = url.split("?")[1].split("=")[1];
            var data={
                id:id,
                isonline:false
            }
        }
   $(".mode").off("click").on("click",function(){
    if(!$(this).hasClass("mode_active")){
        $(this).addClass("mode_active").siblings(".mode").removeClass("mode_active");
    }
            //单关竞猜
            if($(this).hasClass("single")){
                $("#single_answer").css({"display":"block"});
                $("#myanswer").css({"display":"block"});
                $(".singleinfo").show();
                $(".arcardinfo").hide();

                //单关竞猜
                var data2={
                    method:"bet.match.bet",
                    matchid:id,
                    betid:301
                }
                //显示单关竞猜
                $.getJSON(listUrl+'member/match/bet',data2,function(json){
                    if(json.errCode == 10025){
                        alert(json.errMsg);
                        window.location.href = 'gologin.html?matchId='+id;
                        return false;
                    }
                    if(json.errno==0){
                        if(json.data.close){
                            $("#single_answer").css({"display":"none"});
                            $("#myanswer").css({"display":"none"});
                            $("#result-box").css({"display":"flex"});
                            var num=0;
                            if(json.data.questions){
                                json.data.questions.forEach(function(item){
                                    num+=item.total_modou;
                                })
                                $("#single-modou").html(num);
                                $("#single-mulit").html(num/10);
                            }else{
                                $("#items").html('<div class="nodata">暂无单关竞猜</div>')
                                return false;
                            }
                        }
                        if(json.data.complete){
                            if(json.data.bonus_open){
                                if(json.data.bonus==0){
                                    $("#losing").show();
                                }else{
                                    $("#hadopen").show();
                                }
                            }else{
                                $("#over").show();
                            }
                        }else{
                            $("#wait").show();
                        }
                        var issue = json.data.issue;
                        //监听倍数
                        $("#multiple").off("input").on("input",function(){
                            var b = ($(this).val() == 0 || $(this).val() == ' ') ? 1 : $(this).val();
                            if( b > 99){
                                alert("投注倍数不能大于99！");
                                return false;
                            }
                            var num = b * $("#total_num_span").html()*10;
                            $("#total_num").html(num);
                        });
                        //渲染问题
                        if(json.data.questions){
                            var data=json.data.questions;
                            var str='';
                            //var totalNum3 = 0;
                            data.forEach(function(item,index){
                                //totalNum3+=item.total_modou;
                                if(index >=6)
                                    return false;
                                else {
                                    str += question(item);
                                }

                            })
                            $("#items").html(str);
                            $("#total_num3").html(json.data.total_modou);
                        };
                        //查看详情
                        $("#items .look_btn").on("click",function(){
                            $(this).children(".look_icon").toggleClass("look_icon_active");
                            $(this).prev().toggleClass("q_details_show");
                        });
                        //选择答案
                        $(".option").off("click").on("click",function(){
                            var arr=[];
                            var num = 0;
                            $(this).toggleClass("option_active");
                            var item_index=$(this).closest(".item").index();
                            console.log(item_index);
                            myanswer=$(this).parent().find(".option_active");
                            for(var i=0;i<myanswer.length;i++){
                                var one=$(this).parent().find(".option_active").eq(i).children(".option_name").html();
                                arr.push(one);
                            }

                            if(arr.length>1){
                                $("#single_answer .answer_option").eq(item_index).html(arr.join(","));
                            }
                            else{
                                $("#single_answer .answer_option").eq(item_index).html(arr)
                            }
                            var arr = $('#single_options .answer_option');
                            for( var i=0; i<arr.length; i++){
                                var str = $(arr[i]).html().match(/[A-Z]/g);
                                if(str){
                                    num+=str.length;
                                }
                            }
                            $("#total_num_span").html(num);
                            var b = ($("#multiple").val() == 0 || $("#multiple").val() == ' ') ? 1 : $("#multiple").val();
                            console.log(b);
                            var num = b * $("#total_num_span").html()*10;
                            $("#total_num").html(num);
                        });
                        //清空所有
                        $(".answer_clear").off("click").on("click",function(){
                            $(".option").removeClass("option_active");
                            $(".answer_option").html("");
                            $("#total_num_span").html(0);
                            $("#total_num").html(0);
                            $("#multiple").val('');
                        });
                        //提交
                        $(".bottom_sub").off("click").on("click",function(){
                            if( $("#multiple").val() > 99){
                                alert("投注倍数不能大于99！");
                                return false;
                            }
                            var arr  = $('#single_options .answer_option');
                            var str = '';
                            for( var i=0; i<arr.length; i++){
                                if( $(arr[i]).html() ){
                                    var arr2 = $(arr[i]).html().match(/[A-Z]/g);
                                    var s = '';
                                    arr2.forEach(function(item,index){
                                        if(index == arr2.length-1){
                                            s+=converGuess(item);
                                        }
                                        else {
                                            s+=converGuess(item)+',';
                                        }

                                    });
                                    str +='0'+(i+1)+'=['+s+']|';
                                }

                            }
                            if(!str.length){
                                alert("所选注数不能为空！");
                                return false;
                            }
                            var data={
                                issue : issue,
                                betid : '301',
                                betbody : str.substring(0,str.length-1),
                                multi   : ($("#multiple").val() == 0 || $("#multiple").val() == ' ') ? 1 : $("#multiple").val()
                            };

                            $.post(listUrl+'member/bet',data,function(json){
                                if(json.errCode == 0){
                                    alert("投注成功");
                                    window.location.href="index.html";

                                }else
                                if(json.errCode==10005){
                                    alert(json.errMsg);
                                    window.location.href="exchangeMd.html?return=matchinfo&matchid="+id;
                                }
                                else {
                                    console.log(id)
                                    alert(json.errMsg);
                                    if(json.payUrl)
                                    {
                                        window.location.href = json.payUrl;
                                    }
                                }
                            });

                        })
                    }
                });
            }
            //多关竞猜
            else {
                if(!$("#result-box").show()){
                    $("#arcard_answer").css({"display":"block"});
                    $("#single_answer").css({"display":"none"});
                }
                $(".singleinfo").hide();
                $(".arcardinfo").show();
                var data3={
                    method:"bet.match.bet",
                    matchid:id,
                    betid:303
                }
                $.getJSON(listUrl+'member/match/bet',data3,function(json){
                    if(json.errCode == 10025){
                        alert(json.errMsg);
                        window.location.href = 'gologin.html?matchId='+id;
                        return false;
                    }
                    if(json.data.issue.id){
                        var issue = json.data.issue.id;
                    }else{
                        var issue = json.data.issue;
                    }
            //监听倍数
            var num = $("#multiple2").val()* $("#total_num_span2").html() * 100;
            $("#total_num2").html(num);
            $("#total_num3").html(json.data.total_modou);
            //渲染题目列表
            if(json.data.questions){
                var data=json.data.questions;
                var str='';
                data.forEach(function(item,index){
                    if(index >=6)
                        return false;
                    else {
                        str += question3(item);
                    }
                });
                $("#items2").html(str);
            }

            $(".look_btn").off("click").on("click",function(){
                $(this).children(".look_icon").toggleClass("look_icon_active");
                $(this).prev(".q_details").toggleClass("q_details_show");
            });

            //选择答案
            $(".option").off("click").on("click",function(){
                var arr=[];
                var num = 1;
                $(this).toggleClass("option_active");
                var item_index=$(this).closest(".item").index(),
                myanswer=$(this).parent().find(".option_active");
                for(var i=0;i<myanswer.length;i++){
                    var one=$(this).parent().find(".option_active").eq(i).children(".option_name").html();
                    arr.push(one);
                }
                console.log(arr);
                if(arr.length>1){
                    $("#double_options .answer_option").eq(item_index).html(arr.join(","));
                }else{
                    $("#double_options .answer_option").eq(item_index).html(arr)
                }
                var arr = $('#double_options .answer_option');
                for( var i=0; i<arr.length; i++){
                 var str = $(arr[i]).html().match(/[A-Z]/g);
                 if(str){
                    num*=str.length;
                }
            }
            $("#total_num_span2").html(num);
            var b = ($("#multiple2").val() == 0 || $("#multiple2").val() == ' ') ? 1 : $("#multiple2").val();
            var num = b * $("#total_num_span2").html()*100;
            $("#total_num2").html(num);
        });

            //清空所有
            $(".answer_clear").off("click").on("click",function(){
                $(".option").removeClass("option_active");
                $(".answer_option").html("");
                $("#total_num_span2").html(0);
                $("#total_num2").html(0);
                $("#multiple2").val('');
            });
            //提交
            $("#submit2").off("click").on("click",function(){
                if( $("#multiple2").val() > 99){
                    alert("投注倍数不能大于99！");
                    return false;
                }
                var arr  = $('#double_options .answer_option');
                var str = '';
                for( var i=0; i<arr.length; i++){
                    if( $(arr[i]).html() ){
                        var arr2 = $(arr[i]).html().match(/[A-Z]/g);
                        var s = '';
                        arr2.forEach(function(item,index){
                         if(index == arr2.length-1){
                            s+=converGuess(item);
                        }
                        else {
                            s+=converGuess(item)+',';
                        }
                        
                    });
                        str +='0'+(i+1)+'=['+s+']|';
                    }
                    
                }
                if(!str.length){
                    alert("所选注数不能为空！");
                    return false;
                }
                var data={
                    issue : issue,
                    betid : '303',
                    betbody : str.substring(0,str.length-1),
                    multi   : ($("#multiple2").val() == 0 || $("#multiple2").val() == ' ') ? 1 : $("#multiple2").val()
                };
                $.post(listUrl+'member/bet',data,function(json){
                   if(json.errCode == 0){
                    alert("投注成功");
                    window.location.href="index.html";
                }else if(json.errCode==10005){
                       alert(json.errMsg);
                       window.location.href="exchangeMd.html?return=matchinfo&matchid="+id;
                   }
                else {
                 alert(json.errMsg);
                 if(json.payUrl)
                 {
                    window.location.href = json.payUrl;
                }                       
            }
        });
                
            })

        });
}
})
},
}

new Match();