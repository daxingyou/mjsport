function PayInfo(){
    this.render();
    this.click();
}
PayInfo.prototype={
    render:function(){
        $.getJSON(listUrl+"member/index",function(json){
            console.log(json);
            if(json.errCode==0){
                $("#blancenum").html(json.memberBean.balanceBean);
            }
        })
    },
    click:function(){
        $("#validatePhone").on("click",function(){
            $.getJSON(listUrl+"member/join/activity",function(json){
                if(json.errCode==0){
                    window.location.href="payresult.html"
                }else if(json.errCode==10005){
                    window.location.href="exchangeMd.html"
                }else if(json.errCode==10025){
                    window.location.href="gologin.html"
                }
            })


        })
    }
}
new PayInfo();