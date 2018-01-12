new Vue({
    el:"#app",
    data(){
        return {
            maskShow:false,
            guessShow:false,
            supportShow:false,
            awardShow:false,
            voterecordShow:false,
            msgShow:false,
            msg:"",
            matchid:1,
            guessInfo:{},
            guessList:[],
            pageTabs:[{title:"活动投票",showTab:0},
                {title:"活动竞猜",showTab:1},
                {title:"比赛赛程",showTab:2},
                {title:"活动说明",showTab:3}],
            showTab:0,
            nowGuess:{},
            guessId:0,
            betBeans:0,
            totalBean:0,
            betNum:1,
            nowIndex:0,
            betanswer:'A',
            winTeamInfo:{},
            teamId:'',
            nowMatch:{},
            awardInfo:{},
            scheduInfo:{},
            matchRuleList:[
                {matchName:"积分循环赛",matchType:0},
                {matchName:"淘汰赛",matchType:1},
                {matchName:"单场赛",matchType:2}
            ],
            nowMatchRule:0,
            isToggle:true,
            oGroupA:[],
            oGroupB:[],
            oGroupC:[],
            batIdList1:[],
            batIdList2:[],
            batIdList3:[],
            batIdList4:[],
            matchInfo:{},
            guessTips:'',
            winSum:'',
            state:0,
            tabs:["全部"],
            optionsList:[],
            vote:null,
            rewards:0,
            memberBean:{},
        }
    },
    created(){
        this.getMatchId();
        this.getGuessInfo();
        this.getAward();
        this.getVoteList();
        this.getScheduInfo();
        //获取比赛信息
        this.getMatchInfo();
        //规则详情
        //this.getRuleinfo();
        //this.getTabs();
        this.getOptionsList();
    },
    methods:{
        //问题列表
        getOptionsList(){
            var _this=this;
            var data={matchid:this.matchid};
            $.getJSON(listUrl+"sports/guess/list",data,function(json){
                var arr=[]
                if(json.guessList.length>0){
                    json.guessList.forEach(function(item,index){
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
                }

                //console.log(_this.optionsList)
            })
        },
        bet(item,x){
            this.guessShow=true;
            this.maskShow=true;
            this.betQuestion=item.questionTitle;
            this.optionid=item.optionid;
            this.betAns=x;
            this.$nextTick(function(){
                $("#input").focus();
            })
        },
        inputFunc(){
            if(this.betAns){
                this.rewards = Math.round(this.betAns.odds * 10000 * this.vote /10000);
            }else if(this.nowMatch){
                this.rewards = Math.round(this.nowMatch.odds * 10000 * this.vote /10000);
            }
            //console.log(this.rewards)

        },
        subBet(){
            var data={
                matchid:this.matchid,
                guessid:this.optionid,
                betbeans:this.vote,
                betanswer:this.betAns.select
            }
            var　_this=this;
            if(this.vote){
                $.getJSON(listUrl+"sports/m/guess/bet",data,function(json){
                    //_this.maskShowclick()
                    _this.msg=json.errMsg;
                    _this.guessShow=false;
                    _this.msgShow=true;
                    if(json.errCode==0){
                        $.getJSON(listUrl+"member/index",function(json){
                            _this.memberBean=json.memberBean
                        })
                    }
                })
            }else{
                //alert("请输入投注数量!")
                _this.msg="请输入投注数量!";
                _this.guessShow=false;
                _this.msgShow=true;
            }

        },
        pagechange(x){
            var _this=this;
            _this.showTab=x.showTab;
        },
        //切换赛制
        toggleMach(index){
            this.batIdList1=[];
            this.batIdList2=[];
            this.batIdList3=[];
            this.batIdList4=[];
            var _this = this;
            this.nowMatchRule = index;
            this.nowMatch = this.scheduInfo.groupList ? this.scheduInfo.groupList[index] : [];
            //console.log(this.nowMatch);
            if(_this.nowMatch.groupRuleType == 'OUTLET'){
                _this.nowMatch.scheduleList.forEach(function(item){
                    if(item.t1ParentBattleId == 0 && item.t2ParentBattleId == 0){
                        _this.batIdList1.push(item);
                    }
                });
                _this.nowMatch.scheduleList.forEach(function(item){
                    _this.batIdList1.forEach(function(item2){
                        if(item.battleId == item2.childBattleId){
                            if($.inArray(item,_this.batIdList2) == -1){
                                _this.batIdList2.push(item);
                            }

                        }
                    });
                });
                _this.nowMatch.scheduleList.forEach(function(item){
                    _this.batIdList2.forEach(function(item2){
                        if(item.battleId == item2.childBattleId){
                            if($.inArray(item,_this.batIdList3) == -1){
                                _this.batIdList3.push(item);
                            }
                        }
                    });
                });
                _this.nowMatch.scheduleList.forEach(function(item){
                    _this.batIdList3.forEach(function(item2){
                        if(item.battleId == item2.childBattleId){
                            if($.inArray(item,_this.batIdList4) == -1){
                                _this.batIdList4.push(item);
                            }
                        }
                    });
                });
            }
        },
        //获取排赛信息
        getScheduInfo(){
            var data = {
                matchid : this.matchid
            }
            var _this = this;
            $.getJSON(slyUrl+"sports/match/group",data,function(json){
                _this.scheduInfo = json;
                _this.nowMatch = json.groupList ? json.groupList[0] : [];
                //console.log(_this.nowMatch);
                //console.log(_this.scheduInfo)
                if(_this.nowMatch){
                    if(_this.nowMatch.groupRuleType == 'OUTLET'){
                        _this.nowMatch.scheduleList.forEach(function(item){
                            if(item.t1ParentBattleId == 0 && item.t2ParentBattleId == 0){
                                _this.batIdList1.push(item);
                            }
                            //console.log(_this.batIdList1)
                        });
                        _this.nowMatch.scheduleList.forEach(function(item){
                            _this.batIdList1.forEach(function(item2){
                                if(item.battleId == item2.childBattleId){
                                    if($.inArray(item,_this.batIdList2) == -1){
                                        _this.batIdList2.push(item);
                                    }

                                }
                            });
                        });
                        _this.nowMatch.scheduleList.forEach(function(item){
                            _this.batIdList2.forEach(function(item2){
                                if(item.battleId == item2.childBattleId){
                                    if($.inArray(item,_this.batIdList3) == -1){
                                        _this.batIdList3.push(item);
                                    }
                                }
                            });
                        });
                        _this.nowMatch.scheduleList.forEach(function(item){
                            _this.batIdList3.forEach(function(item2){
                                if(item.battleId == item2.childBattleId){
                                    if($.inArray(item,_this.batIdList4) == -1){
                                        _this.batIdList4.push(item);
                                    }
                                }
                            });
                        });
                    }
                }
                //console.log(_this.nowMatch)
            });
        },
        //战队投票弹窗
        support(id,index){
            this.supportShow=true;
            this.maskShow=true;
            this.nowMatch = this.winTeamInfo.voteList[index];
            //console.log(this.nowMatch)
            this.teamId  = id;
        },
        //战队投票
        voteAjax(){
            var data = {
                matchid:this.matchid,
                teamid: this.teamId,
                beans:this.vote,
            }
            if(this.vote){
                var _this=this;
                $.getJSON(slyUrl+'sports/m/vote/team',data,function(json){
                    //alert(json.errMsg);
                    _this.msg=json.errMsg;
                    _this.supportShow=false;
                    _this.msgShow=true;

                });
            }else{
                this.msg="请输入投注数量!";
                this.supportShow=false;
                this.msgShow=true;
            }

        },
        //展开完整排名
        toggleVotelist(){
            if(this.isToggle){
                $(".votelist").css({"height":"auto"});
                this.isToggle =false;
                $("#changesjx").css({"border-bottom":"0.16rem solid #EF6095"});
                $("#changesjx").css({"border-top":"0 none"});
            }
            else {
                $(".votelist").css({"height":"4.13333rem"});
                this.isToggle =true;
                $("#changesjx").css({"border-top":"0.16rem solid #EF6095"});
                $("#changesjx").css({"border-bottom":"0 none"});
            }
        },
        //投票战队列表
        getVoteList(){
            var _this = this;
            var data = {
                matchid:this.matchid
            }
            $.getJSON(slyUrl+'sports/vote/team/list',data,function(json){
                _this.winTeamInfo = json;
                //console.log(_this.winTeamInfo)
            });
        },
        //获取matchid
        getMatchId(){
            var url = window.location.href;
            var matchid = url.split("?")[1].split('=')[1];
            this.matchid = matchid;
        },
        //我的奖励
        myAward(){
            $(".award-popups,.mask").css({"display":"block"});
            //$(".mask,.close").on("click",function(){
            //    $(".mask,.award-popups").css({"display":"none"});
            //});
        },
        //投票规则弹窗
        //voteRule(){
        //    alertwindow("<p>您可以通过 [支持TA] 或 [买TA赢] 两种方式对参赛战队（个人）进行投票支持：</p><p>1. [支持TA]：为您支持的战队（个人）增加1人气值，每个用户只可投一票；</p> <p>2. [买TA赢]：选择您所看好的战队（个人）并买TA赢，除了将为其增加一定人气值之外，如果其最终夺冠，您将同所有支持该队的用户共同瓜分奖金池；您也可以重复支持不同的战队（个人）","投票规则</p>","取消");
        //    //$(".bind-box").on("click",function(){
        //    //    $(".mask,.alertbind").css({"display":"none"});
        //    //});
        //},
        //选择答案
        selectAswer(index){
            this.nowIndex  = index;
            this.betanswer = this.nowGuess.questionItemsObj[index].questionLetter;
        },

        getGuessInfo(){
            var _this = this;
            var data = {matchid:this.matchid}
            $.getJSON(slyUrl+'sports/guess/list',data,function(json){
                _this.guessList = json.guessList;
                _this.memberBean = json.memberBean ? json.memberBean : '';
                //_this.memberBean = json.memberBean
            })
        },
        //中奖
        getAward(){
            var _this = this;
            var data = {matchid:this.matchid}
            $.getJSON(slyUrl+'sports/m/myvote/award',data,function(json){
                _this.awardInfo = json;
            })
        },
        //获取比赛详情
        getMatchInfo(){
            var _this = this;
            var data = {
                id:this.matchid
            }
            var url = window.location.href;
            $.getJSON(slyUrl+'sports/match/info',data,function(json){
                _this.matchInfo = json.matchInfo;
                //console.log(_this.matchInfo);
            });
        },
        //模态框隐藏
        maskShowclick(){
            this.maskShow=false;
            this.guessShow=false;
            this.supportShow=false;
            this.voterecordShow=false;
            this.vote=null;
            this.rewards=0;
        },
        msgClick(){
            window.location.reload();
        },
    }
})
