function Profile(){
	this.render();
}
Profile.prototype = {
	render:function(){
			var data = {
				page:1,
				pagesize:10
			}
			var str = '';
			var star = '';
			$.post(listUrl+'third/netbar/list',data,function(json, textStatus) {
				var barList = json.data.bars;
				barList.forEach(function(item){
					star = converStar(item.star);
					str+=barTpl(item,star);
				});
				$("#corps_list").html(str);
				$(".corp_info").on("click",function(){
					var id = $(this).attr("data-id");
					window.location.href = "barDetail.html?id="+id;
				});
			});
	},
}
new Profile();

