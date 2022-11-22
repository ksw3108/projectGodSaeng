import * as server_bridge from '../../controller/server_bridge';
import { useRef, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './noti.css';
const WriteNotify = () => {
  const mode_list = ['write', 'update'];
  const titleRef = useRef();
  const contentRef = useRef();
  const fileRef = useRef();
  const filelabelRef = useRef();
  const navigate = useNavigate(); //링크 네비게이터
  const { state } = useLocation();
  const [mode, setMode] = useState(mode_list[0]);
  const [isfileuploading, setFileUploadeMode] = useState(false);
  const [board, setData] = useState(server_bridge.board_inner);
  useEffect(() => {
    if (state !== null) {
      setMode(mode_list[1]);
      setData(state);
      console.log(state);
      changeFile(
        state.BOARD_FILE === ''
          ? '파일을 선택해주세요'
          : state.BOARD_FILE.filename,
      );
    }
  }, []);
  const writeNoti = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', titleRef.current.value);
    formData.append('content', contentRef.current.value);
    formData.append('user_idx', 1);
    formData.append(
      'notifile',
      fileRef.current.files[0] ? fileRef.current.files[0] : '',
    );

    if (mode === mode_list[0]) {
      //새 글쓰기 모드
      const res = await server_bridge.axios_instace.post(
        '/uploadnoti',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } },
      );
      if (res.data === 'success') {
        alert('입력성공!');
      } else {
        alert('입력실패!');
      }
    } else {
      //수정모드
      formData.append('board_idx', board.BOARD_IDX);
      if (filelabelRef.current.innerHTML !== '파일을 선택해주세요') {
        //첨부하고자 하는 파일이 있는 경우 => 파일 변경하지않고 업로드된 파일 유지 / 다른 파일 업로드
        if (board.BOARD_FILE === '') {
          //처음부터 파일이 없었던경우
          //다른 파일 업로드
          formData.append('filemode', 1);
        } else {
          //처음부터 파일이 업로드되어있던경우
          if (board.BOARD_FILE.filename === filelabelRef.current.innerHTML) {
            //다른 파일을 업로드 하지 않고 현상 유지
            formData.append('filemode', 0);
          } else {
            //파일이 업로드되어있던 상태에서 다른 파일을 업로드
            formData.append('filemode', 1);
          }
        }
      } else {
        //파일 삭제
        formData.append('filemode', 2);
      }

      const res = await server_bridge.axios_instace.post(
        '/updatenoti',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } },
      );
      if (res.data === 'success') {
        alert('수정성공!');
      } else {
        console.log(res.data);
        alert('수정실패!');
      }
    }

    navigate('/home/boardmanage');
  };
  const changeFile = (text) => {
    let ischanging = true;
    if (text === '파일을 선택해주세요') ischanging = false;
    setFileUploadeMode(ischanging);
    filelabelRef.current.innerHTML = text;
    console.log(board.BOARD_FILE.filename, filelabelRef.current.innerHTML);
  };

  return (
    <div>
      {mode === mode_list[0] ? '작성모드' : '수정모드'}
      <form onSubmit={writeNoti}>
        <div>
          제목{' '}
          <input
            type="text"
            name="title"
            ref={titleRef}
            defaultValue={board.BOARD_TIT}
          />
        </div>
        <input
          type="file"
          name="notifile"
          id="notifile"
          ref={fileRef}
          onChange={() => changeFile(fileRef.current.files[0].name)}
        />
        <label id="labelbutton" htmlFor="notifile">
          파일선택
        </label>
        <label ref={filelabelRef}>파일을 선택해주세요</label>
        {isfileuploading === true ? (
          <input
            type="button"
            onClick={(e) => {
              fileRef.current.value = null;
              changeFile('파일을 선택해주세요');
            }}
            value="삭제"
          />
        ) : (
          ''
        )}

        <div className="updownSpace" />
        <div>
          <textarea
            name="content"
            id=""
            cols="30"
            rows="10"
            ref={contentRef}
            defaultValue={board.BOARD_TXT}
          />
        </div>
        <button>업로드</button>
      </form>
    </div>
  );
};
export default WriteNotify;
