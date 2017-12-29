var slyUrl = 'http://192.168.0.128:8080/sly/';
new Vue({
	el:"#app",
	data(){
		return {
			matchid:1,
			guessList:[],
			nowGuess:{},
			betNum:1,
			memberBean:0,
			totalBean:0,
			betBeans:0,
			guessId:0,
			nowIndex : 0,
			betanswer:''
		}
	},
	created(){
		this.getMatchId();
		this.getGuessList();
	},
	methods:{
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
			console.log(index);
			this.nowGuess  = this.guessList[index];
			this.totalBean = this.guessList[index].betBeans;
			this.betBeans = this.guessList[index].betBeans;
			this.guessId  = this.guessList[index].id
			$(".mask,.guess-popups").css({"display":"block"});
		},
		//渲染竞猜列表数据
		getGuessList(){
			var url = window.location.href;
			var matchid = url.split('?')[1].split('=')[1];
			var data = {matchid:matchid}
			var _this = this;
			$.getJSON(slyUrl+'sports/guess/list',data,function(json){
				_this.guessList  = json.guessList;
				_this.memberBean = json.memberBean.balanceBean;
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
		}
	}
})
$(".mask").on("click",function(){
	$(".mask,.guess-popups").css({"display":"none"});
});