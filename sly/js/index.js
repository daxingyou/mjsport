
        function Index(){
        	this.myScroll = null;
        	this.matchList();
        	this.renderInfoList();
        	this.mySwiper();
        }
        Index.prototype = {
        	mySwiper:function(){
        		var mySwiper = new Swiper('.swiper-container',{pagination : '.swiper-pagination',loop : true,preventClicks : true});
        		$(".swiper-slide a").on("click",function(){
        			var url = $(this).attr("href");
        			window.location.href = url;
        		});
        	},
        	matchList:function(){
        		var data={
        			page:1,
        			pagesize:2
        		}
        		$.post(listUrl+'third/match/netbar',data,function(json, textStatus) {
			//console.log(data)
			if(json.data != undefined){
				var data = json.data.matches;
				var str  = '';
				data.forEach(function( item ){
					str+=matchTpl(item);
				});
				$("#match-list").html(str);
				$("#match-list .match-list-item").on("tap",function(){
					var id = $(this).attr("data-id");
					var isonline=$(this).attr("data-online");
					console.log(isonline)
					//if(isonline=="true"){
					//	window.location.href = "matchfind.html?id="+id;
					//}else{
					//	window.location.href = "matchinfo.html?id="+id;
					//}
					window.location.href = "matchinfo.html?id="+id;
				});
			}
			else{
				$("#matchTips").css({"display":"block"});
			}

		});
        	},
        	renderInfoList: function(){
        		$.getJSON(listUrl+'news/index',function(json, textStatus) {
        			var data    = json.newsList.list;
        			var str     = '';
        			var hasNext = json.newsList.hasNextPage;
        			var nextPage= json.newsList.nextPage;
        			data.forEach(function( item ){
        				str += infoTpl(item);
        			});
        			$("#info-list").html(str);
        			$("#info-list .info-item").on("tap",function(){
        				var url = $(this).attr("href");
        				console.log(url);
        				window.location.href = url;
        			})
        			this.myScroll = new IScroll('#wrapper',{click:true,taps:true,mouseWheel:true});
        			myScroll.on('scrollEnd', function(){
        				if( hasNext  ){
        					$.getJSON(listUrl+'news/index?pn='+nextPage,function(json, textStatus) {
        						var data    = json.newsList.list;
        						var str     = $("#info-list").html();
        						hasNext = json.newsList.hasNextPage;
        						nextPage= json.newsList.nextPage;
        						data.forEach(function( item ){
        							str += infoTpl(item);
        						});
        						$("#info-list").html(str);
        						$("#info-list .info-item").on("tap",function(){
        							var url = $(this).attr("href");
        							console.log(url);
        							window.location.href = url;
        						})
        						setTimeout(function () {
        							myScroll.refresh();
        						}, 0);
        					});
        				}
        				else{
        					$("#tips").css({"display":"block"});
        				}
        			});

        		});
        	}
        }
        new Index();

