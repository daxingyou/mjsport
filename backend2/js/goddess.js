
new Vue({
    el:"#app",
    data(){
        return {
            stateList: [
                {state:null,name:'全部',memberNum:0},
                {state:0,name:'未通过',memberNum:0},
                {state:1,name:'已通过',memberNum:0},
            ],
            nowState   : null,
            memberList:[],
            changevoteid:0,

        }
    },
    created(){
        this.getenrollList();
    },
    mounted(){

        laydate.render({
            elem: '#birthday'
            ,type: 'date'
            ,istoday: true,
        });
    },
    methods:{

        //通过战队报名
        pass(id){
            var data = {
                id : id,
                state  : 1,
            }
            $.getJSON(cmsUrl2+'pb/goddess/enroll/updatestate',data,function(json){
                if(json.errCode == 0){
                    Alert($,json.errMsg,'success',function(){
                        window.location.reload();
                    });
                }
                else{
                    Alert($,json.errMsg,'error');
                }
            });
        },
        //下架
        out(id){
            var data = {
                id : id,
                state  :0,
            }
            $.getJSON(cmsUrl2+'pb/goddess/enroll/updatestate',data,function(json){
                if(json.errCode == 0){
                    Alert($,json.errMsg,'success',function(){
                        window.location.reload();
                    });
                }
                else{
                    Alert($,json.errMsg,'error');
                }
            });
        },
        //改票
        changeVote(id){
            this.changevoteid=id;
            $('#changeVote').modal('show');
        },
        submitchange(){
            $("#enteringForm2").ajaxSubmit({
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
                url: cmsUrl2+'pb/goddess/enroll/setvotenum',
                type:'post',
                dataType:"json"
            });
        },
        //切换状态
        getNowState(state){
            localStorage.setItem('nowState',state);
            this.nowState = state;
            var _this =this,data={state:_this.nowState}
            $.getJSON(cmsUrl2+"pb/goddess/listenroll",data,function(json){
                var arr=json.enrollList;
                if(arr){
                    arr.forEach(function(item){
                        item.birthday=dateChange(item.birthday)
                    })
                }
                _this.memberList=arr;
            })
        },
        getenrollList(){
            var _this =this;
            if( localStorage.getItem('nowState')&& localStorage.getItem('nowState')!='null'){
                _this.nowState = localStorage.getItem('nowState');

            }else{
                localStorage.setItem('nowState',null);
                _this.nowState=null;
            }
            var data={state:_this.nowState}
            $.getJSON(cmsUrl2+"pb/goddess/listenroll",data,function(json){
                setCookie('return','goddess')
                if(json.errCode==10025){
                    window.location.href='login.html';
                }
                var arr=json.enrollList;
                if(arr){
                    arr.forEach(function(item){
                        item.birthday=dateChange(item.birthday)
                    })
                }
                _this.memberList=arr;
            })
        },
        //手动录入
        showEntering(){
            $('#enteringModal').modal('show');
            $("#avatar").on("change",function(){
                console.log(this.files[0]);
                uploadFile2(this,$("#avatarShow"),80,80);
            });
        },
        submitEntering(){
           $("#enteringForm1").ajaxSubmit({
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
                    url: cmsUrl2+'pb/goddess/enroll',
                    type:'post',
                    dataType:"json"
                });
        },
    }
})
