function Mdbalance(){
	this.render();
}
Mdbalance.prototype = {
	render:function(){
		$.getJSON(listUrl+'member/bean/history', function(json, textStatus) {
			
		});
	},
}
new Mdbalance();

