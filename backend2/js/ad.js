new Vue({
	el:"#app",
	data(){
		return {
			advPositionList : {},
			id:1,
			sliderList1:[],
			sliderList0:[],
			sliderlists:[],
			width:350,
			height:265,
			uploadRules: '',
			nowItem:{},
		}
	},
	created(){
		var url = window.location.href;
		var bannerType = url.split('?')[1] ? url.split('?')[1].split('=')[1] : 1;
		this.id = bannerType;
		this.getList();
	},
	mounted(){
		var _this = this;
		_this.sliderList1 = [];
		_this.sliderList0 = [];
		$.getJSON(cmsUrl2+'adv/list',{positionid:this.id},function(json){
			var advList = json.advList;
			_this.sliderlists = $.extend(true,[],advList);
			advList.forEach(function(item,index){
				if(item.state == 1){
					_this.sliderList1.push(item);
				}
				else {
					_this.sliderList0.push(item);
				}
			});
		});
		var _this = this;
		toggleShow($,"#des-tips,.des-box1,.des-box2",$(".des-box"+_this.id));
		$('#myModal').on('shown.bs.modal', function () {
			$("#img").on("change",function(){
				console.log(_this.width)
				return uploadFile(this,$("#preimg"),_this.width,_this.height);
			});
			$("#positionid").val(_this.id);
			$("#submit").on("click",function(){
				var isFlag = validateForm($("#ajaxForm"));
				if(!isFlag){
					return false;
				}
				if($("#title").val().length > 12){
					Alert($,"标题长度不能超过12个字符",'warn');
					return false;
				}
				if($("#url").val().indexOf('http://') == -1){
					Alert($,"地址必须以http://开头！",'warn');
					return false;
				}
				$("#ajaxForm").ajaxSubmit({
					success:function(json){
						if(json.errCode == 0){
							Alert($,json.errMsg,'success',function(){
								window.location.href = 'ad.html?bannerType='+_this.id;
							});
						}
						else{
							Alert($,json.errMsg,'error');
						}
					},
					url: cmsUrl2+'adv/update',
					type:'post',
					dataType:"json"
				});


			});
		});

	},
	updated(){
		var _this=this;
		if(_this.id == 1){
			$(".slider-img").each(function(index,item){
				autoSize($(item),350,265);
			});
		}
		else if(this.id == 3){
			$(".slider-img").each(function(index,item){
				autoSize($(item),_this.width,_this.height);
			});
		}else{
			$(".slider-img").each(function(index,item){
				autoSize($(item),700,265);
			});
		}
		//var _this = this;
		//$(".action").on("click",function(){
		//	var id = $(this).attr("data-id");
		//	console.log(id);
		//	$('#myModal2').on('shown.bs.modal', function () {
		//		var nowItem = {};
		//		console.log(_this.sliderlists);
		//		_this.sliderlists.forEach(function(item){
		//			if(id == item.id){
		//				nowItem = item;
		//			}
		//		});
		//		console.log(nowItem);
		//		$("#preimg2").html('<img src="' + nowItem.img + '" />');
		//		$("#id2").val(nowItem.id);
		//		$("#title2").val(nowItem.title);
		//		$("#url2").val(nowItem.url);
		//		$("#state2").val(nowItem.state);
		//		$("#positionid2").val(nowItem.positionId);
        //
		//		$("#img2").on("change",function(){
		//			console.log(this.width)
		//			return uploadFile(this,$("#preimg2"),this.width,this.height);
		//		});
        //
		//		$("#submit2").on("click",function(){
		//			$("#id2").val(id);
		//			var isFlag = validateForm($("#ajaxForm2"));
		//			if(!isFlag){
		//				return false;
		//			}
		//			if($("#title2").val().length > 12){
		//				Alert($,"标题长度不能超过12个字符",'warn');
		//				return false;
		//			}
		//			if($("#url2").val().indexOf('http://') == -1){
		//				Alert($,"地址必须以http://开头！",'warn');
		//				return false;
		//			}
		//			$("#ajaxForm2").ajaxSubmit({
		//				success:function(json){
		//					if(json.errCode == 0){
		//						Alert($,json.errMsg,'success',function(){
		//							window.location.href = 'ad.html?bannerType='+_this.id;
		//						});
		//					}
		//					else{
		//						Alert($,json.errMsg,'error');
		//					}
		//				},
		//				url: cmsUrl2+'adv/update',
		//				type:'post',
		//				dataType:"json"
		//			});
		//		});
		//	});
		//});
	},
	methods:{
		action(id){
			var _this = this;
			$('#myModal2').on('shown.bs.modal', function () {
				//var nowItem = {};
				console.log(_this.sliderlists);
				_this.sliderlists.forEach(function(item){
					if(id == item.id){
						_this.nowItem = item;
					}
				});
				//console.log(nowItem);
				$("#preimg2").html('<img src="' + _this.nowItem.img + '" />');
				$("#id2").val(_this.nowItem.id);
				$("#title2").val(_this.nowItem.title);
				$("#url2").val(_this.nowItem.url);
				$("#state2").val(_this.nowItem.state);
				$("#positionid2").val(_this.nowItem.positionId);

				console.log(_this.width)
				$("#img2").on("change",function(){
					return uploadFile(this,$("#preimg2"),this.width,this.height);
				});

				$("#submit2").on("click",function(){
					$("#id2").val(id);
					var isFlag = validateForm($("#ajaxForm2"));
					if(!isFlag){
						return false;
					}
					if($("#title2").val().length > 12){
						Alert($,"标题长度不能超过12个字符",'warn');
						return false;
					}
					if($("#url2").val().indexOf('http://') == -1){
						Alert($,"地址必须以http://开头！",'warn');
						return false;
					}
					$("#ajaxForm2").ajaxSubmit({
						success:function(json){
							if(json.errCode == 0){
								Alert($,json.errMsg,'success',function(){
									window.location.href = 'ad.html?bannerType='+_this.id;
								});
							}
							else{
								Alert($,json.errMsg,'error');
							}
						},
						url: cmsUrl2+'adv/update',
						type:'post',
						dataType:"json"
					});
				});
			});
		},
		getList(){
			var _this=this;
			$.getJSON(cmsUrl2+'adv/position/list',function(json){
				_this.advPositionList = json.advPositionList;
				//if()
				_this.width = json.advPositionList[0].advWidth;
				_this.height = json.advPositionList[0].advHeight;
				_this.uploadRules = (_this.id == 1) ? '支持png/jpg/jpeg；尺寸350*265；1M以内' : (_this.id == 3) ? '支持png/jpg/jpeg；尺寸'+_this.width+'*'+_this.height+'；1M以内' :'支持png/jpg/jpeg；尺寸700*265；1M以内';

			});
		},
		toggleAdv(id){
			var _this = this;
			_this.id = id;
			_this.sliderList1 = [];
			_this.sliderList0 = [];
			_this.width       = (id == 1) ? 350 : (id == 3 )? _this.width :700;
			$.getJSON(cmsUrl2+'adv/list',{positionid:this.id},function(json){
				console.log(json);
				var advList = json.advList;
				_this.sliderlists = $.extend(true,[],advList);
				advList.forEach(function(item,index){
					if(item.state == 1){
						_this.sliderList1.push(item);
					}
					else {
						_this.sliderList0.push(item);
					}
				});
			});
			window.location.href = 'ad.html?bannerType='+_this.id;
		},
		setTop:function(id){
			var _this = this;
			$.getJSON(cmsUrl2+'adv/top',{id:id},function(json){
				if(json.errCode == 0){
					Alert($,json.errMsg,'success',function(){
						window.location.href = 'ad.html?bannerType='+_this.id;
					});
				}
				else{
					Alert($,json.errMsg,'error');
				}
			});
		},
		updateState:function(id,state){
			var _this = this;
			var data = {
				id: id,
				state: state == 1 ? 0 : 1
			}
			$.getJSON(cmsUrl2+'adv/state/update',data,function(json){
				if(json.errCode == 0){
					Alert($,json.errMsg,'success',function(){
						window.location.href = 'ad.html?bannerType='+_this.id;
					});
				}
				else{
					Alert($,json.errMsg,'error');
				}
			});
		}
	}
})

