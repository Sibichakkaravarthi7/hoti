import appAxios from '../appAxios';

const makeGetRequest = async (endpoint: string) => {
  const { data } = await appAxios.get(endpoint);
  return data;
};

export default makeGetRequest;
