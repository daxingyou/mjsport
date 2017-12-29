function Profile(){
	this.render();
}
Profile.prototype = {
	render:function(){
		var url = window.location.href;
		var id  = url.split("?")[1].split("=")[1];
		$.getJSON(listUrl+'member/bet/detail?order_id='+id, function(json, textStatus) {
			var data  = json.data;
			console.log(data)
			var title = data.betid == '303' ? '过关竞猜' : '单关竞猜';
			$("#order-title").html(title);
			$("#pay-fee").html(data.pay_fee+'魔豆');
			data.bonus = data.bonus ? data.bonus : 0;
			data.bonus_at = data.bonus_at ? data.bonus_at : "暂无";
			$("#bonus_at").html(data.bonus_at); 
			$("#order-statu").html();
			$("#order-num").html("福袋*"+data.bonus);
			$("#multi").html(data.multi+'注');
			$("#game_name").html(data.match);
			    if(data.bonuscls == 0){
					$("#result-box").html('<span class="order-result" id="losing-btn" order_id="'+json.data.issueid+'">未中奖</span>');
					$("#losing-btn").on("click",function(){
						var order_id = $(this).attr("order_id");
						$.getJSON(listUrl+'member/bet/openbonus?issueid='+order_id,function(json, textStatus) {
							window.location.href='lottery.html?issueid='+order_id;
						});
					});
				}
				else if(data.bonuscls == null){
					$("#result-box").html('<span class="order-result">未开奖</span>');
				}
			    else {
			 		$("#result-box").html('<div id="open-btn" class="open-btn" order_id="'+json.data.issueid+'">打开福袋</div>');
					$("#open-btn").on("click",function(){
						var order_id = $(this).attr("order_id");
						$.getJSON(listUrl+'member/bet/openbonus?issueid='+order_id,function(json, textStatus) {
								window.location.href='lottery.html?issueid='+order_id;
						});
					});	
				}
			//竞猜信息
			var quesList = data.questions;
			var str = '';
			quesList.forEach(function( item ){
				item.result = item.result ? item.result : '暂无';
				str +=  '<li>'
						 + '<div class="note">'+item.aid+'</div>'
						 + '<div class="guess-content" style="overflow: hidden">'+item.question+'</div>'
						 + '<div class="bet-content">'+item.select+'</div>'
						 + '<div class="bet-result">'+ item.result+'</div>'
					   +'</li>'

			});
			$("#quesitem").after(str);

		});
	},
}
new Profile();

