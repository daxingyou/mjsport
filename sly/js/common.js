
var listUrl = '';
var listUrl1 = '';
var slyUrl   = '';
//var listUrl1="";
//var slyUrl   = 'http://192.168.1.128:8080/sly/';
//var listUrl = 'http://m.jesport.com/sly/';
//var slyUrl = 'http://m.jesport.com/sly/';
var listUrl1 = 'http://192.168.1.128:8080/sly/';
var listUrl = 'http://192.168.1.128:8080/sly/';
//var slyUrl   = 'http://192.168.1.128:8080/sly/';


//判断是否登录
//var url = 'http://192.168.1.128:8080/sly/';
//		var url = window.location.href;
//if( isWeiXin() ){
//	if(url.indexOf('f=wx') == -1){
//		$.getJSON(listUrl+'islogin',function(json){
//			if(json.loginMemberId == 0){
//				window.location.href = 'autologin';
//			}
//		});
//	}
//} else
//{
//	$.getJSON(listUrl+'islogin',function(json){
//		localStorage.setItem("netbarId", json.netbarId);
//		if((json.loginMemberId == 0 && url.indexOf('gologin.html') <0)&&(url.indexOf('index.html')<0)){
//			window.location.href = 'gologin.html';
//		}
//	});
//}
// 判断是否是微信
function isWeiXin(){
	var ua = window.navigator.userAgent.toLowerCase();
	if(ua.match(/MicroMessenger/i) == 'micromessenger'){
		return true;
	}else{
		return false;
	}
}
//对象成员个数
function count(o){
	var t = typeof o;
	if(t == 'string'){
		return o.length;
	}else if(t == 'object'){
		var n = 0;
		for(var i in o){
			n++;
		}
		return n;
	}
	return false;
}
var isLogin = function(memberid,arg,id,teamid){
	var url = '';
	if( memberid == 0 ){
		if(id && teamid == 999999){
			url="autologin?f="+arg+'AAA'+id;
		}
		else if(id && teamid != 999999){
			url="autologin?f="+arg+'AAA'+id+'AAA'+teamid;
		}
		else {
			url="autologin?f="+arg;
		}
		console.log(url);
		window.location.href = url;
	}
}

var isMoDo = function( errCode ){
	if(errCode == 10005)
		window.location.href = 'exchangeMd.html';
}
//获取id
var getId = function( url ){
	return url.split('?')[1].split('=')[1];
}
//竞猜选项转换
function converGuess (item){
	if(item == 'A'){
		return 1;
	}
	else if(item == 'B'){
		return 2;
	}
	else if(item == 'C'){
		return 3;
	}
}

var getTranslateY = function(node){
	var regRule = /translate(Y|\dd)?\(\s*(\w+\s*,)?\s*([^,]+)(\s*,[^)]+)?\s*\)/;
	var regRule2 = /matrix\(.*,\s*(\w+)\s*\)/;
	var transform = $(node).css("transform");
	var reg;
	if(!transform){
		return null;
	}
	reg = regRule.exec(transform);
	if(null === reg){
		reg = regRule2.exec(transform);
		return reg ? reg[1] : null;
	}
	return reg[3];
}
//验证码功能
var wait=60;
function time(o) {
	//console.log(wait);
	if (wait == 0) {
		o.removeAttribute("disabled");
		o.value="获取验证码";
		wait = 60;
	} else {
		o.setAttribute("disabled", true);
		o.value="重新发送(" + wait + ")";
		wait--;
		setTimeout(function() {
			time(o)
		},
		1000)
	}
}
//转换时间
function ge_time_format(timestamp){
	//timestamp = false;
	if(timestamp){
		var date = new Date(timestamp);
	}else{
		var date = new Date();
	}
	Y = date.getFullYear(),
	m = date.getMonth()+1,
	d = date.getDate(),
	H = date.getHours(),
	i = date.getMinutes(),
	s = date.getSeconds();
	if(m<10){
		m = '0'+m;
	}
	if(d<10){
		d = '0'+d;
	}
	if(H<10){
		H = '0'+H;
	}
	if(i<10){
		i = '0'+i;
	}
	if(s<10){
		s = '0'+s;
	}
	var t = Y+'-'+m+'-'+d+' '+H+':'+i+':'+s;
	return t;
}
// 今天时间转换
function getNowDate(){
	var dd = new Date();
	var year = dd.getFullYear();
	var month = dd.getMonth()+1;
	var date = dd.getDate();
	month = month < 10 ? '0'+month : month;
	date = date < 10 ? '0'+date : date;
	var nowDate  = year+'-'+month+'-'+date;
	return nowDate;
}
//昨天时间转换
function getLastDate(){
	var dd = new Date();
	dd.setDate(dd.getDate()-1);
	year = dd.getFullYear();
	month = dd.getMonth()+1;
	date = dd.getDate();
	month = month < 10 ? '0'+month : month;
	date = date < 10 ? '0'+date : date;
	var lastDate = year+'-'+month+'-'+date;
	return lastDate;
}
// 时间分类转换
function converDate( nowDate,lastDate,data,type){
	var convertArr = {}
	data.forEach(function( item ){
		if( type == 'createdDate')
			var itemDate = item.createdDate.split(" ")[0];
		else if( type == 'create_at')
			var itemDate = item.create_at.split(" ")[0];
		else if( type == 'start_at')
			var itemDate = item.start_at.split(" ")[0];
		else {
			var itemDate = item.publishedDate.split(" ")[0];
		}
		var kk = itemDate;
		//console.log(itemDate +'---'+ nowDate);
		//console.log(itemDate +'---'+ lastDate);
		if(itemDate == nowDate){
			kk = '今天';
		}
		else if ( itemDate == lastDate )
		{
			kk = '昨天';
		}
		if( convertArr.hasOwnProperty(kk) ){
			convertArr[kk].push(item);
		}
		else{
			convertArr[kk] = new Array(item);
		}
	});
	return convertArr;
}

