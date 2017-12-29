new Vue({
	el:"#app",
	data(){
		return {
			cropsList:[],
			matchid:'',
			teamid:'',
			memberids:[],
			teamNum:''
		}
	},
	created(){
		//获取比赛id,小组id
		this.getMatchId();
		//获取战队列表
		this.getCorpsList();
	},
	methods:{
		//切换状态
		toggleState(state,index){
			var num = 0;
			this.cropsList.forEach(function(item,index){
				if(item.state ==1)
				{
					num++;
				}
			});
			if(this.cropsList[index].role == 1 ){
				return false;
			} else {
				if(state == 0){
					if(num >= this.teamNum ){
						alert("战队成员人数最多"+this.teamNum+"个");
						return  false;
					}
					else {
						this.cropsList[index].state = !state;
					}
				}
				else {
					this.cropsList[index].state = !state;
				}
				
			}
			
		},
		//获取战队列表
		getCorpsList(){
			var _this = this;
			var data = {
				teamid:this.teamid
			}
			$.getJSON(slyUrl+'sports/m/team/member/list',data,function(json){
				_this.cropsList = json.teamMemberList;
			});
		},
		getMatchId(){
			var url = window.location.href;
			this.matchid = url.split('?')[1].split('&')[0].split('=')[1];
			this.teamid  = url.split('?')[1].split('&')[1].split('=')[1];
			this.teamNum  = url.split('?')[1].split('&')[2].split('=')[1];
		},
		ajaxSubmit(){
			var _this = this;
			this.cropsList.forEach(function(item){
				if(item.state == 1){
					_this.memberids.push(item.memberId);
				}
			});
			var data = {
				teamid : this.teamid,
				memberids:this.memberids
			}
			$.getJSON(slyUrl+'sports/m/team/member/confirm',data,function(json){
				alert(json.errMsg);
				if(!json.errCode){
					window.location.href = 'actSign.html?matchid='+_this.matchid;
				}
			});
		}
	}
})