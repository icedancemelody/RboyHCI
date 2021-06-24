
import os
import time

from flask import Flask, render_template, jsonify, request
from flask_httpauth import HTTPBasicAuth
from axf import axel

from playsound import playsound
from pypinyin import Style, lazy_pinyin
# BASE_DIR建立一个基础路径，用于静态文件static，templates的调用

# 导入py文件
from python.hearingmuti import *
from python.resultModel import globalResultWords
from python.txt_to_voice import txt_to_voice


auth = HTTPBasicAuth()

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def create_app():
    """初始化，创建app
    """
    # 建立静态文件static，templates的路径
    static_dir = os.path.join(BASE_DIR, 'web/static')
    # templates_dir = os.path.join(BASE_DIR, 'web/templates')

    # 建立app
    app = Flask(__name__, static_folder="")
    # 将路由axf注册到蓝图blueprint，因为我使用了蓝图来管理和规划url，url_prefix参数表示在url前面必须加上axf前面，这是为了与同一个项目中不同的app进行区分，这里‘/axf’一定要加 / 不然会报错
    return app

app = create_app()




@app.route("/Game")
def jump():
    return render_template("index.html")

@app.route("/Exercise")
def jump1():
    return render_template("exercise.html")

@app.route("/Back")
def back():
    count = 0
    # 这里应该要删除所有MP3文件
    return render_template("menu.html")


@app.route("/getPinyin", methods=['GET', 'POST'])
def getPinyin():
    word = request.form.get("wordToGet")
    pinyin = lazy_pinyin(word, Style.TONE)
    result = {
        "result": "true",
        "pinyin": pinyin
    }
    returnResult = jsonify(result)
    return returnResult

@app.route("/compareOne",methods=['GET', 'POST'])
def compareOne():
    pinyin = lazy_pinyin(request.form.get("wordToGet"), Style.TONE)
    result = {
        "result": "false",
        "pinyin":pinyin
    }
    # 用当前苹果的值去已有队列中查询，查询成功这说明说对了，返回true，并将队列中的word删除
    # print(request.form.get("judgeWord"))
    # print(request.url)

    if request.form.get("type") == "wordJudge":
        word = globalResultWords.getWord(request.form.get("wordToGet"))
        print(word)
        pinyin = lazy_pinyin(word, Style.TONE)
        # 说明查询成功
        if word != "none":
            result = {
                "result": "true",
                "pinyin":pinyin
            }
            # 删除一个存在队列中的结果
            globalResultWords.deleteWord(word)

    returnResult = jsonify(result)
    return returnResult


@app.route("/getVoice",methods=['GET', 'POST'])
def getVoice():
    result={
        "result": "false"
    }
    if request.form.get("type") == "word":
        txt_to_voice(request.form.get("wordToGet"))
        result = {
            "result": "true"
        }
    returnResult = jsonify(result)
    return returnResult

@app.route("/playVoice",methods=['GET', 'POST'])
def playVoice():
    result = {
        "result": "true",
        "mes":"正确"
    }
    try:
        playsound("mp3/result.mp3")
        # os.remove("mp3/result.mp3")
    except:
        result = {
            "result": "false",
            "mes":"先试着自己说说吧"
        }

    returnResult = jsonify(result)
    return returnResult

@app.route("/removeVideo")
def removeVideo():
    result = {
        "result": "true",
    }
    try:
        os.remove("mp3/result.mp3")
    except:
        result = {
            "result": "false",
        }
    returnResult = jsonify(result)
    return returnResult

@app.route("/nmd")
def printf():
    result={
        "images":1,
        "total":1,
        "tags":1,
        "tagsNum":1
    }
    print(1)
    return jsonify(result)

# 这里将result队列中的结果返回给js做对比
@app.route("/compare" , methods=['GET', 'POST'])
def compare():
    result = {
        "result": "false"
    }
    # 用当前苹果的值去已有队列中查询，查询成功这说明说对了，返回true，并将队列中的word删除
    # print(request.form.get("judgeWord"))
    # print(request.url)
    if request.form.get("type") == "wordJudge":
        index = request.form.get("index")
        word = globalResultWords.getWord(request.form.get("judgeWord"))
        print(word)
        # 说明查询成功
        if word != "none":
            result = {
                "result": "true",
                "index":index
            }
            # 删除一个存在队列中的结果
            globalResultWords.deleteWord(word)

    returnResult = jsonify(result)
    return returnResult




@app.route("/startListen", methods=['GET', 'POST'])
def startListen():
    start(request.form.get("isGame"))
    result = {
        "result": "true"
    }
    returnResult = jsonify(result)
    return returnResult

@app.route("/endListen")
def endListen():

    end()
    result = {
        "result": "true"
    }
    del_list = os.listdir("../python/wav/")
    for f in del_list:
        file_path = os.path.join("../python/wav/", f)
        os.remove(file_path)
    returnResult = jsonify(result)
    return returnResult

@app.route("/")
def main():
    return render_template("menu.html")

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1')

