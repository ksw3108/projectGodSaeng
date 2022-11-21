import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as server_bridge from '../../controller/server_bridge';

const BoardView = () => {
  useEffect(() => {
    const board_idx = location.state.board_idx;
    showBoardContents(board_idx);
  }, []);
  const location = useLocation();
  const [board, setData] = useState({
    BOARD_IDX: '',
    BOARD_DATE: '',
    BOARD_TIT: '',
    USER_NAME: '',
    USER_IDX: '',
    BOARD_TXT: '',
    BOARD_FILE: '',
  });
  const showBoardContents = async (board_idx) => {
    const res = await server_bridge.axios_instace.post('/board_view', {
      board_idx: board_idx,
    });
    let data = res.data[0];
    console.log(data);
    data.BOARD_FILE = data.BOARD_FILE !== '' ? JSON.parse(data.BOARD_FILE) : '';
    setData(data);
  };
  return (
    <div>
      <div>
        제목 : {board.BOARD_TIT} <br />
        작성자 : {board.USER_NAME}
        <br />
        작성일 : {board.BOARD_DATE}
        <br />
        <button>수정하기</button>
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
