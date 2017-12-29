
new Vue({
    el:"#app",
    data(){
        return {
            tabLists:[
                {isActive:true,state:'1',num:0,name:"未结算"},
                {isActive:false,state:'2',num:0,name:"未开始"},
                {isActive:false,state:'3',num:0,name:"已结算"},
            ],
            guessList:[],
            nowtype:{type:1,feebeans:100,personlimit:100,},
            pn:1,
            nowMatchId:0,
            nowState:1,
            gameid2:0,
            competitionid2:0,
            enddate:'',
            roompwd:""
        }
    },
    created(){
        this.roompwd=GetRandomNum(100000,999999);
        //获取竞猜列表
        this.getGuessList();
    },
    mounted(){
        laydate.render({
            elem: '#starttime'
            ,type: 'datetime'
        });
    },
    watch:{
        pn:function(pn){
            this.pn = pn;
            this.getGuessList();
        },
        gameid2:function(gameid2){
            this.gameid2 = gameid2;
            this.getGuessList();
        },
        competitionid2:function(competitionid2){
            this.competitionid2 = competitionid2;
            this.getGuessList();
        }
    },
    methods:{
        logout(){
            $.getJSON(cmsUrl2+'member/logout',function(){
                window.location.href = 'login.html';
            });
        },
        toggletype(e){
            console.log(e.target.value)
            if(e.target.value==1){
                this.nowtype={type:1,feebeans:100,personlimit:100,}
            }else if(e.target.value==2){
                this.nowtype={type:2,feebeans:200,personlimit:100,}
            }else if(e.target.value==4){
                this.nowtype={type:4,feebeans:600,personlimit:100,}
            }
        },
        toggleEndDate(){
            this.enddate = $("#endDate2").val();
            this.getGuessList();
        },
        getGuessList(){
            var _this = this;
            var data = {
                state:this.nowState,
            }
            console.log(data);
            $.getJSON(cmsUrl2+'pb/match/list',data,function(json){
                setCookie('return','active_jdqs');
                if(json.errCode==10025){
                    window.location.href='login.html'
                }
                _this.guessList = json.matchList ? json.matchList : [];
            });
        },
        //创建新竞猜
        createGuess(){
            $("#guessForm").ajaxSubmit({
                success:function(json){
                    if(json.errCode == 0){
                        Alert($,json.errMsg,'success',function(){
                            //window.location.href = "guessDetail.html?guessId="+json.guessId;
                            window.location.reload();
                        });
                    }else if(json.errCode==10045){
                        Alert($,'权限不足，该账号没有权限操作！','error');
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
        //通过竞猜状态切换列表
        toggleTab(state){
            this.nowState = state;
            this.tabLists.forEach(function(item){
                if( item.state == state){
                    item.isActive = true;
                }else {
                    item.isActive = false;
                }
            });
            this.getGuessList(state);
        }

    }
})



$('#myModal').on('show.bs.modal', function(){
    laydate.render({
        elem: '#enddate'
        ,type: 'datetime'
    });

});

