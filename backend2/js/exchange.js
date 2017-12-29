$("#inputQuan").focus();
new Vue({
	el:"#app",
	data(){
		return {
			shopInfo:null,
			quanno:''
		}
	},
	created(){
		var url  = window.location.href;
		var code = url.split('?')[1] ? url.split('?')[1].split('=')[1] : '';
		console.log(code);
		if(code){
			this.quanno = code;
			//this.findQuanno();
		}
	},	
	watch:{
		quanno:function(quanno){
			if(quanno.length == 12){
				var data = {
					quanno:quanno
				}
				var _this = this;
				$.getJSON(cmsUrl2+'store/query',data,function(json){
					needLogin(json);
					_this.shopInfo = json.ordersInfo;
					if(!json.ordersInfo){
						Alert($,json.errMsg,'error');
					}
				});
			}
			else if(quanno.length > 12){
				var data = {
					quanno:quanno.substring(quanno.length-12,quanno.length)
				}
				var _this = this;
				$.getJSON(cmsUrl2+'store/query',data,function(json){
					needLogin(json);
					_this.shopInfo = json.ordersInfo;
					if(!json.ordersInfo){
						Alert($,json.errMsg,'error');
					}
				});
			}
		}
	},
	methods:{
		findQuanno(){
			var data = {
				quanno:this.quanno
			}
			var _this = this;
			$.getJSON(cmsUrl2+'store/query',data,function(json){
				_this.shopInfo = json.ordersInfo;
				if(!json.ordersInfo){
					Alert($,json.errMsg,'error');
				}
			});
		},
		sureSubmit(){
			var data = {
				quanno:this.quanno
			}
			var _this = this;
			$.getJSON(cmsUrl2+'store/exchange',data,function(json){
				if(json.errCode == 0){
					Alert($,"成功",'success',function(){
						window.location.href='doChange.html';
					});
				}
				else{
					Alert($,json.errMsg,'error');
				}
			});
		}

	}
})