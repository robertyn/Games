//*--------------------------------------------------*/
window.onload = function() {
    var time = document.getElementById('timer');
    var endText = document.getElementById('endText');
    var color = document.getElementById('color');
    var sc = 0; //分数
    var step = 15;
    var score_ = document.getElementById('score_');
    var ending = document.getElementById('ending');
    var sec = 5;
    var start = document.getElementById('start');
    var over2 = document.getElementById('over2');
    var tim = null;
    setTimeout(function function_name(argument) {
        timeBarMove(time, 40);
        //生成颜色块
        colorBox(color, 100);
    }, 5000);
    tim = setInterval(function() {
        sec--;
        over2.innerHTML = sec + "秒后游戏开始";
        if (sec === 0) {
            clearInterval(tim);
            start.style.display = 'none';
        }
    }, 1000);
    //时间条

    /**
     * [timeBarMove description]
     * @param  {[type]} obj     [时间条对象]
     * @param  {[type]} timeout [多久之后清空定时器,游戏结束]
     * @return {[type]}         [description]
     */
    function timeBarMove(obj, timeout) {
        var speed = 0,
            timer = null,
            s;
        timer = setInterval(function() {
            speed += 400 / (timeout / 15 * 1000);
            s = -speed;
            obj.style.right = s + "px";
            if (s <= -400) {
                clearInterval(timer);
                endText.innerHTML = "时间到";
                ending.style.display = 'block';
                document.getElementById('over').innerHTML = '得分为:' + score_.innerHTML;

            }
        }, 15);
    }



    //生成色块计分
    /**
     * [colorBox description]
     * @param  {[type]} obj [被添加的对象]
     * @param  {[type]} num [需要生成多少个色块]
     * @return {[type]}     [description]
     */

    function colorBox(obj, num) {

        var l = random(30) + 50;
        var tempColor = colorHSL(l);
        var tempColorSp = tempColor.replace(l, l + step);
        console.log(tempColorSp);
        console.log(tempColor);
        var randomDiv = parseInt(Math.random() * 100);
        for (var i = 0; i < num; i++) {
            var div = document.createElement('div');
            div.className = "colorBox";
            div.style.backgroundColor = tempColor;
            obj.appendChild(div);
        }
        var divs = document.getElementsByClassName('colorBox');
        //随机取出一个div染色,减少20个亮度
        var divsR = divs[randomDiv];
        divsR.style.backgroundColor = tempColorSp;
        //指定色块点击事件,点对计数
        divsR.onclick = function() {
            obj.innerHTML = '';
            colorBox(obj, num);

            sc++;
            score_.innerHTML = "&nbsp;" + sc;
            if (sc > 10) {
                step = 10;
            } else if (sc > 15) {
                step = 8;
            } else if (sc > 20) {
                step = 6;
            } else {

            }
        };
    }



    /*-------------------十六进制取色----------------------*/
    /**
     * 定义一串随机颜色的字符串
     * @returns {string}
     */
    function getColorX() {
        //定义颜色数组
        var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];
        //定义空数组,用来取色
        var array2 = [];
        var i = 0;
        while (i < 6) {
            //获取颜色数组中颜色位
            array2[array2.length] = array[getColorRandom()];
            i++;
        }

        var str = array2.join("");
        //查看数组获取成功
        //console.log(array2);
        //console.log(str);
        return "#" + str;
    }
    /**
     * 定义一个0-9 , a-f随机数(十六进制)
     * @returns {Number}
     */
    function getColorRandomX() {
        return parseInt(Math.random() * 15);
    }

    //给正确的色块染色点击对了并且计数

};


/*------------------HSL取色----------------------*/

function random(n) {
    return parseInt(Math.random() * n);
}

function colorHSL(l) {
    return "hsl(" + random(360) + ",100%," + l + "%)";
}
