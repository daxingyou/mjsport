var url   = window.location.href;
new Vue({
	el:"#app",
	data(){
		return {
			nowAnswer:{},
			guessInfo:{},
			nowGuess:{},
			nowTmArr:[],
			nowItem:'',
			matchDetail:'',
			nowState   : 1,
			stateList: [
			{state:0,name:'组队中',memberNum:0},
			{state:1,name:'待审核',memberNum:0},
			{state:2,name:'已通过',memberNum:0},
			{state:3,name:'未通过',memberNum:0},
			],
			stateCnt:{},
			teamList:[],
			matchid : '',
			signCnt : '',
			teamMemberList1:{},
			teamMemberList : [],
			matchGuessList : [],
			nowGuessItem   : {},
			tmArr : [],
			editTmArr : [],
			betDataList : [],
			voteCount   : {award:'',awardPond:'',feeMemberCnt:'',freeMemberCnt:''},
			voteList    : [],
			nowVoteDetail: {},
			nowVoteDetailList : [],
			voteSetData :{id:'',votetitle:"",voteantes:'',feevote:1},
			voteTeamList: [],
			navTabs:[
			{id:1,name:'参赛信息',isActive:true},
			{id:2,name:'赛事竞猜',isActive:false},
			{id:3,name:'投票',isActive:false},
			{id:4,name:'赛程列表',isActive:false}
			],
			ScheduleList:[],
			oGroupA:null,
			oGroupB:null,
			oGroupC:null,
			battleDataList:[],
			batIdList1:[],
			batIdList2:[],
			batIdList3:[],
			batIdList4:[],
			corpsList:[],
			grounpList:[],
			battleId:'',
			nowGrounpId:'',
			type:1,
			startBetid:0,
			startbetdate:"",
		}
	},
	created(){

		//初始化matchid
		var _this = this;
		this.matchid  = url.split('?')[1].split('=')[1];
		this.voteSetData.id = this.matchid;

		//初始化localStorage的值
		if( !localStorage.getItem('nowState') ){
			localStorage.setItem('nowState',1)
		}
		if( !localStorage.getItem('nowState2') ){
			localStorage.setItem('nowState2',0)
		}
		this.nowState = localStorage.getItem('nowState2');

		//初始化标签页
		this.navTabs.forEach(function(item){
			if(item.id == localStorage.getItem('nowState') ){
				item.isActive = true;
			}
			else {
				item.isActive = false;
			}
		});
		//获取比赛详情
		this.getMatchDetail({id:this.matchid});

		//获取参赛列表
		//this.getCompetitionList(this.matchid,this.nowState);
		this.tabsToggle(localStorage.getItem('nowState'));
		//获取战队列表
		this.getCorpsList();
		
	},
	methods:{
		getCorpsList(){
			var _this = this;
			var data = {
				matchid:this.matchid
			}
			$.getJSON(cmsUrl2+'sports/match/group/teamlist',data,function(json){
				_this.corpsList = json.groupTeamList;
				console.log(json);
			});
		},
		//排赛小组成员相关操作
		hiddenScheduleDialog(index,index2){
			$(".matches-item" ).eq(index).find(".crops .schedule-dialog").eq(index2).css({"display":"none"});
		},
		//排赛小组成员相关操作
		showScheduleDialog(index,index2){
			$(".matches-item" ).eq(index).find(".crops .schedule-dialog").eq(index2).css({"display":"block"});
		},
		//打开排赛详情
		openDetail(battleId,groupId){
			this.nowGrounpId = groupId;
			this.battleId = battleId;
			console.log(groupId);
			var _this = this;
			$('#scheduleDetailModal').modal('show');
			var data = {
				matchid : this.matchid,
				battleid: battleId
			}
			$.getJSON(cmsUrl2+'sports/match/battledata/list',data,function(json){
				_this.battleDataList = json.battleDataList;
			});
		},
		//限制晋级模式
		
		//提交回合详情
		ajaxSure(){
			var _this = this;
			var t1headnum = [];
			var t2headnum = [];
			var winteamid = [];
			var loseteamid= [];
			var bo        = [];
			console.log(this.battleDataList);
			this.battleDataList.forEach(function(item,index){
				if(item.winTeamId != 0){
					t1headnum.push(item.t1HeadNum);
					t2headnum.push(item.t2HeadNum);
					bo.push(item.bo);
					var winid = item.t1Id == item.winTeamId ? item.t1Id : item.t2Id ;
					winteamid.push(winid);
					var loseid= item.t1Id == item.winTeamId ? item.t2Id : item.t1Id ;
					loseteamid.push(loseid);
				}
			});
			var data = {
				matchid : this.matchid,
				battleid : this.battleId,
				groupid  : this.nowGrounpId,
				bo       :bo,
				t1headnum: t1headnum,
				t2headnum: t2headnum,
				winteamid : winteamid,
				loseteamid: loseteamid
			}
			console.log(data);
			$.getJSON(cmsUrl2+'sports/match/battledata/update',data,function(json){
				alert(json.errMsg);
				if(json.errCode == 0){
					window.location.reload();
				}
			});
		},
		//获取小组排赛列表
		getScheduleDetailList(){
			var _this = this;
			var data = {
				matchid : this.matchid
			}
			$.getJSON(cmsUrl2+'sports/match/group/index',data,function(json){
				_this.grounpList = json.groupList;
			});
		},	
		//获取排赛列表
		getScheduleList(){
			var _this = this;
			var data = {
				matchid : this.matchid
			}
			$.getJSON(cmsUrl2+'sports/match/group/list',data,function(json){
				_this.ScheduleList = json.groupList;
				// $.(true,_this.ScheduleList,json.groupList);
				console.log(_this.ScheduleList);
			});
		},
		//新增小组
		addGroup(){
			var obj = {
				bo:1,
				matchData:'',
				matchid:this.matchid,
				memberCnt:2,
				name:'',
				netbarId:100001,
				outletMemberCnt:1,
				ruleType:'POINT',
				teamList:[]
			};
			this.ScheduleList.push(obj);
			console.log(this.ScheduleList);
		},
		//显示小组战队下拉列表
		showCorpsList(index,index2){
			$(".matches-item" ).eq(index).find(".crops .team-select-modal").eq(index2).css({"display":"block"});
		},
		//重置小组战队
		resetCorps(index,index2,event){
			var _this = this;
			var _index = event.target.value;
			var isFlag = false;
			console.log(_this.corpsList[_index]);
			this.ScheduleList[index].teamList.filter(function(item){
				if(item.teamId == _this.corpsList[_index].teamId ){
					isFlag = true;
					return false;
				}
			});
			if(isFlag){
				alert("不能选择重复的战队！");
				return false;
			}
			this.ScheduleList[index].teamList[index2] = this.corpsList[_index];
			// $.extend(true,this.ScheduleList[index].teamList[index2],this.corpsList[_index]);
			Vue.set(this.ScheduleList[index].teamList,index2,this.corpsList[_index]);
		},
		//删除小组战队
		delTeam(index,index2){
			this.ScheduleList[index].teamList.splice(index2,1);
		},
		//修改小组战队名称
		editCorps(index,index2,event){
			this.ScheduleList[index].teamList[index2].inputTeamName = event.target.value;
		},
		//清空排赛
		clearSchedule(index){
			var obj = {
				bo : '',
				id: 2,
				matchDate:'',
				matchFinished:'',
				matchId:'',
				memberCnt:'',
				name:'',
				netbarId:100001,
				outletMemberCnt:'',
				ruleType:'',
				teamList:[]
			}
			Vue.set(this.ScheduleList,index,obj);
		},
		//添加小组战队
		addTeam(index){
			console.log(this.ScheduleList[index].teamList);
			var obj = {
				id:0,
				teamLogo:'http://static.jesport.com/backend2/images/icon-default.png',
				teamName:'',
				teamId : 0,
				inputTeamName:'默认',
				matchGroupId:0,
				matchId:0,
				netbarId:0
			}

			if(this.ScheduleList[index].teamList.length == this.ScheduleList[index].memberCnt){
				Alert($,'添加小组不能超过'+this.ScheduleList[index].memberCnt+'组','error');
				return false;
			}else {
				this.ScheduleList[index].teamList.push(obj);
			}
			console.log(this.ScheduleList[index].teamList);
		},
		//编辑排赛
		editSchedule(index){
			$(".matches-item" ).eq(index).find('.editSchedule,.matches-name').css({"display":"none"});
			$(".matches-item" ).eq(index).find('.submitSchedule,.clearSchedule').css({"display":"block"});
			$(".matches-item" ).eq(index).find('form').css({height:"415px","overflow":"hidden"});
		},
		//确定排赛
		submitSchedule(index){
			if(this.ScheduleList[index].teamList.length != this.ScheduleList[index].memberCnt){
				Alert($,'添加小组必须为'+this.ScheduleList[index].memberCnt+'组','error');
				return false;
			}
			var _this = this;
			var teamids = [];
			console.log(this.ScheduleList[index].teamList);
			this.ScheduleList[index].teamList.forEach(function(item){
				if(!item.inputTeamName){
					teamids.push(item.teamId);
				}
				else {
					teamids.push(item.inputTeamName);
				}
			});
			console.log(this.ScheduleList[index].matchDate);
			var data = {
				matchdate: this.ScheduleList[index].matchDate,
				matchid : this.matchid,
				groupid : this.ScheduleList[index].id,
				name    : this.ScheduleList[index].name,
				ruletype: this.ScheduleList[index].ruleType,
				membercnt: this.ScheduleList[index].memberCnt,
				outletmembercnt: this.ScheduleList[index].outletMemberCnt,
				bo: this.ScheduleList[index].bo,
				teamids: teamids
			}
			console.log(data);
			if(data.ruletype == 'SINGLE'){
				if(data.membercnt != 2 || data.outletmembercnt !=1){
					Alert($,'单场赛晋级模式必须为2进1','error');
					return  false;
				}
			}
			else if(data.ruletype == 'OUTLET'){
				if(data.membercnt != 8 || data.membercnt != 4 ||  data.outletmembercnt !=1 || data.outletmembercnt !=2 || data.outletmembercnt !=4){
					Alert($,'淘汰赛模式必须为8进1/8进2/8进4/4进1/4进2','error');
					return  false;
				}
			}
			//else if(data.ruletype == 'POINT'){
			//	if(data.membercnt < data.outletmembercnt ){
			//		Alert($,'积分循环赛可填写m进n,m必须大于n','error');
			//		return  false;
			//	}
			//}
			$.getJSON(cmsUrl2+'sports/match/group/rank',data,function(json){
				if(json.errCode == 0){
					Alert($,"排赛成功",'success');
					$(".matches-item" ).eq(index).find('form').css({height:"0px","overflow":"hidden"});
					$(".matches-item" ).eq(index).find('.editSchedule').css({"display":"block"});
					$(".matches-item" ).eq(index).find('.submitSchedule,.clearSchedule').css({"display":"none"});
					$(".matches-item" ).eq(index).find('.editSchedule,.matches-name').css({"display":"block"});
				}
				else{
					Alert($,json.errMsg,'error');
				}
			});
		},
		//tab切换
		tabsToggle(id){
			localStorage.setItem('nowState',id)
			if(id == 3){
				//获取投票数据
				this.getVoteData();
			}
			else if(id ==2 ){
				//获取比赛竞猜列表
				this.getMatchGuess(this.matchid);
			}
			else if(id ==1){
				//获取参赛列表
				this.getCompetitionList(this.matchid,this.nowState);
			}
			else if(id == 4){
				//获取排赛列表
				this.getScheduleList();
				this.getScheduleDetailList();
			}
			this.navTabs.forEach(function(item){
				console.log(item);
				if(item.id == id){
					item.isActive = true;
				}
				else {
					item.isActive = false;
				}
			});
		},
		//生成签到二维码
		showSignCode(){
			$('#signCodeModal').modal('show');
			$("#qrcode-box").qrcode({
					width       : 256,     //设置宽度  
					height      : 256,     //设置高度  
					typeNumber  : -1,      //计算模式  
					background      : "#ffffff",//背景颜色  
					foreground      : "#000000", //前景颜色 
					text     : "https://github.com/jeromeetienne/jquery-qrcode"
				}); 
			var canvas=$("#qrcode-box").find('canvas').get(0);  
			$("#downImg").attr('href',canvas.toDataURL('image/jpg'));  
		},
		//手动录入
		showEntering(){
			console.log(this.matchDetail.enrollType);
			console.log(this.matchDetail.id);
			if(this.matchDetail.enrollType !='PERSON'){
				$('#enteringModal1').modal('show');
				$("#matchid").val(this.matchDetail.id);
				$("#logo").on("change",function(){
					console.log(this.files[0]);
					uploadFile2(this,$("#logoimg"),100,100);
				});
				$("#avatar").on("change",function(){
					console.log(this.files[0]);
					uploadFile2(this,$("#avatarShow"),80,80);
				});
			}else{
				$('#enteringModal2').modal('show');
				$("#matchid2").val(this.matchDetail.id);
				$("#avatar2").on("change",function(){
					console.log(this.files[0]);
					uploadFile2(this,$("#avatarShow2"),80,80);
				});
			}
		},
		submitEntering(){
			if(this.matchDetail.enrollType!='PERSON'){
				$("#enteringForm1").ajaxSubmit({
					success:function(json){
						$(this).on("click");
						if(json.errCode == 0){
							Alert($,json.errMsg,'success',function(){
								window.location.reload();
							});
						}
						else if(json.errCode == '10073'){
							Alert($,json.errMsg,'error');
						}
						else{
							Alert($,'参数错误，请填写正确的参数！','error');
						}
					},
					url: cmsUrl2+'sports/match/team/add',
					type:'post',
					dataType:"json"
				});
			}else{
				$("#enteringForm2").ajaxSubmit({
					success:function(json){
						$(this).on("click");
						if(json.errCode == 0){
							Alert($,json.errMsg,'success',function(){
								window.location.reload();
							});
						}
						else if(json.errCode == '10073'){
							Alert($,json.errMsg,'error');
						}
						else{
							Alert($,'参数错误，请填写正确的参数！','error');
						}
					},
					url: cmsUrl2+'sports/match/team/add',
					type:'post',
					dataType:"json"
				});
			}
			//Alert($,'success','success',function(){
			//	window.location.reload();
			//});
		},
		//方法投票奖励ajax
		ajaxVoteAward(){
			var data = {
				matchid : this.matchid,
				teamid  : $("#teamid").val()
			}
			$.getJSON(cmsUrl2+'sports/match/vote/awardpay',data,function(json){
				console.log(json);
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
		//显示发放投票奖励模态框
		showPutVoteAward(){
			var _this = this;
			$('#showPutVoteAward').modal('show');
			var data = {
				matchid : this.matchid
			}
			$.getJSON(cmsUrl2+'sports/match/vote/listteam',data,function(json){
				_this.voteTeamList = json.teamList;
			});
		},
		//显示投票设置模态框
		getvoteSetModal(){
			$('#voteSetModal').modal('show');
		},
		//发送投票设置请求
		ajaxVoteSet(){
			$.getJSON(cmsUrl2+'sports/match/vote/setting',this.voteSetData,function(json){
				console.log(json);
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
		//获取投票详情
		getVoteDetail(item){
			var _this = this;
			var data  = {
				matchid: this.matchid,
				teamid : item.teamId
			}
			this.nowVoteDetail = item;
			$('#voteDetailModal').modal('show');
			$.getJSON(cmsUrl2+'sports/match/vote/detail',data,function(json){
				_this.nowVoteDetailList = $.extend(true,[],json.voteList);
			});
		},
		//获取投票数据
		getVoteData(){
			var _this = this;
			var data = {
				matchid : this.matchid
			}
			$.getJSON(cmsUrl2+'sports/match/vote/list',data,function(json){
				_this.voteCount.award = json.award;
				_this.voteCount.awardPond = json.awardPond;
				_this.voteCount.feeMemberCnt = json.feeMemberCnt;
				_this.voteCount.freeMemberCnt = json.freeMemberCnt;
				_this.voteList  =  json.voteList;
			});
		},	
		//投注数据模态框
		betDataModal(id){
			var _this = this;
			$('#betDataList').modal('show');
			console.log(this.nowGuessItem);
			this.matchGuessList.forEach(function(item,index){
				if(item.id == id ){
					_this.nowGuessItem =  $.extend(true,{},item);
				}
			});
			var data = {
				matchid : this.matchid,
				guessid : this.nowGuessItem.id	
			}
			$.getJSON(cmsUrl2+'sports/match/guess/data',data,function(json){
				if(json.errCode == 0){
					_this.betDataList =  $.extend(true,{},json.dataList);
				}
				else{
					Alert($,json.errMsg,'error');
				}
			});
		},
		//提交答案
		submitAnswer(){
			var _this= this;
			var data = {
				id:this.nowAnswer.id,
				answer:this.nowItem
			}
			$.getJSON(cmsUrl2+'sports/match/guess/setanswer',data,function(json){
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
			this.matchGuessList.forEach(function(item){
				if(id == item.id){
					_this.nowAnswer = item;
				}
			});
			console.log(this.nowAnswer);
		},
		//开启投注
		startBet(id){
			$('#startBet').modal('show');
			laydate.render({
				elem: '#enddate3'
				,type: 'datetime'
			});
			this.startBetid=id;
		},
		submitStartBet(){
			this.startbetdate=$("#enddate3").val();
			var data = {
				id : this.startBetid,
				enddate : this.startbetdate
			}
			console.log(data);
			$.getJSON(cmsUrl2+'sports/match/guess/setstate',data,function(json){
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
		//停止投注
		stopBet(id,state){
			var data = {
				id : id,
				state : state
			}
			$.getJSON(cmsUrl2+'sports/match/guess/setstate',data,function(json){
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
		//编辑竞猜模态框
		editGuess(id){
			this.nowTmArr = [];
			$("#editGuessModal").modal('show');
			var _this = this;
			this.matchGuessList.forEach(function(item){
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
						window.location.reload();
					});
				}
				else{
					Alert($,json.errMsg,'error');
				}
			});
		},
		submitEditGuess2(){
			var questionitems = [];
			var questionodds  = [];
			var oddFlag = true;
			var anFlag  = true;
			this.nowTmArr.forEach(function(item,index){
				if(!item.odd){
					oddFlag = false;
				}
				if(!item.answer){
					anFlag = false;
				}
				questionitems.push(item.answer);
				questionodds.push(item.odd);
			});
			if(!oddFlag){
				Alert($,"赔率不能为空！",'error');
				return false;
			}
			if(!anFlag){
				Alert($,"答案不能为空！",'error');
				return false;
			}
			console.log(this.nowGuess)
			var data = {
				type:"update",
				matchid:this.matchid,
				id:this.nowGuess.id,
				title:this.nowGuess.title,
				questiontitle:this.nowGuess.questionTitle,
				enddate:this.nowGuess.endDate,
				questionitems:questionitems,
				questionodds:questionodds,
			}
			$.getJSON(cmsUrl2+'sports/match/guess/handler',data,function(json){
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
		//提交编辑竞猜
		submitGuess2(){
			console.log($("#title2").val());
			if($("#startdate2").val() > $("#enddate2").val()){
				Alert($,"开始时间不能晚于结束时间！",'error');
				return false;
			}
			var data = {
				id     : $("#id2").val(),
				matchid: this.matchid,
				type:$("#type2").val(),
				title:$("#title2").val(),
				questiontitle:$("#questiontitle2").val(),
				questionitems:this.editTmArr,
				antes:$("#antes2").val(),
				betbeans:$("#betBeans2").val(),
				startdate:$("#startdate2").val(),
				enddate:$("#enddate2").val(),
				onlinestate:$("#onlinestate2").val()
			}
			$.getJSON(cmsUrl2+'sports/match/guess/handler',data,function(json){
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
		//提交添加竞猜
		submitGuess(){
			console.log($("#startdate").val() > $("#enddate").val());
			if( $("#startdate").val() > $("#enddate").val() ){
				Alert($,"开始时间不能晚于结束时间！",'error');
				return false;
			}
			var items = [];
			var odds  = [];
			this.tmArr.forEach(function(item,index){
				items.push(item.answer);
				odds.push(item.odd);
			});
			var data = {
				matchid: this.matchid,
				type:$("#type").val(),
				title:$("#title").val(),
				questiontitle:$("#questiontitle").val(),
				questionitems:items,
				questionodds:odds,
				startdate:$("#startdate").val(),
				enddate:$("#enddate").val(),
				onlinestate:$("#onlinestate").val()
			}
			$.getJSON(cmsUrl2+'sports/match/guess/handler',data,function(json){
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
		//删除编辑题目
		delEditTm(_index){
			var _this = this;
			this.editTmArr.forEach(function(item,index){
				if(_index == index){
					_this.editTmArr.splice(index,1);
				}
			});
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
		//添加编辑题目
		addEditTm(){
			var str = '';
			if(this.editTmArr.length == 10){
				Alert($,'题目答案不能超过十个！','warn');
				return false;
			}
			else {
				console.log(this.editTmArr);
				this.editTmArr.push(str);
			}
		},
		//添加题目
		addTm(){
			//var str = '';
			//if(this.tmArr.length == 10){
			//	Alert($,'题目答案不能超过十个！','warn');
			//	return false;
			//}
			//else {
			//	console.log(this.tmArr);
			//	this.tmArr.push(str);
			//}
			var obj = {
				answer:"",
				odd:""
			};
			this.tmArr.push(obj);
		},
		//排赛模态框
		showScheduleModal(){
			$('#showScheduleModal').modal('show');
			$(".matches-item" ).find('form').css({height:"0px","overflow":"hidden"});
			$(".matches-item" ).find('.editSchedule').css({"display":"block"});
			$(".matches-item" ).find('.submitSchedule,.clearSchedule').css({"display":"none"});
		},
		//添加竞猜模态框
		addGuessModal(){
			$('#addGuessModal').modal('show');
			laydate.render({
				elem: '#startdate'
				,type: 'datetime'
			});
			laydate.render({
				elem: '#enddate'
				,type: 'datetime'
			});
		},
		//获取比赛竞猜列表
		getMatchGuess(matchid){
			var _this = this;
			var data = {
				matchid:matchid
			}
			$.getJSON(cmsUrl2+'sports/match/guess/list',data,function(json){
				_this.matchGuessList = json.guessList;
				console.log(_this.matchGuessList);
			});
		},
		//发布比赛
		publishMatch(id){
			var data = {
				id : id
			}
			$.getJSON(cmsUrl2+'sports/match/publish',data,function(json){
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
		//通过战队报名
		pass(id){
			var data = {
				teamid : id,
				state  : 2
			}
			$.getJSON(cmsUrl2+'sports/team/handler',data,function(json){
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
		//拒绝战队报名
		reject(id){
			var data = {
				teamid : id,
				state  : 3
			}
			$.getJSON(cmsUrl2+'sports/team/handler',data,function(json){
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
		//获取当前状态
		getNowState(state){
			localStorage.setItem('nowState2',state);
			this.nowState = state;
			this.getCompetitionList(this.matchid,state);
		},
		//获取比赛详情
		getMatchDetail(data){
			var _this = this;
			$.getJSON(cmsUrl2+'sports/match/info',data,function(json){
				_this.matchDetail = json.matchInfo;
				//_this.voteSetData.votebeans = json.matchInfo.voteBeans;
				_this.voteSetData.voteantes = json.matchInfo.voteAntes;
				_this.voteSetData.feevote = json.matchInfo.feeVote;
				_this.voteSetData.votetitle = json.matchInfo.voteTitle;
				console.log(_this.voteSetData);
			})
		},
		//获取参赛列表
		getCompetitionList(matchid,state){
			var _this = this;
			var data = {
				matchid : matchid,
				state   : state
			}
			$.getJSON(cmsUrl2+'sports/team/list',data,function(json){
				//参赛人数显示
				_this.stateCnt = json.stateCnt;
				console.log(json)
				for(var i in json.stateCnt ){
					if( i!='signCnt' ){
						_this.stateList[i].memberNum = json.stateCnt[i];
						//console.log(_this.stateList[i].memberNum);
					}
					else {
						_this.signCnt = json.stateCnt[i];
					}
				}
				//队伍列表
				if(json.teamList.length){
					var obj = json.teamList.length ? json.teamList[0].teamMemberList[0] : [];
					console.log(json.teamList[0].teamMemberList);
					json.teamList[0].teamMemberList.forEach(function(item,index){
						if(index){
							_this.teamMemberList.push(item);
						}
					});	
					_this.teamList = json.teamList;
					_this.teamMemberList1 = json.teamList[0].teamMemberList[0];

				}
				else {
					console.log(json.teamList);
					_this.teamList = json.teamList;
				}
				
			});
		},
		//编辑战队信息
		toggleModal(){
			$('#myModal').modal('show');
			//预览图片以及图片判断
			$("#img").on("change",function(){
				uploadFile(this,$("#preimg"),750,320);
			});
			laydate.render({
				elem: '#startdate0'
			});
			laydate.render({
				elem: '#enddate0'
			});
			laydate.render({
				elem: '#enrollenddate'
				,type: 'datetime'
			});
			$("#preimg").html('<img width="300" height="124" src="' + this.matchDetail.poster + '" />');
			$("#name").val(this.matchDetail.name);
			$("#id").val(this.matchDetail.id);
			$("#gamename").val(this.matchDetail.gameName);
			$("#enrolltype").val(this.matchDetail.enrollType);
			$("#teamnum").val(this.matchDetail.teamNum);
			$("#addr").val(this.matchDetail.addr);
			$("#startdate0").val(this.matchDetail.startDate);
			$("#enddate0").val(this.matchDetail.endDate);
			$("#enrollenddate").val(this.matchDetail.enrollEndDate);
			$("#enrolllimit").val(this.matchDetail.enrollLimit);
			$("#teamnum").val(this.matchDetail.teamNum);
			$("#awarddesc").val(this.matchDetail.awardDesc);
			$("#enrollfee").val(this.matchDetail.enrollFee);
			$("#caption").val(this.matchDetail.caption);

		},
		//提交战队编辑信息
		ajaxSubmit(){
			$("#ajaxForm").ajaxSubmit({
				success:function(json){
					$(this).on("click");
					if(json.errCode == 0){
						Alert($,json.errMsg,'success',function(){
							window.location.reload();
						});
					}
					else if(json.errCode == '10073'){
						Alert($,json.errMsg,'error');
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
});
$("#close").on("click",function(){
	window.location.reload();
});