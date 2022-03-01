$(document).ready(function(){
	var ChangeCss1 = new ChangeCss('html');
})

function ChangeCss(selector){
	this.$selector = null;

	this._init(selector);
	this._initEvent();

}
ChangeCss.prototype._init = function(selector) {
	this.$selector = $(selector);
	this._btnStyle = this.$selector.find('#btnStyleWrap .btn')
	this._style = this.$selector.find('.style')
};


ChangeCss.prototype._initEvent = function() {
	var objThis =this;
	this._btnStyle.click(function(){
		var text = $(this).text();
		objThis._changeStyle(text);
	})
};


ChangeCss.prototype._changeStyle= function(text) {
	switch(text) {
		case "기본 디자인":
			this._style.attr('href','commons/coordispace/css/layout.css')			
		break;
		case "tWay 디자인":
			this._style.attr('href','commons/tway/css/tway.css')		
		break;		
		default:
			this._style.attr('href','commons/hpoint/css/hpoint.css')		
		break;	
	} 
	

};