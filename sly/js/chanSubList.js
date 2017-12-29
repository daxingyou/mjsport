new Vue({
			el:"#app",
			data(){
				return {
					deslist:[]
				}
			},
			created(){
				this.getDesList();
			},
			methods:{
				getDesList(){
					var _this = this;
					$.getJSON(slyUrl+'channel/deslist',function(json){
						_this.deslist = json.deslist;
					});
				}
			}
		})