//获取元素对象
function g(el){
	return document.getElementById(el);

};
//兼容的事件处理程序
function addHandler(ele,event,listener){
	if(ele.addEventListener){
		addHandler(event,listener,false);
	}else if(ele.addAttach){
		addAttach("on"+event,listener);
	}else{
		ele["on"+event]=listener;
	}

};
//点击半透明遮罩和关闭按钮时，使半透明遮罩和登录框不可见
var mask=g("mask"),
	loginBox=g("loginBox");
function close(ele){
	ele.style.display="none";
};
function open(ele){
	ele.style.display="block";
};
//函数实现自动居中
function autoCenter(ele){
	var bodyW=document.getElementById.clientWidth;
	var bodyH=document.getElementById.clientHeight;
	var eleW=ele.offsetWidth;
	var eleH=ele.offsetHeight;
	ele.style.left=(bodyW-eleW)/2+"px";
	ele.style.top=(bodyH-eleH)/2+"px";
};
function fillToBody(ele){
	ele.style.width=document.documentElement.clientWidth+"px";
	ele.style.height=document.documentElement.clientHeight+"px";

};
var mouseOffsetX=0;
var mouseOffsetY=0;
var isDraging=false;
var loginBoxHeader=g("loginBoxHeader");
function drag(e,ele){
	var e=e||window.event;
	//鼠标点击点里浮出层左边框的距离
	mouseOffsetX=e.pageX-ele.offsetLeft;
	//鼠标点击点里浮出层的上边框的距离
	mouseOffsetY=e.pageY-ele.offsetTop;
	isDraging=true;
};
function mouseMove(e){
	var e=e||window.event;
	mouseX=e.pageY;
	mouseY=e.pageY;
	var moveX=0;
	var moveY=0;
	if(isDraging===true){
		moveX=mouseX-mouseOffsetX;
		moveY=mouseY-mouseOffsetY;
//获取页面的宽高度
var pageWidth=document.documentElement.clientWidth;
var pageHeight=document.documentElement.clientHeight;
//获取浮出层的宽高度
var loginBoxWidth=g("loginBox").offsetWidth;
var loginBoxHeight=g("loginBox").offsetHeight;

var maxMoveX=pageWidth-loginBoxWidth;
var maxMoveY=pageHeight-loginBoxHeight;

//moveX=moveX>0?moveX:0;
//moveY=moveX<maxMoveX?moveX:maxMoveX;
moveX=Math.min(maxMoveX,Math.max(0,moveX));
moveY=Math.min(maxMoveY,Math.max(0,moveY));
g("loginBox").style.left=moveX+"px";
g("loginBox").style.top=moveY+"px";
	}
};

var mousePanel,mouseCtrl,mouseType;
var moving=0,mouseStartX=0,mouseStartY=0;
function mouseDown(e,panel,ctrl,type){
	var e=e||window.event;
	mouseStartX=e.pageX-ctrl.offsetLeft;
	mouseStartY=e.pageY-ctrl.offsetTop;
	mousePanel=panel;
	mouseCtrl=ctrl;
	mouseType=type;
	moving=setInterval(onMove,10);
}

function onMove(){
	if(moving){
		var toX=mouseX-mouseStartX;
		var toY=mouseY-mouseStartY;
		//限定浮出层的最大宽度
		var maxToX=document.documentElement.clientWidth-mousePanel.offsetLeft-10;
		var maxToY=document.documentElement.clientWidth-mousePanel.offsetTop-10;
		toX=Math.min(maxToX,Math.max(toX,300));
		toY=Math.min(maxToY,Math.max(toY,200));
		switch(mouseType){
			case "r":
			mouseCtrl.style.left=toX+"px";
			mousePanel.style.width=toX+"px";
			break;
			case "b":
			mouseCtrl.style.top=toY+"px";
			mousePanel.style.height=toY+"px";
			break;
			case "rb":
			mouseCtrl.style.left=toX-8+"px";
			mouseCtrl.style.top=toY-8+"px";
			mousePanel.style.width=toX+"px";
			mousePanel.style.height=toY+"px";
			break;
		}	
	}
}
 function mouseUp(){
 	isDraging=false;
 	clearInterval(moving);
 	var cls=document.getElementByClassName("resizable-box");
 	for(var i=0;i<cls.length;i++){
 		cls[i].style.left="";
 		cls[i].style.top="";
 	}
 }
