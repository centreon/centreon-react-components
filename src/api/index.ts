import axios from 'axios';

const getData = <TData>(cancelToken) => (endpoint): Promise<TData> =>
  axios.get(endpoint, { cancelToken }).then(({ data }) => data);

const postData = <TData>(cancelToken) => ({
  endpoint,
  datas,
}): Promise<TData> =>
  axios
    .post(endpoint, datas, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      cancelToken,
    })
    .then(({ data }) => data);

const putData = <TData>(cancelToken) => ({ endpoint, datas }): Promise<TData> =>
  axios
    .put(endpoint, datas, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      cancelToken,
    })
    .then(({ data }) => data);

const deleteData = <TData>(cancelToken) => (endpoint): Promise<TData> =>
  axios
    .delete(endpoint, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      cancelToken,
    })
    .then(({ data }) => data);

export { getData, postData, putData, deleteData };
