function Index(){
	this.myScroll = null;
	this.renderInfoList();
}
Index.prototype = {
	renderInfoList: function(){
		$.getJSON(listUrl+'member/index',function(json, textStatus) {
			$("#md-num").html(json.memberBean.balanceBean);
			$("#exchange").on("tap",function(){
				window.location.href = "exchangeMd.html";
				//if(!json.memberInfo.idCard){
				//	window.location.href = "exchangeMd.html";
				//}else{
				//	$(".mask").show();
				//	$(".alertidcard").show();
				//}
			});

		});
		$.getJSON(listUrl+'member/bean/history',function(json, textStatus) {
			var data    = json.historyList.list;
			var hasNext = json.historyList.hasNextPage;
			var nextPage= json.historyList.nextPage;
			var nowDate  = getNowDate();
			var lastDate = getLastDate();
			var convertArr = {}
			var content = '';	
			data.forEach(function( item ){
				//console.log(item.createdDate)
				item.createdDate = ge_time_format(item.createdDate);
			});
			var convertArr = converDate(nowDate,lastDate,data,'createdDate');
			for(key in convertArr){
				content += ' <h2 class="whot" style="background: #f2f2f2;border: 0 none;color: #868686;">'+key+'</h2>';
				for(key2 in convertArr[key]) {
					content += mdTpl(convertArr[key][key2]);
				}
			}

			$("#guess-box").html(content);
			$(".guess-num").forEach(function(item){
				//console.log($(item));
				if($(item).html().indexOf("-")<0){
					//console.log("you")
					$(item).css("color","#00CC00");
				}else{
					$(item).css("color","#E4007F");
				}
			})
			this.myScroll = new IScroll('#wrapper',{click:true,taps:true,mouseWheel:true});
			myScroll.on('scrollEnd', function(){
				if( hasNext  ){
					//console.log(hasNext)
					//console.log(nextPage)
					$.getJSON(listUrl+'member/bean/history?pn='+nextPage,function(json, textStatus) {
						var data    = json.historyList.list;
						data.forEach(function( item ){
							item.createdDate = ge_time_format(item.createdDate);
						});
						 hasNext = json.historyList.hasNextPage;
						 nextPage= json.historyList.nextPage;
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
						$(".guess-num").forEach(function(item){
							//console.log($(item));
							if($(item).html().indexOf("-")<0){
								//console.log("you")
								$(item).css("color","#00CC00");
							}else{
								$(item).css("color","#E4007F");
							}
						})
						setTimeout(function () {
							myScroll.refresh();
						}, 0);
					});
				}
				else{
					//console.log(nextPage);
					if(nextPage>2){
						$("#tips").css({"display":"block"});
					}
				}
			});

		});

	}
}
new Index();

