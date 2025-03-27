import appAxios from '../../api/appAxios';

const makePostRequest = async (endpoint: string, body: any) => {
  const { data } = await appAxios.post(endpoint, body);
  return data;
};

export default makePostRequest;
