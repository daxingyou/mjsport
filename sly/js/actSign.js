new Vue({
	el:"#app",
	data(){
		return {
			matchid:'',
			matchInfo:{},
			teamInfo:{
				enrollState:999999,
				hotNum:999999,
				id:999999,
				logo:"xxx",
				memberId:999999,
				name:"",
				signState:999999,
				teamMemberList:[]
			},
			loginMemberId:'',
			memberId : 0,
			corpsList:[],
			teamid : 999999,
			findTeamInfo:null,
			captainInfo: {},
			groupList:[],
			netbarMember:''
		}
	},
	created(){
		//获取比赛id
		this.getMatchId();
		//获取比赛信息
		this.getMatchInfo();	
		//获取我的战队信息
		this.getMyTeam();
		//获取已参赛战队列表
		this.getCorpsList();
		//获取排赛列表
		this.getScheduleList();
	},	
	methods:{

		//获取排赛列表
		getScheduleList(){
			var _this = this;
			var data = {
				matchid: this.matchid
			}
			$.getJSON(slyUrl+'sports/match/group',data,function(json){
				if(json.groupList.length){
					window.location.href = 'guessIndex.html?id='+_this.matchid;
				}
			});
		},
		//邀请好友
		invite(){
			console.log("123");
			$("#share-modal,#modal-mask").css({"display":"block"});
			$("#modal-mask,#fork").on("click",function(){
				$("#share-modal,#modal-mask").css({"display":"none"});
			});
		},
		//获取已参赛战队列表
		getCorpsList(){
			var _this = this;
			var data = {
				matchid:this.matchid
			}
			$.getJSON(slyUrl+'sports/team/list',data,function(json){
				_this.corpsList = json.teamList.list;	
			});
		},
		//退出战队
		quitCorps(){
			var _this = this;
			var data  = {
				matchid:this.matchid,
				teamid:this.teamInfo.id
			}
			$.getJSON(slyUrl+'sports/m/team/quit',data,function(json){
				alert(json.errMsg);
				if(json.errCode == 0){
					window.location.href="actSign.html?id="+_this.matchid;
				}
			});
		},
		//立即报名
		signUp(){
			var url = window.location.href;
			var _this = this;
			var data = {
				matchid:this.matchid,
				teamid:this.teamInfo.id
			}
			$.getJSON(slyUrl+'sports/m/team/enroll',data,function(json){
				alert(json.errMsg);
				window.location.href = url;
			});
		},
		//提交创建战队
		ajaxSubmitCorps(){
			var url  = window.location.href;
			$("#CorpsModal").ajaxSubmit({
				success:function(json){
					alert(json.errMsg);
					if(json.errCode == 0){
						window.location.href = url+'&teamid='+json.teamInfo.id
					}
				},
				url: slyUrl+'sports/m/team/add',
				type:'post',
				dataType:"json"
			});
		},
		//创建个人信息并且报名
		ajaxSubmitCorps(){
			var url  = window.location.href;
			$("#CorpsModal").ajaxSubmit({
				success:function(json){
					alert(json.errMsg);
					window.location.href = url+'&teamid='+json.teamInfo.id+'&time='+new Date().getTime();
				},
				url: slyUrl+'sports/m/team/add',
				type:'post',
				dataType:"json"
			});
		},
		//创建战队
		createCorps(){
			//if(this.netbarMember == 0 && this.matchInfo.enrollLimit != 'ALL'){
			//	alert("非网吧会员不能创建战队");
			//	return false;
			//}
			$("#CorpsModal,.msak").css({"display":"block"});
			$(".msak,.close").on("click",function(){
				$("#CorpsModal,.msak").css({"display":"none"});
			});
			$("#img").on("change",function(){
				console.log(this.files[0]);
				uploadFile(this,$("#imgShow"),80,80);
				//$("#imgShow").html("<img src='"+this.files[0]+"'alt='"+this.value+"'/>");
			})
		},
		//创建个人信息并且立即报名
		createBm(){
			var url  = window.location.href;
			$("#nowBm").ajaxSubmit({
				success:function(json){
					alert(json.errMsg);
					window.location.href = url+'&time='+new Date().getTime();
				},
				url: slyUrl+'sports/m/team/add',
				type:'post',
				dataType:"json"
			});
		},
		//创建个人信息并且报名的弹窗
		createPerson(){
			$("#nowBm,.msak").css({"display":"block"});
			$(".msak,.close").on("click",function(){
				$("#nowBm,.msak").css({"display":"none"});
			});	
		},
		//加入战队模态框
		joinCorps(){
			if(this.netbarMember == 0 && this.matchInfo.enrollLimit != 'ALL'){
				alert("非网吧会员不能创建战队");
				return false;
			}
			$("#joinModal,.msak").css({"display":"block"});
			$(".msak,.close").on("click",function(){
				$("#joinModal,.msak").css({"display":"none"});
			});
		},	
		//提交加入战队
		joinAjax(){
			var url = window.location.href;
			var data = {
				matchid:this.matchid,
				teamid : this.teamid,
				realname: $("#realname").val(),
				mobile  : $("#mobile").val(),
				levelname  : $("#levelname").val()
			}
			$.getJSON(slyUrl+'sports/m/team/join',data,function(json){
				alert(json.errMsg);
				window.location.href = url+'&time='+new Date().getTime();
			});
		},
		//获取我的队伍信息
		getMyTeam(){
			var _this = this;
			var data = {
				matchid:this.matchid
			}
			$.getJSON(slyUrl+'sports/m/myteam',data,function(json){
				if(json.teamInfo){
					$.extend(true,_this.teamInfo,json.teamInfo);
					// _this.teamInfo = json.teamInfo;
				}
				_this.memberId = json.teamInfo ? json.teamInfo.memberId : 0;
			});
		},
		getMatchId(){
			var _this = this;
			var url  = window.location.href;
			this.matchid = url.match(/id=(\d*)/)[1];
			if(url.indexOf('teamid=')>=0){
				this.teamid  = url.match(/teamid=(\d*)/)[1];
				console.log(this.teamid);
				var data = {
					teamid : this.teamid
				}
				if(this.teamid != 999999){
					$.getJSON(slyUrl+'sports/m/team/find',data,function(json){
						_this.findTeamInfo = json;
						_this.captainInfo = json.teamInfo.teamMemberList[0];
					});
				}
			}
			
		},
		getMatchInfo(){
			var _this = this;
			var data = {
				id:this.matchid
			}
			var url = window.location.href;
			$.getJSON(slyUrl+'sports/match/info',data,function(json){
				console.log(_this.teamid);
				isLogin(json.loginMemberId,'actSign',_this.matchid,_this.teamid);
				_this.loginMemberId = json.loginMemberId;
				_this.matchInfo = json.matchInfo;
				_this.netbarMember = json.netbarMember;
				shareWx('邀请您加入战队，快来一起征战吧',json.matchInfo.name+'报名中，等你来战！',url,json.matchInfo.poster);
			});
		}	
	}

})

$("#modal-mask,#fork").on("click",function(){
	$("#share-modal,#modal-mask").css({"display":"none"});
});

