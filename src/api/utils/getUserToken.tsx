import useAppStore from '../../store';

const getUserToken = () => {
   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
  const zustandToken = useAppStore.getState().user_token;
  if (zustandToken) {
    return zustandToken;
  }
  const localStorageUserToken = localStorage.getItem('token');
  if (localStorageUserToken === 'undefined') {
    return null;
  }
  return localStorageUserToken;
};

export default getUserToken;
