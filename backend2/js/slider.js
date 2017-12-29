new Vue({
	el:"#app",
	data(){
		return {
			sliderList: [],
			sliderlists:[],
			sliderList1:[],
			sliderList0 : []
		}
	},
	methods:{
		//编辑轮播图模态框
		editSliderModal(id){
			console.log(this.sliderlists);
			$("#myModal2").modal('show');
			//获取单个轮播详情
			var nowItem = {};
			this.sliderlists.forEach(function(item){
				if(id == item.id){
					nowItem = item;
				}
			});
			console.log(nowItem);
			$("#preview2").html('<img src="' + nowItem.img + '" />');
			$("#id2").val(nowItem.id);
			$("#title2").val(nowItem.title);
			$("#url2").val(nowItem.url);
			$("#state2").val(nowItem.state);
			//预览图片以及图片判断
			$("#img2").on("change",function(){
				uploadFile(this,$("#preview2"));
			});
		},
		//提交编辑轮播图
		submitEditSlider(){
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
							window.location.reload();
						});
					}
					else{
						Alert($,json.errMsg,'error');
					}
				},
				url: cmsUrl2+'slider/update',
				type:'post',
				dataType:"json"
			});
		},
		//提交添加轮播图
		submitAddSlider(){
			
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
					$(this).on("click");
					if(json.errCode == 0){
						Alert($,json.errMsg,'success',function(){
							window.location.reload();
						});
					}
					else{
						Alert($,json.errMsg,'error');
					}
				},
				url: cmsUrl2+'slider/update',
				type:'post',
				dataType:"json"
			});
		},
		//显示添加轮播图
		addSlider(){
			$("#myModal").modal('show');
			$("#img").on("change",function(){
				uploadFile(this,$("#preimg"));
			});
		},
		//置顶操作
		setTop:function(id){
			$.getJSON(cmsUrl2+'slider/top',{id:id},function(json){
				if(json.errCode == 0){
					Alert($,json.errMsg,'success',function(){
						window.location.reload();
					});
				}
				else{
					Alert($,json.errMsg,'error');
				}
			});
		},
		//上下架更新
		updateState:function(id,state){
			var data = {
				id: id,
				state: state == 1 ? 0 : 1 
			}
			$.getJSON(cmsUrl2+'slider/state/update',data,function(json){
				if(json.errCode == 0){
					Alert($,json.errMsg,'success',function(){
						window.location.reload();
					});
				}
				else{
					Alert($,json.errMsg,'error');
				}
			});
		}
	},
	created(){
		var _this = this;
		$.getJSON(cmsUrl2+'slider/list',function(json){
			_this.sliderList = $.extend(true,[],json.sliderList);
			_this.sliderlists = $.extend(true,[],json.sliderList);
			_this.sliderList.forEach(function(item,index){
				if(item.state == 1){
					_this.sliderList1.push(item);
				}
				else {
					_this.sliderList0.push(item);
				}
			});
		});
		$(".slider-img").each(function(index,item){
			autoSize($(item),750,320);
		});
	}
	
})