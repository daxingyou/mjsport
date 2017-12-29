new Vue({
	el:"#app",
	data(){
		return {
			barListImg : {},
			barPostImg : {},
			width:220,
			height:158		}
		},
		methods:{

		},
		created(){
			var _this = this;
			$.getJSON(cmsUrl2+'netbaradv/info',{type:1},function(json){
				console.log(json);
				_this.barListImg = json.advInfo; 
			});
			$.getJSON(cmsUrl2+'netbaradv/info',{type:2},function(json){
				_this.barPostImg = json.advInfo;
			});
		},
		mounted(){
			var _this = this;
			toggleShow($,'#bar-img-btn1,#bar-img-box1',$("#bar-img-box1"));
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
									window.location.href = 'barImg.html';
								});
							}
							else{
								Alert($,"上传失败！",'error');
							}
						},
						url: cmsUrl2+'netbaradv/update',
						type:'post',
						dataType:"json"
					});

				});
			});
			toggleShow($,'#bar-img-btn2,#bar-img-box2',$("#bar-img-box2"));
			$('#myModal2').on('shown.bs.modal', function () {
				$("#img2").on("change",function(){
					return uploadFile(this,$("#preimg2"),750,370);
				});
				$("#submit2").on("click",function(e){
					e.stopPropagation();
					var isFlag = validateForm($("#ajaxForm"));
					if(!isFlag){
						return false;
					}
					var isFlag = validateForm($("#ajaxForm2"));
					if(!isFlag){
						return false;
					}
					$("#ajaxForm2").ajaxSubmit({
						success:function(json){
							if(json.errCode == 0){
								Alert($,json.errMsg,'success',function(){
									window.location.href = 'barImg.html';
								});
							}
							else{
								Alert($,"上传失败！",'error');
							}
						},
						url: cmsUrl2+'netbaradv/update',
						type:'post',
						dataType:"json"
					});


				});
			});
		},
		updated(){
			$(".slider-img").each(function(index,item){
				autoSize($(item),220,158);
			});
			$(".slider-img2").each(function(index,item){
				autoSize($(item),750,370);
			});
		}

	})