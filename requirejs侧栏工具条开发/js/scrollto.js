define(['jquery'],function($){
	function ScrollTo(opts){
		this.opts=$.extend({},ScrollTo.DEFAULTS,opts);
	}
	ScrollTo.prototype.move=function(){
		// console.log(this);试探this的指向

		// $('html body').animate({
		// 	scrollTop:this.opts.dest
		// },this.opts.speed);
		//连续点击会执行多次动画函数，损耗性能

		if($(window).scrollTop()!=this.opts.dest){
			if(!$('html body').is(':animated')){
				$('html body').animate({
					scrollTop:this.opts.dest
				},this.opts.speed);
			}
		}
	};
	ScrollTo.prototype.go=function(){
		if($(window).scrollTop()!=this.opts.dest){
		$('html body').scrollTop(this.opts.dest);
	}
	};
	ScrollTo.DEFAULTS={
		dest:0,
		speed:800
	};
	return {
		ScrollTo:ScrollTo
	};
});