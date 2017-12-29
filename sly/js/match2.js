
function Match(){
    this.goback();
    this.renderMatch();
    this.tabClick();
    this.guessTabClick();
}
Match.prototype={
    goback:function(){
       $(".back").on("click",function(){
           window.history.go(-1);
       })
   },
   renderMatch:function(){
        //比赛详情信息
        var url = window.location.href;
        var id  = url.split("?")[1].split("=")[1];
        var data={
            id:id
        }
        $.post(listUrl+'third/match/detail',data,function(json){
            console.log(json);
            console.log(json);
            if(!json.errno =="0"){
                alert(json.errmsg)
                window.history.go(-1);
            }else{
                var data = json.data;
                $("#match_name").html(data.name);
                $("#time").html(data.start_at.split(" ")[1]);
                $("#lname,#p1Name").html(data.teaminfo.blue.name);
                $("#rname,#p2Name").html(data.teaminfo.red.name);
                $("#startTime").html(data.start_at);
                $("#address").html(data.addr);
                //  $("#bonus").html(data.bonus);
                $("#rule1").html(data.rule.ruletype);
                $("#rule2").html(data.rule.memtype);
                $("#")
            }

        })
    },
    tabClick:function(){
        $(".tab").off("click").on("click",function(){
            if(!$(this).hasClass("info_active"))
            {
                $(this).siblings(".tab").removeClass("info_active");
                $(this).addClass("info_active");
                if($(this).hasClass("statab")){
                     $("#footer").css({"display":"none"});
                    $("#guessheader").css("display","none");
                    $(".tecinfo").css("display","block").siblings(".info").css("display","none");
                    $("#arcard_answer,#single_answer").css({"display":"none"});
                }
                else if($(this).hasClass("guesstab"))
                {
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
                    $("#single_answer").css({"display":"block"});
                    var url = window.location.href;
                    var id  = url.split("?")[1].split("=")[1];
                    $(".guessinfo").css("display","block").siblings(".info").css("display","none")
                //默认单关竞猜
                var data2={
                    method:"bet.match.bet",
                    matchid:id,
                    betid:301
                }
                $.getJSON(listUrl+'member/match/bet',data2,function(json){
                    console.log(json)
                 if(json.errCode == 10025){
                    alert(json.errMsg);
                    if( isWeiXin() ){
                        window.location.href = 'profile.html';
                    }
                    else {
                        window.location.href = 'gologin.html';
                    }
                    return false;
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
            var data=json.data.questions;
            var str='';
            var totalNum3 = 0;
            data.forEach(function(item,index){
                totalNum3+=item.total_modou;
                if(index >=6)
                    return false;
                else {
                   str += question(item);
               }

           })
            $("#total_num3").html(totalNum3);
            $("#items").html(str);
            $(".no3").forEach(function(item){
                if($(item).html()==  "undefined"|| $(item).html()== 0){
                    //$(item).parent().remove();
                    $(item).parent().css("visibility","hidden");
                }
            });
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
                    window.location.href="myguess.html";

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
     $("#footer").css({"display":"block"});
    $("#arcard_answer,#single_answer").css({"display":"none"});
    $(".matchinfo").css("display","block").siblings(".info").css("display","none")
    $("#guessheader").css("display","none");
}
}
})
},
guessTabClick:function(){
   var url = window.location.href;
   var id  = url.split("?")[1].split("=")[1];
   $(".mode").off("click").on("click",function(){
    if(!$(this).hasClass("mode_active")){
        $(this).addClass("mode_active").siblings(".mode").removeClass("mode_active");
    }
            //单关竞猜
            if($(this).hasClass("single")){
                $("#arcard_answer").css({"display":"none"});
                $("#single_answer").css({"display":"block"});

                $(".singleinfo").show();
                $(".arcardinfo").hide();
                

                //默认单关竞猜
                var data2={
                    method:"bet.match.bet",
                    matchid:id,
                    betid:301
                }
                $.getJSON(listUrl+'member/match/bet',data2,function(json){
                 if(json.errCode){
                    alert(json.errMsg);
                    if( isWeiXin() ){
                        window.location.href = 'profile.html';
                    }
                    else {
                        window.location.href = 'gologin.html';
                    }
                    return false;
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
            var data=json.data.questions;
            var str='';
            data.forEach(function(item,index){
                if(index >=6)
                    return false;
                else {
                    str += question(item);
                }
            })
            $("#items").html(str);
           /* $(".no3").forEach(function(item){
                if($(item).html()==  "undefined"|| $(item).html()== 0){
                    $(item).parent().css("visibility","hidden");
                }
            });*/
            $(".look_btn").off("click").on("click",function(){
                $(this).children(".look_icon").toggleClass("look_icon_active");
                $(this).prev(".q_details").toggleClass("q_details_show");
            });

            //选择答案
            $(".option").off("click").on("click",function(){
                var arr=[];
                var num = 0;
                $(this).toggleClass("option_active");
                var item_index=$(this).closest(".item").index();
                myanswer=$(this).parent().find(".option_active");
                for(var i=0;i<myanswer.length;i++){
                    var one=$(this).parent().find(".option_active").eq(i).children(".option_name").html();
                    arr.push(one);
                }
                if(arr.length>1){
                    $("#single_options .answer_option").eq(item_index).html(arr.join(","));
                }else{
                    $(" #single_options .answer_option").eq(item_index).html(arr)
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



        });

            }
            //多关竞猜
            else {
                $(".singleinfo").hide();
                $(".arcardinfo").show();
                $("#arcard_answer").css({"display":"block"});
                $("#single_answer").css({"display":"none"});
                var data2={
                    method:"bet.match.bet",
                    matchid:id,
                    betid:303
                }
                $.getJSON(listUrl+'member/match/bet',data2,function(json){
                 if(json.errCode){
                    alert(json.errMsg);
                    if( isWeiXin() ){
                        window.location.href = 'profile.html';
                    }
                    else {
                        window.location.href = 'gologin.html';
                    }
                    return false;
                }
                var issue = json.data.issue;
            //监听倍数
            $("#multiple2").off("input").on("input",function(){
                var b = ($(this).val() == 0 || $(this).val() == ' ') ? 1 : $(this).val();
                if( b > 99){
                    alert("投注倍数不能大于99！");
                    return false;
                }
                var num = b * $("#total_num_span2").html()*10;
                $("#total_num2").html(num);
            });

            //渲染题目列表
            var data=json.data.questions;
            var str='';
            data.forEach(function(item,index){
             if(index >=6)
                return false;
            else {
               str += question3(item);
           }
       })
            $("#items2").html(str);

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
            var num = b * $("#total_num_span2").html()*10;
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
                    window.location.href="myguess.html";
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