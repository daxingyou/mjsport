//单关竞猜问题模板
var question=function(item){
    var index=0;
    //console.log(item.options.length);
    //console.log(item.options);
    var odds1 = item.options[0].odds ? item.options[0].odds :'--';
    var odds2 = item.options[1].odds ? item.options[1].odds :'--';
    var str3  = item.options.length == 3 ? '<div class="hasbet">已投<span class="no3">'+(item.options[2].bet_multi ? item.options[2].bet_multi :'--')+'</span>注</div>' : "";
    var str2  = item.options.length == 3 ? '<div class="option "><span class="option_name">C</span>&nbsp;&nbsp;<span class="no3">'+(item.options[2].option ? item.options[2].option :'--')+'</span></div>' : "";
    var str   = item.options.length == 3 ? '<div class="per"><span class="no3">'+(item.options[2].odds ? item.options[2].odds :'0')+'</span>赔率</div>' : "";
    return '<div class="item">'
                +'<div class="question">'
                     +'<div class="index">'+ item.id +',</div>'
                     +'<div class="qcontent">'+item.question +'</div>'
                     +'<div class="pond">奖池'+item.total_modou+'魔豆</div>'
                +'</div>'
                +'<div class="options">'
                     +'<div class="option"><span class="option_name">A</span>&nbsp;&nbsp;'+item.options[0].option +'</div>'
                     +'<div class="option"><span class="option_name">B</span>&nbsp;&nbsp;'+item.options[1].option +'</div>'
                     +str2
                +'</div>'
                +'<div class="q_details">'
                        +'<div class="lossPers">'
                                    +'<div class="per">'+odds1+'赔率</div>'
                                    +'<div class="per">'+odds2+'赔率</div>'
                                    +str
                        +'</div>'
                         +'<div class="bets">'
                             +'<div class="hasbet">已投<span class="no3">'+ item.options[0].bet_multi+'</span>注</div>'
                             +'<div class="hasbet">已投<span class="no3">'+ item.options[1].bet_multi+'</span>注</div>'
                            +str3
                        +'</div>'
                +'</div>'
                +'<div class="look_btn"><i class="look_icon look_icon_noactive"></i><span class="look_btn_content">查看详情</span></div>'
         +'</div>';
};
//过关竞猜问题模板
var question3=function(item){
    var index=0;
    var odds1 = item.options[0].odds ? item.options[0].odds :'--';
    var odds2 = item.options[1].odds ? item.options[1].odds :'--';
    var str3  = item.options.length == 3 ? '<div class="hasbet">已投<span class="no3">'+(item.options[2].bet_multi ? item.options[2].bet_multi :'--')+'</span>注</div>' : "";
    var str2  = item.options.length == 3 ? '<div class="option "><span class="option_name">C</span>&nbsp;&nbsp;<span class="no3">'+(item.options[2].option ? item.options[2].option :'--')+'</span></div>' : "";
    var str   = item.options.length == 3 ? '<div class="per"><span class="no3">'+(item.options[2].odds ? item.options[2].odds :'0')+'</span>赔率</div>' : "";
    return '<div class="item">'
                +'<div class="question">'
                     +'<div class="index">'+ item.id +',</div>'
                     +'<div class="qcontent">'+item.question +'</div>'
                +'</div>'
                +'<div class="options">'
                     +'<div class="option"><span class="option_name">A</span>&nbsp;&nbsp;'+item.options[0].option +'</div>'
                     +'<div class="option"><span class="option_name">B</span>&nbsp;&nbsp;'+item.options[1].option +'</div>'
                     +str2
                +'</div>'
         +'</div>';
};
//比赛详细信息模板
var matchinfo=function(item){
    return '<div class="infolist">'
            +'<div class="name">比赛时间</div>'
            +'<div class="details">2017年05月23日 17:30</div>'
            +'</div>'
            +'<div class="infolist">'
            +'<div class="name">举办地点</div>'
            +'<div class="details">'+item.addr+'</div>'
            +'</div>'
            +'<div class="infolist">'
            +'<div class="name">比赛奖金</div>'
            +'<div class="details">10000元</div>'
            +'</div>'
            +'<div class="infolist">'
            +'<div class="name">比赛游戏</div>'
            +'<div class="details">英雄联盟</div>'
            +'</div>'
            +'<div class="infolist">'
            +'<div class="name">比赛规则</div>'
            +'<div class="rulelist">'
            +'<p class="rule">5V5</p>'
            +'<p class="rule">BO5</p>'
            +'<p class="rule">召唤师峡谷大乱斗</p>'
            +'</div>'
            +'</div>'
            +'<div class="infolist">'
            +'<div class="name">参赛队伍</div>'
            +'<div class="teamlists">'
            +'<div class="team team1">'
            +'<div class="teamimg"><img src="http://static.jesport.com/sly/images/item1.png" alt=""></div>'
            +'<div>汉宫Clan龙珠</div>'
            +'</div>'
            +'<div class="team team2">'
            +'<div class="teamimg"><img src="http://static.jesport.com/sly/images/item2.png" alt=""></div>'
            +'<div calss="teamname">稳住我们能赢</div>'
            +'</div>'
            +'</div>'
            +'</div>'
            +'</div>'
};
//队员信息模板
var meminfo=function(item){
    if(item.duty==undefined){
        item.duty="未知"
    }
    return  '<div class="one-mem">' +
        '<div class="member-img"><img src="'+ item.logo+'" alt="图片"></div>' +
        '<div class="member-info">' +
        '<p class="member-name">名称：'+item.name+'</p>' +
        '<p class="member-position">位置：'+item.duty+'</p>' +
        '</div>' +
        '</div>'
}
//首页队伍信息
var matchTpl = function( item ){
    //console.log(item)
    var bluepic,redpic;
    if(item.teaminfo.blue.logo){
        if(item.teaminfo.blue.logo.indexOf("http")<0){
            bluepic="http://static.jesport.com/backend/"+item.teaminfo.blue.logo;
            console.log(item.teaminfo.blue.logo)
        }else{
            bluepic=item.teaminfo.blue.logo;
        }
        if(item.teaminfo.red.logo.indexOf("http")<0){
            redpic="http://static.jesport.com/backend/"+item.teaminfo.red.logo;
            console.log(item.teaminfo.blue.logo)
        }else{
            redpic=item.teaminfo.red.logo;
        }
    }

    return '<div class="match-list-item" data-id="'+item.id+'">'
    +'<div class="item-top">'
    +'<span class="item-title">'
    +item.name
    +'</span>'
    +'<span class="item-time">'
    +item.start_at
    +'</span>'
    +'</div>'
    +' <div class="item-main">'
    + '<div class="item-left">'
    +'<div class="item-img">'
    +'<a href="javascript:;">'
    +'<img src="'+ bluepic+'" alt="">'
    +'</a>'
    +'</div>'
    +'<p>'+item.teaminfo.blue.name+'</p>'
    + '</div>'
    +' <div class="item-cen">'
    +'<p class="score-list"><span>v</span><span>s</span></p>'
    +'<div class="look-btn">'
    +' <a href="javascript:;">竞猜</a>'
    +'</div>'
    +'</div>'
    +' <div class="item-main">'
    + '<div class="item-left">'
    +'<div class="item-img">'
    +'<a href="javascript:;">'
    +'<img src="'+ redpic +'" alt="">'
    +'</a>'
    +'</div>'
    +'<p>'+item.teaminfo.red.name+'</p>'
    + '</div>'
    +'</div>'
    +'</div>'
    +'</div>';
}
//首页资讯列表
var infoTpl =  function(item){
    item.previewImg = item.previewImg ? item.previewImg : "http://static.jesport.com/sly/images/pic2.jpg";
    return  '<a href="infoDetail.html?id='+item.id+'" class="info-item">'
        + '<div class="info-item-pic">'
        +'<img src="'+item.previewImg+'">'
        + ' </div>'
        + '<div class="info-item-box">'
        +'<div class="info-item-title">'
        +item.title
        +'</div>'
        +'<div class="info-item-tips">'
        +'<div class="times-box">'
        +' <span class="icon-times"></span>'
        +' <span class="times">'+item.viewNum+'</span>'
        +'<span>次</span>'
        +'</div>'
        +'<div class="date-box">'
        +' <span class="icon-date"></span>'
        +'<span class="date">'+item.publishedDate+'</span>'
        +'</div>'
        +'</div>'
        + '</div>'
        +  '</a>';
}
//网吧比赛列表
var barTpl2 = function(item){
    return '<div class="match_list bar_list"> '
        +'<div class="match_info" data-id = "'+item.id+'" >'
        +'<div class="item-main">'
        +'<div class="item-left">'
        +'<div class="item-img">'
        +' <a href="javascript:;">'
        +' <img src="'+item.teaminfo.blue.logo+'" alt="">'
        +'</a>'
        +'</div>'
        +'<p>'+item.teaminfo.blue.name+'</p>'
        +'</div>'
        +'<div class="item-cen">'
        +' <p class="score-list"><span>v</span><span>s</span></p>'
        +'<div class="look-btn">'
        +' <a class="state2" href="javascript:;">竞猜</a>'
        +'</div>'
        +'</div>'
        +' <div class="item-right">'
        +'<div class="item-img">'
        +'<a href="javascript:;">'
        +'<img src="'+item.teaminfo.red.logo+'" alt="">'
        +'</a>'
        +'<p>'+item.teaminfo.red.name+'</p>'
        +'</div>'
        +'</div>'
        +'</div>'
        +'<div class="item-foo">'
        +'<div class="item-foo-left">'
        +item.game+'['+item.rule.memtype+','+item.rule.ruletype+','+(item.rule.map = item.rule.map ? item.rule.map : '--')+']'
        +'</div>'
        +'<div class="item-foo-right">'
        +' <span class="member-num">'+item.betnum+'</span>'
        +'<span class="icon-person"></span>'
        +'</div>'
        +'</div>'
        +'</div>'
        + '</div>'
}

