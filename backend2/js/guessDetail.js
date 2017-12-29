var url = window.location.href;
var matchid = url.split('?')[1].split('=')[1];
var data = {
	id : matchid
}updateGuess


//竞猜基本信息
$.getJSON(cmsUrl2+'officil/guess/info',data,function(json){
	needLogin(json);
	var guessBaseData = json.guessInfo;
	new Vue({
		el:"#app",
		data(){
			return {
				guessBaseData :guessBaseData,
				t1Logo    : guessBaseData.teaminfo.blue.logo,
				t2Logo    : guessBaseData.teaminfo.red.logo
			}
		},
		created(){
			var _this = this;
			$('#myModal').on('shown.bs.modal', function () {
				toggleShow($,'#s-default-1,#logo-modal2',$("#logo-modal2"),function(){
					$("#logo-main1 img").off("click").on("click",function(event){
						event.stopPropagation();
						var imgSrc = $(this).attr("src");
						console.log(imgSrc);
						$("#t1img").attr("src",imgSrc);
						$("#logo-modal2").fadeOut();
					});
				});
				toggleShow($,'#s-default-2,#logo-modal3',$("#logo-modal3"),function(){
					$("#logo-main2 img").off("click").on("click",function(event){
						event.stopPropagation();
						var imgSrc = $(this).attr("src");
						console.log(imgSrc);
						$("#t2img").attr("src",imgSrc);
						$("#logo-modal3").fadeOut();
					});
				});
				$("#t2Logo").on("change",function(){
					$("#form2").ajaxSubmit({
						success:function(json){
							_this.t2Logo = json.errMsg;
							$("#t2img").attr("src",json.errMsg);
						},
						url: 'http://106.75.101.90:8088/filecenter/image/upload',
						type:'post',
						dataType:"json"
					});
				});

				$("#t1Logo").on("change",function(){
					$("#form1").ajaxSubmit({
						success:function(json){
							_this.t1Logo = json.errMsg;
							$("#t1img").attr("src",json.errMsg);
						},
						url: 'http://106.75.101.90:8088/filecenter/image/upload',
						type:'post',
						dataType:"json"
					});
				});

				$("#name").val(guessBaseData.name);
				$("#addr").val( guessBaseData.addr);
				$("#memtype").val(guessBaseData.rule.memtype);
				$("#ruletype").val(guessBaseData.rule.ruletype);
				$("#mapinfo").val(guessBaseData.rule.map);
				$("#date").val(guessBaseData.start_at);
				$("#issue_startat").val(guessBaseData.issue_startat);
				$("#issue_endline").val(guessBaseData.issue_endline);
				$("#t1Name").val(guessBaseData.teaminfo.blue.name);
				$("#t2Name").val( guessBaseData.teaminfo.red.name);
				$("#t1img").attr("src",_this.t1Logo);
				$("#t2img").attr("src", _this.t2Logo);
				$("#bonus_303").val(guessBaseData.bonus_303);

			});
			$('#myModal6').on('show.bs.modal', function () {
				laydate.render({
					elem: '#issue_startat2'
					,type: 'datetime'
				});
				laydate.render({
					elem: '#issue_endline2'
					,type: 'datetime'
				});
			});
			$("#create2").on('click',function(){
				var data = {
					matchid : matchid,
					startat : $("#issue_startat2").val(),
					endline : $("#issue_endline2").val()
				}
				$.post(cmsUrl2+'guess/reopen',data,function(json){
					var json = JSON.parse(json);
					if(json.errno == 0){
						Alert($,json.errmsg,'success',function(){
							window.location.reload();
						});
					}
					else{
						Alert($,json.errmsg,'error');
					}
				});
			});
		},
		mounted(){
			var _this = this;
			$("#create").on("click",function(){
				console.log(_this.t1Logo);
				var data = {
					name :$("#name").val(),
					addr :$("#addr").val(),
					memtype :$("#memtype").val(),
					ruletype :$("#ruletype").val(),
					mapinfo :$("#mapinfo").val(),
					startat :'2017-08-30 16:37:40',
					issue_startat :$("#issue_startat").val(),
					issue_endline :$("#issue_endline").val(),
					teaminfo : JSON.stringify({
						"blue" : {"name":$("#t1Name").val(),"logo":$("#t1img").attr("src")},
						"red"  : {"name":$("#t2Name").val(),"logo":$("#t2img").attr("src")}
					}),
					ruleinfo :'123',
					bonus_303 :$("#bonus_303").val(),
					matchid:matchid
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
				$.getJSON(cmsUrl2+'match/modify',data,function(json){
					if(json.errno == 0){
						Alert($,"修改成功！",'success',function(){
							window.location.reload();
						});
					}
					else {
						Alert($,"填写信息有误！",'error');
					}
				});
			});
		},
		methods:{
			//发布竞猜
			updateGuess:function(){
				var data = {
					matchid : matchid,
					status  : 0
				}
				$('#sure2').on('show.bs.modal', function () {
					$("#sure-btn").off("click").on("click",function(){
						$.getJSON(cmsUrl2+'match/update/status',data,function(json){
							if(json.errno == 0){
								Alert($,"发布成功",'success',function(){
									window.location.reload();
								});
							}
							else if(json.errno == 2018){
								Alert($,"竞猜尚未设置题目，无法发布！",'warn');
							}
							else{
								Alert($,json.errmsg,'error');
							}
						});
					});
					
				});
				
			},
			
			stopBet:function(){
				var data = {
					matchid : matchid
				}
				$.getJSON(cmsUrl2+'guess/close',data,function(json){
					if(json.errno == 0){
						Alert($,json.errmsg,'success',function(){
							window.location.reload();
						});
					}
					else {
						Alert($,json.errmsg,'error');
					}					
				});
			},
			reOpen:function(){
				
			}
		}
	});



});
//竞猜题目
var data2 = {
	matchid : matchid
}

$.getJSON(cmsUrl2+'guess/detail',data2,function(json){
	var detailData = [] ;
	var tmArr3 = [] ;
	var issue = json.data ? json.data.issue : '';
	if(json.errno == 0 && json.data['303'] ){
		tmArr3 =  $.extend(true,[],json.data['303']);
		detailData = $.extend(true,[],json.data['303']);
		tmArr3.forEach(function(item,index){
			item.options.forEach(function(item2,index2){
				item2.isActive = false;
			});
		});
		for(var j=0; j<detailData.length; j++){
			for(var t=0; t<detailData[j].options.length; t++){
				detailData[j].options[t] = detailData[j].options[t].option;
			}
		}
	}
	$.getJSON(cmsUrl2+'guess/tpl/add',data2,function(json){
		var guessData = [];
		var oGroups = json.data ? json.data.groups : {};
		for(var key in oGroups){
			var obj = {};
			obj.name = key;
			obj.iCur = false;
			obj.tmArr  = oGroups[key].questions;
			guessData.push(obj);
		}
		new Vue({
			el:"#app2",
			data(){
				return {
					//比赛模板数据
					guessData: guessData,
       				//题目数组
       				tmArr: [],
       				//需要显示的题目详情
       				tmArr2:[],
       				//竞猜题目答案
       				tmArr3:[],
       				indexs:0,
       				issue : issue
       			}
       		},
       		mounted(){
       			this.tmArr =  $.extend(true,[],detailData);
       			this.tmArr2 =  $.extend(true,[],tmArr3);
       		},
       		methods:{
       			//填写答案
       			select:function(rid,tid){
       				var optArr = []; 
       				console.log(this.tmArr2);
       				this.tmArr2.forEach(function(item,index){
       					if(tid == item.id){
       						optArr = item.options;
       						optArr.forEach(function(item,index){
       							if(rid == item.id){
       								item.isActive = true;
       							}else {
       								item.isActive = false;
       							}
       						});
       					}
       				});
       			},
					//提交答案
					submitAjax2:function(){
						console.log(this.issue);
						var obj = {};
						var _this = this;
						this.tmArr2.forEach(function(item2){
							var key = '303'+_this.issue+item2.id;
							var value = '';
							var isAnswer = false;
							item2.options.forEach(function(item3){
								if(item3.isActive){
									value = item3.id;
									isAnswer = true;
								}
							});
							if(isAnswer){
								obj[key] = value;
							}
						})
						console.log(obj);
						var data = {
							issue : _this.issue,
							answers: JSON.stringify(obj)
						}
						$.post(cmsUrl2+'match/upload/result',data,function(json){
							var json = JSON.parse(json);

							if(json.errno == 0){
								Alert($,json.errmsg,'success',function(){
									window.location.reload();
								});
							}
							else {
								Alert($,json.errmsg,'error');
							}		

						});
					},
				//添加题目
				addTm:function(){
					var obj2 = {
						options:['','',''],
						question:''
					}
					if(this.tmArr.length == 6){
						Alert($,"添加题目数目不能超过6题！",'warn');
						return false;
					}
					else {
						console.log(this.tmArr);
						this.tmArr.push(obj2);
					}
					
				},
				 //使用模板
				 setCur:function(index){
				 	var _this = this;
				 	this.guessData.map(function(item,_index){
				 		if(index == _index){
				 			item.iCur    = true;
				 			_this.indexs = _index;
				 			_this.tmArr =  $.extend(true,[],item.tmArr);
				 		}
				 		else {
				 			item.iCur   = false;
				 		}

				 	})
				 },

				//删除题目
				delTm:function(index){
					var _this   = this;
					this.tmArr.map(function(item,index2){
						if(index == index2){
							_this.tmArr.splice(index,1);
						}
					})
				},
				//提交答案
				updateAnswer:function(){

				},
				//提交题目
				submitAjax:function(){
					if(this.tmArr.length < 6){
						Alert($,"添加题目数目不能少于6题！",'warn');
						return false;
					}
					var questions = {
						'303' : this.tmArr
					}
					var _this = this;
					var  hasNull = false; 
					this.tmArr.forEach(function(item){
						if(!item.question){
							hasNull = true;
						}
					});
					if(hasNull){
						_this.$message("题目不能为空！");
						return false;
					}
					var dataStr = JSON.stringify(questions);
					var data = {
						matchid : matchid,
						questions: dataStr,
						online : false
					};
					console.log(data);
					$.getJSON(cmsUrl2+'guess/custom/add',data,function(json){
						if(json.errno == 0){
							Alert($,"成功",'success',function(){
								window.location.reload();
							});
							
						}else{
							Alert($,json.errmsg,'error');
						}
					});s
				}
			}
		});

	});

});

$('#myModal').on('show.bs.modal', function () {
	laydate.render({
		elem: '#date'
		,type: 'datetime'
	});
	laydate.render({
		elem: '#issue_startat'
		,type: 'datetime'
	});
	laydate.render({
		elem: '#issue_endline'
		,type: 'datetime'
	});
});


