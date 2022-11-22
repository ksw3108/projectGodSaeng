import pymysql
from werkzeug.utils import secure_filename
import time
import os

db = pymysql.connect(
    user='jsa_5', 
    passwd='godsang', 
    host='project-db-stu.ddns.net', 
    db='jsa_5', 
    charset='utf8',
    port=3307
)
cursor = db.cursor(pymysql.cursors.DictCursor)#데이터 추출시에 dict 형식으로 추출할수 있게 해줌

def select_data():
    sql = "SELECT * FROM USER"
    cursor.execute(sql)
    return cursor.fetchall()

def insert_data(data):#여기서 파라미터인 data는 튜플형태 (1, 2, 3) 따위의 형식을 취해야함.

    insert_tuple = (data["USER_ID"], data["USER_PW"], data["USER_NAME"], 
                    data["USER_TEL"], data["ADMIN_OX"], data["USER_OX"])
    sql = """
            INSERT INTO USER(`USER_ID`, `USER_PW`, `USER_NAME`, `USER_TEL`, `ADMIN_OX`, `USER_OX`)
            VALUES(%s, %s, %s, %s, %s, %s);
          """
    print(sql)
    try :
        cursor.execute(sql, insert_tuple)
        db.commit()
        return "success"
    except Exception as e :
        return "err : " + str(e)

# 221117 선우 여기서부터 관리자 기능
def get_noti4admin(where_clause):
    sql = """       SELECT A.NOTIFY_IDX, A.CAR_NUM, A.NOTIFY_DATE, A.NOTIFY_SPOT, A.NOTIFY_TXT, NOTIFY_RESULT,
                           B.USER_IDX, B.USER_NAME, B.USER_MAIL, B.USER_TEL, B.USER_OX,
                           C.NOTIFY_STATUS,
                           D.CATEGORY
                    FROM   NOTIFY AS A
                           INNER JOIN USER AS B ON A.USER_IDX = B.USER_IDX
                           INNER JOIN PROCESS AS C ON A.NOTIFY_PNUM = C.NOTIFY_PNUM
                           INNER JOIN CATEGORY AS D ON A.CATEGORY_IDX = D.CATEGORY_IDX;"""

    _where = """WHERE A.NOTIFY_DATE>= %s AND A.NOTIFY_DATE <= %s
                AND D.CATEGORY = %s
                AND C.NOTIFY_STATUS = %s;                
                """
    where_tuple = ( where_clause["start_date"], 
                    where_clause["end_date"], 
                    where_clause["category"], 
                    where_clause["process"])
    try :
        cursor.execute(sql)
        return cursor.fetchall()
    except Exception as e :
        return "err : " + str(e)

def get_noti4admin(where_clause):
    sql = """UPDATE NOFITY SET 
                CATEGORY_IDX = %s, 
                NOTIFY_PNUM = %s, 
                NOTIFY_RESULT = %s
            WHERE NOTIFY_IDX = %s;"""

    where_tuple = ( where_clause["start_date"], 
                    where_clause["end_date"], 
                    where_clause["category"], 
                    where_clause["process"])
    try :
        cursor.execute(sql)
        db.commit()
        return "success"
    except Exception as e :
        return "err : " + str(e)


def insert_board(request):
    form_data = request.form.to_dict()
    
    #file =request.files["notifile"]

    timestamp =int(time.time())
    path = "uploads/" + str(timestamp)
    _dir = '{"filename":"'+request.files["notifile"].filename+'","dir":"'+path+"/"+request.files["notifile"].filename+'"}' if request.files else ""

    if _dir != "" :
        file =request.files["notifile"]
        filename = secure_filename(file.filename)
        os.makedirs(path, exist_ok=True)
        file.save(os.path.join(path, filename))
   

    sql = """INSERT INTO BOARD(BOARD_TIT, BOARD_TXT, USER_IDX, BOARD_FILE)
                    VALUES(%s, %s, %s, %s );"""

    insert_tuple = ( form_data["title"], 
                    form_data["content"], 
                    form_data["user_idx"], 
                    _dir)
    try :
        cursor.execute(sql, insert_tuple)
        db.commit()
        return "success"
    except Exception as e :
        return "err : " + str(e)

#공지사항 관리의 게시판 리스트
def get_board_list(where_clause):
    sql = """SELECT 
              A.BOARD_IDX AS BOARD_IDX,
              date_format(A.BOARD_DATE, '%Y-%m-%d') AS BOARD_DATE,
              A.BOARD_TIT AS BOARD_TIT,
              B.USER_NAME AS USER_NAME
    FROM BOARD AS A
                   INNER JOIN USER AS B ON A.USER_IDX = B.USER_IDX """
    sql += where_clause + " ORDER BY BOARD_IDX DESC;"
    print(sql)
    try :
        cursor.execute(sql)
        return cursor.fetchall()
    except Exception as e :
        return "err : " + str(e)

def select_board(board_idx):#게시판(공지사항)내용 상세보기(관리자)
    sql = """SELECT 
              A.BOARD_IDX AS BOARD_IDX,
              date_format(A.BOARD_DATE, '%Y-%m-%d %H:%i:%S') AS BOARD_DATE,
              A.BOARD_TIT AS BOARD_TIT,
              B.USER_NAME AS USER_NAME,
              A.USER_IDX AS USER_IDX,
              A.BOARD_TXT AS BOARD_TXT,
              A.BOARD_FILE AS BOARD_FILE
    FROM BOARD AS A
                   INNER JOIN USER AS B ON A.USER_IDX = B.USER_IDX """
    sql += " WHERE A.BOARD_IDX = %s;" % (board_idx)
    print(sql)
    try :
        cursor.execute(sql)
        return cursor.fetchall()
    except Exception as e :
        return "err : " + str(e)

def update_board(request):#공지사항(게시판) 수정
    form_data = request.form.to_dict()
    
    #file =request.files["notifile"]
    
    timestamp =int(time.time())
    path = "uploads/" + str(timestamp)
    _dir = '{"filename":"'+request.files["notifile"].filename+'","dir":"'+path+"/"+request.files["notifile"].filename+'"}' if request.files else ""

    if _dir != "" :
        file =request.files["notifile"]
        filename = secure_filename(file.filename)
        os.makedirs(path, exist_ok=True)
        file.save(os.path.join(path, filename))
   
    board_idx = form_data["board_idx"]
    filemode = form_data["filemode"]
    file_txt = ""
    
    input_arr = [ form_data["title"], form_data["content"], form_data["user_idx"]]
    
    if int(filemode) == 1 :
        file_txt = ", BOARD_FILE = %s"
        input_arr.append(_dir)
        input_arr.append(board_idx)
    elif int(filemode) == 2 :
        file_txt = ", BOARD_FILE = %s"
        input_arr.append("")
        input_arr.append(board_idx)
    else :
        input_arr.append(board_idx)
    
    
    sql = "UPDATE BOARD SET BOARD_TIT=%s, BOARD_TXT=%s, USER_IDX=%s" + file_txt + " WHERE BOARD_IDX=%s;"

    insert_tuple = tuple(input_arr)
    try :
        cursor.execute(sql, insert_tuple)
        db.commit()
        return "success"
    except Exception as e :
        return "err : " + str(e)

def delete_board(data):#공지사항(게시판) 삭제
    
    #file =request.files["notifile"]
    
    sql = "DELETE FROM BOARD WHERE BOARD_IDX=%d;" % (int(data["board_idx"]))
    print(sql)

    try :
        cursor.execute(sql)
        db.commit()
        return "success"
    except Exception as e :
        return "err : " + str(e)