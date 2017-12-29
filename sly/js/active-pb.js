new Vue({
    el:"#app",
    data(){
        return {
            loginMemberId:0,
            matchid:0,
            state:3,
            tabindex:0,
            maskShow:false,
            betShow:false,
            signShow:false,
            enrollShow:false,
            matchinfo:{},
            guessinfo:{},
            enrollInfo:'',
            optionsList:[],
            betQuestion:"",
            guessId:null,
            betAns:{},
            optionid:null,
            rewards:0,
            vote:null,
            memberBean:{},
            nickname:[],
            mobile:"",
        }
    },
    created(){
        var url=window.location.href;
        this.matchid=url.split(/[? = &]/)[2];
        this.islogin();
        this.memberbeans();
        this.getmatchinfo();
        this.getoptionsList();
    },
    methods:{
        islogin(){
            var _this =this;
            var url=window.location.href;
            $.getJSON(listUrl+'islogin',function(json){
                var url=window.location.href;
                setCookie('return',url);
                _this.loginMemberId=json.loginMemberId;
                if(isWeiXin()){
                    shareWx('魔杰女神争霸赛开始啦!','报名参赛即可获得丰厚奖励，投票支持还能和女神近距离接触一起战斗哟~',url,'http://static.jesport.com/sly/images/activeImg/goddess/share2.png',url);
                }

            })
        },
        memberbeans(){
            var _this=this;
            $.getJSON(listUrl+"member/index",function(json){
                _this.memberBean=json.memberBean
            })
        },
        maskShowclick(){
            this.maskShow=false;
        },
        //切换页卡
        tabclick(i){
            this.tabindex=i;
            if(i==0){
                //this.getpbList();
            }else{
                this.getmatchinfo();
            }
        },
        //获取赛事信息
        getmatchinfo(){
            var _this =this;
            $.getJSON(listUrl+"pb/match/info?matchid="+_this.matchid,function(json){
                _this.matchinfo=json.matchInfo;
                _this.enrollInfo=json.enrollInfo;
                _this.nickname.length=json.matchInfo.type;
            })
        },
        //赛事竞猜
        getoptionsList(){
            var _this =this;
            $.getJSON(listUrl+"pb/guess/list?matchid="+_this.matchid,function(json){
                //_this.optionsList=json.guessOptionsInfo;
                if(json.errCode!=0){
                    _this.optionsList=[];
                    _this.guessinfo.sate=4
                    return false;
                }
                _this.guessinfo=json.guessInfo;
                var arr=[]
                json.guessOptionsInfo.forEach(function(item,index){
                    _this.guessId=item.guessId;
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
            })
        },
        //竞猜投注
        bet(item,x){
            this.maskShow=true;
            this.betShow=true;
            this.betQuestion=item.questionTitle;
            this.optionid=item.optionid;
            this.betAns=x;
            console.log(x)
            console.log(item)
            console.log(this.guessId)
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
                guessid:this.guessId,
                matchid:this.matchid,
                optionid:this.optionid,
                beans:this.vote,
                betitem:this.betAns.select
            }
            var　_this=this;
            console.log(data);
            if(this.vote){
                $.getJSON(listUrl+"pb/guess/bet",data,function(json){
                    alert(json.errMsg);
                    if(json.errCode==0){
                        $.getJSON(listUrl+"member/index",function(json){
                            _this.memberBean=json.memberBean
                        })
                    }
                    _this.maskShowclick();
                    _this.vote=null;
                })
            }else{
                alert("请输入投注数量!")
            }

        },
        //赛事报名
        signin(){
            this.maskShow=true;
            this.signShow=true;
        },
        submitSign(){
            var data={
                matchid:this.matchid,
                mobile:this.mobile,
                nickname:this.nickname,
            }
            $.getJSON(listUrl+"pb/enroll",data,function(json){
                if(json.errCode==0){
                    alert(json.errMsg);
                    window.location.reload();
                }else{
                    alert(json.errMsg);
                }
            })
        },
        //报名列表
        enrollinfo(){
            this.maskShow=true;
            this.enrollShow=true;
        },
        maskShowclick(){
            this.maskShow=false;
            this.betShow=false;
            this.signShow=false;
            this.enrollShow=false;
        },
    },
})
