function AddAlipay(){
	this.render();
}
AddAlipay.prototype = {
	render:function(){
		$("#next-btn").off("click").on("click",function(){
			var accountInfo   = $("#name").val();
			var reaccountInfo = $("#rename").val();
			if(accountInfo.length == 0 )
			{
				alert("支付宝账号不能为空！");
				return false;
			}
			else if(reaccountInfo.length == 0 ){
				alert("确认支付宝账号不能为空！");
				return false;
			}
			else if(accountInfo != reaccountInfo){
				alert("两次输入不相同！");
				return false;
			}
			$.getJSON(listUrl+'member/withdraw/account/add?accountInfo='+accountInfo, function(json, textStatus) {
					if(json.errCode == 0){
						alert(json.errMsg);
						window.location.href = 'withDrawals.html';
					}
					else {
						alert(json.errMsg);
					}
		    });
		});
		
	},
}
new AddAlipay();

