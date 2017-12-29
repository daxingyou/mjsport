function Profile(){
	this.render();
}
Profile.prototype = {
	render:function(){
		$.getJSON(listUrl+'member/info', function(json) {
			var str = '';
			$("#setPwd").on("click",function(){
				if(secretMobile){
					var url = $(this).attr("data-url");
					window.location.href=url;
				}
				else {
					alert("请先绑定手机号码！");
				}

			});
			if(json.memberInfo.mobile){
				var secretMobile = json.memberInfo.secretMobile;
				$("#bdtelnum").html(secretMobile);
				$("#bindtel").on("click",function(){
					//alert("暂不支持换绑");
					window.location.href="rebind.html";
				});
			}
			else {
				$("#bindtel").on("click",function(){
					window.location.href="bind.html";
				});

			}
			if(json.memberInfo.idCard){
				var idcard=json.memberInfo.idCard;
				idcard=idcard.substring(0,3)+"***********"+idcard.substring(14,19)
				$("#bdidcard").html(idcard);
			}
			else{
				$("#setidcard").on("click",function(){
					$(".mask").show();
					alertwindow("检测到您暂未绑定身份证，将无法正确获取到您网吧账户下的完整信息，将会影响到您支付方面的操作，请联系网吧前台绑定身份证后重试","","知道了")
					//$(".alertidcard").show();
					$(".close,.bind-btn").on("click",function(){
						$(".mask").hide();
						$(".alertbind").hide();
					})
				})
			}
		});
	}
}
new Profile();

