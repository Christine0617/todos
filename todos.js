window.onload = function() {
	var list = document.getElementById('list');
	var myLi = list.getElementsByTagName('li');
	var input = list.getElementsByTagName('input');
	if (localStorage.getItem('itemList')) {
		var itemList = JSON.parse(localStorage.getItem('itemList'));
		if (itemList.length) {
			for (var i = 0; i < itemList.length; i++) {
				appendLi(itemList[i].value);
				if (itemList[i].isCompleted) {
					myLi[i].style.textDecoration = 'line-through';
					input[i].checked = true;
				}
			}
			countLeftItems();
			if ($('.button-bar').hasClass('hide')) {
				$('.button-bar').removeClass('hide');
			}
		}
	}

	addDeleteEvent();
	lineThrough();
	iconDisplay();
}

function handler(event){
	if (event.keyCode === 13) {
		var value = $("#text").val();
		if(value !== ''){
			if ($('.button-bar').hasClass('hide')) {
				$('.button-bar').removeClass('hide');
			}
			appendLi(value);
		}

		if (localStorage.getItem('itemList')) {
			var itemList = JSON.parse(localStorage.getItem('itemList'));
		} else {
			var itemList = [];
		}
		var item = {
			value: value,
			isCompleted: false,
		};
		if(item.value !== ''){
			itemList.push(item);
		}
		localStorage.setItem('itemList', JSON.stringify(itemList));
		text.value = null;
		addDeleteEvent();
		lineThrough();
		countLeftItems();
		iconDisplay();
	}
}

//添加list
function appendLi(value) {
	$("#list").append('<li><input type="checkbox">'+value+'<span></span></li>')
}

//删除指定项
function addDeleteEvent() {
	var list = document.getElementById('list');
	var myLi = list.getElementsByTagName('li');
	var span = list.getElementsByTagName('span');
	for(i = 0; i < span.length; i++){
		span[i].index = i;
		span[i].onclick = function() {
			var child = list.children[this.index];
			list.removeChild(child);
			var itemList = JSON.parse(localStorage.getItem('itemList'));
			itemList.splice(this.index,1);
			if (itemList.length < 1) {
				if (!$('.button-bar').hasClass('hide')) {
					$('.button-bar').addClass('hide');
				}
			}
			localStorage.setItem('itemList', JSON.stringify(itemList));
			addDeleteEvent();
			lineThrough();
			countLeftItems();
			iconDisplay();
		}
	}
}
// 勾选
function lineThrough(){
	var list = document.getElementById('list');
	var myLi = list.getElementsByTagName('li');
	var input = list.getElementsByTagName('input');
	var itemList = JSON.parse(localStorage.getItem('itemList'));
	for (var i = 0; i < input.length; i++) {
		input[i].index = i;
		input[i].onclick = function(){
			if(input[this.index].checked){
				myLi[this.index].style.textDecoration = 'line-through';
				itemList[this.index].isCompleted = true;
			}else{
				myLi[this.index].style.textDecoration = 'none';
				itemList[this.index].isCompleted = false;
			}
			localStorage.setItem('itemList', JSON.stringify(itemList));
			countLeftItems();
		}
	}
}
//icon
function iconDisplay(){
	var list = document.getElementById('list');
	var myLi = list.getElementsByTagName('li');
	var span = list.getElementsByTagName('span');
	for (var i = 0; i < myLi.length; i++) {
		myLi[i].index = i;
		myLi[i].onmouseover = function(){
			span[this.index].style.display = 'block';
		};
		myLi[i].onmouseout = function(){
			span[this.index].style.display = 'none';
		};
	}
}
function countLeftItems() {
	var itemList = JSON.parse(localStorage.getItem('itemList'));
	if (itemList.length) {
		var len = itemList.length;
		for (var i = 0; i < itemList.length; i++) {
			if (itemList[i].isCompleted ) {
				len -= 1;
			}
		}
	} else {
		var len = 0;
	}
	$('#item-left').html('').html(len);
}
function clearComplete(){
	var oldList = JSON.parse(localStorage.getItem('itemList'));
	var itemList = [];
	for (var i = 0; i < oldList.length; i++) {
		if (!oldList[i].isCompleted) {
			itemList.push(oldList[i]);
		}
	}
	$('#list li').remove();
	for (var i = 0; i < itemList.length; i++) {
		$('#list').append('<li><input type="checkbox">' + itemList[i].value + '<span></span></li>');
	}
	if (itemList.length < 1) {
		if (!$('.button-bar').hasClass('hide')) {
			$('.button-bar').addClass('hide');
		}
	}
	localStorage.setItem('itemList', JSON.stringify(itemList));
	iconDisplay();
	lineThrough();
	addDeleteEvent();
}
function activeDisplay(){
	var allList = JSON.parse(localStorage.getItem('itemList'));
	var activeList = [];
	for (var i = 0; i < allList.length; i++) {
		if(!allList[i].isCompleted){
			activeList.push(allList[i]);
		}
	}
	$("#list li").remove();
	for (var i = 0; i < activeList.length; i++) {
		$("#list").append('<li><input type="checkbox">' + activeList[i].value + '<span></span></li>');
	}
	
	iconDisplay();
	lineThrough();
	addDeleteEvent();
}
function completedDisplay(){
	var allList = JSON.parse(localStorage.getItem('itemList'));
	var completedList = [];
	for (var i = 0; i < allList.length; i++) {
		if(allList[i].isCompleted){
			completedList.push(allList[i]);
		}
	}
	$("#list li").remove();
	for (var i = 0; i < completedList.length; i++) {
		$("#list").append('<li style="text-decoration:line-through"><input type="checkbox" checked = "checked"/>' + completedList[i].value + '<span></span></li>');
	}
	
	iconDisplay();
	lineThrough();
	addDeleteEvent();
}
function allDisplay(){
	var allList = JSON.parse(localStorage.getItem('itemList'));
	$("#list li").remove();
	for (var i = 0; i < allList.length; i++) {
		if(!allList[i].isCompleted){
			$("#list").append('<li><input type="checkbox">' + allList[i].value + '<span></span></li>');
		}
		if(allList[i].isCompleted){
			$("#list").append('<li style="text-decoration:line-through"><input type="checkbox" checked="checked">' + allList[i].value + '<span></span></li>');
		}
	}
	iconDisplay();
	lineThrough();
	addDeleteEvent();
}

