new Vue({
	el:"#app",
	data(){
		return {
			awardList:[],
			mobile:''
		}
	},
	created(){
		this.getAwardList();
	},
	watch:{
		mobile:function(val){
			this.getAwardList(val);
		}
	},
	methods:{
		getAwardList(mobile){
			var _this = this;
			var data  = {};
			if(mobile){
				data = {
					mobile:mobile
				}
			}
			$.getJSON(cmsUrl2+'lottery/awardlist',data,function(json){
				_this.awardList = json.awardList;
			});
		}
	}
})