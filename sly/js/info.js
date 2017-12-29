
        function Index(){
        	this.myScroll = null;
        	this.renderInfoList();
        }
        Index.prototype = {
        	renderInfoList: function(){
        		$.getJSON(listUrl+'news/index',function(json, textStatus) {
        			var data    = json.newsList.list;
        			var hasNext = json.newsList.hasNextPage;
        			var nextPage= json.newsList.nextPage;
        			var nowDate  = getNowDate();
        			var lastDate = getLastDate();
        			var convertArr = {}
        			var content = '';
        			var convertArr = converDate(nowDate,lastDate,data);
        			for(key in convertArr){
        				content += ' <h2 class="whot" style="background: #f2f2f2;border: 0 none;color: #868686;">'+key+'</h2>';
        				for(key2 in convertArr[key]) {
        					content += infoTpl(convertArr[key][key2]);
        				}
        			}
        			$("#info-list").html(content);
        			$("#info-list .info-item").on("tap",function(){
        				var url = $(this).attr("href");
        				console.log(url);
        				window.location.href = url;
        			})
        			this.myScroll = new IScroll('#wrapper');
        			myScroll.on('scrollEnd', function(){
        				if( hasNext  ){
        					$.getJSON(listUrl+'news/index?pn='+nextPage,function(json, textStatus) {
        						var data    = json.newsList.list;
        						var content     = $("#info-list").html();
        						hasNext = json.newsList.hasNextPage;
        						nextPage= json.newsList.nextPage;
        						var nowDate  = getNowDate();
        						var lastDate = getLastDate();
        						var convertArr = {}
        						var convertArr = converDate(nowDate,lastDate,data);
        						for(key in convertArr){
        							content += ' <h2 class="whot" style="background: #f2f2f2;border: 0 none;color: #868686;">'+key+'</h2>';
        							for(key2 in convertArr[key]) {
        								content += infoTpl(convertArr[key][key2]);
        							}
        						}
        						$("#info-list").html(content);
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

