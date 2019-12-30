//保存数据数组
let account = {
	user: 'admin',
	email: '1111@qq.com',
	poss: '123456'
};
//保存验证码
let verification = 0;
let dlDom = document.querySelector('.search .login');
let zcDom = document.querySelector('.search .regsiter');
let mkDom = document.querySelector('.loginmk');
let mkbtnDom = document.querySelectorAll('.loginmk .loginhd span');
let jrDom = document.querySelector('.loginmk .loginbd .btn');
let closeDom = document.querySelector('.close');
let mkdlDom = document.querySelectorAll('.loginmk .loginbd');
let hdbtnDom = document.querySelector('.search .searchdl');
let htUserDom = document.querySelector('.search .searchuser');
let UserTxtDom = document.querySelector('.loginbd input[type="text"]');
let possDom = document.querySelector('.loginbd input[type="password"]');
let htTuiChuDom = document.querySelectorAll('.search .searchuser li')[2];
// console.log(UserTxtDom);
//登录点击事件
dlDom.onclick = function () {
	mkDom.style.display = 'block';
	mkdlDom[0].style.display = 'block';
	mkdlDom[1].style.display = 'none';
	mkbtnDom[0].className = 'loginlt borderbtn';
	mkbtnDom[1].className = 'loginrt';
	$('.logincnt .shortcut').css('display', 'block');
};
//注册点击事件
zcDom.onclick = function () {
	mkDom.style.display = 'block';
	mkdlDom[1].style.display = 'block';
	mkdlDom[0].style.display = 'none';
	mkbtnDom[0].className = 'loginlt';
	mkbtnDom[1].className = 'loginrt borderbtn';
	$('.logincnt .shortcut').css('display', 'none');
};
//关闭事件
closeDom.onclick = function () {
	mkDom.style.display = 'none';
};
//登录注册切换--登录
mkbtnDom[0].onclick = function () {
	mkdlDom[0].style.display = 'block';
	mkdlDom[1].style.display = 'none';
	mkbtnDom[0].className = 'loginlt borderbtn';
	mkbtnDom[1].className = 'loginrt';
	$('.logincnt .shortcut').css('display', 'block');
};
//登录注册切换--注册
mkbtnDom[1].onclick = function () {
	mkdlDom[1].style.display = 'block';
	mkdlDom[0].style.display = 'none';
	mkbtnDom[0].className = 'loginlt';
	mkbtnDom[1].className = 'loginrt borderbtn';
	$('.logincnt .shortcut').css('display', 'none');
};
//登录验证
jrDom.onclick = function () {
	let poss = str_md5(possDom.value);
	let num = 0;
	let arrey = getuser();
	if (arrey) {
		account = arrey;
	}
	for (var i = 0; i < account.length; i++) {
		for (let key in account[i]) {
			if (UserTxtDom.value == account[i][key] && poss == account[i].poss) {
				win(account[i]);
				return;
			} else {
				break;
			}
		}
	}
	$('.loginbd .error').css('display', 'block');
};
//退出
htTuiChuDom.onclick = function () {
	htUserDom.style.display = 'none';
	hdbtnDom.style.display = 'block';
	setLocal('');
};
//验证注册
$('.loginbdzc .btn').click(function () {
	let num = $(this).siblings('input');
	let num1 = $(this).siblings('div').find('input')[1];
	let code = $('.loginbdzc .verify input').val();
	if (verification != null) {
		if (code == verification) {
			$('.loginbdzc .verify i').css('display', 'none');
			if (/^[a-zA-Z]\w{5,17}$/.test(num1.value)) {
				$('.loginbd .posserror').css('display', 'none');
				let arr = {
					user: num[0].value,
					email: num[1].value,
					poss: num1.value
				};
				setuser(arr);
				win(arr);
				return;
			} else {
				$('.loginbd .posserror').css('display', 'block')
			}
		} else {
			$('.loginbdzc .verify i').css('display', 'block').text('验证码错误')
		}
	} else {
		$('.loginbdzc .verify i').css('display', 'block').text('请输入验证码');
	}
});
//获取验证码验证
$('.loginbdzc .verify a').click(function () {
	let num = $(this).parent('div').siblings('input');
	let id = 60, index = '';
	verification = randomNum();
	// console.log(num);
	if (/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(num[0].value)) {
		$('.loginbd .numerror').css('display', 'none')
		if (/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(num[1].value)) {
			clearInterval(index);
			$('.loginbdzc .verify a').text('获取中....');
			$('.loginbd .emainerror').css('display', 'none');
			Email.send({
				Host: "smtp.qq.com",
				Username: "1044303646@qq.com",
				Password: "+227feng-",
				To: num[1].value,
				From: "1044303646@qq.com",
				Subject: "实验楼验证码",
				Body: verification
			}).then(
				message => console.log(shiFou(message), index = setInterval(function () {
					if (id == 0) {
						clearInterval(index);
						$('.loginbdzc .verify a').text('请重新获取')
					} else {
						$('.loginbdzc .verify a').text(id--);
					}

				}, 1000))
			);

		} else {
			$('.loginbd .emainerror').css('display', 'block')
		}
	} else {
		$('.loginbd .numerror').css('display', 'block')
	}
});

