$.getJSON(cmsUrl2+'officil/guess/list',{state:1},function(json){
	needLogin(json);
	var matchList = json.guessList.list;
	for(var key in tabLists){
		tabLists[key].num = json[key];
	}
	console.log(tabLists);
	new Vue({
		el:'#app',
		data(){
			return {
				matchList : matchList,
				tabList   :  tabLists,
				t1Logo    : '',
				t2Logo    : ''
			}
		},
		methods:{
			dlink(id){
				window.location.href = 'guessDetail.html?guessid='+id;
			},
			toggleTab(status){
				this.tabList.forEach(function(item){
					if( item.status == status){
						item.isActive = true;
					}else {
						item.isActive = false;
					}
				});
				var _this = this;
				$.getJSON(cmsUrl2+'officil/guess/list',{state:status},function(json){
					var matchList = json.guessList ? json.guessList.list : [];
					_this.matchList =  $.extend(true,[],matchList);
				});
			}
		},
		created(){
			var _this = this;
		
		},
		mounted(){
			var _this = this;
			$("#create").on("click",function(){
				if($("#issue_startat").val()>$("#issue_endline").val()){
					Alert($,"竞猜开始时间不能晚于结束时间",'warn');
					return  false;
				}
				var data = {
					gameid: $("#gameid").val(),
					name :$("#name").val(),
					addr :$("#addr").val(),
					memtype :$("#memtype").val(),
					ruletype :$("#ruletype").val(),
					mapinfo :$("#mapinfo").val(),
					startat :'2017-08-30 16:37:40',
					issue_startat :$("#issue_startat").val(),
					issue_endline :$("#issue_endline").val(),
					teaminfo : JSON.stringify({
						"blue" : {"name":$("#t1Name").val(),"logo":_this.t1Logo},
						"red"  : {"name":$("#t2Name").val(),"logo":_this.t2Logo}
					}),
					ruleinfo :'123',
					bonus_303 :$("#bonus_303").val()
				}
				for(var key in data){
					if( !data[key].length ){
						Alert($,"竞猜信息不能为空！",'warn');
						return false;
					}
				}
				if(data.issue_startat > data.issue_endline){
					Alert($,"开始时间不能晚于结束时间！",'error');
					return false;
				}
				$.getJSON(cmsUrl2+'match/add',data,function(json){
					if(json.errno == 0){
						Alert($,"创建成功！",'success',function(){
							window.location.href="guessDetail.html?matchid="+json.data.matchid;
						});
					}
					else {
						Alert($,"填写信息有误！",'error');
					}
				});
			});
		}
	});
})


var tabLists = [
{isActive:false,status:'0',num:0,name:"未发布"},
{isActive:true,status:'1',num:0,name:"投注中"},
{isActive:false,status:'2',num:0,name:"待开奖"},
{isActive:false,status:'3',num:0,name:"已结束"}
] 


