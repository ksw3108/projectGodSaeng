import * as server_bridge from '../../controller/server_bridge';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
const WriteNotify = () => {
  const titleRef = useRef();
  const contentRef = useRef();
  const fileRef = useRef();
  const navigate = useNavigate(); //링크 네비게이터
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
    navigate('/home/boardmanage');
  };
  return (
    <div>
      <form onSubmit={writeNoti}>
        <div>
          제목 <input type="text" name="title" ref={titleRef} />
        </div>
        <input type="file" name="notifile" ref={fileRef} />
        <div className="updownSpace" />
        <div>
          <textarea name="content" id="" cols="30" rows="10" ref={contentRef} />
        </div>
        <button>업로드</button>
      </form>
    </div>
  );
};
export default WriteNotify;