//星星数转换
function converStar( num ){
	var z = num*10/10;
	var s = num*10%10;
	var str = '';
	for(var i=1; i<=z; i++){
		str+='<i class="icon-sx"></i>';
	}
	if(s>5){
		str+='<i class="icon-bkx"></i>';
	}
	return str;
}

//转换汉字
function DX(x){
	var arr=["一","二","三","四","五","六","七","八","九","十"];
	return arr[x]
}
//转换比赛时间xx分xx秒
function duration(num){
	return parseInt(num/60)+"分钟"+num%60+"秒"
}
//获奖时间
function lotterytime(timestamp){
	if(timestamp){
		var date = new Date(timestamp);
	}else{
		var date = new Date();
	}
	Y = date.getFullYear(),
	m = date.getMonth()+1,
	d = date.getDate(),
	H = date.getHours(),
	i = date.getMinutes(),
	s = date.getSeconds();
	if(m<10){
		m = '0'+m;
	}
	if(d<10){
		d = '0'+d;
	}
	if(H<10){
		H = '0'+H;
	}
	if(i<10){
		i = '0'+i;
	}
	if(s<10){
		s = '0'+s;
	}
	var t = H+':'+i;
	return t;
}

//判断游戏方式
function gameway(x){
	var arr=["单关","过关"];
	if(x==301){
		return arr[0]
	}
	if(x==303){
		return arr[1]
	}
}
//时间转换成201707171412
function datacompare(date){
	var date_arr = date.split(/[\-\s\:]{1}/)
	return date_arr[0]+""+date_arr[1]+""+date_arr[2]+""+date_arr[3]+""+date_arr[4];
}
//时间转换成2017-07-20
function datachange(date){
	var date_arr = date.split(/[\-\s\:]{1}/)
	return date_arr[0]+"-"+date_arr[1]+"-"+date_arr[2];
}
function excdate(date){
	var date_arr = date.split(/[\-\s\:]{1}/)
	return date_arr[0]+"年"+date_arr[1]+"月"+date_arr[2]+"日"+date_arr[3]+"点"+date_arr[4]+"分"+date_arr[5]+"秒";
}
function datachange2(date){
	var date_arr = date.split(/[\-\s\:]{1}/)
	return date_arr[0]+"."+date_arr[1]+"."+date_arr[2];
}
function lotterydate(date){
	var date_arr = date.split(/[\-\s\:]{1}/)
	return date_arr[3]+":"+date_arr[4];
}
//正序排列
function compare(property){
	return function(a,b){
		var value1 = datacompare(a[property]);
		var value2 =datacompare( b[property]);
		return value1 - value2;
	}
}
//倒序排列
function compare2(property){
	return function(a,b){
		var value1 = datacompare(a[property]);
		var value2 =datacompare( b[property]);
		return value2 - value1;
	}
}
//获取滚动条当前的位置
function getScrollTop() {
	var scrollTop = 0;
	if (document.documentElement && document.documentElement.scrollTop) {
		scrollTop = document.documentElement.scrollTop;
	}
	else if (document.body) {
		scrollTop = document.body.scrollTop;
	}
	return scrollTop;
}
//获取当前可视范围的高度
function getClientHeight() {
	var clientHeight = 0;
	if (document.body.clientHeight && document.documentElement.clientHeight) {
		clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
	}
	else {
		clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
	}
	return clientHeight;
}
//获取文档完整的高度
function getScrollHeight() {
	return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
}

