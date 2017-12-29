new Vue({
	el:"#app",
	data(){
		return {
			matchid:1,
			guessInfo:{},
			guessList:[],
			nowGuess:{},
			guessId:0,
			betBeans:0,
			totalBean:0,
			betNum:1,
			memberBean:0,
			nowIndex:0,
			betanswer:'A',
			winTeamInfo:{},
			teamId:'',
			nowMatch:{},
			awardInfo:{},
			scheduInfo:{},
			matchRuleList:[
			{matchName:"积分循环赛",matchType:0},
			{matchName:"淘汰赛",matchType:1},
			{matchName:"单场赛",matchType:2}
			],
			nowMatchRule:0,
			isToggle:true,
			oGroupA:[],
			oGroupB:[],
			oGroupC:[],
			batIdList1:[],
			batIdList2:[],
			batIdList3:[],
			batIdList4:[],
			nowMatch : {},
			matchInfo:{},
			guessTips:'',
			winSum:''
		}
	},
	created(){
		this.getMatchId();
		this.getGuessInfo();
		this.getAward();
		this.getVoteList();
		this.getScheduInfo();
		//获取比赛信息
		this.getMatchInfo();
	},
	methods:{
		//切换赛制
		toggleMach(index){
			this.batIdList1=[];
			this.batIdList2=[];
			this.batIdList3=[];
			this.batIdList4=[];
			var _this = this;
			this.nowMatchRule = index;
			this.nowMatch = this.scheduInfo.groupList ? this.scheduInfo.groupList[index] : [];
			if(_this.nowMatch.groupRuleType == 'OUTLET'){
				_this.nowMatch.scheduleList.forEach(function(item){
					if(item.t1ParentBattleId == 0 && item.t2ParentBattleId == 0){
						_this.batIdList1.push(item);
					}
				});
				_this.nowMatch.scheduleList.forEach(function(item){
					_this.batIdList1.forEach(function(item2){
						if(item.battleId == item2.childBattleId){
							if($.inArray(item,_this.batIdList2) == -1){
								_this.batIdList2.push(item);
							}

						}
					});
				});
				_this.nowMatch.scheduleList.forEach(function(item){
					_this.batIdList2.forEach(function(item2){
						if(item.battleId == item2.childBattleId){
							if($.inArray(item,_this.batIdList3) == -1){
								_this.batIdList3.push(item);
							}
						}
					});
				});
				_this.nowMatch.scheduleList.forEach(function(item){
					_this.batIdList3.forEach(function(item2){
						if(item.battleId == item2.childBattleId){
							if($.inArray(item,_this.batIdList4) == -1){
								_this.batIdList4.push(item);
							}
						}
					});
				});
			}
		},
		//获取排赛信息
		getScheduInfo(){
			var data = {
				matchid : this.matchid
			}
			var _this = this;
			$.getJSON(slyUrl+"sports/match/group",data,function(json){
				_this.scheduInfo = json;
				_this.nowMatch = json.groupList ? json.groupList[0] : [];
				_this.oGroupA = json.groupList[0];
				_this.oGroupB = json.groupList[1];
				_this.oGroupC = json.groupList[2];
				if(_this.nowMatch){
					if(_this.nowMatch.groupRuleType == 'OUTLET'){
						_this.nowMatch.scheduleList.forEach(function(item){
							if(item.t1ParentBattleId == 0 && item.t2ParentBattleId == 0){
								_this.batIdList1.push(item);
							}
						});
						_this.nowMatch.scheduleList.forEach(function(item){
							_this.batIdList1.forEach(function(item2){
								if(item.battleId == item2.childBattleId){
									if($.inArray(item,_this.batIdList2) == -1){
										_this.batIdList2.push(item);
									}

								}
							});
						});
						_this.nowMatch.scheduleList.forEach(function(item){
							_this.batIdList2.forEach(function(item2){
								if(item.battleId == item2.childBattleId){
									if($.inArray(item,_this.batIdList3) == -1){
										_this.batIdList3.push(item);
									}
								}
							});
						});
						_this.nowMatch.scheduleList.forEach(function(item){
							_this.batIdList3.forEach(function(item2){
								if(item.battleId == item2.childBattleId){
									if($.inArray(item,_this.batIdList4) == -1){
										_this.batIdList4.push(item);
									}
								}
							});
						});
					}
				}
			});
		},
		//战队投票弹窗
		support(id,index){
			$(".support-popups,.mask").css({"display":"block"});
			this.nowMatch = this.winTeamInfo.voteList[index];
			this.teamId  = id;
			$(".mask,.close").on("click",function(){
				$(".mask,.support-popups").css({"display":"none"});
			});
		},
		//战队投票
		voteAjax(type){
			var data = {
				matchid:this.matchid,
				teamid: this.teamId,
				type:type
			}
			$.getJSON(slyUrl+'sports/m/vote/team',data,function(json){
				alert(json.errMsg);
				if(json.errCode == 0){
					window.location.reload();
				}
			});
		},
		//展开完整排名
		toggleVotelist(){
			if(this.isToggle){
				$(".votelist").css({"height":"auto"});
				this.isToggle =false;
				$("#changesjx").css({"border-bottom":"0.16rem solid #EF6095"});
				$("#changesjx").css({"border-top":"0 none"});
			}
			else {
				$(".votelist").css({"height":"4.13333rem"});
				this.isToggle =true;
				$("#changesjx").css({"border-top":"0.16rem solid #EF6095"});
				$("#changesjx").css({"border-bottom":"0 none"});
			}
		},
		//投票战队列表
		getVoteList(){
			var _this = this;
			var data = {
				matchid:this.matchid
			}
			$.getJSON(slyUrl+'sports/vote/team/list',data,function(json){
				_this.winTeamInfo = json;
			});
		},
		//获取matchid
		getMatchId(){
			var url = window.location.href;
			var matchid = url.split("?")[1].split('=')[1];
			this.matchid = matchid;
		},
		//我的奖励
		myAward(){
			$(".award-popups,.mask").css({"display":"block"});
			$(".mask,.close").on("click",function(){
				$(".mask,.award-popups").css({"display":"none"});
			});
		},
		//投票规则弹窗
		voteRule(){
			alertwindow("<p>您可以通过 [支持TA] 或 [买TA赢] 两种方式对参赛战队（个人）进行投票支持：</p><p>1. [支持TA]：为您支持的战队（个人）增加1人气值，每个用户只可投一票；</p> <p>2. [买TA赢]：选择您所看好的战队（个人）并买TA赢，除了将为其增加一定人气值之外，如果其最终夺冠，您将同所有支持该队的用户共同瓜分奖金池；您也可以重复支持不同的战队（个人）","投票规则</p>","取消");
			$(".bind-box").on("click",function(){
				$(".mask,.alertbind").css({"display":"none"});
			});
		},
		//选择答案
		selectAswer(index){
			this.nowIndex  = index;
			this.betanswer = this.nowGuess.questionItemsObj[index].questionLetter;
		},
		//获取matchid
		getMatchId(){
			var url = window.location.href;
			var matchid = url.split("?")[1].split('=')[1];
			this.matchid = matchid;
		},
		//打开模态框
		toggleModal(index){
			var _this = this;
			this.nowGuess  = this.guessInfo;
			this.totalBean = this.guessInfo.betBeans;
			this.betBeans = this.guessInfo.betBeans;
			this.guessId  = this.guessInfo.id;
			var data = {
				guessid : this.guessId
			}
			if(this.nowGuess.state != 1){
				$.getJSON(slyUrl+'sports/m/guess/betinfo',data,function(json){
					_this.winSum = json.winSum;
				});
			}
			$(".mask,.guess-popups").css({"display":"block"});
			$(".mask,.close").on("click",function(){
				$(".mask,.guess-popups").css({"display":"none"});
			});
		},
		getGuessInfo(){
			var _this = this;
			var data = {matchid:this.matchid}
			$.getJSON(slyUrl+'sports/index/guess/info',data,function(json){
				_this.guessInfo = json.guessInfo;
				_this.memberBean = json.memberBean ? json.memberBean.balanceBean : '';
			})
		},
		getAward(){
			var _this = this;
			var data = {matchid:this.matchid}
			$.getJSON(slyUrl+'sports/m/myvote/award',data,function(json){
				_this.awardInfo = json;
			})
		},
		//增加投注次数
		add(){
			this.betNum++;
			this.totalBean = this.betBeans * this.betNum;
		},
		//减少投注次数
		sub(){
			if(this.betNum > 1){
				this.betNum--;
				this.totalBean = this.betBeans * this.betNum;
			}
		},
		//提交竞猜
		submitAjax(){
			var data = {
				matchid   : this.matchid,
				guessid   : this.guessId,
				betanswer : this.betanswer,
				multiple  : this.betNum 
			}
			$.getJSON(slyUrl+'sports/m/guess/bet',data,function(json){
				alert(json.errMsg);
				if(json.errCode == 0){
					window.location.reload();
				}
			});
		},
		getMatchInfo(){
			var _this = this;
			var data = {
				id:this.matchid
			}
			var url = window.location.href;
			$.getJSON(slyUrl+'sports/match/info',data,function(json){
				_this.matchInfo = json.matchInfo;
			});
		}
	}
})
$(".mask,.bind-box").on("click",function(){
	$(".mask,.award-popups,.guess-popups,.alertbind,.support-popups").css({"display":"none"});
});