//网吧列表
var barTpl = function(item,star){
    var pic=(item.advimg==null)?"http://static.jesport.com/sly/images/pic2.jpg":item.advimg;
    return '<div class="corp_info" data-id="'+item.id+'">'
        +'<div class="corp_img"><img src="'+pic+'" alt="网吧图片" /></div>'
        +'<div class="corp_details">'
        +'<div class="corp_name" style="justify-content:flex-start;"><span>'+item.name+'</span>-<span>'+item.addr+'</span></div>'
        +'<div class="corp_grade">'
        +'<div class="grade_icon">'
        +star
        +'</div>'
        +' <div class="grade_value">'+item.star+'分</div>'
        +'</div>'
        +'<div class="corp_price">'+item.price+'元/小时</div>'
        +' <div class="corp_match"><div class="corp_match_icon">赛</div><div class="corp_match_list">英雄联盟 [5V5,BO5,峡谷大乱斗]</div></div>'
        +'</div>'
        +'</div>';
}

//竞猜模板
var guessInfo2=function(item){
    var status="竞&nbsp;&nbsp;猜",bgcolor="";
    if(item.complete){
        status="已&nbsp;结&nbsp;束"
        bgcolor="background-color:#f2f2f2"
    }
    return  '<div data-id="'+item.id+'" data-olid="'+item.olid+'" class="match_list">'
        + '<div class="match_info">'
        + '<div class="match_name">'
        + item.name
        + '</div>'
        + '<div class="item-main">'
        + '<div class="item-left">'
        + '<div class="item-img">'
        + '<a href="javascript:;">'
        + '<img src="'+item.teaminfo.blue.logo+'" alt="">'
        + '</a>'
        + '</div>'
        + '<p>'+item.teaminfo.blue.name+'</p>'
        + '</div>'
        + '<div class="item-cen">'
        + '<p class="score-list"><span>v</span><span>s</span></p>'
        + '<div class="look-btn">'
        + '<a class="state1" href="javascript:;">查看战报</a>'
        + '<a class="state2" href="javascript:;" style="'+bgcolor+'">‘+ status +’</a>'
        + '</div>'
        + '</div>'
        + '<div class="item-right">'
        + '<div class="item-img">'
        + '<a href="javascript:;">'
        + '<img src="'+item.teaminfo.red.logo+'" alt="">'
        + '</a>'
        + '</div>'
        + '<p>'+item.teaminfo.red.name+'</p>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '</div>';
}
var guessInfo3=function(item){
    var status="竞&nbsp;&nbsp;猜",bgcolor="";
    if(item.complete){
        bgcolor="background-color:#868686;"
        status="已&nbsp;结&nbsp;束"
    }
    //console.log(item.teaminfo.red.logo)
    if(item.teaminfo.blue.logoUrl){
        item.teaminfo.blue.logo=item.teaminfo.blue.logoUrl
    }
    if(item.teaminfo.red.logoUrl){
        item.teaminfo.red.logo=item.teaminfo.red.logoUrl
    }
    if(item.teaminfo.blue.logo){
        if(item.teaminfo.blue.logo ==undefined ||item.teaminfo.blue.logo==""){
            item.teaminfo.blue.logo="http://static.jesport.com/sly/images/item1.png"
        }else if( item.teaminfo.blue.logo.indexOf("http") <0){
            item.teaminfo.blue.logo="http://static.jesport.com/backend/"+item.teaminfo.blue.logo;
        }
    }else{
        item.teaminfo.blue.logo="http://static.jesport.com/sly/images/item1.png"
    };
    if(item.teaminfo.red.logo) {
        if (item.teaminfo.red.logo == undefined || item.teaminfo.red.logo == "") {
            item.teaminfo.red.logo = "http://static.jesport.com/sly/images/item2.png"
        } else if (item.teaminfo.red.logo.indexOf("http") < 0) {
            item.teaminfo.red.logo = "http://static.jesport.com/backend/" + item.teaminfo.red.logo;
        }
    }else {
        item.teaminfo.red.logo = "http://static.jesport.com/sly/images/item2.png"
    };
    return  '<div data-id="'+item.id+'" data-olid="'+item.olid+'" class="match_list match-list-item">'
        + '<div class="match_info">'
        +'<div class="item-top">'
        +'<div class="item-title match_name">'
        +item.name
        +'</div>'
        +'<div class="item-time">'
        +item.start_at
        +'</div>'
        +'</div>'
        + '<div class="item-main">'
        + '<div class="item-left">'
        + '<div class="item-img">'
        + '<a href="javascript:;">'
        + '<img src="'+item.teaminfo.blue.logo+'" alt="">'
        + '</a>'
        + '</div>'
        + '<p>'+item.teaminfo.blue.name+'</p>'
        + '</div>'
        + '<div class="item-cen">'
        + '<p class="score-list"><span>v</span><span>s</span></p>'
        + '<div class="look-btn">'
        + '<a class="state1" href="javascript:;">查看战报</a>'
        + '<a class="state2" href="javascript:;" style="'+bgcolor+'">'+ status +'</a>'
        + '</div>'
        + '</div>'
        + '<div class="item-right">'
        + '<div class="item-img">'
        + '<a href="javascript:;">'
        + '<img src="'+item.teaminfo.red.logo+'" alt="">'
        + '</a>'
        + '</div>'
        + '<p>'+item.teaminfo.red.name+'</p>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '</div>';
}
//提现列表
var cashListTpl = function ( item ){
    var status = '';
    switch(item.status){
        case 'INIT' : status = '审核中';break;
        case 'SUCCESS' : status = '已到账';break;
        case 'FAIL' : status = '提现失败';break;
        case 'BANKING' : status = '银行处理';break;
    }

    return '<a class="guess-item">'
        +'<span class="guess-date">'+item.createdDate.split(" ")[1]+'</span>'
        +'<span class="guess-sort">'+item.money+'</span>'
        +' <span style="color: #00CC00;" class="guess-num">'+status+'</span>'
        +'</a>';
}

