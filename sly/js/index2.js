

function HomePage(){
    this.myScroll = null;
    //this.mySwiper();
    this.member();
    this.render();
    this.bulletin();
}
HomePage.prototype={
    //mySwiper:function(){
    //    $.getJSON(listUrl+"layout/slider/list",function(json){
    //        //console.log(json)
    //        if(json.errCode==0){
    //            var data =json.sliderList;
    //            if(data.length==1){
    //                $(".swiper-pagination").hide();
    //            }else{
    //                $(".swiper-pagination").show();
    //            }
    //            var str="";
    //            data.forEach(function(item){
    //                if(item.url=="http://www.baidu.com/"){
    //                    item.url="javascript:;"
    //                }
    //                str+='<div class="swiper-slide">' +
    //                '<a href="'+item.url+'">' +
    //                '<img src="'+item.img+'" alt="">' +
    //                '</a>' +
    //                '</div>'
    //            })
    //            $("#swiperlist").html(str);
    //            var mySwiper = new Swiper('.swiper-container',{pagination : '.swiper-pagination',loop : true,preventClicks : true});
    //        }
    //    })
    //    $(".swiper-slide a").on("click",function(){
    //        var url = $(this).attr("href");
    //        window.location.href = url;
    //    });
    //},
    member:function(){
        //$.getJSON(listUrl+'member/index', function(json) {
        //    if(json.errCode==0) {
        //        //$("#login-btn").hide();
        //        //$("#perimg").attr("src",json.memberInfo.avatar);
        //        //$("#perimg").show();
        //        //$("#beansnum").html(json.memberBean.balanceBean);
        //        if( json.memberInfo.secretMobile){
        //            //$("#tel").html(json.memberInfo.secretMobile);
        //            if(json.memberInfo.idCard != ""){
        //                $("#tel").html(nameExc(json.memberInfo.name));
        //                //$("#myuannum").html(json.memberYuan);
        //            }else{
        //                //$("#myuannum").html("请加入会员");
        //                //$("#myuannum").css("font-size","20px");
        //                //$("#questmark").show();
        //            }
        //        }else{
        //            $("#tel").html(json.memberInfo.nickname);
        //        }
        //        //else if(json.memberInfo.idCard){
        //        //    var name=json.memberInfo.name;
        //        //    name=name.replace(name[0],"*")
        //        //    $("#tel").html(name);
        //        //        $("#myuannum").html(json.memberYuan);
        //        //}
        //        $("#perimg").on("tap",function(){
        //            window.location.href="profile.html"
        //        })
        //    }else{
        //        if(isWeiXin()){
        //            window.location.href="autologin?f=index"
        //        }
        //        $("#login-btn").show();
        //        $("#perimg").hide();
        //        $("#perdetail").html("请登录后查看个人资产详情~")
        //        $("#login-btn").on("tap",function(){
        //            window.location.href="gologin.html?return=index"
        //        })
        //    }
        //});
    },
    render:function(){
        var data={
            page:1,
            pagesize:2
        }
        var ad="",ad2=""
        //$.post(listUrl+"layout/adv/list",{pid:1},function(json){
        //    if(json.errCode==0){
        //        var data=json.advList;
        //        data.forEach(function(item){
        //            ad+=advList(item);
        //        })
        //        $("#topad").html(ad);
        //    }
        //})
        //$.post(listUrl+"layout/adv/list",{pid:2},function(json){
        //    if(json.errCode==0){
        //        var data=json.advList;
        //        data.forEach(function(item){
        //            ad2+=advList2(item);
        //        })
        //        $("#netbarimg").append(ad2);
        //    }
        //})
        $.post(listUrl+'third/match/netbar',data,function(json){
            if(json.errno==0){
                if(!json.data){
                    var matchstr="",index=0;
                    $.post(listUrl+'third/bet/history',{page:1,pagesize:2},function(json){
                        json.data.matches.forEach(function(item){
                            if(index<2){
                                matchstr+=indexmatch(item)
                            }
                            index++;
                        })
                        $("#gamebox").html(matchstr);
                        $(".gameitem").off("tap").on("tap",function(){
                            var id=$(this).attr("data-id")
                            console.log(id)
                            window.location.href="matchinfo.html?id="+id+"&type=netbar";
                        })
                        var myScroll=new IScroll('#wrapper',{click:true,taps:true,mouseWheel:true});
                    })
                }
                else{
                    var matchstr="",index=0;
                    json.data.matches.forEach(function(item){
                        if(index<2){
                            matchstr+=indexmatch(item)
                        }
                        index++;
                    })
                    $("#gamebox").html(matchstr);
                    $(".gameitem").off("tap").on("tap",function() {
                        var id = $(this).attr("data-id")
                        console.log(id);
                        window.location.href="matchinfo.html?id="+id+"&type=netbar"
                    })
                    var myScroll=new IScroll('#wrapper',{click:true,taps:true,mouseWheel:true});
                }
            }
        })
    },
    bulletin:function(){
        //function getdata() {
        //    var str = "";
        //    $.getJSON(listUrl + "index/broadcast", function (json) {
        //        //clearInterval(interval);
        //        if (json.errCode == 0) {
        //            var data = json.broadcastList;
        //            //console.log(data);
        //            if(data.length==1){
        //                data.forEach(function (item) {
        //                    //item.memo=item.memo.replace(/抽中了/,"抽奖获得");
        //                    str +='<div>'+item+'</div> '
        //                })
        //                $("#bulletin-box").html(str+str);
        //            }else{
        //                data.forEach(function (item) {
        //                    //item.memo=item.memo.replace(/抽中了/,"抽奖获得");
        //                    str +='<div class="item">'+item+'</div> '
        //                })
        //                $("#bulletin-box").html(str);
        //            }
        //        }
        //    })
        //}
        //getdata();
        //var interval=setInterval(getdata,300000);
        ////滚动效果
        //var Mar = document.getElementById("bulletin-box");
        //var child_div=Mar.getElementsByClassName("item")
        //var picH = 70;//移动高度
        //var scrollstep=1;//移动步幅,越大越快
        //var scrolltime=15;//移动频度(毫秒)越大越慢
        //var stoptime=1000;//间断时间(毫秒)
        //var tmpH = 0;
        //Mar.innerHTML += Mar.innerHTML;
        //function start(){
        //    if(tmpH < picH){
        //        tmpH += scrollstep;
        //        if(tmpH > picH )tmpH = picH ;
        //        Mar.scrollTop = tmpH;
        //        setTimeout(start,scrolltime);
        //    }else{
        //        tmpH = 0;
        //        if(child_div[0]!=undefined){
        //            Mar.appendChild(child_div[0]);
        //        }
        //        Mar.scrollTop = 0;
        //        setTimeout(start,stoptime);
        //    }
        //}
        //onload=function(){setTimeout(start,stoptime)};
    },
}
new HomePage();