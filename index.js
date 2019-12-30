
//贪吃蛇 要求：打开的时候会有一个随机的食物方块，和一条长度为3的蛇初始移动方向向右，
//              可以根据键盘的上下左右键控制蛇的方向，当蛇与食物方块重合的时候食物方块消失，蛇长度+1，同时随机生成新的食物方块
// 随机生成食物方块函数
//获取map
let footx,footy
let footArry = '';
function Foot() {
}
Foot.prototype.foot =  function () {
	//生成前删出之前的
	if (footArry!==''){map.removeChild(footArry);}
	footx =  Math.floor(Math.random() * 40);
	footy =  Math.floor(Math.random() * 30);
	//创建div
	let divDom = document.createElement('div');
	//随机生成left,top
	let divLeft = footx * 20;
	let divTop = footy * 20;
	//把left,top值加入生成的div，并给div一个颜色
	divDom.style.left = divLeft + 'px';
	divDom.style.top = divTop + 'px';
	divDom.style.backgroundColor = 'green';
	//把div加入map中
	map.appendChild(divDom);
	footArry = divDom;
}

//生成长度为3的蛇函数
//生成蛇的参数
function Snake(left, top, bgc) {
	this.index = 39;
	this.arry = [
		{
			x: left || 3,
			y: top || 1,
			bgc: bgc || 'red'
		}, {
			x: left || 2,
			y: top || 1,
			bgc: bgc || 'skyblue'
		}, {
			x: left || 1,
			y: top || 1,
			bgc: bgc || 'pink'
		}

	]
	;
}

//添加跟据参数生成相应的div
let arr = [];
Snake.prototype.create = function () {
	//生成前删出之前的
	for (let i = 0; i < arr.length; i++) {
		map.removeChild(arr[i]);
	}
	arr = [];
	for (let i = 0; i < this.arry.length; i++) {
		//生成div
		let divDom = document.createElement('div');
		divDom.style.left = this.arry[i].x * 20 + 'px';
		divDom.style.top = this.arry[i].y * 20 + 'px';
		divDom.style.backgroundColor = this.arry[i].bgc;
		map.appendChild(divDom);
		arr.push(divDom);
	}
}
//让蛇移动函数
function move(map) {
	let arr = setSnake.arry;
	let timeId = setInterval(function () {
		for (let i = arr.length - 1; i > 0; i--) {
			arr[i].x = arr[i - 1].x;
			arr[i].y = arr[i - 1].y;
		}
		switch (setSnake.index) {
			case 37:
				arr[0].x--;
				if (arr[0].x<0){
					alert('啊，不小心撞死了');
					clearInterval(timeId);
					return;
				}
				break;
			case 38:
				arr[0].y--;
				if (arr[0].y<0){
					alert('啊，不小心撞死了');
					clearInterval(timeId);
					return;
				}
				break;
			case 39:
				arr[0].x++;
				if (arr[0].x>=map.offsetWidth/20){
					alert('啊，不小心撞死了');
					clearInterval(timeId);
					return;
				}
				break;
			case 40:
				arr[0].y++;
				if (arr[0].y>=map.offsetHeight/20){
					alert('啊，不小心撞死了');
					clearInterval(timeId);
					return;
				}
				break;
		}
		if (arr[0].x == footx&&arr[0].y==footy){
			foot.foot();
			setSnake.arry.push({
				x: arr[arr.length-1].x,
				y: arr[arr.length-1].y,
				bgc: getColorForRandom(),
			})
		}
		setSnake.create(map);
	}, 250)
}


//随机颜色
function getColorForRandom() {
	var arr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"]; //下标0-15
	var str = "#";
	//循环产生 6个 0-15的数.
	for (var i = 0; i < 6; i++) {
		var num = Math.floor(Math.random() * 16);
		//根据这个随机数,在arr数组中去取值.
		str += arr[num];
	}
	return str; //"#98de00"
}
//根据键盘事件控制移动方向
window.onkeydown = function (e) {

		if (e.keyCode>=37&&e.keyCode<=40){
			if (setSnake.index == 39) {
				if (e.keyCode != 37) {
					setSnake.index = e.keyCode;
				}
			}
			if (setSnake.index == 37) {
				if (e.keyCode != 39) {
					setSnake.index = e.keyCode;
				}
			}
			if (setSnake.index == 38) {
				if (e.keyCode != 40) {
					setSnake.index = e.keyCode;
				}
			}
			if (setSnake.index == 40) {
				if (e.keyCode != 38) {
					setSnake.index = e.keyCode;
				}
			}
		}
	}
	//当蛇与食物方块重合的时候食物方块消失，蛇长度+1，同时随机生成新的食物方块

