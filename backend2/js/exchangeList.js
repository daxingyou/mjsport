new Vue({
	el:"#app",
	data(){
		return {
			tabLists:[
			{id:1,name:"未使用",num:0},
			{id:2,name:"已使用",num:0},
			{id:3,name:"已过期",num:0}
			],
			nowIndex:1,
			pn:1,
			hasNextPage : true,
			hasPreviousPage : true,
			orderList:[]
		}
	},
	created(){
		this.getGuessList();
	},
	watch:{
		pn:function(val){
			this.getGuessList();
		}
	},
	methods:{
		getGuessList(id){
			this.nowIndex = id ? id : this.nowIndex;
			var _this = this;
			var data = {
				state : this.nowIndex
			}
			$.getJSON(cmsUrl2+'store/orders/list?pn='+this.pn,data,function(json){
				 _this.tabLists.forEach(function(item,index){
				 	item.num = json[index+1];
				 });
				_this.orderList = json.ordersList ? json.ordersList.list : [];
				_this.hasNextPage   = json.ordersList.hasNextPage;
				_this.hasPreviousPage   = json.ordersList.hasPreviousPage;
			});
		},
		toggleTab(id){
			this.nowIndex = id;
		}
	}
})