function NetvarAct(){
    this.render();
    this.myScroll = null;
}

NetvarAct.prototype={
    render:function(){
        var nerbarid=window.location.href.split("=")[1];
        var data={
            netbarid:nerbarid
        }
        $.getJSON(listUrl+"channel/netbarinfo?id="+nerbarid,function(json){
            console.log(json)
            $("#netbarName").html(json.netbarInfo.name)
        })
        $.getJSON(listUrl+'sports/netbar/match/list',data,function(json){
            console.log(json);
            if(json.errCode==0){
                var data=json.matchList,str="";
                data.forEach(function(item){
                    str+=netbarActivity(item);
                })
                $("#netbaractivitylist").append(str);
                this.myScroll = new IScroll('#wrapper');
                $(".activityitem").on("tap",function(){
                    var actId=$(this).attr("data-id");
                    window.location.href = "actSign.html?id="+actId;
                })
                $(".activityitem_league").on("tap",function(){
                    window.location.href = "leagueIndex.html";
                })

            }else if(json.errCode==10025){
                var url=window.location.href;
                setCookie("return",url);
                window.location.href="activegologin.html";
            }
        })
    }
}

new NetvarAct();