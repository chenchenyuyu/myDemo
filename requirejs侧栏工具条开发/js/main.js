requirejs.config({
	paths:{
		jquery:'jquery-3.1.0'
	}
});
requirejs(['jquery','scrollto'],function($,scrollto){
	// $('body').css('background','red');
	var scroll=new scrollto.ScrollTo({
		dest:500,
		//滚动到500
		speed:800
		//滚动速度为1000
	});

	$('#backTop').on('click',$.proxy(scroll.move,scroll));
	//改变$.proxy()改变this的指向为scroll
	$(window).on('scroll',function(){
		checkPosition($(window).height());
	});
	checkPosition($(window).height());
	//刷新的时候执行函数
	function move(){
		$('html,body').animate({
			scrollTop:0
		},800);
	}
	function go(){
		$('html,body').scrollTop(0);
	}
	//点击回到顶部，立刻回去的效果函数
	function checkPosition(pos){
		if($(window).scrollTop()>pos){
			$('#backTop').fadeIn();
		}else{
			$('#backTop').fadeOut();
		}
	}
});