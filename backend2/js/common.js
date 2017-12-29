
//  1.线上地 址  
var cmsUrl2 = '';

//2.测试外 网
// var cmsUrl2 = 'http://124.202.225.22:128/backend/';

//3.测试内网
var cmsUrl2 = 'http://192.168.1.128:8080/backend/';


//警告提示框 
var Alert = function($,msg,type,fn){
	// $('body').append('<div class="msg"><span></span><img src="images/'+type+'.png" alt=""></div>');
	$('body').append('<div class="msg"><span></span><img src="http://static.jesport.com/backend2/images/'+type+'.png" alt=""></div>');
	$(".msg span").text(msg);
	$(".msg").fadeOut(2000,function(){
		$(this).remove();
		if(fn){
			fn();
		}
	});
}
//判断是否登录
var needLogin = function(json){
	var url = window.location.href;
	var code = url.split('?')[1] ? url.split('?')[1].split('=')[1] : '';
	if(json.errCode == 10025){
		Alert($,json.errMsg,'warn',function(){
			if(code){
				window.location.href = "login.html?code="+code;
			}
			else {
				window.location.href="login.html";
			}
		});
	}
}

//退出登陆
$("#logout").on("click",function(){
	console.log("logout")
	$.getJSON(cmsUrl2+'member/logout',function(){
		window.location.href = 'login.html';
	});
});

//上传图片处理
var uploadFile = function(obj,preview,width,height){
	var isFlag = true;
	console.log(width+'--'+height);
	var width = width ? width : 750;
	var height = height ? height : 320;
	if (obj.files && obj.files[0]) {
		if(obj.files[0].size > 1000000){
			Alert($,"上传图片长度不能大于1M！",'warn');
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
				if(oWidth != width || oHeight != height){
					Alert($,"图片的尺寸必须为"+width+"*"+height+"！",'warn');
					isFlag =false;
					return false;
				}
				preview.html('<img src="' + evt.target.result + '" />');
				var obj = preview.find('img');
				autoSize(obj,750,320);
			}
		}
		reader.readAsDataURL(obj.files[0]);
	} else {
		preview.html('<div class="img" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=\'' + file.value + '\'"></div>');
	}
	return isFlag;
}
var uploadFile2 = function(obj,preview,width,height){
	var isFlag = true;
	console.log(width+'--'+height);
	var width = width ? width : 750;
	var height = height ? height : 320;
	if (obj.files && obj.files[0]) {
		if(obj.files[0].size > 2000000){
			Alert($,"上传图片长度不能大于2M！",'warn');
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
				preview.html('<img src="' + evt.target.result + '" />');
			}
		}
		reader.readAsDataURL(obj.files[0]);
	} else {
		preview.html('<div class="img" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=\'' + file.value + '\'"></div>');
	}
	return isFlag;
}
//表单值不能为空判断
var validateForm = function(obj){
	var Flag= true;
	obj.find("input").each(function(index,item){
		if($(item).attr("type") != 'file'){
			var _item = $(item);
			if(!_item.val().length){
				var tips = _item.parent().siblings('label').html();
				console.log(tips);
				Alert($,tips+'不能为空！','warn');
				_item.on('focus',function(){});
				Flag = false;
				return false;
			}
		}
	});
	return Flag;
}


var imgHandle = function(obj){
	var image = new Image();
	image.src = obj.attr("src");
	image.onload=function(){
		if(this.width > this.height){
			this.width  = this.width / (this.height/100);
			this.height = 100;
		}
		else {
			this.height = this.height / (this.width/100);
			this.width = 100;
		}
		console.log(this.width);
		console.log(this.height);
		obj.attr("src",image.src).css({"margin-left":-this.width/2+"px","margin-top":-this.height/2+"px","width":this.width,"height":this.height});
	}
}

//图片等比缩放
var autoSize = function(obj,w2,h2){
	console.log(w2,h2);
	w1 = parseInt(obj.width());
	h1 = parseInt(obj.height());
	var base = 0;
	if(w1 >= h1){
		bet = h2/h1;
		w1  =  w2/bet;
		obj.css({"width": w1+'px'});
	}
	else if(w1 < h2) {
		bet = w2/w1;
		h1  = h2/bet;
		obj.css({"height": h1+'px'});
	}
}

