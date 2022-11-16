import pymysql

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
                    data["USER_TEL"], data["ADMIN_OX"])
    sql = """
            INSERT INTO USER(`USER_ID`, `USER_PW`, `USER_NAME`, `USER_TEL`, `ADMIN_OX`)
            VALUES(%s, %s, %s, %s, %s);
          """
    try :
        cursor.execute(sql, insert_tuple)
        db.commit()
        return "success!"
    except Exception as e :
        return "err : " + e