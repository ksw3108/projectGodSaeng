import os
import json
from flask import Flask, jsonify, request 
from flask_cors import CORS # 라이브러리 설치 필요 - pip install flask_cors
import dbconnecter

app = Flask(__name__)
CORS(app)

@app.route("/pythonserver", methods=["GET","POST"]) ## 이렇게 하면 Get 방식 post 방식 둘다 받을 수 있음.
def func() :
    sendData = {"connection":"none"}
    if request.method == "GET" :#get 방식으로 전달받았을 때 실행
        body_data = request.args.to_dict()#클라이언트에서 전달받은 데이터를 json 형식으로 파싱
        sendData = {"connection":"success", "method":"get", "data":body_data["testdata"]}
        
    elif request.method == "POST" :#post 방식으로 전달받았을 때 실행    
        body_data = json.loads(request.get_data(), encoding="utf-8")#클라이언트에서 전달받은 데이터를 json 형식으로 파싱
        sendData = {"connection":"success", "method":"post", "data":body_data["testdata"]}
        
    return jsonify(sendData)#클라이언트에 json 형식으로 데이터를 전달

@app.route("/pydbinsert", methods=["GET", "POST"])
def ctrl_data() :
    if request.method == "GET" :#get 방식으로 전달받았을 때 실행
        body_data = request.args.to_dict()#클라이언트에서 전달받은 데이터를 json 형식으로 파싱
        
    elif request.method == "POST" :#post 방식으로 전달받았을 때 실행    
        body_data = json.loads(request.get_data(), encoding="utf-8")#클라이언트에서 전달받은 데이터를 json 형식으로 파싱
    return dbconnecter.insert_data(body_data)

@app.route("/pydbselect", methods=["GET","POST"]) ## 이렇게 하면 Get 방식 post 방식 둘다 받을 수 있음.
def sel_data() :
    sendData = dbconnecter.select_data()
        
    return jsonify(sendData)#클라이언트에 json 형식으로 데이터를 전달

if __name__ == "__main__":
    app.run(debug=True)