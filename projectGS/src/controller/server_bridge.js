import axios from 'axios';

export var node_url = 'http://localhost:8000'; //노드 서버를 사용하게 될 경우 이 url을 axios url에 대입
export var py_url = 'http://localhost:5000'; //파이썬 서버를 사용하게 될 경우 이 url을 axios url에 대입

export const axios_instace = axios.create({
  //모듈화한 axios 객체.
  baseURL: py_url,
});

export function getDataAsPost(url, bodyData) {
  var data;
  //post로 서버통신
  axios
    .post(url, bodyData)
    .then((res) => {
      ({ data } = res);
      console.log(data);
    })
    .catch((e) => {
      console.error(e);
    });
  return data;
}

export async function get_DataAsPost(url, bodyData) {
  var data;
  //post로 서버통신
  await axios
    .post(url, bodyData)
    .then((res) => {
      ({ data } = res);
      console.log(data);
    })
    .catch((e) => {
      console.error(e);
    });
  return data;
}
