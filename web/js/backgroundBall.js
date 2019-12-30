function backgroundBall(ele, width, height) {

    // 找到ID为 bgBall 的  div  标签
    let bgBall = ele;
    bgBall.style.position = 'relative';
    bgBall.style.width = width + 'px';
    bgBall.style.height = height + 'px';
    bgBall.style.margin = 'auto';

    let bgBallWidth = bgBall.offsetWidth;
    let bgBallHeight = bgBall.offsetHeight;
    // 创建一个数组用来存放 背景中的 球
    let bgBallList = [];
    let bgBallListNew = [];
    //生成  10 个球
    for (let i = 0; i < 10; i++) {
        // 用于每个球宽高的随机数
        let lengthR = Math.ceil(Math.random() * 10) * (bgBallWidth / 50);
        // 用于 每个球的初始位置的 top  left
        let posiLeft = Math.ceil(Math.random() * (bgBallWidth - lengthR));
        let posiTop = Math.ceil(Math.random() * (bgBallHeight - lengthR));
        //生成div标签
        let divDom = document.createElement('div');
        //给 生成的  div设置 类名 和  属性
        divDom.className = 'ball';
        divDom.style.width = lengthR + 'px';
        divDom.style.height = lengthR + 'px';
        divDom.style.position = 'absolute';
        divDom.style.borderRadius = 50 + '%';
        divDom.style.backgroundColor = "#0094ff";
        divDom.style.opacity = 0.3;
        divDom.style.zIndex = -222;
        divDom.style.top = posiTop + 'px';
        divDom.style.left = posiLeft + 'px';
        bgBall.appendChild(divDom);
        bgBallList.push(divDom);
    };

    for (let i = 0; i < bgBallList.length; i++) {

        bgBallListNew = bgBallList;
        console.log(bgBallListNew);

        //生成4个随机数  控制 球的4个方向
        let direction = Math.ceil(Math.random() * 4);
        let divMove = bgBallList[i];

        if (direction == 1) { //左上
            topLeft(divMove);
        } else if (direction == 2) { //右上
            topRight(divMove);
        } else if (direction == 3) { //左下
            bottomLeft(divMove);
        } else if (direction == 4) { //右下
            bottomRight(divMove);
        }

    }

    //球  左上移动函数
    function topLeft(divMove) {
        //清除 计时器
        clearInterval(divMove.ballMove);
        //获取 div 的 真实的top left 值
        let topV = divMove.offsetTop;
        let leftV = divMove.offsetLeft;
        divMove.ballMove = setInterval(function () {
            //对 div位置 进行修改（位移）
            topV -= 1;
            leftV -= 1;

            //设置盒子新的位置：dom.style.left = left;
            divMove.style.top = topV + 'px';
            divMove.style.left = leftV + 'px';

            //判断是否到达边界
            if (leftV == 0) {
                topRight(divMove)
            }
            if (topV == 0) {
                bottomLeft(divMove)
            }
        }, 20);
    }
    //球  右上移动函数
    function topRight(divMove) {
        //清除 计时器
        clearInterval(divMove.ballMove);
        //获取 div 的 真实的top left 值
        let widthV = divMove.offsetWidth;
        let ser = bgBallWidth - widthV;
        let topV = divMove.offsetTop;
        let leftV = divMove.offsetLeft;
        divMove.ballMove = setInterval(function () {
            //对 div位置 进行修改（位移）
            topV -= 1;
            leftV += 1;

            //设置盒子新的位置：dom.style.left = left;
            divMove.style.top = topV + 'px';
            divMove.style.left = leftV + 'px';
            //判断是否到达边界
            if (leftV == ser) {
                topLeft(divMove)
            }
            if (topV == 0) {
                bottomRight(divMove)
            }
        }, 20);
    }
    //球  左下移动函数
    function bottomLeft(divMove) {
        //清除 计时器
        clearInterval(divMove.ballMove);
        //获取 div 的 真实的top left 值
        let heightV = divMove.offsetHeight;
        let ser = bgBallHeight - heightV;
        let topV = divMove.offsetTop;
        let leftV = divMove.offsetLeft;
        divMove.ballMove = setInterval(function () {
            //对 div位置 进行修改（位移）
            topV += 1;
            leftV -= 1;

            //设置盒子新的位置：dom.style.left = left;
            divMove.style.top = topV + 'px';
            divMove.style.left = leftV + 'px';
            if (leftV == 0) {
                bottomRight(divMove);
            }
            if (topV == ser) {
                topLeft(divMove);
            }
        }, 20);
    }
    //球  右下移动函数
    function bottomRight(divMove) {
        //清除 计时器
        clearInterval(divMove.ballMove);
        //获取 div 的 真实的top left 值
        let heightV = divMove.offsetHeight;
        let ser = bgBallHeight - heightV;


        let widthV = divMove.offsetWidth;
        let ser1 = bgBallWidth - widthV;

        let topV = divMove.offsetTop;
        let leftV = divMove.offsetLeft;
        divMove.ballMove = setInterval(function () {
            //对 div位置 进行修改（位移）
            topV += 1;
            leftV += 1;

            //设置盒子新的位置：dom.style.left = left;
            divMove.style.top = topV + 'px';
            divMove.style.left = leftV + 'px';
            if (leftV == ser1) {
                bottomLeft(divMove);
            }
            if (topV == ser) {
                topRight(divMove);
            }
        }, 20);
    }

}
let a = document.querySelector('#bgBall');
backgroundBall(a, 1000, 600);