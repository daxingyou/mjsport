function infoDetail(){
	this.render();
}
infoDetail.prototype = {
	render:function(){
		var url      = window.location.href;
		var id = getId(url);
		$.getJSON(listUrl+'news/detail?id='+id, function(json, textStatus) {
			var str  = '';
			var str2 = '';
			var data = json.newsInfo;
			str  = infoHeader(json.newsInfo);
			str2 = ' <div class="info-content" id="info-content">'
					 +json.newsInfo.content
					+'</div>';
			$("#info-header").html(str);
			$("#info-content").html(str2);
		});
	}
}
new infoDetail();

