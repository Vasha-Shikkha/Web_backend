# from dust i have come, dust i will be

import requests

url = "http://ec2-18-140-84-3.ap-southeast-1.compute.amazonaws.com:5000/dictionary/insert"


def convert_to_obj(word):
    chunks = word.split('|')

    return {'word': chunks[1], 'meaning': chunks[2][:-1]}


data = open("words.txt", encoding='UTF8')
words = list(map(convert_to_obj, data.readlines()))

send_json = {}
for word in words:
    if word["word"] in send_json:
        send_json[word["word"]]["meaning"].append(word["meaning"])
    else:
        send_json[word["word"]] = {
            "word": word["word"],
            "meaning": [word["meaning"]],
        }

cnt = 0
for key in send_json:
    # send to url
    x = requests.post(url, json=send_json[key])

    if x.status_code == 200:
        cnt += 1
        print(x.text, "done inserting:", cnt)
    else:
        print("failed:", send_json[key], x.status_code)
