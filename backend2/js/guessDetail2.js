new Vue({
	el:"#app",
	data(){
		return {
			guessInfo:{},
			guessId:'',
			gameList:[],
			matchList:[],
			guessList:[],
			tmArr:[],
			nowGuess:{},
			nowTmArr:[],
			betDataList:[],
			nowAnswer:{},
			nowItem:'',
			nowGameId:3,
			nowMatchId:1,
			categoryList:[],
			nowIndex:0
		}
	},
	created(){	
		if( !localStorage.getItem('nowIndex') ){
			localStorage.setItem('nowIndex',0)
		}
		this.nowIndex = localStorage.getItem('nowIndex');
		//获取竞猜id
		this.getGuessId();
		//获取竞猜信息
		this.getGuessDetail();
		//获取游戏列表
		this.getGameList();
		//获取赛事列表
		this.getMatchList();
		//获取竞猜列表
		this.getGuessList();
		//获取竞猜分类
		this.getCategoryList();
	},
	watch:{
		//获取赛事列表
		nowGameId:function(val){
			this.getMatchList(val);
		}
	},
	methods:{
		doAward(){
			var data = {
				guessid : this.guessId
			}
			$.getJSON(cmsUrl2+'officil/guess/bonuspay',data,function(json){
				if(json.errCode == 0){
					Alert($,"成功",'success',function(){
						window.location.reload();
					});
				}
				else{
					Alert($,json.errMsg,'error');
				}
			});
		},
		addCategory(){
			var data = {
				guessid : this.guessId
			}
			$.getJSON(cmsUrl2+'officil/guess/addcategory',data,function(json){
				if(json.errCode == 0){
					Alert($,"成功",'success',function(){
						window.location.reload();
					});
				}
				else{
					Alert($,json.errMsg,'error');
				}
			});
		},
		toggleGuess(index){
			localStorage.setItem('nowIndex',index);
			var data = {
				guessid : this.guessId,
				categoryindex: index
			}
			var _this = this;
			$.getJSON(cmsUrl2+'officil/guess/options/info',data,function(json){
				_this.guessList = json ? json.options : [];
				_this.nowIndex  = index;
			});
		},
		getCategoryList(){
			var data = {
				guessid : this.guessId
			}
			var _this = this;
			$.getJSON(cmsUrl2+'officil/guess/categorylength',data,function(json){
				for(var i=0; i<=json.categoryLength; i++){
					_this.categoryList.push(i);
				}
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
		//提交比分
		submitModal6(){
			var _this= this;
			$("#ajaxModal6").ajaxSubmit({
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
				url: cmsUrl2+'officil/guess/score/handler',
				type:'post',
				dataType:"json"
			});
		},
		//提交答案
		submitAnswer(){
			var _this= this;
			var data = {
				optionid:this.nowAnswer.id,
				answer:this.nowItem
			}
			$.getJSON(cmsUrl2+'officil/guess/options/setanswer',data,function(json){
				if(json.errCode == 0){
					Alert($,"成功",'success',function(){
						window.location.reload();
					});
				}
				else{
					Alert($,json.errMsg,'error');
				}
			});
		},

		//选择正确答案
		selectAnswer(key){
			this.nowItem = key;
		},

		//显示填写竞猜答案模态框
		showEditAnswer(id){
			$("#editAswerModal").modal('show');
			var _this = this;
			this.guessList.forEach(function(item){
				if(id == item.id){
					_this.nowAnswer = item;
				}
			});
			console.log(this.nowAnswer);
		},
		//投注数据
		showBetData(id){
			$("#betDataModal").modal('show');
			var _this = this;
			var data  = {
				optionid:id
			}
			$.getJSON(cmsUrl2+'officil/bet/list',data,function(json){
				_this.betDataList = json ? json.betList.list : [];
			});
		},
		//编辑竞猜
		editGuess(id){
			this.nowTmArr = [];
			$("#editGuessModal").modal('show');
			var _this = this;
			this.guessList.forEach(function(item){
				if(id == item.id){
					_this.nowGuess = item;
				}
			});
			for(var key in _this.nowGuess.questionItemsMap){
				var obj = {
					answer : _this.nowGuess.questionItemsMap[key],
					odd : _this.nowGuess.questionOddsMap[key]
				}
				_this.nowTmArr.push(obj);
			}
		},
		//提交编辑竞猜
		submitEditGuess(){
			var items = [];
			var odds  = [];
			var oddFlag = true;
			var anFlag  = true;
			this.nowTmArr.forEach(function(item,index){
				if(!item.odd){
					oddFlag = false;
				}
				if(!item.answer){
					anFlag = false;
				}
				items.push(item.answer);
				odds.push(item.odd);
			});
			if(!oddFlag){
				Alert($,"赔率不能为空！",'error');
				return false;
			}
			if(!anFlag){
				Alert($,"答案不能为空！",'error');
				return false;
			}
			var data = {
				type:"update",
				guessid:this.guessId,
				optionid:this.nowGuess.id,
				title:$("#title2").val(),
				items:items,
				odds:odds
			}
			$.getJSON(cmsUrl2+'officil/guess/options/handler',data,function(json){
				if(json.errCode == 0){
					Alert($,"发布成功",'success',function(){
						//window.location.reload();
					});
				}
				else{
					Alert($,json.errMsg,'error');
				}
			});
		},
		//添加题目
		editAddTm(){
			var obj = {
				answer:"",
				odd:""
			};
			this.nowTmArr.push(obj);
			/*if(this.nowTmArr.length == 6){
				Alert($,'题目答案不能超过六个！','warn');
				return false;
			}
			else {
				console.log(this.nowTmArr);
				this.nowTmArr.push(obj);
			}*/
		},
		//删除题目
		editDelTm(_index){
			var _this = this;
			this.nowTmArr.forEach(function(item,index){
				if(_index == index){
					_this.nowTmArr.splice(index,1);
				}
			});
		},
		//提交添加竞猜
		submitGuess(){
			var items = [];
			var odds  = [];
			this.tmArr.forEach(function(item,index){
				items.push(item.answer);
				odds.push(item.odd);
			});
			var data = {
				type:"add",
				guessid:this.guessId,
				title:$("#title").val(),
				items:items,
				odds:odds,
				categoryindex:this.nowIndex
			}
			$.getJSON(cmsUrl2+'officil/guess/options/handler',data,function(json){
				if(json.errCode == 0){
					Alert($,"发布成功",'success',function(){
						window.location.reload();
					});
				}
				else{
					Alert($,json.errMsg,'error');
				}
			});
		},
		//添加题目
		addTm(){
			var obj = {
				answer:"",
				odd:""
			};
			this.tmArr.push(obj);
		/*	if(this.tmArr.length == 6){
				Alert($,'题目答案不能超过六个！','warn');
				return false;
			}
			else {
				console.log(this.tmArr);
				this.tmArr.push(obj);
			}*/
		},
		//删除题目
		delTm(_index){
			var _this = this;
			this.tmArr.forEach(function(item,index){
				if(_index == index){
					_this.tmArr.splice(index,1);
				}
			});
		},
		//获取竞猜列表
		getGuessList(){
			var _this= this;
			var data = {
				categoryindex: this.nowIndex,
				guessid:this.guessId
			}
			$.getJSON(cmsUrl2+'officil/guess/options/info',data,function(json){
				_this.guessList = json ? json.options : [];
			});
		},
		//打开竞猜模态框
		openMyModal(type){
			if(type == 'myModal'){
				$("#"+type).modal('show');
				laydate.render({
					elem: '#enddate'
					,type: 'datetime'
				});
			}
			else{
				$("#"+type).modal('show');
			}
			Vue.nextTick(function(){
				imgHandle($("#t1img"));
				imgHandle($("#t2img"));
			});
		},

		//修改新竞猜
		createGuess(){
			var _this = this;
			$("#guessForm").ajaxSubmit({
				success:function(json){
					if(json.errCode == 0){
						Alert($,json.errMsg,'success',function(){
							window.location.href = "guessDetail.html?id="+_this.guessId;
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
		/*toggleGame(e){
			console.log(e.target.value);
			this.getMatchList(e.target.value);
		},*/
		//发布竞猜
		updateGuess(){
			var oddFlag = true;
			this.nowTmArr.forEach(function(item,index){
				if(!item.odd){
					oddFlag = false;
				}
			});
			if(!oddFlag){
				Alert($,"赔率不能为空！",'error');
				return false;
			}
			var _this= this;
			var data = {
				guessid:this.guessId,
				type:'publish'
			}
			$.getJSON(cmsUrl2+'officil/guess/state/update',data,function(json){
				if(json.errCode == 0){
					Alert($,"发布成功",'success',function(){
						window.location.reload();
					});
				}
				else{
					Alert($,json.errMsg,'error');
				}
			});
		},
		//停止投注
		stopBet(){
			var _this= this;
			var data = {
				guessid:this.guessId,
				type:'stop'
			}
			$.getJSON(cmsUrl2+'officil/guess/state/update',data,function(json){
				if(json.errCode == 0){
					Alert($,"成功",'success',function(){
						window.location.reload();
					});
				}
				else{
					Alert($,json.errMsg,'error');
				}
			});
		},
		getGameList(){
			var _this = this;
			$.getJSON(cmsUrl2+'officil/game/list',function(json){
				_this.gameList = json ? json.gameList : [];
			});
		},
		getMatchList(gid){ 
			console.log(this);
			var gid   = gid ? gid : this.nowGameId;
			var _this = this;
			$.getJSON(cmsUrl2+'officil/competition/list',{gameid:gid},function(json){
				_this.matchList = json ? json.competitionList : [];
				_this.nowMatchId = json.competitionList ? json.competitionList.id : 1;
				console.log();
				console.log(_this.nowMatchId);
			});
		},
		getGuessId(){
			var url = window.location.href;
			this.guessId = url.split('?')[1].split('=')[1];
		},
		getGuessDetail(){
			var _this= this;
			var data = {
				id:this.guessId
			}
			$.getJSON(cmsUrl2+'officil/guess/info',data,function(json){
				_this.guessInfo = json.guessInfo;
				_this.nowGameId = json.guessInfo.gameId;
			});
		}
	}
})

