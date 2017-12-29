new Vue({
	el:"#app",
	data(){
		return {
			goodsList:[],
			width:260,
			height:260,
			uploadRules: '支持png/jpg/jpeg；尺寸260*260；1M以内',
			nowItem:{}
		}
	},
	created(){
		this.getShopList();	
	},
	mounted(){
		var _this = this;
		$('#myModal').on('shown.bs.modal', function () {
			$("#img").on("change",function(){
				return uploadFile(this,$("#preimg"),_this.width,_this.height);
			});
			$("#submit").off("click").on("click",function(e){
				e.stopPropagation();
				var isFlag = validateForm($("#ajaxForm"));
				if(!isFlag){
					return false;
				}
				$("#ajaxForm").ajaxSubmit({
					success:function(json){
						if(json.errCode == 0){
							Alert($,json.errMsg,'success',function(){
								window.location.reload();
							});
						}
						else{
							Alert($,"创建失败！",'error');
						}
					},
					url: cmsUrl2+'store/goods/update',
					type:'post',
					dataType:"json"
				});

			});
		});
	},
	methods:{
		//编辑商品
		editGoods(id){
			var _this = this;
			$("#myModal2").modal('show');
			this.goodsList.forEach(function(item){
				if(id == item.id){
					_this.nowItem = item;
				}
			});
			$("#preview2").html('<img src="' + _this.nowItem.img + '" />');
		},
		//获取商品列表
		getShopList(){
			var _this = this;
			$.getJSON(cmsUrl2+'store/goods/list',function(json){
				_this.goodsList = json.goodsList.list;
			});
		},
		//更新商品
		updateGoods(id,state){
			var data = {
				id : id,
				state : state 
			}
			$.getJSON(cmsUrl2+'store/goods/state/update',data,function(json){
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
				url: cmsUrl2+'store/goods/update',
				type:'post',
				dataType:"json"
			});
		}
	}
})