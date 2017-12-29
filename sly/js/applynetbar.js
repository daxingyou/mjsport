function Applynetbar(){
    this.render();
}
Applynetbar.prototype={
    render:function(){
        var goodsid=window.location.href.split("=")[1];
        var data={
            goodsid:goodsid
        }
        $.post(listUrl+"store/goods/detail",data,function(json){
            if(json.errCode==0){
                var barList=json.goodsInfo.netbarList;
                var str="",star="";
                barList.forEach(function(item){
                    item.addr=item.address;
                    item.advimg=item.logo;
                    star = converStar(item.star);
                    str+=barTpl(item,star);
                });
                $("#corps_list").html(str)
            }
        })
    }
};
new Applynetbar();