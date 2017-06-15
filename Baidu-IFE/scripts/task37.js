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
	if(){

	}
};

