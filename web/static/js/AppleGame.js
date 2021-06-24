var falseNum = 0;
var rightNum = 0;
var rightlv = 0;
var appleNum = 5000;
var speed = 300;
var winNum = 15;
var loseNum = 40;
var id4 = 0;

var id1 = 0;
var id2 = 0;
var id3 = 0;
var id5 = 0;

var wordList4 = new Array('爸爸', '妈妈', '哥哥', '姐姐', '爷爷', '奶奶', '你好');
var wordList2 = new Array('乌龟', '爱心', '雨伞', '开心', '红旗', '聆听', '坚持');
var wordList3 = new Array('彳亍', '参差', '奔放', '彷徨', '崎岖', '蔚蓝', '陶冶');
var wordList1 = new Array('饕餮', '耄耋', '貔貅', '麒麟', '镣铐', '枷锁', '尴尬','惆怅', '酝酿', '脉络', '奇葩', '骸骨', '蠕动', '悼念', '参差', '斑驳', '酣睡', '徘徊', '汹涌', '殷红', '鸳鸯', '巍峨', '鬓发', '同济', '忌讳', '竞争', '甘霖', '呕吐', '罪孽', '钥匙', '胸脯');
var wordList = wordList1;

//全局更新的单个查看词语
var singleWord = "";


function print(){
    $.ajax({
       url: 'nmd',
       success: function (responseBody) {
            console.log(responseBody.images);
       }
    });


}

function compare(){
    $.ajax({
       url: 'compare',
       success: function (responseBody) {
            console.log(responseBody.result);
       }
    });

}


window.onkeydown = function() {

	if(id5 == 1) {
		var key = event.keyCode;
	}
	var bg = document.getElementById("bg");
	for(i = 0; i < bg.children.length; i++) {
		var code = bg.children[i].getAttribute("keycode");
		console.log("code"+code);
		console.log("key"+key);
		if(key == code) {
			bg.removeChild(bg.children[i]);
			rightNum++;
			document.getElementById("right_score").innerHTML = rightNum;
			rightlv = (rightNum / (rightNum + falseNum)).toFixed(2) * 100;
			document.getElementById("right_parsent").innerHTML = rightlv;
			switch(rightNum) {
				case 1:
					allClear("smallapple6","block");
					break;
				case 10:
					allClear("smallapple5","block");
					break;
				case 15:
					allClear("smallapple4","block");
					break;
				case 20:
					allClear("smallapple3","block");
					break;
				case 25:
					allClear("smallapple2","block");
					break;
				case 30:
					allClear("smallapple1","block");
					break;
			}
			if(rightNum == winNum) {
				alert("恭喜通关");
				pause();
				cancelAll();
				id4 = 1;
			}
			break;
		}
	}
}

function exit() {
	if(confirm("是否退出")) {
		window.close()
	}


}
function allClear(idname,dis){
	document.getElementById(idname).style.display = dis;
}
function clear_apple() {
	allClear("smallapple1","none");
	allClear("smallapple2","none");
	allClear("smallapple3","none");
	allClear("smallapple4","none");
	allClear("smallapple5","none");
	allClear("smallapple6","none");
}

function shezhi() {
	allClear("shezhi_jiemian","block");
	document.getElementById("bg").innerHTML = " ";
	numTo0();
	allClear("shezhi_jiemian","block");
	pause();
	cancelAll();
	clear_apple();
}

function queding() {
	var gameLV = (document.getElementById("LVnum").value) * 1;
	winNum = document.getElementById("passNum").value;
	loseNum = document.getElementById("nopassNum").value;
	var nandu = document.getElementById("nandu");
	nandu.innerHTML = gameLV;
	switch(gameLV) {
		case 1:
			appleNum = 2000;
			speed = 300;
			wordList = wordList1;
			break;
		case 2:
			appleNum = 1400;
			speed = 280;
			wordList = wordList2;
			break;
		case 3:
			appleNum = 1000;
			speed = 200;
			wordList = wordList3;
			break;
		case 4:
			appleNum = 600;
			speed = 150;
			wordList = wordList4;
			break;
		default:
			alert("目前难度只有1到4");
			moren();
			nandu.innerHTML = 1;
			break;
			numTo0();
			cancelAll();

	}

//	console.log(gameLV + "/" + speed + "/" + appleNum)
	allClear("shezhi_jiemian","none");
}

function cancelAll() {
	rightNum = 0;
	falseNum = 0;
	document.getElementById("bg").innerHTML = "";
}

