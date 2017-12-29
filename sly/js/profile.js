function Profile(){
	this.render();
}
Profile.prototype = {
	render:function(){
		var urlArr=window.location.href.split(/[? = &]/);
		var mindex=isCon(urlArr,"m");

		$.getJSON(listUrl+'member/index', function(json) {
			if(json.errCode==10025) {
					if(isWeiXin()){
						window.location.href="autologin"
					}
					$(".meminfo").html("");
					$("#my_num").html("--");
					//$("#logout").hide();
					$("#memname").click(function(){
						window.location.href='gologin.html'
					})
					$("#avatar").click(function(){
						window.location.href='gologin.html'
					})
					$(".box-item").on("click",function(){
						$(this).attr("href","gologin.html");
						alert("请先登录！")
					})
				}else
			{
				if(json.memberInfo!=null){
					if(json.memberInfo.avatar){
						$("#avatar").attr("src",json.memberInfo.avatar)
					}
					//绑定身份证
					if(json.memberInfo.nickname){
						$("#memname").html(json.memberInfo.nickname);
					}else if (json.memberInfo.name=="魔杰会员"){
						$("#memname").html(json.memberInfo.name);
					}else{
						$("#memname").html(nameExc(json.memberInfo.name));
					}
					if(json.memberInfo.idCard){
						$("#icontopright").attr("src","http://static.jesport.com/sly/images/pofileimg/vip.png");
						$(".notice-icon").hide();
						$("#idname").html(nameExc(json.memberInfo.name));
					} else
					{
						$("#icontopright").attr("src","http://static.jesport.com/sly/images/pofileimg/vip.png");
						//console.log(json.memberInfo.name);

						$(".notice-content").show();
						$("#idname").on("click",function(){
							window.location.href="bind.html?return=profile"
						})
					}
					//绑定手机号
					if(json.memberInfo.mobile){
						$("#my_num").html(json.memberYuan);
						$("#icontopleft").attr("src","http://static.jesport.com/sly/images/pofileimg/shouji.png");
						$("#mobile").html(json.memberInfo.secretMobile);
					}else{
						if(mindex){
							if((/^1[34578]\d{9}$/.test(urlArr[mindex+1]))){
								console.log(urlArr[mindex+1]);
								$(".notice-content").html("您的微信已经绑定过手机号("+telchange(urlArr[mindex+1])+"),您可以在个人中心换绑后使用该手机号。");
								$(".notice-content").show();
								$("#idname").on("click",function(){
									window.location.href="bind.html?return=profile"
								})
							}else{
								$(".notice-content").html("您的手机号已经绑定过微信("+urlArr[mindex+1]+"),您可以使用该微信登录使用。");
								$(".notice-content").show();
								$("#idname").on("click",function(){
									window.location.href="bind.html?return=profile"
								})
							}
						}else{
							$(".notice-content").html("您还未绑定魔杰网吧会员，绑定后可使用网吧积分。");
							$(".notice-content").show();
							$("#idname").on("click",function(){
								window.location.href="bind.html?return=profile"
							})
						}

					}
				}
				else{
					$("#idname").on("click",function(){
						window.location.href="bind.html?return=profile"
					})
				}



				if($(".notice-content").css("display")=="block"){
					setTimeout(function(){$(".notice-content").hide();},5000)
				}
				$(".notice-icon").on("click",function(){
					$(".notice-content").toggle();
				})
				$("#logout").show();
				//$("#memname").html(json.memberInfo.nickname);
				$("#modou_num").html(json.memberBean.balanceBean)

			}
			$("#mdexc").on("click",function(){
				window.location.href="exchangeMd.html?return=profile"
			})
		});
	},
}
new Profile();

