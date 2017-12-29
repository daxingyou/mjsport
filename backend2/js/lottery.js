new Vue({
	el:"#app",
	data(){
		return {
			goodsList:[],
			width:260,
			height:260,
			uploadRules: '支持png/jpg/jpeg；尺寸260*260；1M以内',
			nowItem:{},
			baseShopList:[],
			nowSpecial:1,
			probabilityList:[],
			deadLine:{},
			total:0,
		}
	},
	created(){
		//获取奖品库中的奖品
		this.getBaseShop();
		//获取奖品列表
		this.getShopList();	
		//获取概率列表
		this.getProBabilityList();
	},
	mounted(){
		$('#myModal4').on('show.bs.modal', function(){
			laydate.render({
				elem: '#startDate'
				,type: 'datetime'
			});
			laydate.render({
				elem: '#endDate'
				,type: 'datetime'
			});

		});
	},
	methods:{

		//设置活动
		setPause(){
			var nums = 0;
			this.goodsList.forEach(function(item){
				if(item.state == 1){
					nums++;
				}
			});
			if(nums <8){
				Alert($,"上架商品不足8个，请补充",'warn');
				return false;
			}
			console.log(nums);
			var len   = this.probabilityList.length;
			var total = 0;
			this.probabilityList.forEach(function(item,index){
				total+= parseInt(item.probability);
			});
			//console.log(this.deadLine.startDate);
			//console.log(this.deadLine.endDate);
			if( $("#startDate").val() > $("#endDate").val() ){
				Alert($,'开始时间不能晚于结束时间','error');
				return false;
			}
			if(total != 100){
				Alert($,'概率总和必须为100%','error');
				return false;
			}
			var data1 = {
				startdate:$("#startDate").val(),
				enddate:$("#endDate").val()
			}
			var data2 = {
				ispause:this.deadLine.isPause
			}
			$.getJSON(cmsUrl2+'lottery/deadline/edit',data1,function(json){
				if(json.errCode == 0){
					$.getJSON(cmsUrl2+'lottery/deadline/pause/edit',data2,function(json){
						if(json.errCode == 0){
							Alert($,json.errMsg,'success',function(){
								window.location.reload();
							});
						}
						else{
							Alert($,json.errMsg,'error');
						}
					})
				}
				else{
					Alert($,json.errMsg,'error');
				}
			})
		},
		//设置概率
		setPro(){
			var pdata = '';
			var len   = this.probabilityList.length;
			var total = 0;
			this.probabilityList.forEach(function(item,index){
				total+= parseInt(item.probability);
				if(index < len-1)
					pdata+=item.id+':'+item.probability+',';
				else 
					pdata+=item.id+':'+item.probability;
			});
			if(total != 100){
				Alert($,'概率总和必须为100%','error');
				return false;
			}
			$.getJSON(cmsUrl2+'lottery/goods/probability/set',{pdata:pdata},function(json){
				if(json.errCode == 0){
					Alert($,json.errMsg,'success',function(){
						window.location.reload();
					});
				}
				else{
					Alert($,json.errMsg,'error');
				}
			})
		},
		getProBabilityList(){
			var _this = this;
			$.getJSON(cmsUrl2+'lottery/goods/probability/list',function(json){
				json.probabilityList.forEach(function(item){
					item.probability = item.probability*100;
				});
				_this.probabilityList = json.probabilityList;
			});
		},
		toggle(){
			this.nowSpecial = this.nowSpecial == 1 ? 0 : 1;
		},
		addShop(){
			$("#addShopForm").ajaxSubmit({
				success:function(json){
					if(json.errCode == 0){
						Alert($,json.errMsg,'success',function(){
							window.location.reload();
						});
					}
					else{
						Alert($,json.errMsg,'error');
					}
				},
				url: cmsUrl2+'lottery/goods/add',
				type:'post',
				dataType:"json"
			});
		},
		getBaseShop(){
			var _this = this;
			$.getJSON(cmsUrl2+'lottery/baseindex',function(json){
				_this.baseShopList = json.baseGoodsList;
			});
		},
		//编辑商品
		editGoods(id){
			var _this = this;
			$("#myModal2").modal('show');
			this.goodsList.forEach(function(item){
				if(id == item.id){
					_this.nowItem = item;
				}
			});
			_this.nowSpecial = _this.nowItem.isSpecial;
		},
		//获取商品列表
		getShopList(){
			var _this = this;
			$.getJSON(cmsUrl2+'lottery/index',function(json){
				_this.goodsList = json.goodsList;
				if(json.deadline){
					_this.deadLine  = json.deadline;
				}
				//console.log(_this.deadLine);
			});
		},
		//更新商品
		updateGoods(id,state){
			if(state == 0){
				if(this.deadLine.isPause == 1){
					Alert($,"活动正在进行中，请先暂停活动",'warn');
					return false;
				}
			}
			if(state == 1){
				var nums = 0;
				this.goodsList.forEach(function(item){
					if(item.state == 1){
						nums++;
					}
				});
				if(nums>=8){
					Alert($,"上架商品不能超过8个",'warn');
					return false;
				}
			}
			var data = {
				id : id,
				state : state 
			}
			$.getJSON(cmsUrl2+'lottery/goods/state/update',data,function(json){
				if(json.errCode == 0){
					Alert($,json.errMsg,'success',function(){
						window.location.reload();
					});
				}
				else{
					Alert($,json.errMsg,'error');
				}
			})
		},
		//提交添加商品
		addSubmit(){
			$("#ajaxForm").ajaxSubmit({
				success:function(json){
					if(json.errCode == 0){
						Alert($,json.errMsg,'success',function(){
							window.location.reload();
						});
					}
					else{
						Alert($,json.errMsg,'error');
					}
				},
				url: cmsUrl2+'store/goods/update',
				type:'post',
				dataType:"json"
			});
		},
		//提交编辑商品
		editSubmit(){
			$("#ajaxForm2").ajaxSubmit({
				success:function(json){
					if(json.errCode == 0){
						Alert($,json.errMsg,'success',function(){
							window.location.reload();
						});
					}
					else{
						Alert($,json.errMsg,'error');
					}
				},
				url: cmsUrl2+'lottery/goods/edit',
				type:'post',
				dataType:"json"
			});
		}
	}
})