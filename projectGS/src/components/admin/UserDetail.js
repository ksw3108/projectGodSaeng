import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import styles from './css/UserDetail.module.scss';
import UserInfoContainer from './components/UserInfoContainer';
import PagedTable from './components/PagedTable';
import * as server_bridege from '../../controller/server_bridge';
const UserDetail = () => {
  const { state } = useLocation(); //state{user_idx:user_idx}
  const [user, setUser] = useState({});
  useEffect(() => {
    getUserData();
  }, []);
  const getUserData = async () => {
    const res = await server_bridege.axios_instace.post('/getuserinfo', {
      user_idx: state.user_idx,
    });
    console.log(res.data[0]);
    setUser(res.data[0]);
  };
  return (
    <div className={styles.udContainer}>
      <div className={styles.ud_item}>
        <UserInfoContainer data={user} />
      </div>
      <div className={styles.ud_item}>
        <div>개인 신고 내역</div>
        <PagedTable />
      </div>
      <div className={styles.ud_item}>
        <div>포인트 이력</div>
      </div>
    </div>
  );
};
export default UserDetail;
