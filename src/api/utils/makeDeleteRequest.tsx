import appAxios from '../appAxios';

const makeDeleteRequest = async (endpoint: string) => {
  const { data } = await appAxios.delete(endpoint);
  return data;
};

export default makeDeleteRequest;