function quxiao() {
	allClear("shezhi_jiemian","none");
}
//           	 
function moren() {
	document.getElementById("LVnum").value = "1";
	document.getElementById("passNum").value = "50";
	document.getElementById("nopassNum").value = "50";
}

function over() {
	history.go(0);
		$.ajax({
        url: 'endListen',
//       success: function (responseBody) {
//            console.log(responseBody.images);
//       }
    });
}

function pause() {
	clearInterval(id2);
	clearInterval(id1);
	id2 = 0;
	id1 = 0;
	id5 = 0;
}




function start() {
	if(id1 == 0 && id2 == 0 && id3 == 0) {
		id2 = setInterval("addapple()", appleNum);
		id1 = setInterval("appledown()", speed);
		if(id4 == 1) {
			numTo0();
			id4 = 0;
			clear_apple();
		}
		id5 = 1;
	}
	$.ajax({
       url: 'startListen',
        type: 'POST',
        data: {
           "isGame":true,
        },
        datatype:"JSON",

//       success: function (responseBody) {
//            console.log(responseBody.images);
//       }
    });




}

function numTo0() {
	document.getElementById("right_score").innerHTML = "0";
	document.getElementById("false_score").innerHTML = "0";
	document.getElementById("right_parsent").innerHTML = "0";
}

function appledown() {
	var bg = document.getElementById("bg")
	for(i = 0; i < bg.children.length; i++) {
	    //先看看当前字符的结果
	    var code = bg.children[i].getAttribute("keycode");
        console.log(code);
	    //这里判断结果是否相等
	    $.ajax({
        url: 'compare',
        type: 'POST',
        data: {
           "judgeWord": code,
           "type": "wordJudge",
           "index": i,
        },
        datatype:"JSON",

        success: function (responseBody) {
            //这说明在后端查询到了该词语，这里让苹果变为收集状态
            if(responseBody.result == "true") {
               //消除苹果
               var bg = document.getElementById("bg");
               bg.removeChild(bg.children[responseBody.index]);
               rightNum++;
			   document.getElementById("right_score").innerHTML = rightNum;
               rightlv = (rightNum / (rightNum + falseNum)).toFixed(2) * 100;
			   document.getElementById("right_parsent").innerHTML = rightlv;

			   switch(rightNum) {
				case 1:
					allClear("smallapple6","block");
					break;
				case 10:
					allClear("smallapple5","block");
					break;
				case 15:
					allClear("smallapple4","block");
					break;
				case 20:
					allClear("smallapple3","block");
					break;
				case 25:
					allClear("smallapple2","block");
					break;
				case 30:
					allClear("smallapple1","block");
					break;
			    }
			    if(rightNum == winNum) {
				alert("恭喜通关");
				pause();
				cancelAll();
				id4 = 1;
			    }
                console.log("success");
            }
            console.log(responseBody.result);

            }
        });

        //这里是苹果下降逻辑
		var t = parseInt(bg.children[i].style.top);
		t += 5;
		bg.children[i].style.top = t + "px";
		if(t > 390) {
			bg.children[i].setAttribute("class", "badapple");
			bg.children[i].innerHTML = " ";
		}
		if(t > 410) {
			bg.removeChild(bg.children[i]);
			falseNum++;
			document.getElementById("false_score").innerHTML = falseNum;
			rightlv = (rightNum / (rightNum + falseNum)).toFixed(2) * 100;
			document.getElementById("right_parsent").innerHTML = rightlv;
			if(falseNum == loseNum) {
				alert("闯关失败");
				pause();
				cancelAll();
				id4 = 1;
				clear_apple();
			}
		}
	}
}

function addapple() {
//	console.log("add");
	var a = document.createElement("div")
	var num = parseInt(Math.random() * 26) + 65;
	var l = parseInt(Math.random() * 700);

	var index = parseInt(Math.random() * wordList.length);
	console.log(index);
	var wordName = wordList[index];
	a.innerHTML = wordName;
	// a.innerHTML = "&#" + num + ";";
	a.setAttribute("class", "apple");
	// 测试用
	a.setAttribute("keycode", wordName);
	// a.setAttribute("keycode", num);
	a.style.left = l + "px";
	a.style.top = "5px";
	document.getElementById("bg").appendChild(a);
}


//主界面的逻辑


//显示当前查看文字
function showWord() {
    var word = document.createElement("div")
    word.id = "nowWord";
    var index = parseInt(Math.random() * wordList.length);
	console.log(index);
	var wordName = wordList[index];
	word.innerHTML = wordName;

	word.setAttribute("class", "apple");
	word.setAttribute("keycode", wordName);
	word.style.left ="50px";
	word.style.top = "50px";

	document.getElementById("wordSh").appendChild(word);
	singleWord = wordName;
}

