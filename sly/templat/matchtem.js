
/** 模板 **/
var question=function(item){
    var index=0;
    console.log(item.options.length);
    console.log(item.options);
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

var question3=function(item){
    var index=0;
    console.log(item.options.length);
    console.log(item.options);
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

var meminfo=function(item){
    return  '<div class="one-mem">' +
        '<div class="member-img"><img src="'+ item.logo+'" alt="图片"></div>' +
        '<div class="member-info">' +
        '<p class="member-name">名称：'+item.name+'</p>' +
        '<p class="member-position">位置：'+item.duty+'</p>' +
        '</div>' +
        '</div>'
}