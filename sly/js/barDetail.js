function Profile(){
	this.render();
	//this.renderList();
}
Profile.prototype = {
	render:function(){
		$("#shopDh").on("click",function(){
			window.location.href="shop.html?id=100001"
		});
		var urlArr=window.location.href.split(/[= ? &]/);
		var idindex=isCon(urlArr,"id");
		var matchidindex=isCon(urlArr,"matchid");
		if(idindex>=0){
			var id=urlArr[idindex+1];
			console.log(id)
		}
		if(matchidindex>=0){
			var matchid=urlArr[matchidindex+1];
		}
		console.log(matchidindex)
		if(!matchidindex){
			var data = {
				page:1,
				pagesize:10,
				id:id
			}
			$.post(listUrl+'layout/netbaradv/poster',{barid:id},function(json){
				if(json.errCode == 0){
					$("#topbg").attr("src",json.netbarAdvInfo.img);
				}
			})
			$.post(listUrl+'third/match/netbar',data,function(json){
				if(json.data.netbar){
					$("#bname").html(json.data.netbar.name);
					$("#baddress").html(json.data.netbar.addr);
					$("#xing-text").html(json.data.netbar.star+"分");
				}
				if(json.data.matches){
					var data = json.data.matches;
					var str  = '';
					data.forEach(function(item){
						str+=matchTpl(item);
					});
					$("#match-list").html(str);
					$("#match-list .match-list-item").on("click",function(){
						var id = $(this).attr("data-id");
						window.location.href = "matchinfo.html?id="+id;
					});
				}else{
					$.post(listUrl+'third/bet/history',{page:1,pagesize:2,id:id},function(json){
						var matchindex=0;
						if(json.errno==0){
							var data = json.data.matches;
							var str  = '';
							data.forEach(function(item){
								matchindex++;
								if(matchindex<6){
									str+=matchTpl(item);
								}
							});
							$("#match-list").html(str);
							$("#match-list .match-list-item").on("click",function(){
								var id = $(this).attr("data-id");
								window.location.href = "matchinfo.html?id="+id;
							});
						}
					})
				}

			});
		}
		else{
			var data = {
				"method":"bet.match.netbar",
				page:1,
				pagesize:10,
				id:id,
				matchid:matchid
			}
			//console.log(listUrl+'third/match/netbar');
			$.post(listUrl+'third/match/netbar',data,function(json){
				//json=JSON.parse(json);
				//console.log(json)
				if(!json.data==null){
					var data = json.data.matches;
					var str  = '';
					data.forEach(function(item){
						str+=matchTpl(item);
					});
					$("#match-list").html(str);
					$("#match-list .match-list-item").on("click",function(){
						//var id = $(this).attr("data-id");
						//window.location.href = "matchinfo.html?id="+id+"&isonline=true";
						var type="netbar";
						var id = $(this).attr("data-id");
						var olid = $(this).attr("data-olid");
						if(id==olid){
							window.location.href = "matchfind.html?id="+id;
						}else{
							window.location.href = "matchinfo.html?id="+id+"type="+type;
						}
					});
				}else{
					$("#match-box").html('<div class="nodata" style="height: 4rem;line-height: 4rem;text-align: center;font-size: 0.42667rem;background-color: #FFFFFF;">暂无比赛竞猜</div>');
				}

			});
		}
	}
}
new Profile();

