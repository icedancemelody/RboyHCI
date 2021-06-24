import requests
import json
import base64
import os
import logging
import speech_recognition as sr


class IsEnd:
    def __init__(self):
        self.isEnd = False

setIsEnd = IsEnd()

def get_token():


    logging.info('开始获取token...')
    #获取token
    baidu_server = "https://openapi.baidu.com/oauth/2.0/token?"
    grant_type = "client_credentials"
    client_id = "fqi1EgYSAevLLwBNdSKr1W9O"
    client_secret = "qMbpmHuHnYf76SuoWIVMEv9FRxavegUU"
    #拼url
    url = f"{baidu_server}grant_type={grant_type}&client_id={client_id}&client_secret={client_secret}"
    res = requests.post(url)
    token = json.loads(res.text)["access_token"]
    return token


def audio_baidu(filename):
    logging.info('开始识别语音文件...')
    with open(filename, "rb") as f:
        speech = base64.b64encode(f.read()).decode('utf-8')
    size = os.path.getsize(filename)
    token = get_token()
    headers = {'Content-Type': 'application/json'}

    url = "https://vop.baidu.com/server_api"
    print(token)
    data = {
        "format": "wav",
        "rate": "16000",
        "dev_pid": "1537",
        "speech": speech,
        "cuid": "c54a2db7e6344607bfa35d4c025691e9",
        "len": size,
        "channel": 1,
        "token": token,
    }

    req = requests.post(url, json.dumps(data), headers)
    result = json.loads(req.text)

    if result["err_msg"] == "success.":
        print(result['result'])
        return result['result']
    else:
        print("内容获取失败，退出语音识别")
        print(result)
        return -1


def translate(file_name):
    print("start thearding "+file_name)
    os.system("python ../python/realtime_asr.py " + file_name)
    # print("python realtime_asr.py " + file_name)
    # os.system("python realtime_asr.py " + file_name)
    print(file_name+" end ")

def start(isGame):

    logging.basicConfig(level=logging.INFO)
    import threading
    wav_num = 0

    if setIsEnd.isEnd:
        setIsEnd.isEnd = False

    with open("../python/result.txt", 'w') as f:
        f.truncate()
    while True and not setIsEnd.isEnd:
        r = sr.Recognizer()
        # 启用麦克风
        mic = sr.Microphone()
        logging.info('录音中...')
        with mic as source:
            # 降噪
            r.adjust_for_ambient_noise(source)
            if isGame:
                audio = r.listen(source, phrase_time_limit = 4)
            else:
                audio = r.listen(source)
                setIsEnd.isEnd = True



        file_name = f"{wav_num}.wav"
        with open("../python/wav/"+file_name, "wb") as f:
            # 将麦克风录到的声音保存为wav文件
            f.write(audio.get_wav_data(convert_rate=16000))
        logging.info('录音结束，识别中...')
        # 这个地方需要注意，可能需要不堵住的方式
        threading.Thread(target=translate, args=["../python/wav/"+file_name]).start()
        wav_num += 1
    print("endListenning")


def end():
    setIsEnd.isEnd = True


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    import threading
    wav_num = 0
    with open("result.txt",'w') as f:
        f.truncate()
    while True:
        r = sr.Recognizer()
        #启用麦克风
        mic = sr.Microphone()
        logging.info('录音中...')
        with mic as source:
            #降噪
            r.adjust_for_ambient_noise(source)
            audio = r.listen(source, phrase_time_limit = 4)

        file_name=f"{wav_num}.wav"
        with open("wav/"+file_name, "wb") as f:
            #将麦克风录到的声音保存为wav文件
            f.write(audio.get_wav_data(convert_rate=16000))
        logging.info('录音结束，识别中...')
        #这个地方需要注意，可能需要不堵住的方式
        threading.Thread(target=translate,args=["wav/" + file_name]).start()
        wav_num+=1
