new Vue({
	el:"#app",
	data(){
		return {
			matchid:'',
			matchInfo:{}
		}
	},
	created(){
		//获取比赛id
		this.getMatchId();
		//获取比赛信息
		this.getMatchInfo();	
	},
	methods:{
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
				console.log(json);
				_this.matchInfo = json.matchInfo;
			});
		}	
	}

})