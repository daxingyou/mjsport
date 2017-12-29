function Myguess(){
	this.myScroll = null;
	this.renderInfoList();
}
Myguess.prototype = {
	renderInfoList: function(){
		$.getJSON(listUrl+'member/bet/history',function(json, textStatus) {

			if(json.errCode == '10018'){
				$("#guess-box").html('<p style=" text-align:center; color:#666; padding:2rem 0.5rem ; font-size:0.5rem;">您还没有参加过竞猜<br />请到<a href="guess.html"> 竞猜页 </a>选择一场比赛吧！</p>');
				return false;
			}
			var data    = json.orderList;
			//var hasNext = json.newsList.hasNextPage;	
			//var nextPage= json.newsList.nextPage;
			var nextPage  = 1;
			var nowDate  = getNowDate();
			var lastDate = getLastDate();
			var convertArr = {}
			var content = '';
			convertArr = converDate(nowDate,lastDate,data,'create_at');
			for(key in convertArr){
				content += ' <h2 class="whot" style="background: #f2f2f2;border: 0 none;color: #868686;">'+key+'</h2>';
				for(key2 in convertArr[key]) {
					content += guessTpl(convertArr[key][key2]);
				}
			}
			$("#guess-box").html(content);
			$(".guess-status").forEach(function(item){
				console.log($(item).html())
				if($(item).html()=="未中奖"){
					$(item).css("color","#33ccff")
				}else if($(item).html()=="未开奖"){
					$(item).css("color","#231815")
				}else if($(item).html()=="未开奖"){
					$(item).css("color","#231815")
				}else{
					$(item).css("color","#ff4c4e")
				}
			})
			$("#guess-box .guess-item").on("tap",function(){
				var url = $(this).attr("href");
				window.location.href = url;
			});
			this.myScroll = new IScroll('#wrapper');
			myScroll.on('scrollEnd', function(){
				$.getJSON(listUrl+'member/bet/history?pn='+(++nextPage),function(json, textStatus) {
					var data    = json.orderList;
					if(data){
						var content     = $("#guess-box").html();
						var nowDate  = getNowDate();
						var lastDate = getLastDate();
						var convertArr = {}
						convertArr = converDate(nowDate,lastDate,data,'create_at');
						for(key in convertArr){
							content += ' <h2 class="whot" style="background: #f2f2f2;border: 0 none;color: #868686;">'+key+'</h2>';
							for(key2 in convertArr[key]) {
								content += guessTpl(convertArr[key][key2]);
							}
						}
						$("#guess-box").html(content);
						$("#guess-box .guess-item").on("tap",function(){
							var url = $(this).attr("href");
							window.location.href = url;
						});
						setTimeout(function () {
							myScroll.refresh();
						}, 0);
					}
					else {
						$("#tips").css({"display":"block"});
					}
					
				});
				
			});

		});
	}
}
new Myguess();