//魔豆历史列表
var mdTpl = function ( item ){
    //var sort = '';
    //if(item.type =='CHARGE'){
    //    sort = '充值兑换';
    //    item.num="+"+item.num
    //} else if(item.type=='OFFLINE'){
    //    sort = '活动报名';
    //    item.num=-item.num
    //}else if(item.type=='LOTTERY_ADD'){
    //    sort = '活动中奖';
    //    item.num="+"+item.num
    //}else if(item.type=='LOTTERY_REDUCE'){
    //    sort = '摇奖消耗';
    //    item.num=-item.num
    //}else if(item.type=='BACKEND_ADD'){
    //    sort = '活动中奖';
    //    item.num="+"+item.num
    //}else if(item.type=='BET'){
    //    sort = '竞猜投注';
    //    item.num=-item.num
    //}else if(item.type=='AWARD'){
    //    sort = '竞猜中奖';
    //    item.num="+"+item.num
    //}else if(item.type=='EXCHANGE'){
    //    sort = '兑换商品';
    //    item.num=-item.num
    //}else if(item.type=='MATCH_BET_AWARD'){
    //    sort = '竞猜奖励（网吧赛）';
    //    item.num="+"+item.num
    //}else if(item.type=='MATCH_BET'){
    //    sort = '竞猜投注（网吧赛）';
    //    item.num=-item.num
    //}else if(item.type=='VOTE_AWARD'){
    //    sort = '投票奖励（网吧赛）';
    //    item.num="+"+item.num
    //}else if(item.type=='VOTE'){
    //    sort = '投票（网吧赛）';
    //    item.num=-item.num
    //}else if(item.type=='OFFICIL_BET_AWARD'){
    //    sort = '竞猜奖励';
    //    item.num="+"+item.num
    //}else if(item.type=='OFFICIL_BET'){
    //    sort = '竞猜投注';
    //    item.num=-item.num
    //}else if(item.type=='SPORTS'){
    //    sort = '比赛报名（网吧赛）';
    //    item.num=-item.num
    //}else if(item.type=='OFFICIL_BET_REFUND'){
    //    sort = '投注退款';
    //    item.num="+"+item.num
    //}else if(item.type=='SPECIAL_VOTE'){
    //    sort = '活动投票';
    //    item.num="+"+item.num
    //}else{
    //    sort = '投注';
    //    item.num=-item.num
    //}
    var sort = item.typeCn;
    if(sort.indexOf("-")>=0){
        item.num="-"+item.num
    }else{
        item.num="+"+item.num
    }
    sort=sort.split(/[- +]/)[1];
    return '<a class="guess-item">'
        +'<span class="guess-date">'+item.createdDate.split(" ")[1]+'</span>'
        +'<span class="guess-sort">'+ sort +'</span>'
        +' <span  class="guess-num">'+item.num+'</span>'
        +'</a>';
}
//提现申请
var cashTpl = function(item,cashNum){
    return '<div class="cash-tips">提现需先绑定支付宝账户</div><div class="cash-list">'
        +'<div id="cash-item" class="cash-item">'
        +'<div class="alipay-img"><a href="javascript:;"><img src="http://static.jesport.com/sly/images/pic1.jpg" alt=""> </a></div>'
        +'<div class="alipay-info">'
        +'<p class="alipay-name">支付宝账号<span data-id="'+item.id+'" id="alipayName">（'+item.accountInfo+'）</span></p>'
        +'<p class="alipay-tips">预计一个工作日到账</p>'
        +'</div>'
        +'<span class="icon-right"></span>'
        +'</div>'
        +'</div>'
        +'<div class="cash-detail">'
        +'<div class="cash-title">提现金额</div>'
        +'<div class="cash-money">'
        +'<span class="icon-money"></span>'
        +'<input class="money-text" id="cashValue" type="text" placeholder="100.00">'
        +'</div>'
        +'<div class="money-tips">可提现金额：<span class="money-text2">'+cashNum+'</span></div>'
        +'</div>'
        +'<div class="cash-tips2">该笔手续费由魔杰电竞承担</div><div class="next" ><button id="next-btn" class="next-btn">提交申请</button>';
}

