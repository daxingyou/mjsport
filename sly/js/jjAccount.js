function Index(){
	this.myScroll = null;
	this.renderInfoList();
}
Index.prototype = {
	renderInfoList: function(){
		$("#cash-btn").on("tap",function(){
			var url =$(this).attr("data-url");
			window.location.href = url;
		});
		$.getJSON(listUrl+'member/index',function(json, textStatus) {
				$("#md-num").html(json.memberFinance.balanceMoney);
		});
		$.getJSON(listUrl+'member/finance/history',function(json, textStatus) {
			var data    = json.historyList.list;
			var hasNext = json.historyList.hasNextPage;
			var nextPage= json.historyList.nextPage;
			var nowDate  = getNowDate();
			var lastDate = getLastDate();
			var convertArr = {}
			var content = '';	
			var convertArr = converDate(nowDate,lastDate,data,'createdDate');
			for(key in convertArr){
				content += ' <h2 class="whot" style="background: #f2f2f2;border: 0 none;color: #868686;">'+key+'</h2>';
				for(key2 in convertArr[key]) {
					content += jjTpl(convertArr[key][key2]);
				}
			}
			$("#guess-box").html(content);
			this.myScroll = new IScroll('#wrapper');
			myScroll.on('scrollEnd', function(){
				if( hasNext  ){
					$.getJSON(listUrl+'member/bean/history?pn='+nextPage,function(json, textStatus) {
						var data    = json.historyList.list;
						var content     = $("#guess-box").html();
						hasNext = json.newsList.hasNextPage;
						var nextPage= json.newsList.nextPage;
						var nowDate  = getNowDate();
						var lastDate = getLastDate();
						var convertArr = {}
						var convertArr = converDate(nowDate,lastDate,data,'createdDate');
						for(key in convertArr){
							content += ' <h2 class="whot" style="background: #f2f2f2;border: 0 none;color: #868686;">'+key+'</h2>';
							for(key2 in convertArr[key]) {
								content += mdTpl(convertArr[key][key2]);
							}
						}
						$("#guess-box").html(content);
						setTimeout(function () {
							myScroll.refresh();
						}, 0);
					});
				}
				else{
					if(nextPage != 0)
						$("#tips").css({"display":"block"});
				}
			});

		});
	}
}
new Index();

