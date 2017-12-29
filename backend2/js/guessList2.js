
new Vue({
	el:"#app",
	data(){
		return {
			tabLists:[
			{isActive:false,state:'0',num:0,name:"未发布"},
			{isActive:true,state:'1',num:0,name:"投注中"},
			{isActive:false,state:'2',num:0,name:"待开奖"},
			{isActive:false,state:'3',num:0,name:"已结束"}
			],
			hasNextPage : true,
			hasPreviousPage : true,
			guessList:[],
			gameList:[],
			matchList:[],
			matchList2:[],
			nowGameId:0,
			pn:1,
			nowMatchId:0,
			nowState:1,
			gameid2:0,
			competitionid2:0,
			enddate:''
		}
	},
	created(){
		localStorage.setItem('nowIndex',0);
		//获取竞猜列表
		this.getGuessList();
		//获取游戏列表
		this.getGameList();
		//获取赛事列表
		this.getMatchList();
	},
	mounted(){
		laydate.render({
			elem: '#endDate2'
			,type: 'datetime'
		});
	},
	watch:{
		pn:function(pn){
			this.pn = pn;
			this.getGuessList();
		},
		gameid2:function(gameid2){
			this.gameid2 = gameid2;
			this.getMatchList2(gameid2);
			this.getGuessList();
		},
		competitionid2:function(competitionid2){
			this.competitionid2 = competitionid2;
			this.getGuessList();
		}
	},
	methods:{
		getMatchList2(gid){
			var gid   = gid ? gid : 1;
			var _this = this;
			$.getJSON(cmsUrl2+'officil/competition/list',{gameid:gid},function(json){
				_this.matchList2 = json ? json.competitionList : [];
				console.log(_this.matchList2);
			});
		},
		toggleEndDate(){
			this.enddate = $("#endDate2").val();
			this.getGuessList();
		},
		getGuessList(){
			var _this = this;
			var data = {
				state:this.nowState,
				pn:this.pn,
				gameid:this.gameid2,
				competitionid:this.competitionid2,
				enddate:this.enddate

			}
			console.log(data);
			$.getJSON(cmsUrl2+'officil/guess/list',data,function(json){
				needLogin(json);
				for(var key in _this.tabLists){
					_this.tabLists[key].num = json[key];
				}
				_this.hasNextPage   = json.guessList.hasNextPage;
				_this.hasPreviousPage   = json.guessList.hasPreviousPage;
				_this.guessList = json.guessList ? json.guessList.list : [];
			});
		},
		//长传图片预览
		preImg(id,e){
			console.log(e.target.files[0]);
			var _this = this;
			if(e.target.files[0]){
				var reader = new FileReader();
				reader.readAsDataURL(e.target.files[0]);
				reader.onload = function(theFile){
					var image = new Image();
					image.src = theFile.target.result;
					image.onload=function(){
						if(this.width > this.height){
							this.width  = this.width / (this.height/100);
							this.height = 100;
						}
						else {
							this.height = this.height / (this.width/100);
							this.width = 100;
						}
						console.log(this.width);
						console.log(this.height);
						$("#"+id).attr("src",image.src).css({"margin-left":-this.width/2+"px","margin-top":-this.height/2+"px","width":this.width,"height":this.height});
					}
				}

			}
		},
		//创建新竞猜
		createGuess(){
			$("#guessForm").ajaxSubmit({
				success:function(json){
					if(json.errCode == 0){
						Alert($,json.errMsg,'success',function(){
							window.location.href = "guessDetail.html?guessId="+json.guessId;
						});
					}
					else{
						Alert($,'参数错误，请填写正确的参数！','error');
					}
				},
				url: cmsUrl2+'officil/guess/handler',
				type:'post',
				dataType:"json"
			});
		},
		//切换赛事
		toggleGame(e){
			this.getMatchList(e.target.value);
		},
		getGameList(){
			var _this = this;
			$.getJSON(cmsUrl2+'officil/game/list',function(json){
				_this.gameList = json ? json.gameList : [];
			});
		},
		getMatchList(gid){
			var gid   = gid ? gid : 1;
			var _this = this;
			$.getJSON(cmsUrl2+'officil/competition/list',{gameid:gid},function(json){
				_this.matchList = json ? json.competitionList : [];
				console.log(_this.matchList);
			});
		},
		//通过竞猜状态切换列表
		toggleTab(state){
			this.nowState = state;
			this.tabLists.forEach(function(item){
				if( item.state == state){
					item.isActive = true;
				}else {
					item.isActive = false;
				}
			});
			this.getGuessList(state);
		}
		
	}
})



$('#myModal').on('show.bs.modal', function(){
	laydate.render({
		elem: '#enddate'
		,type: 'datetime'
	});

});

