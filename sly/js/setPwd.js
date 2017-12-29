function setPwd(){
	this.render();
}
setPwd.prototype = {
	render:function(){
		$.getJSON(listUrl+'member/info', function(json, textStatus) {
			var secretMobile = json.memberInfo.secretMobile;
			var str = '';
			if(secretMobile.length != 0){
					$("#mobileTips").html(secretMobile);
			}
		});
		$("#getCode").off("click").on("click",function(){
			var _this = this;
			time(_this);
			$.getJSON(listUrl+'member/sms/getcode?act=updatepaypwd',function(json, textStatus) {
				if(json.errCode != 0){
					alert(json.errMsg);
					return false;	
				}
			});
		});
		$("#validatePhone").off("click").on("click",function(){
						var paypwd = $("#pwdNumber").val();
						var code = $("#code").val();
						if( paypwd.length == 0 ){
							alert("新密码不能为空！");
							return false;
						}
						else if( code.length == 0 ){
							alert("验证码不能为空！");
							return false;
						}
						$.getJSON(listUrl+'member/update/paypwd',{paypwd:paypwd,code:code}, function(json, textStatus) {
								if(json.errCode == 0){
									alert(json.errMsg);
									window.location.href = 'safe.html';
								}
								else {
									alert(json.errMsg);
								}
						});
		});
	}
}
new setPwd();

