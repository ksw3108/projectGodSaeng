import os
import json
from flask import Flask, jsonify, request, send_file
from flask_cors import CORS # 라이브러리 설치 필요 - pip install flask_cors
import dbconnecter
from werkzeug.utils import secure_filename
import time

app = Flask(__name__)
CORS(app)

def get_body_data (request):
    if request.method == "GET" :#get 방식으로 전달받았을 때 실행
        body_data = request.args.to_dict()#클라이언트에서 전달받은 데이터를 json 형식으로 파싱
        
    elif request.method == "POST" :#post 방식으로 전달받았을 때 실행    
        body_data = json.loads(request.get_data(), encoding="utf-8")#클라이언트에서 전달받은 데이터를 json 형식으로 파싱
    return body_data

@app.route("/pythonserver", methods=["GET","POST"]) ## 이렇게 하면 Get 방식 post 방식 둘다 받을 수 있음.
def func() :
    body_data = get_body_data(request)    
    sendData = {"connection":"success", "method":request.method, "data":body_data["testdata"]}        
        
    return jsonify(sendData)#클라이언트에 json 형식으로 데이터를 전달

@app.route("/pydbinsert", methods=["GET", "POST"])
def ctrl_data() :
    body_data = get_body_data(request)
    return dbconnecter.insert_data(body_data)

@app.route("/pydbselect", methods=["GET","POST"]) ## 이렇게 하면 Get 방식 post 방식 둘다 받을 수 있음.
def sel_data() :
    sendData = dbconnecter.select_data()
        
    return jsonify(sendData)#클라이언트에 json 형식으로 데이터를 전달

@app.route("/notilist4admin", methods=["GET","POST"]) ## 이렇게 하면 Get 방식 post 방식 둘다 받을 수 있음.
def send_noti_list() :#신고리스트
    body_data = get_body_data(request)
    sendData = dbconnecter.get_noti4admin(body_data)
    return jsonify(sendData)

@app.route("/updatenoti4admin", methods=["GET", "POST"])
def updatenoti4admin() :#신고글 수정
    body_data = get_body_data(request)
    return dbconnecter.get_noti4admin(body_data)

@app.route("/uploadnoti", methods=["GET", "POST"])
def upload_board() :#게시판(공지사항) 업로드    
    return dbconnecter.insert_board(request)

@app.route("/updatenoti", methods=["GET", "POST"])
def update_board() :#게시판(공지사항) 수정    
    print("tetesfasdfsd")
    return dbconnecter.update_board(request)

@app.route("/board_list", methods=["GET", "POST"])
def send_list() :#게시판(공지사항) 리스트
   body_data = get_body_data(request)   
   where_clause = body_data["where_clause"] if body_data["is_searching"] == 1 else ""
   return dbconnecter.get_board_list(where_clause)

@app.route("/board_view", methods=["GET", "POST"])
def send_notiivew() :#게시판(공지사항) 상세보기  
   body_data = get_body_data(request)   
   board_idx = body_data["board_idx"]
   return dbconnecter.select_board(board_idx)

@app.route("/delete_board", methods=["GET", "POST"])
def delete_board() :#게시판(공지사항) 상세보기  
   body_data = get_body_data(request)   
   return dbconnecter.delete_board(body_data)

@app.route("/download_file/<path:subpath>", methods=["GET", "POST"])
def download_file(subpath) :#등록한 파일 다운로드하기
    return send_file(subpath, as_attachment=True)
if __name__ == "__main__":
    app.run(debug=True)