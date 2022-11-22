import { Outlet, Link, useNavigate } from 'react-router-dom';
import * as server_bridge from '../../controller/server_bridge';

const Header = () => {
  return (
    <div>
      여기가 헤더
      <br />
      현재 서버는
      {server_bridge.getThisUrl() === server_bridge.py_url
        ? 'Flask'
        : 'Node.js'}
      입니다!
      <br />
    </div>
  );
};
export default Header;
