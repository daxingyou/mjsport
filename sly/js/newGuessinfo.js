new Vue({
    el:"#app",
    data(){
        return {
            guessId:1,
            guessInfo:{},
            optionsList:[],
            maskShow:false,
            questShow:false,
            betQuestion:"",
            betAns:{},
            optionid:null,
            rewards:0,
            vote:null,
            memberBean:{},
            state:0,
            tabs:["全部"],
            msgShow:false,
            msg:"",
        }
    },
    created(){
        this.getPerson();
        this.getGuessId();
        this.getGuessInfo();
        this.getOptionsList();
        this.getTabs();
    },
    methods:{
        getTabs(){
            var _this=this;
            function exchangeIndex(x){
                var arr=["一","二","三","四","五","六","七","八","九","十"];
                return "第"+arr[x-1]+"场"
            }
            $.getJSON(listUrl+"officil/guess/categorylength?guessid="+this.guessId,function(json){
                //console.log(json)
                if(json.errCode==0){
                    var tabslength=json.categoryLength;
                    if(tabslength>0){
                        for(var i=0;i<tabslength;i++ ){
                            _this.tabs=_this.tabs.concat(exchangeIndex(i+1));
                        }
                    }
                }
            })
        },
        changeTabs(index){
            console.log(index);
            var _this=this;
            _this.state=index;
            var data={guessid:_this.guessId,categoryindex:index}
            $.getJSON(listUrl+"officil/guess/options/list",data,function(json){
                //console.log(json)
                var arr=[]
                json.optionsList.forEach(function(item,index){
                    var obj={optionid :null,questionTitle:"",answer:[],isbet:false,rightanswer:""};
                    obj.questionTitle =item.questionTitle;
                    obj.optionid =item.id;
                    for(i in item.questionItemsMap){
                        var obj2={odds:0,items:"",select:""}
                        obj2.select=i;
                        obj2.items=item.questionItemsMap[i]
                        obj.answer=obj.answer.concat(obj2)
                    }
                    var y=0;
                    for(x in item.questionOddsMap){
                        obj.answer[y].odds=item.questionOddsMap[x];
                        y++;
                    }
                    arr=arr.concat(obj)
                })
                _this.optionsList=arr;
                console.log(_this.optionsList)
            })
        },
        //下注
        bet(item,x){
            this.maskShow=true;
            this.questShow=true;
            this.betQuestion=item.questionTitle;
            this.optionid=item.optionid;
            this.betAns=x;
            //console.log(x)
            //console.log(item)
            this.$nextTick(function(){
                $("#input").focus();
            })
        },
        inputFunc(){
            this.rewards = Math.round(this.betAns.odds * 10000 * this.vote /10000);
            //console.log(this.rewards)
        },
        subBet(){
            var data={
                optionid:this.optionid,
                beans:this.vote,
                betitem:this.betAns.select
            }
            var　_this=this;
            console.log(data);
            if(this.vote){
                $.getJSON(listUrl+"officil/guess/bet",data,function(json){
                    _this.msg=json.errMsg;
                    _this.questShow=false;
                    _this.msgShow=true;
                    if(json.errCode==0){
                        $.getJSON(listUrl+"member/index",function(json){
                            _this.memberBean=json.memberBean
                        })
                    }
                })
            }else{
                _this.msg="请输入投注数量!";
                _this.questShow=false;
                _this.msgShow=true;
            }

        },
        maskIsShow(){
            this.maskShow=false
            this.questShow=false
            this.vote=null;
        },
        msgClick(){
            this.maskShow=false
            this.vote=null;
            this.msgShow=false;
        },
        //问题列表
        getOptionsList(){
            var _this=this;
            var data={guessid:this.guessId};
            $.getJSON(listUrl+"officil/guess/options/list",data,function(json){
                var arr=[]
                json.optionsList.forEach(function(item,index){
                    var obj={optionid :null,questionTitle:"",answer:[]};
                    obj.questionTitle =item.questionTitle;
                    obj.optionid =item.id;
                    for(i in item.questionItemsMap){
                        var obj2={odds:0,items:"",select:"",isbet:false,win:false}
                        obj2.select=i;
                        obj2.items=item.questionItemsMap[i];
                        obj2.isbet=item.questionBetMap[i];
                        if(json.answer==i){
                            obj2.win=true;
                        }
                        obj.answer=obj.answer.concat(obj2)
                    }
                    var y=0;
                    for(x in item.questionOddsMap){
                        obj.answer[y].odds=item.questionOddsMap[x];
                        y++;
                    }
                    arr=arr.concat(obj)
                })
                _this.optionsList=arr;
                console.log(_this.optionsList)
            })
        },
        //竞猜队伍详情
        getGuessInfo(){
            var _this=this;
            var data={guessid:this.guessId};
            $.getJSON(listUrl+"officil/guess/info",data,function(json){
                _this.guessInfo=json.guessInfo;
            })
        },
        getGuessId(){
            var url = window.location.href;
            if(url.indexOf('id=')!=-1){
                this.guessId = url.match(/id=(\d*)/)[1];
            }
        },
        //个人
        getPerson(){
            var _this=this;
            $.getJSON(listUrl+"member/index",function(json){
                _this.memberBean=json.memberBean
            })
        }
    },

})
function sharefunc () {
    var url=window.location.href;
    var id=url.match(/id=(\d*)/)[1];
    var guessname="魔圣电竞大师";
    $.getJSON(listUrl+"officil/guess/info",{guessid:id},function(json){
        if(json.errCode==0){
            guessname=json.guessInfo.title;
            console.log(guessname)
            if( isWeiXin()){
                shareWx("魔圣电竞大师-赛事竞猜",guessname,url, "http://static.jesport.com/sly/html/favicon.ico",url);
            }
        }
    })
    //console.log(guessname)

}
sharefunc ();