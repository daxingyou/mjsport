
/** 模板 **/
var question=function(item){
    var index=0;
    if(item.options[2]==undefined){
        item.options[2]={
            "answer":"",
            "odd":"",
            "bet_multi":""
        }
    }
    return '<div class="item">'
        +'<div class="question">'
        +'<div class="index">'+ item.id +',</div>'
        +'<div class="qcontent">'+item.question +'</div>'
        +'<div class="pond">奖池123456魔豆</div>'
        +'</div>'
        +'<div class="options">'
        +'<div class="option"><span class="option_name">A</span>&nbsp;&nbsp;'+item.options[0].answer +'</div>'
        +'<div class="option"><span class="option_name">B</span>&nbsp;&nbsp;'+item.options[1].answer +'</div>'
        +'<div class="option "><span class="option_name">C</span>&nbsp;&nbsp;<span class="no3">'+item.options[2].answer+'</span></div>'
        +'</div>'
        +'<div class="q_details">'
        +'<div class="lossPers">'
        +'<div class="per">'+item.options[0].odds+'赔率</div>'
        +'<div class="per">'+item.options[1].odds+'赔率</div>'
        +'<div class="per"><span class="no3">'+item.options[2].odds+'</span>赔率</div>'
        +'</div>'
        +'<div class="bets">'
        +'<div class="hasbet">已投<span class="no3">'+ item.options[0].bet_multi+'</span>注</div>'
        +'<div class="hasbet">已投<span class="no3">'+ item.options[1].bet_multi+'</span>注</div>'
        +'<div class="hasbet">已投<span class="no3">'+ item.options[2].bet_multi+'</span>注</div>'
        +'</div>'
        +'</div>'
        +'<div class="look_btn"><i class="look_icon look_icon_noactive"></i><span class="look_btn_content">查看详情</span></div>'
        +'</div>';
};

var question2=function(item){
    var index=0;
    if(item.options[2]==undefined){
        item.options[2]={
            "answer":"",
            "odd":"",
            "bet_multi":""
        }
    }
    return '<div class="item">'
        +'<div class="question">'
        +'<div class="index">'+ item.id +',</div>'
        +'<div class="qcontent">'+item.question +'</div>'
        +'</div>'
        +'<div class="options">'
        +'<div class="option"><span class="option_name">A</span>&nbsp;&nbsp;'+item.options[0].answer +'</div>'
        +'<div class="option"><span class="option_name">B</span>&nbsp;&nbsp;'+item.options[1].answer +'</div>'
        +'<div class="option "><span class="option_name">C</span>&nbsp;&nbsp;<span class="no3">'+item.options[2].answer+'</span></div>'
        +'</div>'
        +'</div>';
}

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
            +'<div class="teamimg"><img src="images/item1.png" alt=""></div>'
            +'<div>汉宫Clan龙珠</div>'
            +'</div>'
            +'<div class="team team2">'
            +'<div class="teamimg"><img src="images/item2.png" alt=""></div>'
            +'<div calss="teamname">稳住我们能赢</div>'
            +'</div>'
            +'</div>'
            +'</div>'
            +'</div>'
}