//微信分享
function shareWx(title,desc, dlink, imgUrl,dirUrl){
	$.get('http://m.jesport.com/backend/member/jsapi',{url:dlink}, function(json){
		wx.config({
			debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			appId: json.appId, // 必填，公众号的唯一标识
			timestamp: json.timestamp, // 必填，生成签名的时间戳
			nonceStr: json.nonceStr, // 必填，生成签名的随机串
			signature: json.signature,// 必填，签名，见附录1
			// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
			jsApiList: [
				'checkJsApi',  //判断当前客户端版本是否支持指定JS接口
				'onMenuShareTimeline', //分享到朋友圈
				'onMenuShareAppMessage', //分享给好友
				'onMenuShareWeibo',//分享到微博
				'onMenuShareQQ'
				]
			});

		wx.ready(function(){
			wx.onMenuShareTimeline({
				title: title,
				desc: desc,
				link: dlink,
				imgUrl:imgUrl,
				success:function(){
					alert("分享成功");
					$(".share-modal").css({display:"none"});
					$(".modal-mask").css({display:"none"});
					
				},
				cancel:function(){
					alert("已取消分享");
					$(".share-modal").css({display:"none"});
					$(".modal-mask").css({display:"none"});
					
				}
			});

			wx.onMenuShareAppMessage({
				title: title,
				desc: desc,
				link: dlink,
				imgUrl:imgUrl,
				success:function(){
					alert("分享成功");
					$(".share-modal").css({display:"none"});
					$(".modal-mask").css({display:"none"});
					
				},
				cancel:function(){
					$(".share-modal").css({display:"none"});
					alert("已取消分享");
					$(".modal-mask").css({display:"none"});
					
				}
			});
			wx.error(function( res ){
				alert(res.errMsg);
			});

		});
	});
}

//新首页比赛时间转换
function indexdate(date){
	var date_arr = date.split(/[\-\s\:]{1}/)
	return date_arr[1]+"-"+date_arr[2]+" "+date_arr[3]+":"+date_arr[4];
}
//excrecord截止时间
function invalidDate(date){
	var date_arr = date.split(/[\-\s\:]{1}/)
	return date_arr[0]+"年"+date_arr[1]+"月"+date_arr[2]+"日  "+date_arr[3]+":"+date_arr[4];
}
//弹出窗口跳转
function confirmtext(errMsg,text,url){
	var r=confirm(errMsg+text)
	if(r==true){
		window.location.href=url
	}else{
		window.history.back();
	}
}
function confirmtext2(errMsg,text,url){
	var r=confirm(errMsg+text)
	if(r==true){
		window.location.href=url
	}
}
//弹窗
function alertwindow(content,titletext,btntext){
	$(".mask").show();
	if(titletext==""){
		$("body").append('<div class="alertbind bind-mobile">' +
			'<div class="alertcontent">'+content+'</div>' +
			'<div class="bind-box">' +
			'<div class="diamond1"></div>' +
			'<div class="bind-btn">'+btntext+'</div>' +
			'<div class="diamond2"></div>' +
			'</div>' +
			'<div class="close"><img src="http://static.jesport.com/sly/images/icon-close.png" alt=""></div>' +
			'</div>')
	}else if(btntext==null){
		$("body").append('<div class="alertbind bind-mobile">' +
			'<div class="title"><div class="diamond"></div><div>'+titletext+'</div><div class="diamond"></div></div>' +
			'<div class="cutline"></div>' +
			'<div class="alertcontent">'+content+'</div>' +
			'<div class="cutline2"></div>' +
			'<div class="close"><img src="http://static.jesport.com/sly/images/icon-close.png" alt=""></div>' +
			'</div>')
	}else{
		$("body").append('<div class="alertbind bind-mobile">' +
			'<div class="title"><div class="diamond"></div><div>'+titletext+'</div><div class="diamond"></div></div>' +
			'<div class="cutline"></div>' +
			'<div class="alertcontent">'+content+'</div>' +
			'<div class="bind-box">' +
			'<div class="diamond1"></div>' +
			'<div class="bind-btn">'+btntext+'</div>' +
			'<div class="diamond2"></div>' +
			'</div>' +
			'<div class="close"><img src="http://static.jesport.com/sly/images/icon-close.png" alt=""></div>' +
			'</div>')
	}

}

//转换姓名
function nameExc(name){
	return name[0]+new Array(name.length).join('*');
}
//判断数组中是否存在值
function isCon(arr, val){
	for(var i=0; i<arr.length; i++){
		if(arr[i] == val)
			return i;
	}
	return false;
}
//手机号码中建四位变*
function telchange(tel){
	return tel.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
}

//上传图片处理
var uploadFile = function(obj,preview,width,height){
	var isFlag = true;
	console.log(width+'--'+height);
	var width = width ? width : 750;
	var height = height ? height : 320;
	if (obj.files && obj.files[0]) {
		if(obj.files[0].size > 1000000){
			alert("上传图片长度不能大于1M");
			return false;
		}
		var reader = new FileReader();
		reader.onload = function(evt) {
			var image = new Image();
			var oWidth = 0;
			var oHeight = 0;
			image.src = evt.target.result;
			image.onload = function(){
				oWidth  = image.width;
				oHeight = image.height;
				console.log(preview);
				//if(oWidth != width || oHeight != height){
				//	Alert($,"图片的尺寸必须为"+width+"*"+height+"！",'warn');
				//	isFlag =false;
				//	return false;
				//}
				preview.html('<img src="' + evt.target.result + '" />');
				//var obj = preview.find('img');
				//autoSize(obj,750,320);
			}
		}
		reader.readAsDataURL(obj.files[0]);
	} else {
		preview.html('<div class="img" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=\'' + file.value + '\'"></div>');
	}
	return isFlag;
}

function setCookie(name,value)
{
	var Days = 30;
	var exp = new Date();
	exp.setTime(exp.getTime() + Days*24*60*60*1000);
	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

function getCookie(name)
{
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return null;
}

