//模拟数据
/*
var aqiSourceData={
	"北京":{
		"2016-01-01":10,
		"2016-01-02":10,
		"2016-01-03":10,
		"2016-01-04":10
	}
}
*/
//以下函数用于随机模拟生成测试数据
function getDataStr(dat){
	var y=dat.getFullYear();
	var m=dat.getMonth()+1;
	m=m<10?'0'+m:m;//小于两位数，前面添加0
	var d=dat.getDate();
	d=d<10?'0'+d:d;
	return y+'-'+m+'-'+d;
}
function randomBuildData(seed){
	var returnData={};
	var dat=new Date("2016-01-01");
	var datStr='';
	for(var i=1;i<92;i++){
		datStr=getDataStr(dat);
		returnData[datStr]=Math.ceil(Math.random()*seed);
		//模拟随机数据的产生
		dat.setDate(dat.getDate()+1);
	}
	return returnData;
}
var aqiSourceData={
	"北京":randomBuildData(500),
	"上海":randomBuildData(300),
	"广州":randomBuildData(200),
	"深圳":randomBuildData(100),
	"成都":randomBuildData(300),
	"西安":randomBuildData(500),
	"福州":randomBuildData(100),
	"厦门":randomBuildData(100),
	"沈阳":randomBuildData(500)
};
//用于渲染图表的数据
var chartData={};
var colors = ['#16324a', '#24385e', '#393f65', '#4e4a67', '#5a4563', '#b38e95',
              '#edae9e', '#c1b9c2', '#bec3cb', '#9ea7bb', '#99b4ce', '#d7f0f8'];
//记录当前页面的表单选项
var pageState={
	nowSelectCity:-1,
	nowGraTime:"day"
}
function getWidth(width,len){
	var posObj={};
	posObj.width=Math.floor(width/(len*2));
	//console.log(posObj.width);
	posObj.left=Math.floor(width/len);
	//console.log(posObj.left);
	posObj.offsetLeft=(width-posObj.left*(len-1)-posObj.width)/2;
	return posObj;
}
function getHintLeft(posObj,i){
	if(posObj.left*i+posObj.offsetLeft+posObj.width/2-60<=0){
		return 5;
	}else if(posObj.left*i+posObj.offsetLeft+posObj.width/2+60>=1200){
		return (posObj.left*i+posObj.offsetLeft+posObj.width/2-110);
	}else{
		return (posObj.left*i+posObj.offsetLeft+posObj.width/2-60);
	}
}
//改变标题数据
function getTitle(){
	switch(pageState.nowGraTime){
		case "day":
		return "每日";
		case "week":
		return "周平均";
		case "month":
		return "月平均";
	}
}
//跨浏览器的事件绑定
function addEventHandler(ele,event,handler){
	if(ele.addEventListener){
		ele.addEventListener(event,handler,false);	
	}else if(ele.attachEvent){
		ele.attachEvent("on"+event,handler);
	}else{
		ele["on"+event]=handler;
	}
}

//渲染图表
function renderChart(){
	var wrapper=document.getElementById("aqi-chart-wrap");
	var innerHTML="",i=0;
	var width=wrapper.clientWidth;
	var selectedData=chartData[pageState.nowGraTime][pageState.nowSelectCity];
	var len=Object.keys(selectedData).length;
	var posObj=getWidth(width,len);
	innerHTML+="<div class='title  '>"+pageState.nowSelectCity+"市01-03月"+getTitle()+"空气质量报告</div>";
	//注意title后面的空格
	for(var key in selectedData){
	//innerHTML+="<div class='aqi-bar"+pageState.nowGraTime+"'style='height:"+selectedData[key]+"px;width:"+posObj.width+"px;left:"+(posObj.left*i+posObj.offsetLeft)+"px;background-color:"+colors[Math.floor(Math.random()*11)]+"'></div>";
	innerHTML += "<div class='aqi-bar "+ pageState.nowGraTime + "' style='height:" + selectedData[key] + "px; width: " + posObj.width +"px; left:" + (posObj.left * i + posObj.offsetLeft) + "px; background-color:" + colors[Math.floor(Math.random() * 11)] + "'></div>"
	innerHTML+="<div class='aqi-hint' style='bottom: " + (selectedData[key] + 10) + "px; left:" + getHintLeft(posObj, i++) + "px'>" + key + "<br/> [AQI]: " + selectedData[key] + "</div>"
   //console.log(innerHTML);
    }
    wrapper.innerHTML=innerHTML;
	}


