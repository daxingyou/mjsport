function Buymd(){
	this.render();
}
Buymd.prototype = {
	render:function(){
		$.getJSON(listUrl+'setting/charge/list', function(json, textStatus) {
			var data = json.settingList;
			var str  = '';
			var id   = 0;
			var url  = '';
			data.forEach(function( item ){
				str  +=  '<div class="buy-item" data-mid="'+item.id+'">'
						  +'<span class="growth">'+item.beanNum+'成长值</span>'
						  +'<span class="value">'+item.money+'元</span>'
						 +'</div>';
			});
			$("#buy-panel").html(str);
			$(".buy-item").off("click").on("click",function(e){
					$(".buy-item").removeClass('active');
					$(this).addClass('active');
					id = $(this).attr("data-mid") ? $(this).attr("data-mid"):0;
					url = listUrl;
					
			});
			$("#validatePhone").on("click",function(){
						if( id == 0){
							alert("请选择成长值");
							return false;
						}
						if(isWeiXin()){
							url += 'weixin/pay?id='+id; 
						}
						else {
							url += 'alipay/pay?id='+id;
						}
						window.location.href=url;
			});
		});
	},
}
new Buymd();

