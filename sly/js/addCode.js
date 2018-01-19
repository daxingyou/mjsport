$('body').append(codeshow());
$("#showCodeClick").on("click",function(){
    $(".codeShow").show();
})
$("#closeCodeClick").on("click",function(){
    $(".codeShow").hide();
})