//日，周，月的radio事件点击时的处理函数
function graTimeChange(radio){
	var value=radio.value;
	var item=radio.previousElementSibling;
	var items=document.getElementsByTagName('span');
	for(var i=0;i<items.length;i++){
		items[i].className="";
	}
	item.className="selected";
	if(value!==pageState.nowGraTime){
		//设置对应数据
		pageState.nowGraTime=value;
		renderChart();
		//调用图表渲染函数
	}
}
//select发生变化时候的处理函数
function citySelectChange(){
	//确定选项是否发生了变化
	var city=this.value;
	if(city!==pageState.nowSelectCity){
		//设置对应数据
		pageSelectCity=city;
		renderChart();
	}
}
//初始化日，周，月的radio事件，当点击时，调用函数graTimeChange
function initGraTimeForm(){
	var radio=document.getElementsByName('gra-time');
	for(var i=0;i<radio.length;i++){
		(function(m){//循环中使用闭包
			addEventHandler(radio[m],'click',function(){
				graTimeChange(radio[m]);
			})
		})(i);
	}
	addEventHandler(document,'mouseover',function(event){
		var ele=event.target;
		ele.className +=" show";//注意show前面的空格
	}); 
	addEventHandler(document,'mouseout',function(event){
		var ele=event.target;
		ele.className=ele.className.replace(/show/,"");
	});
}
//初始化城市Select下拉选择框中的选项
function initCitySelector(){
	var select=document.getElementById("city-select");
	var cityArr=Object.getOwnPropertyNames(aqiSourceData);
	var htmlArr=cityArr.map(function(item){
		return "<option>"+item+"</option>";
	});
	console.log(htmlArr);
	pageState.nowSelectCity=cityArr[0];
	select.innerHTML=htmlArr.join("");
	addEventHandler(select,'change',citySelectChange);
}
//初始化图表中需要的数据格式
function initAqiChartData(){
	// 将原始的源数据处理成图表需要的数据格式
    var week = {}, count = 0, singleWeek = {},
    month = {}, mcount = 0, singleMonth = {};
    for (var key in aqiSourceData) {
        var tempCity = aqiSourceData[key];
        var keyArr = Object.getOwnPropertyNames(tempCity);
        var tempMonth = keyArr[0].slice(5, 7);
        var weekInit = 4, weekCount = 0;
        for (var i = 0; i < keyArr.length; i++, weekInit++) {
          count += tempCity[keyArr[i]];
           mcount += tempCity[keyArr[i]];
           weekCount++;
     if ((weekInit+1) % 7 == 0 || i == keyArr.length - 1 || keyArr[i+1].slice(5, 7) !== tempMonth) {
        var tempKey = keyArr[i].slice(0, 7) + "月第" + (Math.floor(weekInit / 7) + 1) + "周";
          singleWeek[tempKey] = Math.floor(count / weekCount);
           if (i != keyArr.length - 1 && keyArr[i+1].slice(5, 7) !== tempMonth) {
                    weekInit = weekCount % 7;
                }
          count = 0;
          weekCount = 0;
         if (i == keyArr.length - 1 || keyArr[i+1].slice(5, 7) !== tempMonth) {
            tempMonth = (i == keyArr.length - 1) ? keyArr[i].slice(5, 7) : keyArr[i+1].slice(5, 7);
            var tempMKey = keyArr[i].slice(0, 7);
            var tempDays = keyArr[i].slice(-2);
            singleMonth[tempMKey] = Math.floor(mcount / tempDays);
            mcount = 0;
                }
            }
        }
        week[key] = singleWeek;
        month[key] = singleMonth;
        singleWeek = {};
        singleMonth = {};
    }
    // 处理好的数据存到 chartData 中
    chartData.day = aqiSourceData;
    chartData.week = week;
    chartData.month = month;
    renderChart();
}
//初始化函数
function init(){
	initGraTimeForm();
	initCitySelector();
	initAqiChartData();
}
init();