//竞猜列表
var guessTpl = function(item){
    var sort = '';
    var result = '';
    if(item.betid == 303){
        sort = '过关';
        switch(item.bonuscls){
            case null : result = "未开奖"; break;
            case 99 : result = "特等奖"; break;
            case 1 : result = "一等奖"; break;
            case 2 : result = "二等奖"; break;
            case 3 : result = "三等奖"; break;
            case 0 : result = "未中奖"; break;
        }
    }
    else {
        sort = '单关';
        switch(item.bonuscls){
            case null : result = "未开奖"; break;
            case 1 : result = "中奖"; break;
            case 0 : result = "未中奖"; break;
        }
    }

    return '<a href="orderDetail.html?id='+item.id+'"class="guess-item">'
        +'<span class="guess-date">'+item.create_at.split(" ")[1]+'</span>'
        +'<span class="guess-sort">'+sort+'</span>'
        +'<span class="guess-num">'+item.pay_fee+'魔豆</span>'
        +'<span class="guess-status">'+result+'</span>'
        +'</a>'
}

//奖金历史列表
var jjTpl = function ( item ){
    var sort = '';
    if(item.type =='AWARD')
        sort = '福袋';
    else if(item.type =='WITHDRAW')
        sort = '提现';
    else
        sort = '兑换商品';
    return '<a class="guess-item">'
        +'<span class="guess-date">'+item.createdDate.split(" ")[1]+'</span>'
        +'<span class="guess-sort">'+sort+'</span>'
        +' <span style="color: #00CC00;" class="guess-num">'+item.money+'</span>'
        +'</a>';
}

