function Secash(){
	this.render();
}
Secash.prototype = {
	render:function(){
		$.getJSON(listUrl+'member/withdraw/account/list', function(json, textStatus) {
			var data = json.accountList;
			var str  = '';
			data.forEach(function( item ){
				str += '<div data-id="'+item.id+'" class="cash-item">'
						+' <div class="alipay-img"><a href="javascript:;"><img src="http://static.jesport.com/sly/images/pic1.jpg" alt=""> </a> </div>'
						+'<div class="alipay-info">'
						 +'<p class="alipay-name">支付宝账号<span>（'+item.accountInfo+'）</span></p>'
						 +'<p class="alipay-tips">预计一个工作日到账</p>'
						+'</div>'
						+' <span class="icon-right"></span>'
					  +'</div>';
			});
			$("#cash-list").html(str);
			$(".cash-item").on("click",function(){
				var id = $(this).attr("data-id");
				window.location.href="withDrawals.html?id="+id;
			})
		});
		$(".add-alipay").on("click",function(){
			window.location.href="addAlipay.html";
		})
	},
}
new Secash();

