var url   = window.location.href;
new Vue({
    el:"#app",
    data(){
        return {
            matchDetail:{},
            matchid:0,
            guessid:0,
            optionsList:[],
            guessInfo:null,
            signList:[],
            signidList:[],
            nowoption:{},
            categoryList:[],
            optionIndex:0,
            nicknameIndex:0,
            size:0,
            questionindex:0,
            addquestioninfo:{betbeanslimit:5000,awardbeans:2000,memo:"",},
            addquestion:[
                {
                    title:"本场比赛的第一个空投补给箱里面的武器是什么？",
                    answer:[{items:"AWM",odds:"4.5"},{items:"M24",odds:"4.5"},{items:"GORZA",odds:"4.5"},{items:"98K",odds:"4.5"},{items:"MK14",odds:"4.5"},{items:"M249",odds:"4.5"},]
                },
                {
                    title:"本场比赛第一名的玩家/队伍的击杀数量单双",
                    answer:[{items:"单数",odds:"2.4"},{items:"双数",odds:"2.4"},{items:"0",odds:"2.4"},]
                },
                {
                    title:"本场比赛第一个毒圈合并后剩余存活玩家数量单双",
                    answer:[{items:"单数",odds:"1.8"},{items:"双数",odds:"1.8"},]
                },
                {
                    title:"本场比赛被随机轰炸炸死/倒地的玩家数量单双",
                    answer:[{items:"单数",odds:"2.4"},{items:"双数",odds:"2.4"},{items:"0",odds:"2.4"},]
                },
            ],
            characterList:["A","B","C","D","E","F","G",",H","I",",G","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
        }
    },
    created(){
        //初始化matchid
        var _this = this;
        this.matchid  = url.split('?')[1].split('=')[1];
        //初始化localStorage的值
        if( !localStorage.getItem('nowState') ){
            localStorage.setItem('nowState',1)
        }
        if( !localStorage.getItem('nowState2') ){
            localStorage.setItem('nowState2',0)
        }

        //获取比赛详情
        this.getMatchDetail({id:this.matchid});
        //获取竞猜详情
        this.getGuessDetail();
        //this.getSignList();

        //获取报名id
        this.getsignidList();
    },
    methods:{
        //获取比赛详情
        getMatchDetail(data){
            var _this = this;
            $.getJSON(cmsUrl2+'pb/match/info',data,function(json){
                if(json.errCode==0){
                    _this.matchDetail = json.matchInfo;
                }
            })
        },
        //编辑战队信息
        toggleModal(){
            $('#myModal').modal('show');
            laydate.render({
                elem: '#starttime'
                ,type: 'datetime'
            });
            var _this=this;
        },
        //提交战队编辑信息
        ajaxSubmit(){
            $("#infoForm").ajaxSubmit({
                success:function(json){
                    $(this).on("click");
                    if(json.errCode == 0){
                        Alert($,json.errMsg,'success',function(){
                            window.location.reload();
                        });
                    }
                    else if(json.errCode == '10073'){
                        Alert($,json.errMsg,'error');
                    }
                    else{
                        Alert($,'参数错误，请填写正确的参数！','error');
                    }
                },
                url: cmsUrl2+'pb/match/handler',
                type:'post',
                dataType:"json"
            });
        },
        //获取竞猜详情
        getGuessDetail(){
            var _this= this;
            var data = {
                matchid:this.matchid
            }
            $.getJSON(cmsUrl2+'pb/guess/info',data,function(json){
                if(json.errCode==0){
                    _this.guessInfo = json.guessInfo;
                    _this.guessid = json.guessInfo.id;
                    _this.optionsList=json.optionsList;
                    if(_this.optionsList&&_this.optionsList.length>0){

                        for(var i=0; i<json.optionsList.length; i++){
                            _this.categoryList.push(i);
                        }
                        var nowoption={}
                        nowoption.questionTitle=_this.optionsList[0].questionTitle;
                        var answer=[];
                        for(var key in _this.optionsList[0].questionItemsMap){
                            var obj={};
                            obj.option=key;
                            obj.answer=_this.optionsList[0].questionItemsMap[key];
                            obj.odds=_this.optionsList[0].questionOddsMap[key];
                            answer.push(obj);
                        }
                        _this.nowoption.id=_this.optionsList[0].id;
                        _this.nowoption.categoryIndex=_this.optionsList[0].categoryIndex;
                        //console.log(nowoption);
                        var data={guessid:_this.guessInfo.id,categoryindex:_this.nowoption.categoryIndex};
                        $.getJSON(cmsUrl2+"pb/bet/list",data,function(json){
                            var obj1=json;
                            var arr=answer;
                            arr.forEach(function(item){
                                item.betsum=obj1.optionBetList[0].questionBetSumMap[item.option]
                            })
                            nowoption.answer=arr;
                            _this.nowoption=nowoption;

                        })
                    }
                }

            });
        },
        toggleGuess(i){
            var _this=this;
            _this.optionIndex=i;
            var nowoption={}
            nowoption.questionTitle=_this.optionsList[i].questionTitle;
            var answer=[];
            for(var key in _this.optionsList[i].questionItemsMap){
                var obj={};
                obj.option=key;
                obj.answer=_this.optionsList[i].questionItemsMap[key];
                obj.odds=_this.optionsList[i].questionOddsMap[key];
                answer.push(obj);
            }
            _this.nowoption.id=_this.optionsList[i].id;
            _this.nowoption.categoryIndex=_this.optionsList[i].categoryIndex;
            var data={guessid:_this.guessInfo.id,categoryindex:_this.nowoption.categoryIndex};
            $.getJSON(cmsUrl2+"pb/bet/list",data,function(json){
                var obj1=json;
                var arr=answer;
                arr.forEach(function(item){
                    item.betsum=obj1.optionBetList[0].questionBetSumMap[item.option]
                })
                nowoption.answer=arr;
                _this.nowoption=nowoption;
            })
        },
        //查看投注数据
        GuessdetailModal(){
            $("#guessdetail").modal("show");
        },
        //获取报名列表
        getSignList(){
            $("#betDataModal").modal("show");
            var _this=this;
            $.getJSON(cmsUrl2+"pb/enroll/nickname/list?matchid="+_this.matchid,function(json){
                var key,arr=[];
                for(key in json.nicknameList){
                    var obj={};
                    obj.tel=key;
                    obj.nameList=json.nicknameList[key]
                    arr.push(obj);
                }
                _this.signList=arr;
            })
        },
        getsignid(){
            $("#signDataModal").modal("show");
        },
        //初始化报名id列表
        getsignidList(){
            var _this=this;
            $.getJSON(cmsUrl2+"pb/enroll/list?matchid="+_this.matchid,function(json){
                var arr=json.enrollList;
                if(arr){
                    arr.forEach(function(i){
                        i.active=false;
                    })
                }
                _this.signidList=arr;
            })
        },
        markname(i){
            if(i.active){
                i.active=false;
            }else{
                i.active=true;
            }
        },
        //关闭比赛
        closeModal(){
            $("#closematch").modal('show')
        },
        colseMatch(){
            var _this=this;
            $.getJSON(cmsUrl2+'pb/match/close?matchid='+_this.matchid,function(json){
                if(json.errCode==0){
                    Alert($,'已关闭比赛','success',function(){
                        window.location.reload();
                    })
                }
            })
        },

        //结束比赛
        overMatch(){
            $('#overmatch').modal('show');
        },
        overSubmit(){
            $("#overmatchForm").ajaxSubmit({
                success:function(json){
                    $(this).on("click");
                    if(json.errCode == 0){
                        Alert($,json.errMsg,'success',function(){
                            window.location.reload();
                            //cosnole.log("123")
                        });
                    }
                    else if(json.errCode == '10073'){
                        Alert($,json.errMsg,'error');
                    }
                    else{
                        Alert($,'参数错误，请填写正确的参数！','error');
                    }
                },
                url: cmsUrl2+'pb/match/finish',
                type:'post',
                dataType:"json"
            });

        },
        //修改竞猜状态
        changeGuessstate(){
            if(this.guessinfo){alert("请先添加竞猜!");return false;}
           $("#guessstate").modal("show")
        },
        guessStateSubmit(){
            $("#guessstateForm").ajaxSubmit({
                success:function(json){
                    if(json.errCode==0){
                        Alert($,json.errMsg,'success',function(){
                            window.location.reload();
                        });
                    }
                },
                url: cmsUrl2+'pb/guess/update/state',
                type:'post',
                dataType:"json"
            });
        },
        //修改报名状态
        changeEnrollstate(){
            $("#enrollstate").modal("show");
        },
        enrollStateSubmit(){
            $("#enrollstateForm").ajaxSubmit({
                success:function(json){
                    if(json.errCode==0){
                        Alert($,json.errMsg,'success',function(){
                            window.location.reload();
                        });
                    }
                },
                url: cmsUrl2+'pb/enroll/update/state',
                type:'post',
                dataType:"json"
            });
        },
        //添加、提交竞猜
        addguess(){
            $('#addguess').modal('show');
        },
        addtitle(){
            var _this=this;
            var obj={title:"",answer:[{items:"",odds:""}]};
            _this.addquestion.push(obj);
        },
        delguess(_index){
            if(_index<0){return false}
            var _this=this;
            //this.addquestion.forEach(function(item,index){
            //    if(_index == index){
            //        _this.addquestion.splice(index,1);
            //    }
            //});
            _this.addquestion.splice(_index,1);
            _this.questionindex=0;
        },
        addanswer(){
            var obj={items:"",odds:""};
            this.addquestion[this.questionindex].answer.push(obj);
        },
        guessSubmit(){
            var _this=this;
            var data={
                act:"add",
                matchid:_this.matchid,
                betbeanslimit:_this.addquestioninfo.betbeanslimit,
                awardbeans:_this.addquestioninfo.awardbeans,
                memo:_this.addquestioninfo.memo,
                questionnum:_this.addquestion.length,
            };
            for(var i=0;i<_this.addquestion.length;i++){
                var obj={};
                obj['title'+i]=_this.addquestion[i].title;
                var item=[],odds=[];
                for(var j=0;j<_this.addquestion[i].answer.length;j++){
                    item.push(_this.addquestion[i].answer[j].items)
                    odds.push(_this.addquestion[i].answer[j].odds)
                }
                obj['items'+i]=item;
                obj['odds'+i]=odds;
                $.extend(data, obj);
            }
            console.log(data);
            $.getJSON(cmsUrl2+"pb/guess/handler",data,function(json){
                console.log(json);
                if(json.errCode==0){
                    Alert($,"成功",'success',function(){
                        window.location.reload();
                    });
                }
            })
        },
        //修改、提交竞猜
        updateguess(){
            //修改竞猜初始化
            var _this=this;
            _this.addquestioninfo.betbeanslimit =_this.guessInfo.betBeansLimit;
            _this.addquestioninfo.awardbeans =_this.guessInfo.awardBeans;
            _this.addquestioninfo.memo =_this.guessInfo.memo;

            var questionArr=[];
            for(var i=0;i< _this.optionsList.length;i++){
                var obj={};
                obj.title=_this.optionsList[i].questionTitle;
                obj.id=_this.optionsList[i].id;
                var answer2=[];
                for(var key in _this.optionsList[i].questionItemsMap){
                    var obj2={};
                    obj2.items=_this.optionsList[i].questionItemsMap[key];
                    obj2.odds=_this.optionsList[i].questionOddsMap[key];
                    answer2.push(obj2);
                }
                obj.answer=answer2;
                questionArr.push(obj);
            }
            //console.log(questionArr);
            _this.addquestion=questionArr;
            $('#updataguess').modal('show');
        },
        updateguessSubmit(){
            var _this=this;
            var data={
                act:"update",
                matchid:_this.matchid,
                guessid:_this.guessInfo.id,
                betbeanslimit:_this.addquestioninfo.betbeanslimit,
                awardbeans:_this.addquestioninfo.awardbeans,
                memo:_this.addquestioninfo.memo,
                questionnum:_this.addquestion.length,
            };
            for(var i=0;i<_this.addquestion.length;i++){
                var obj={};
                obj['title'+i]=_this.addquestion[i].title;
                obj['optionid'+i]=_this.addquestion[i].id;
                var item=[],odds=[];
                for(var j=0;j<_this.addquestion[i].answer.length;j++){
                    item.push(_this.addquestion[i].answer[j].items)
                    odds.push(_this.addquestion[i].answer[j].odds)
                }
                obj['items'+i]=item;
                obj['odds'+i]=odds;
                $.extend(data, obj);
            }
            console.log(data);
            $.getJSON(cmsUrl2+"pb/guess/handler",data,function(json){
                console.log(json);
                if(json.errCode==0){
                    Alert($,"成功",'success',function(){
                        window.location.reload();
                    });
                }
            })
        },

    }
});
$("#close").on("click",function(){
    window.location.reload();
});