//个人中心
var proTpl = function( json ){
    return  '<div class="pheader-top">'
        +'<div class="pheader-left">'
        +'<img src="'+json.memberInfo.avatar+'" >'
        +'</div>'
        +'<div class="pheader-right">'
        +' <p class="name">'+json.memberInfo.name+'</p>'
        +'<div class="lv-box"><span class="icon-lv"></span>'
        +'<span class="lv-item">魔术等级LV'
        +json.memberInfo.memberDetailTo.vipLevel
        +'</span>'
        +'</div>'
        +'</div>'
        +'</div>'
        +'<div class="pheader-bottom">'
        +'<div class="ex-box">'
        +'<div class="ex-bg"><div class="pink-line"></div></div>'
        +'<div class="ex-num">成长值：'
        +'<span class="now">'
        +json.currExperience
        +'</span> / '
        +'<span class="max">'
        +json.maxExperience
        +'</span>'
        +'</div>'
        +'</div><a href="buyMd.html" class="watering-btn">浇水</a>'
        +'</div>';
}
//个人中心资金
var banTpl = function(json){
    return '<a href="mdAccount.html" class="md-box">'
        +'<span class="icon-md"></span>'
        +'<span style="color: #000;" class="md-num">'
        +json.memberBean.balanceBean
        +'</span>'
        + '</a>'
        + '<a href="jjBalance.html" class="money-box">'
        + '<span class="icon-money"></span>'
        + '<span style="color: #000;" class="money-num">'
        + json.memberFinance.balanceMoney
        + '</span>'
        + '</a>'
}

