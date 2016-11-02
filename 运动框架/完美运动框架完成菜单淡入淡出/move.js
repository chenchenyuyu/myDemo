function getStyle(obj,attr){
				if(obj.currentStyle){
					return obj.currentStyle[attr];	
				}else{
					return getComputedStyle(obj,false)[
					attr];
				}

			}
//采用缓冲运动的原理
	function startMove(obj,json,fn){//obj指定是哪一个div
		clearInterval(obj.timer);
	//每次开始定时器之前都要将定时器清除，如果onmouseover下一个元素，则会出现上一个元素还没有被收回的现象产生，是因为大家共同抢一个定时器的原因
		obj.timer=setInterval(function(){
			var bStop=true;//这一次运动都结束了--假设所有json里面的值都到达了
			for(var attr in json){
				if(attr=='opacity'){
				var iCur=parseInt(parseFloat(getStyle(obj,attr))*100);
				//注：如果鼠标移入速度过快，就会出现闪动的情况，是因为parseFloat()*100,出现小数的情况，计算机内部对小数的处理机制，所以应该加上parseInt()
				}else{
					var iCur=parseInt(getStyle(obj,attr));
				}
			
				var iSpeed=(json[attr]-iCur)/8;
				iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
					if(iCur!=json[attr]){
						bStop=false;
						//只要检测到有一个值没有到达，则bStop为false
					}
				
					if(attr=='opacity'){	
						obj.style.filter='alpha(opacity:'+(iCur+iSpeed)+')';
						obj.style.opacity=(iCur+iSpeed)/100;
						
				}else{
			obj.style[attr]=iCur+iSpeed+'px';
					}
					
				
			}
			if(bStop){
				//只有bStop为真的时候，才执行函数
				clearInterval(obj.timer);
						if(fn){
						//检测一下是否传入fn	
							fn();
						}
				}

		},30);


	}
	