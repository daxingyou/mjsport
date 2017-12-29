new Vue({
	el:"#app",
	data(){
		return {
			matchid:'',
			matchInfo:{},
			teamInfo:{
				enrollState:999999,
				hotNum:99999,
				id:99999999,
				logo:"xxx",
				memberId:9999999,
				name:"",
				signState:999999,
				teamMemberList:[]
			},
			loginMemberId:'',
			memberId : 0,
			corpsList:[]
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
			var data = {
				matchid: this.matchid
			}
			$.getJSON(slyUrl+'sports/match/group',data,function(json){
				console.log(json);
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
			var data = {
				matchid:this.matchid,
				teamid:this.teamInfo.id
			}
			$.getJSON(slyUrl+'sports/m/team/quit',data,function(json){
				alert(json.errMsg);
				if(json.errCode == 0){
					window.location.reload();
				}
			});
		},
		//立即报名
		signUp(){
			var _this = this;
			var data = {
				matchid:this.matchid,
				teamid:this.teamInfo.id
			}
			$.getJSON(slyUrl+'sports/m/team/enroll',data,function(json){
				alert(json.errMsg);
				if(json.errCode == 0){
					window.location.reload();
				}
			});
		},
		//个人立即报名
		signUp2(){
			var _this = this;
			var data = {
				matchid:this.matchid
			}
			$.getJSON(slyUrl+'sports/m/team/enroll',data,function(json){
				alert(json.errMsg);
				if(json.errCode == 0){
					window.location.reload();
				}
			});
		},
		//提交创建战队
		ajaxSubmitCorps(){
			$("#CorpsModal").ajaxSubmit({
				success:function(json){
					alert(json.errMsg);
					if(json.errCode == 0){
						window.location.reload();
					}
				},
				url: slyUrl+'sports/m/team/add',
				type:'post',
				dataType:"json"
			});
		},
		//创建战队
		createCorps(){
			$("#CorpsModal,.msak").css({"display":"block"});
			$(".msak,.close").on("click",function(){
				$("#CorpsModal,.msak").css({"display":"none"});
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
					_this.teamInfo = json.teamInfo;
				}
				_this.memberId = json.teamInfo ? json.teamInfo.memberId : 0;
			});
		},
		getMatchId(){
			var url = window.location.href;
			this.matchid = url.split('?')[1].split('=')[1];
		},
		getMatchInfo(){
			var _this = this;
			var data = {
				id:this.matchid
			}
			$.getJSON(slyUrl+'sports/match/info',data,function(json){
				isLogin(json.loginMemberId,'actSign',_this.matchid);
				_this.loginMemberId = json.loginMemberId;
				_this.matchInfo = json.matchInfo;
			});
		}	
	}

})