//资讯详情
var infoHeader = function(item){
    return    '<div class="info-title">'
        + item.title
        + '</div>'
        + '<div class="info-about">'
        + '<div class="info-about-left">'
        +'<span class="info-source">'
        +item.author
        +'</span>'
        + '<span class="info-public-date">'
        +item.publishedDate
        + '</span>'
        + '</div>'
        + '<div class="info-about-right">'
        + '<span class="icon-times"></span>'
        + '<span class="times-num">'
        + item.viewNum
        + '</span>'
        + '</div>'
        + '</div>'
}

//比赛网吧列表
var barlist = function(item,picurl){
    return '<div class="corp_info">'
        +'<div class="corp_img"><img src='+ picurl+' alt="网吧图片" /></div>'
        +'<div class="corp_details">'
        +'<div class="corp_name" style="justify-content:flex-start;">'
        +'<span>'+ item.netbar.name +'</span>-<span>'+ item.netbar.addr +'</span>'
        +'</div>'
        +'<div class="corp_grade">正在竞猜</div>'
        +'<div class="corp_match">'
        +'<div class="corp_match_list"><span class="crop_match_num">'+item.betnum +'</span><i class="corp_match_icon"><img src="http://static.jesport.com/sly/images/icon-person.png" alt=""></i></div>'
        +'<div class="gobar-btn" data-barid='+item.netbar.id+'>前往参加</div></div></div></div>'
}


//赛事统计
var memlist=function(item){
    return '<tr class="detail-tbody-tr">' +
            '<td class="tbody-player">' +
        '<div><img  class="img player-img" src="'+item.player.logo+'" alt=""></div>' +
        '<p>'+item.player.name+'</p>' +
        '</td>' +
        '<td><img class="img hero-img" src="'+item.hero.logo+'" alt=""></td>' +
        '<td class="detail-score">'+item.hero_kill+'/'+item.dead+'/'+item.kill_assists+'</td>' +
        '<td class="detail-score">'+item.money+'</td>' +
        '<td class="detail-score">'+item.soldier_kill+'</td>' +
        '</tr>'
}

