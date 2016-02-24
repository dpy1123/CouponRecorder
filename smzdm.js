function insertCRFunc(){
	
	function getItemId(text){//从text中提取itemId
		var itemId = NaN;
		var regResult = text.match(/[1-9][0-9]*/g);//匹配数字部分
		if(regResult.length > 0){
			itemId = regResult[regResult.length-1];
		}
		return itemId;
	}


	//因为list元素会随着浏览动态添加，因此使用on绑定事件
	$('body > section > div.leftWrap').on('click', 'div.list > div.listTitle > h4 > a', function(){
		var url = this.href;//http://www.smzdm.com/p/6016706/
		var itemId = getItemId(url);
		if(!isNaN(itemId)){
			sendUserAction(null, itemId, 'view', 'smzdm');
		} 
	}).on('mouseover', 'div.list > div.listTitle > h4 > a' , function(){
		//console.log('hover')
		var itemId = getItemId(this.href);
		if($('#popup_'+itemId).length == 0){//只append一次
			var popup = document.createElement("span");
			popup.id = 'popup_'+itemId;
			popup.style.float = 'right';
			popup.style.cursor = 'pointer';
			popup.innerText = 'dislike';
			popup.onclick = function(){
				sendUserAction(null, itemId, 'dislike', 'smzdm');
				$(this).remove();
			}
			$(this).parent().append(popup);
		}
	});

	
	$('body > section > div.leftWrap').on('click', 'div.list > a.picLeft', function(){
		var url = this.href;//http://www.smzdm.com/p/6016706/
		var itemId = getItemId(url);
		if(!isNaN(itemId)){
			sendUserAction(null, itemId, 'view', 'smzdm');
		}
	});
	

	
	$('body > section > div.leftWrap').on('click', 'div.list > div.listRight > div.lrBot > div.botPart > div.buy > a', function(){
		var url = $(this).parents('div.list').attr('articleid');//"3_6017116"
		var itemId = getItemId(url);
		if(!isNaN(itemId)){
			sendUserAction(null, itemId, 'buy', 'smzdm');
		}
	});
	

	$('body > section > div.leftWrap > article > div.article-top-box.clearfix > div.article-right > div.clearfix > div > a').on('click', function(){
		var itemId = $('#articleID').val();
		sendUserAction(null, itemId, 'buy', 'smzdm');
	});

}

function sendUserAction(userId, itemId, action, site){
	var userId = userId || localStorage.userId;
	if(typeof userId == "undefined"){
		var newId = window.prompt("请输入用户名", "userId");
		if(newId == null || newId == "userId"){
			alert('请右键本扩展，在选项中设置userId！');
			return;
		}else{
			localStorage.userId = newId;
		}
	}
	//alert(action+': [userId: '+userId+', itemId: '+itemId+']');
	chrome.runtime.sendMessage({"method": "log", "params": {"userId" : userId, "itemId": itemId, "action": action, "site": site}}, function(response){
			console.log(response);
		}
	)
}


//document.addEventListener('readystatechange', function(){
	//if(document.readyState == "complete"){ //当页面加载状态为完全结束时进入 
		console.log('inject');
		insertCRFunc();
	//} 
//});