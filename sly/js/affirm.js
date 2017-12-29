function Affirm(){
    this.render();
}
Affirm.prototype={
    render:function(){
        $("#validatePhone").on("click",function(){
            data={
                paypwd:$("#pwdNumber").val()
            }
            $.getJSON(listUrl+"member/verify/paypwd",data,function(json){
                console.log(json)
                if(json.errCode==0){
                    $.getJSON(listUrl+"member/join/activity",function(json){
                        if(json.errCode==0){
                            window.location.href="payresult.html"
                        }
                    })

                }else{
                    alert(json.errMsg)
                }
            })
        })
    }
}

new Affirm();