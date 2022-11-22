import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as server_bridge from '../../controller/server_bridge';
let board_idx = 0;
const BoardView = () => {
  useEffect(() => {
    board_idx = location.state.board_idx;
    showBoardContents(board_idx);
  }, []);
  const location = useLocation();
  const navigate = useNavigate();
  const [board, setData] = useState(server_bridge.board_inner);
  const showBoardContents = async (board_idx) => {
    const res = await server_bridge.axios_instace.post('/board_view', {
      board_idx: board_idx,
    });
    let data = res.data[0];
    //console.log(data);
    data.BOARD_FILE = data.BOARD_FILE !== '' ? JSON.parse(data.BOARD_FILE) : '';
    setData(data);
  };
  const updateBoard = () => {
    navigate('/home/writenoti', { state: board });
  };
  const deleteBoard = async () => {
    var result = window.confirm('정말로 삭제하시겠습니까?');
    if (result) {
      const res = await server_bridge.axios_instace.post('/delete_board', {
        board_idx: board_idx,
      });

      if (res.data === 'success') {
        alert('삭제 완료!');
      } else {
        alert('삭제 실패!');
      }
      navigate('/home/boardmanage');
    }

    return;
  };
  return (
    <div>
      <div>
        제목 : {board.BOARD_TIT} <br />
        작성자 : {board.USER_NAME}
        <br />
        작성일 : {board.BOARD_DATE}
        <br />
        <button onClick={updateBoard}>수정하기</button>
        <br />
        <button onClick={deleteBoard}>삭제하기</button>
        <br />
      </div>
      <div>
        {board.BOARD_FILE !== '' ? (
          <a
            href={
              server_bridge.node_url + '/download_file/' + board.BOARD_FILE.dir
            }
          >
            {board.BOARD_FILE.filename}
          </a>
        ) : (
          ''
        )}
      </div>
      <div>{board.BOARD_TXT}</div>
    </div>
  );
};
export default BoardView;
