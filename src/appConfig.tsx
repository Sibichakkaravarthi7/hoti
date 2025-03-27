const getHostAPIUrl = () => {
    if (import.meta.env.VITE_APP_NODE_ENV === 'production')
      return 'https://';
    return 'https://staging-api.hoti.io';
  };
  export { getHostAPIUrl };