new Vue({
	el:"#app",
	data(){
		return {
			matchList:'',
			matchName:'',
			state:'',
			gameName:'',
			hasNextPage : true,
			hasPreviousPage : true,
			pn:1,
			type:'',
			enrolltype:'TEAM'
		}
	},
	methods:{
		//切换参赛模式，判断是否显示战队成员数
		changeEnrolltype(){
			this.enrolltype = $("#enrolltype").val();
		},
		getMatchList(data){
			var _this = this;
			var data  = data ? data : {};
			$.getJSON(cmsUrl2+'sports/match/list?pn='+_this.pn,data,function(json){
				_this.matchList = json.matchList.list;
				_this.hasNextPage   = json.matchList.hasNextPage;
				_this.hasPreviousPage   = json.matchList.hasPreviousPage;
				_this.matchList.forEach(function(item){
					item.statusStr = getStatus(item.state);
				});
				console.log(_this.matchList);
			});
		},
		toggleModal(){
			console.log("123");
			$('#myModal').modal('show');
			//预览图片以及图片判断
			$("#img").on("change",function(){
				uploadFile(this,$("#preimg"),750,320);
			});
			laydate.render({
				elem: '#startdate'
			});
			laydate.render({
				elem: '#enddate'
			});
			laydate.render({
				elem: '#enrollenddate'
				,type: 'datetime'
			});
		},
		ajaxSubmit(){
			if($("#startdate").val()>=$("#enddate").val()){
				Alert($,"比赛开始时间不能晚于结束时间",'warn');
				return  false;
			}
			if(!$("#enrollfee").val()){
				$("#enrollfee").val('0');
			}
			$("#ajaxForm").ajaxSubmit({
				success:function(json){
					$(this).on("click");
					if(json.errCode == 0){
						Alert($,json.errMsg,'success',function(){
							window.location.href = "matchDetail.html?id="+json.matchId;
						});
					}
					else{
						Alert($,'参数错误，请填写正确的参数！','error');
					}
				},
				url: cmsUrl2+'sports/match/handler',
				type:'post',
				dataType:"json"
			});
		},
		dlink(id){
			window.location.href = 'matchDetail.html?matchid='+id;
		}
	},
	watch:{
		pn:function(val){
			this.getMatchList();
		},
		state:function(val){
			var data = {state:val}
			this.getMatchList(data);
		},
		gameName:function(val){
			var data = {gamename:val}
			this.getMatchList(data);
		},
		matchName:function(val){
			var data = {name:val}
			this.getMatchList(data);
		}
	},
	created(){
		this.getMatchList();
	}

});
