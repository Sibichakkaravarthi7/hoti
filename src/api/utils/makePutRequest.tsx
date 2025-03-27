import appAxios from '../../api/appAxios';

const makePutRequest = async (endpoint: string, body: any) => {
  const { data } = await appAxios.put(endpoint, body);
  return data;
};

export default makePutRequest;