//奖金公告
var notices=function(item){
    if(!item.name){
        item.name="用户"
    }
    return  '<li>' +
        '<div>'+ lotterydate(item.openat)+'</div>' +
        '<div>恭喜<span>'+item.name+'</span></div>' +
        '<div><span>'+gameway(item.betid)+'</span>赢取<span>'+item.bonus+'</span>魔豆</div></li>'
}

//中奖排行
var ranks=function(item){
    if(!item.name){
        item.name="用户"
    }
    return '<div class="onerank">' +
            '<div class="img"><img src="http://static.jesport.com/sly/images/NO'+item.rank+'.png" alt=""></div>' +
            '<div class="name">'+ item.name+'</div>' +
            '<div class="bonus">'+item.total_bonus+' <img src="http://static.jesport.com/sly/images/modou.png" alt=""></div>' +
            '<div class="bonusinfo">' +
            '<div>单关竞猜<span>'+item.bonus_301+'</span></div>' +
            '<div>过关竞猜<span>'+item.bonus_303+'</span></div>' +
            '</div>' +
            '</div>'
}

//奖金纪录
var records=function(item){
    if(!item.name){
        item.name="用户"
    }
    return  '<li>' +
                '<div>'+ lotterydate(item.openat)+'</div>' +
                '<div><span>'+item.name+'</span></div>' +
                '<div><span>'+gameway(item.betid)+'</span>竞猜赢取</div>' +
                '<div class="getbonus">'+item.bonus+'<img src="http://static.jesport.com/sly/images/modou.png" alt=""></div> ' +
            '</li>'

}
//抽奖页面我的奖品
var mygiftlist=function(item){
    var str = '';
    var desc=item.exchangeDesc?item.exchangeDesc:"无";
    if(item.status){
        str='已兑换';
    }
    else {
        str="未兑换";
    }
    if(item.dueDate==null){
        item.dueDate="即时到账"
    }else{
        item.dueDate=datachange(item.dueDate)+"前"
    }
    
    return '<div class="onegift">' +
        '<div class="giftimg"><img src="'+item.goodsImg+'" alt=""></div>' +
        '<div class="giftinfo">' +
        '<div class="giftname"> '+item.goodsName+'</div>' +
        '<div class="excdesc">兑换说明：'+ desc +'</div>' +
        '<div class="excdate">兑换有效期：'+item.dueDate+'</div>' +
        '<div class="status">'+ str +'</div>' +
        '</div>' +
        '</div>'
}

//兑换商店商品列表
var goodsList=function(item){
    return '<div class="list-item">' +
        '<div class="goodimg" data-id="'+item.id+'"><img src="'+item.img+'" alt=""></div>' +
        '<div class="goodinfo">' +
        '<div class="goodvalue"><span class="cost">'+item.beans+'</span><img src="http://static.jesport.com/sly/images/shopimg/icon-md.png"></div>' +
        '<div class="refervalue">'+item.price+'元</div>' +
        '</div>' +
        '<div class="exchange-btn" data-id="'+item.id+'">立即兑换</div>' +
        '</div>'
}

//我的兑换列表
var myexclist=function(item){
    var status = '';
    switch (item.status){
        case 1:status = "未使用"; break;
        case 2:status = "已使用"; break;
        case 3:status = "已过期"; break;
    }
    return '<div class="recorditem" data-id="'+item.id+'">' +
        '<div class="img">' +
        '<img src="'+item.goodsInfo.img+'" alt="">' +
        '</div>' +
        '<div class="recordinfo">' +
        '<div class="name">'+item.goodsInfo.name+'</div>' +
        '<div class="status">'+status+'</div>' +
        '<div class="pay">支付魔豆：<span id="paymdnum">'+item.goodsInfo.beans+'</span></div>' +
        '<div class="invalidDate">截止时间：<span id="date">'+invalidDate(item.invalidDate)+'</span></div>' +
        '</div>' +
        '</div>'
}