// 点击显示，点击其他显示
var toggleShow = function($,str,oDiv,fn){
	$(str).off("click").on("click",function(e){
		e.stopPropagation();
		oDiv.fadeIn();
		if(fn){
			fn();
		}
		$(document).off("click").on("click",function(e){
			console.log(oDiv);
			oDiv.fadeOut();
		});
	});
}

//判断比赛状态
var getStatus = function(status){
	var str = '';
	switch(status){
		case 0 : str='未发布报名';break;
		case 1 : str='已发布报名';break;
		case 2 : str='已结束';break;
		case 3 : str='比赛中';break;
		case 4 : str='报名中';break;
		case 5 : str='比赛中';break;
	}
	return str;
}
//随机产生六位密码
function GetRandomNum(Min,Max) {
	var Range = Max - Min;
	var Rand = Math.random();
	return(Min + Math.round(Rand * Range));
}

//对象个数
function objSum(obj) {
	var size = 0, key;
	for (key in obj) {
		if (obj.hasOwnProperty(key)) size++;
	}
	return size;
};

//创建、获取cookie
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

//菜单
var menu=function(){
	return '<div id="sidebar" class="nav-collapse"> ' +
	'<div class="leftside-navigation">' +
	'<ul class="sidebar-menu" id="nav-accordion">' +
	'<li class="sub-menu">' +
	'<a href="javascript:;">' +
	'<i class=" fa fa-bar-chart-o"></i>' +
	'<span>首页运营位</span>' +
	'</a>' +
	'<ul class="sub">' +
	'<li><a href="slider.html">轮播图</a></li>' +
	'<li><a href="ad.html">网吧活动</a></li>' +
	'<li><a  href="barImg.html">网吧图片</a></li>' +
	'</ul>' +
	'</li>' +
	'<li class="sub-menu">' +
	'<a   href="javascript:;">' +
	'<i class="fa fa-th"></i>' +
	'<span>竞猜管理</span>' +
	'</a>' +
	'<ul class="sub">' +
	'<li ><a   href="guessList.html">竞猜列表</a></li>' +
	'</ul>' +
	'</li>' +
	'<li class="sub-menu">' +
	'<a class="active" href="javascript:;">' +
	'<i class="fa fa-book"></i>' +
	'<span>比赛管理</span>' +
	'</a>' +
	'<ul class="sub">' +
	'<li><a class="active"  href="matchList.html">比赛列表</a></li>' +
	'</ul>' +
	'</li>' +
	'<li class="sub-menu">' +
	'<a  href="javascript:;">' +
	'<i class="fa fa-book"></i>' +
	'<span>魔豆商城</span>' +
	'</a>' +
	'<ul class="sub">' +
	'<li><a   href="doChange.html">扫码兑换</a></li>' +
	'<li><a  href="exchangeList.html">兑换列表</a></li>' +
	'<li><a class="active"   href="shopManage.html">商城管理</a></li>' +
	'</ul>' +
	'</li>' +
	'<li class="sub-menu">' +
	'<a  href="javascript:;">' +
	'<i class="fa fa-book"></i>' +
	'<span>抽奖管理</span>' +
	'</a>' +
	'<ul class="sub">' +
	'<li><a   href="lottery.html">抽奖活动</a></li>' +
	'<li><a   href="lotterManage.html">奖品库管理</a></li>' +
	'<li><a    href="lotteryList.html">中奖记录</a></li>' +
	'<li><a   href="doChange.html">扫码兑换</a></li>' +
	'</ul>' +
	'</li>' +
	'<li class="sub-menu">' +
	'<a class="active" href="javascript:;">' +
	'<i class="fa fa-book"></i>' +
	'<span>活动管理</span>' +
	'</a>' +
	'<ul class="sub">' +
	'<li><a class="active"  href="active_jdqs.html">吃鸡管理</a></li>' +
	'<li><a class="active"  href="goddess.html">女神争霸赛</a></li>' +
	'</ul>' +
	'</li>' +
	'</ul></div></div>'
}
$("#menu").html(menu());

//时间转换
function dateChange(i){
	var d = new Date(i);    //根据时间戳生成的时间对象
	var date = (d.getFullYear()) + "年" +
		(d.getMonth() + 1) + "月" +
		(d.getDate()) + "日 "
	return date;
}


