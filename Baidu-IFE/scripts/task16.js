var aqiData={};
//存储用户输入的空气指数数据
function addAqiData(){
	var city=document.getElementById("aqi-city-input").value.trim();
	var number=document.getElementById("aqi-value-input").value.trim();
	if(!(/^[\u4e00-\u9fa5a-zA-Z]+$/.test(city))){
		alert("城市名必须是中文或是英文！");
		return;
	}
	if(!(/^-?[0-9]\d*$/.test(number))){
		//0也是整数，023，-0开头都能匹配！！
		alert("空气的质量指数必须为整数！");
		return;
	}
	else{
		aqiData[city]=number;//存储为对象
	}

}
//添加数据记录
function renderAqiList(){
	var table=document.getElementById("aqi-table");
	var content="<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
	for(var city in aqiData){
	content+="<tr><td>"+city+"</td><td>"+aqiData[city]+"</td><td><button>删除</button></td></tr>";
	}
	table.innerHTML=city?content:"";
}	
//渲染表格
function addBtnHandle(){
	addAqiData();
	renderAqiList();
}
//获取用户输入，更新数据，并进行页面呈现更新
function delBtnHandle(e){
    var city=e.target.parentNode.parentNode.firstChild.innerHTML;
	delete aqiData[city];
	renderAqiList();
}
//获取哪个城市数据被删，删除数据，更新表格显示
function init(){
    var btn=document.getElementById("add-btn");
    btn.addEventListener("click",addBtnHandle);
    document.getElementById("aqi-table").addEventListener("click",delBtnHandle);
}
init();