//首页比赛列表
var indexmatch=function(item){
    var status,bgcolor;
    if(item.complete){
        status="yijieshu"
        bgcolor="#AABCD6";
    }else{
        if(item.result==null){
            status="jingcaizhong"
            bgcolor="#EF6095";
        }
    }
    var num=Math.round(Math.random()*6+1)
    var pic="http://static.jesport.com/sly/images/indeximages/yingxiongtiao"+ num+".png";
    if(item.teaminfo.blue.logo){
        if(item.teaminfo.blue.logo ==undefined ||item.teaminfo.blue.logo==""){
            item.teaminfo.blue.logo="http://static.jesport.com/sly/images/item1.png"
        }else if( item.teaminfo.blue.logo.indexOf("http") <0){
            item.teaminfo.blue.logo="http://static.jesport.com/backend/"+item.teaminfo.blue.logo;
        }
    }else{
        item.teaminfo.blue.logo="http://static.jesport.com/sly/images/item1.png"
    }
    if(item.teaminfo.red.logo) {
        if (item.teaminfo.red.logo == undefined || item.teaminfo.red.logo == "") {
            item.teaminfo.red.logo = "http://static.jesport.com/sly/images/item2.png"
        } else if (item.teaminfo.red.logo.indexOf("http") < 0) {
            item.teaminfo.red.logo = "http://static.jesport.com/backend/" + item.teaminfo.red.logo;
        }
    }else {
        item.teaminfo.red.logo = "http://static.jesport.com/sly/images/item2.png"
    }
    return '<div class="gameitem" data-id="'+item.id+'">' +
        '<div class="item-top" style="background-color: '+bgcolor+';background-image: url('+pic+')">' +
        '<span class="gamedate">'+indexdate(item.start_at)+'</span>' +
        ''+item.name+ ''+
        '<img src="http://static.jesport.com/sly/images/indeximages/'+ status+'.png" alt="">' +
        '</div>' +
        '<div class="item-bottom">' +
        '<div class="imgbox">' +
        '<div class="teamimg team1img">' +
        '<img   src="'+item.teaminfo.blue.logo+'" alt="">' +
        '</div>' +
        '<div class="score">VS</div>' +
        '<div class="teamimg team2img">' +
        '<img   src="'+item.teaminfo.red.logo+'" alt="">' +
        '</div>' +
        '</div>' +
        '<div class="namebox">' +
        '<div class="team1name teamname">'+item.teaminfo.blue.name+'</div>' +
        '<div class="watch">查看数据</div>' +
        '<div class="team2name teamname">'+item.teaminfo.red.name+'</div>' +
        '</div>' +
        '</div>' +
        '</div>'
}

//首页小广告
var advList=function(item){
    return  '<div class="netbaritem" style="background-image:url('+item.img+') ">' +
        '<a href="'+item.url+'">' +
        '<div class="adname">'+item.title+'</div>' +
        '</a>' +
        '</div>'
}
//首页大广告
var advList2=function(item){
    return '<div class="bigad" style="background-image: url('+item.img+')">' +
        '<a href="'+item.url+'">' +
        '<div class="adname">'+item.title+'</div>' +
        '</a></div>'
}

//抽奖奖品列表
var giftlist=function(item ,giftindex){
    return '<div class="luck-unit luck-unit-'+giftindex+' " data-id="'+ item.id+ '">' +
        '<div class="awardbg">' +
        '<img src="'+item.img+'">' +
        '<div class="name">'+item.name+'</div>' +
        '</div>' +
        '</div>'
}

var  netbarActivity=function(item){
    var state="";
    var color="";
    if(item.state==1){
        state="报名中"
        color="#EF6095"
    }else if(item.state==5){
        state="比赛中"
        color="#33CC99"
    }else if(item.state==2){
        state="已结束"
        color="#AABCD6"
    }
    return '<div class="activityitem" data-id="'+item.id+'">' +
        '<div class="img"><div class="state" style="background-color:'+color+'">'+state+'</div><img src="'+item.poster+'" alt=""></div>' +
        '<div class="activityinfo">' +
        '<div class="name">'+item.gameName + item.name+'</div>' +
        '<div class="date">'+item.startDate+'</div>' +
        '</div>' +
        '</div>'
}