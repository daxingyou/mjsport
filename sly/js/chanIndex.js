new Vue({
	el:"#app",
	data(){
		return {
			channelInfo:{},
			isShowModal:false,
			isShowCodeModal:false,
			isShowProfileModal:false,
			isShowRealnameModal:false,
			isShowPwdModal:false,
			isShowCashModal:false,
			isShowFinanceModal:false,
			regMemberList:[],
			userPn:1,
			channelId:'',
			desid:0,
			FinanceList:[],
			financePn:0,
			realName:'',
			password:'',
			accountInfo:{}
			
		}
	},
	created(){
		//首屏获取desid
		this.getDesId();
		//首屏获取个人信息
		this.getProInfo();
		
		//首屏获取提现账号信息
		this.getAccountInfo();
	},
	watch:{
		userPn:function(val){
			this.findSignUser();
		},
		financePn:function(val){
			this.getFinanceList();
		}

	},
	methods:{
		getAccountInfo(){
			var _this = this;
			$.getJSON(slyUrl+'channel/accountinfo',function(json){
				if(json.accountInfo){
					_this.accountInfo  = json.accountInfo;
				}else{
					//json.accountInfo.type="BANK"
					_this.accountInfo  = {type:"ALI"};
				}
			});
		},
		//修改提现账号
		editAccInfo(){
			$("#editAccInfo").ajaxSubmit({
				success:function(json){
					alert(json.errMsg);
					if(!json.errCode){
						window.location.reload();
					}
				},
				url: slyUrl+'channel/setaccount',
				type:'post',
				dataType:"json"
			});
		},
		//点击更换头像
		editHeader(){
			$("#uploadHeader").ajaxSubmit({
				success:function(json){
					alert(json.errMsg);
					if(!json.errCode){
						window.location.reload();
					}
				},
				url: slyUrl+'channel/setavatar',
				type:'post',
				dataType:"json"
			});
		},
		//设置密码
		setPassword(){
			var data = {
				password:this.password
			}
			$.getJSON(slyUrl+'channel/setpwd',data,function(json){
				alert(json.errMsg);
				if(!json.errCode){
					window.location.href="login.html";
				}
			});
		},
		//设置真实姓名
		setRealName(){
			var data = {
				realname:this.realName
			}
			$.getJSON(slyUrl+'channel/setname',data,function(json){
				alert(json.errMsg);
				if(!json.errCode){
					window.location.reload();
				}
			});
		},
		getFinanceList(){
			var _this = this;
			var data = {
				pn:this.financePn,
				desid:this.desid
			}
			$.getJSON(slyUrl+'channel/financelist',data,function(json){
				_this.FinanceList = json.financeHistoryList.list;
			});
		},	
		//获取下级id
		getDesId(){
			var nowUrl = window.location.href;
			if(nowUrl.indexOf('desid') != -1){
				this.desid = nowUrl.split('?')[1].split('=')[1];
			}
		},
		getProInfo(){
			var _this = this;
			var data  = {
				desid : this.desid
			}
			$.getJSON(slyUrl+"channel/info",data,function(json){
				_this.channelInfo = json.channelInfo;
				if(_this.channelInfo.financeInfo==null){
					_this.channelInfo.financeInfo={
						balance:0,frozenBalance:0
					}
				}
				_this.channelId     = json.channelInfo.memberId;
			});
		},
		//收入明细
		fananceDetail(){
			//首屏获取资金变动记录
			this.getFinanceList();
			this.isShowFinanceModal = true ;
		},
		//查看注册用户列表
		findSignUser(){
			this.isShowModal = true;
			var _this = this;
			var data  = {
				pn : this.userPn
			}
			$.getJSON(slyUrl+'channel/reglist',data,function(json){
				_this.regMemberList = json.regMemberList;
				
			})
		},
		//查看推广二维码
		findCode(){
			var _this = this;
			this.isShowCodeModal = true;
			Vue.nextTick(function(){
				var qrcode=$("#findCodeModal").qrcode({
					width       : 256,     //设置宽度
					height      : 256,     //设置高度
					typeNumber  : -1,      //计算模式
					background      : "#ffffff",//背景颜色
					foreground      : "#000000", //前景颜色
					text     : "http://m.jesport.com/sly/gologin.html?channelid="+_this.channelId
				});
				//console.log("http://m.jesport.com/sly/gologin.html?channelid="+_this.channelId)
				qrcode.hide();
				var canvas=qrcode.find('canvas').get(0);
				$('#imgOne').attr('src',canvas.toDataURL('image/jpg'))
			});
		}
	}
	
})
