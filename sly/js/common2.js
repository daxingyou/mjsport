
var listUrl = '';
var listUrl1 = '';
var slyUrl   = '';
//var slyUrl   = 'http://m.jesport.com/sly/';
//var listUrl = 'http://m.jesport.com/sly/';
//var slyUrl = 'http://m.jesport.com/sly/';
//var listUrl1 = 'http://192.168.1.128:8080/sly/';
//var listUrl = 'http://192.168.1.128:8080/sly/';
//var slyUrl   = 'http://192.168.1.128:8080/sly/';

//判断是否登录
//var url = window.location.href;
//var url = 'http://192.168.1.128:8080/sly/';
//if( isWeiXin() ){
//	if(url.indexOf('f=wx') == -1){
//		$.getJSON(listUrl+'islogin',function(json){
//			if(json.loginMemberId == 0){
//				window.location.href = 'autologin';
//			}
//		});
//	}
//}
//else {
//var id=url.split(/[? = &]/)[2]
//if(id){
//	document.cookie="id="+id;
//}
	//$.getJSON(listUrl+'islogin',function(json){
	//	localStorage.setItem("netbarId", json.netbarId);
	//	if((json.loginMemberId == 0 && url.indexOf('gologin.html') <0)&&(url.indexOf('index.html')<0)){
	//		window.location.href = 'gologin.html?id='+id;
	//	}
	//});
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
function shareWx(title,desc, dlink, imgUrl){
	console.log(title)
	console.log(desc)
	//alert(dlink)
	console.log(imgUrl)
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
				//alert(res.errMsg);
			});

		});
	});
}
//弹出窗口跳转
function confirmtext(errMsg,text,url){
	var r=confirm(errMsg+text)
	if(r==true){
		window.location.href=url
	}else{
		window.location.reload();
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
//上传图片处理
var uploadFile = function(obj,preview,width,height){
	var isFlag = true;
	console.log(width+'--'+height);
	var width = width ? width : 750;
	var height = height ? height : 320;
	if (obj.files && obj.files[0]) {
		if(obj.files[0].size > 4000000){
			alert("上传图片长度不能大于4M");
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

var codeshow=function (){
	return '<div class="codeBottom" id="showCodeClick">' +
		'<img src="http://static.jesport.com/sly/images/common/icon-code.png" alt="">' +
		'<span>点击关注公众号“魔杰互娱”随时报名、领取奖励</span></div>' +
		'<div class="codeShow"><div class="title" id="closeCodeClick">&times;</div>' +
		'<div class="content"><img src="http://static.jesport.com/sly/images/active-pb/code.png" alt="">' +
		'<div>长按关注公众号“魔杰互娱”随时报名、领取奖励</div></div></div>'
};