//换词
function changeWord() {
   var index = parseInt(Math.random() * wordList.length);
   console.log(index);
   var wordName = wordList[index];
   document.getElementById("nowWord").innerHTML = wordName;
   singleWord = wordName;
   //删掉之前的按钮和结果和拼音
//   document.getElementById("wordBg").removeChild(document.getElementById("duyin"));

   while(true) {
       try{
          document.getElementById("wordBg").removeChild(document.getElementById("duima"));
       }
       catch(err){

       }
       try{
          document.getElementById("wordPy").removeChild(document.getElementById("pinyin"));
       }
       catch(err){

       }
       try{
          document.getElementById("wordBg").removeChild(document.getElementById("mes"));
       }
       catch(err){
         break;

       }

   }
    $.ajax({
           url: 'removeVideo',
//           success: function (responseBody) {
//                console.log(responseBody.result);
//           }
        });

}

//开始录制
function startHear() {
 //这里得在界面重新显示一个框，然后加一个停止录制的按钮。
    var bt = document.getElementById("speak");
    bt.innerHTML = "录制中";
    $.ajax({
           url: 'startListen',
            type: 'POST',
            data: {
               "isGame":false,
            },
            datatype:"JSON",
           success: function (responseBody) {
                console.log(responseBody.result);
           }
        });

}

//结束录制,并比对结果
function endHear() {
		$.ajax({
        url: 'endListen',
//       success: function (responseBody) {
//            console.log(responseBody.images);
//       }
    });


    //这里停个2秒钟，因为它识别需要时间,看看有没有更好的办法
    var t = setTimeout(alert('请稍等我验证一下:)'),2000);

    $.ajax({
    url: 'compareOne',
    type: 'POST',
    data: {
       "wordToGet": singleWord,
       "type": "wordJudge",
    },


    datatype:"JSON",
    success: function (responseBody) {
        //根据返回结果字段，判断用户是否说的正确，但都要展示文字相关信息
        console.log(responseBody.result);
        var a = document.createElement("div")
        var wbg = document.getElementById("wordBg");
        a.id = "duima";
        if(responseBody.result == "true") {
           a.innerHTML = "惊人的词汇量！发音也很标准";
        }
        else{
           a.innerHTML = "你好像不认识它们呢:）,看看上面的拼音吧！";
        }
        //加入显示拼音
        var py = document.createElement("div");
        py.id = "pinyin";
        py.innerHTML = responseBody.pinyin;
        document.getElementById("wordPy").appendChild(py);

        a.value = "responseBody.result";
        a.setAttribute("keycode", responseBody.result);

        if(responseBody.result == "true") {
            //加一个正确的result
            wbg.appendChild(a);
        }
        else {
            //加一个错误的result
           wbg.appendChild(a);
        }
        //展示剩余的内容，查看语音按钮和拼音,或者重新写一个函数
         document.getElementById("speak").innerHTML = "(请多说几遍qaq)";
         while(true) {
           try{
            document.getElementById("wordBg").removeChild(document.getElementById("mes"));
             }
             catch(err) {
                console.log("no mesChild");
                break;
             }
         }


//         var bt = document.createElement("button");
//         bt.id = "duyin";
//         bt.innerHTML = "读音";
//
//         document.getElementById("wordBg").appendChild(bt);
         getVoice();

         //显示拼音
//         var a =  document.createElement("div");
//         a.innerHTML = responseBody.result;


//        wbg.appendChild("拼音");
        //按钮不知道怎么加
    }
    });

}

//获取当前单词音频
function getVoice() {
  console.log(singleWord);
  $.ajax({
        url: 'getVoice',
        type: 'POST',
        data: {
           "wordToGet": singleWord,
           "type": "word",
        },
        datatype:"JSON",
        success: function (responseBody) {
            console.log(responseBody.result);
            }
        });


}

//播放音频
function playVoice() {
    $.ajax({
    url: 'playVoice',
    type: 'POST',
    data: {
       "wordToGet": singleWord,
       "type": "word",
    },
    datatype:"JSON",
    success: function (responseBody) {
        console.log(responseBody.result);
        if(responseBody.result=="false") {
           var a = document.createElement("div");
           a.id = "mes";
           a.innerHTML = responseBody.mes;

           document.getElementById("wordBg").appendChild(a);

        }
        }
    });
}

