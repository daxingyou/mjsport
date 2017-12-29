new Vue({
    el:"#app",
    data(){
        return {
            isDraw:false,
            pageNum:1,
            total:1,
            listInfo:[],
            state:0,
            tabs:[
                {form:"pb",name:"绝地求生",state:0},
                {form:"match",name:"活动竞猜",state:1},
                {form:"officil",name:"比赛竞猜",state:2},],
        }
    },
    created(){
        this.getList();
    },
    methods:{
        getList(){
            var _this=this;
            var data={pn:this.pageNum,from:"pb"};
            $.getJSON(listUrl+"officil/guess/betlist",data,function(json){
                _this.listInfo=json.betList.list;
                _this.pageNum=json.betList.pageNum==0?"1":json.betList.pageNum;
                _this.total=json.betList.total;
            })

        },
        getDrawlist(i){
            //this.isDraw=false;
            var _this=this;
            _this.state=i.state;
            var data={pn:this.pageNum,from:i.form};
            $.getJSON(listUrl+"officil/guess/betlist",data,function(json){
                _this.listInfo=json.betList.list;
                _this.pageNum=json.betList.pageNum==0?"1":json.betList.pageNum;
                _this.total=json.betList.total;
            })
        },
    }
})

