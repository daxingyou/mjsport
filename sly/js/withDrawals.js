function WithDrawals(){
	this.tab();
	this.render();
}
WithDrawals.prototype = {
	tab:function(){
		$("#cash-tab").on("click",function(e){
			$("#cash-tab li").removeClass('active');
			$(".tab-panel").css({"display":"none"});
			if($(e.target).attr("class") == 'cash-sq'){
				$(".cash-sq").addClass('active');
				$(".cash-box").css({"display":"block"})
			}
			else if($(e.target).attr("class") == 'cash-jl') {
				$(".cash-jl").addClass('active');
				$(".guess-box").css({"display":"block"});
				$.getJSON(listUrl+'member/withdraw/list',function(json, textStatus) {
					var data    = json.withDrawList.list;
					if(!data.length){
						$("#guess-box").html('<p style="padding:20px; text-align:center;">暂无提现记录</p>');
						return false;
					}
					var hasNext = json.withDrawList.hasNextPage;
					var nextPage= json.withDrawList.nextPage;
					var nowDate  = getNowDate();
					var lastDate = getLastDate();
					var convertArr = {}
					var content = '';
					var convertArr = converDate(nowDate,lastDate,data,'createdDate');
					for(key in convertArr){
						content += ' <h2 class="whot" style="background: #f2f2f2;border: 0 none;color: #868686;">'+key+'</h2>';
						for(key2 in convertArr[key]) {
							content += cashListTpl(convertArr[key][key2]);
						}
					}
					$("#guess-box").html(content);
					this.myScroll = new IScroll('#wrapper');
					myScroll.on('scrollEnd', function(){
						if( hasNext  ){
							$.getJSON(listUrl+'news/index?pn='+nextPage,function(json, textStatus) {
								var data    = json.withDrawList.list;
								var content     = $("#guess-box").html();
								hasNext = json.withDrawList.hasNextPage;
								nextPage= json.withDrawList.nextPage;
								var nowDate  = getNowDate();
								var lastDate = getLastDate();
								var convertArr = {}
								var convertArr = converDate(nowDate,lastDate,data,'createdDate');
								for(key in convertArr){
									content += ' <h2 class="whot" style="background: #f2f2f2;border: 0 none;color: #868686;">'+key+'</h2>';
									for(key2 in convertArr[key]) {
										content += cashListTpl(convertArr[key][key2]);
									}
								}
								$("#guess-box").html(content);
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
			
		});
	},
	render:function(){
		$.getJSON(listUrl+'member/withdraw/account/list', function(json, textStatus) {
			console.log(window.location.href.split('?'));
			var id = window.location.href.split('?')[1] ? window.location.href.split('?')[1].split('=')[1] : 0;
			console.log(id);
			var str = '';
			var len = json.accountList.length;
			if( json.accountList.length !=0 ){
				id = id ? len - id : 0;
				str+=cashTpl(json.accountList[id],json.financeInfo.balanceMoney);
				$("#cash-box").html(str);
				$("#next-btn").on("click",function(){
					var id = $("#alipayName").attr("data-id");
					var cashValue = $("#cashValue").val();
					if(cashValue.length == 0){
						alert("金额不能为空");
						return false;
					}
					$.getJSON(listUrl+'member/withdraw/add', {id:id,money:cashValue}, function(json, textStatus) {
						alert(json.errMsg);					
					});
				});
				$("#cash-item").on("click",function(){
					window.location.href = 'seCash.html';
				});
			}
			else{
				$("#cash-box").html('<a href="addAlipay.html" style="display:block;" id="add-alipay" class="add-alipay"  ><span class="icon-add"></span><span  class="add-text">添加支付宝账户</span></a>');
			}
		});
	},
}
new WithDrawals();