//判断是否发送成功{
function shiFou(message) {
	let i = 2;
	if (message.length != i) {
		$('.loginbdzc .verify a').text('发送失败');
	}
}

//随机数
function randomNum() {
	let num = Math.floor((Math.random() * 1000000) + 100000);
	// console.log(num);
	return num;
}

//登录成功
function win(obj) {
	closeDom.click();
	hdbtnDom.style.display = 'none';
	htUserDom.style.display = 'block';
	setLocal(obj);
	$('.loginmk input').val('');
	$('.userlogin>a').css({
		display: 'none',
	});
	$('.userlogin>span').css({
		display: 'block',
	})
}

//保存本地数据
//a.保存登录成功和注册成功
function setLocal(obj) {
	// obj.poss = str_md5(obj.poss);
	let num = JSON.stringify(obj);
	sessionStorage.setItem('num', num);
}

//b.保存用户数据
let keyId = 0;

function setuser(arr) {
	keyId++;
	arr.poss = str_md5(arr.poss);
	let arrey = JSON.stringify(arr);
	localStorage.setItem(keyId, arrey);
}

setuser(account);

//获取本地数据
//a.获取登录成功和注册成功
function getLocal() {
	let num = sessionStorage.getItem('num');
	if (num != null) {
		num = JSON.parse(num);
		return num;
	}
	return false;
}

//b.获取用户数据
function getuser() {
	var len = localStorage.length;
	var arrey = []; // 定义数据集
	for (var i = 0; i < len; i++) {
		// 获取key 索引从0开始
		var getKey = localStorage.key(i);
		// 获取key对应的值
		var getVal = localStorage.getItem(getKey);
		getVal = JSON.parse(getVal);
		// 放进数组
		arrey[i] = getVal;
	}
	if (arrey != null) {
		return arrey;
	} else {
		return false;
	}
}

//页面加载时检测是否登录过
(function () {
	let data = getLocal();
	let arrey = getuser();
	if (data) {
		for (var i = 0; i < arrey.length; i++) {
			let j = 0;
			arrey[i].user == data.user ? j++ : j = 0;
			arrey[i].email == data.email ? j++ : j = 0;
			arrey[i].poss == data.poss ? j++ : j = 0;
			if (j == 3) {
				win(data);
			} else {
				console.log(false);
			}
		}
	}
}());

// let firstCode = resp.charCodeAt(0);
// console.log('response 0:' + firstCode);
// if (firstCode < 0x20 || firstCode > 0x7f) {
// 	console.log('response get sp char');
// 	resp = resp.substring(1); // 去除第一个字符
// 	console.log('response:' + resp);
// }
//localStorage.clear()