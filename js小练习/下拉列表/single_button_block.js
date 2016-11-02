

window.onload=function(){
	var oDiv=document.getElementById('drop');
	var oH2=document.getElementsByTagName('h2')[0];
	var oUl=document.getElementsByTagName('ul')[0];
	oH2.onclick=showHideUl;
}	
function showHideUl(){
		var oDiv=document.getElementById('drop');
		var oH2=document.getElementsByTagName('h2')[0];
	    var oUl=document.getElementsByTagName('ul')[0];
	    if(oUl.style.display==='none'){
	    	oUl.style.display='block';
	    	oH2.className='up';

	    }
	    else{
	    	oUl.style.display='none';
	    	oH2.className='down';

	    }

}