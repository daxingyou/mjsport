function Guess(){
    this.render();
}
Guess.prototype={
    render:function(){
        var nextpage=2;
        var topnum=0;
        var data={
            page:"1",
            pagesize:"10"
        }
        $.post(listUrl+'third/match/netbar ',data,function(json){
            var type = 'netbar';
            if(json.data!= null){
                var data       = json.data ? json.data.matches :[];
                var nowDate    = getNowDate();
                var lastDate   = getLastDate();
                var convertArr = {}
                var content = '';
                var convertArr = converDate(nowDate,lastDate,data,'start_at');
                for(key in convertArr){
                    content += '<div class="match_date">'+key+'</div>';
                    for(key2 in convertArr[key]) {
                        content += guessInfo3(convertArr[key][key2]);
                    }
                }
                $("#match-box").append(content);
            }

        })
        var scroll = document.querySelector('.inScroller');
        var outerScroller = document.querySelector('#outerScroller');
        var touchStart = 0;
        var touchDis = 0;
        outerScroller.addEventListener('touchstart', function(event) {
            var touch = event.targetTouches[0];
            // 把元素放在手指所在的位置
            touchStart = touch.pageY;
            //console.log(touchStart);
        }, false);
        outerScroller.addEventListener('touchmove', function(event) {

            var touch = event.targetTouches[0];
            //console.log(touch.pageY + 'px');
            scroll.style.top = scroll.offsetTop + touch.pageY-touchStart + 'px';
            //console.log(scroll.style.top);
            touchStart = touch.pageY;
            touchDis = touch.pageY-touchStart;
        }, false);
        outerScroller.addEventListener('touchend', function(event) {
            touchStart = 0;
            var top = scroll.offsetTop;
            console.log(top);
            console.log(scroll.offsetHeight)
            console.log(getScrollTop())
            console.log(getScrollHeight())
            console.log(getClientHeight())
            if(top>70)refresh();
            if(top>0){
                var time = setInterval(function(){
                    scroll.style.top = scroll.offsetTop -2+'px';
                    if(scroll.offsetTop<=0)clearInterval(time);
                },1)
            }
            if (top<0) {
                downLoad()
            };
            //if(top<0){
            //    var time = setInterval(function(){
            //        scroll.style.top = scroll.offsetTop +2+'px';
            //        if(scroll.offsetTop>=0)clearInterval(time);
            //
            //    },1)
            //}

        }, false);
        function downLoad(){
            //console.log(nextpage)
            data={
                page:nextpage,
                pagesize:"10"
            }
            $.post(listUrl+'third/match/netbar',data,function(json) {
                if(json.data!= null){
                    var data       = json.data ? json.data.matches :[];
                    var nowDate    = getNowDate();
                    var lastDate   = getLastDate();
                    var convertArr = {}
                    var content = '';
                    var convertArr = converDate(nowDate,lastDate,data,'start_at');
                    for(key in convertArr){
                        content += '<div class="match_date">'+key+'</div>';
                        for(key2 in convertArr[key]) {
                            content += guessInfo3(convertArr[key][key2]);
                        }
                    }
                    nextpage++;
                    topnum=top;
                    $("#match-box").append(content);
                }else{
                    top=topnum;
                }
            });
        }
        function refresh(){
            alert("123")
        }
    }

}
new Guess();