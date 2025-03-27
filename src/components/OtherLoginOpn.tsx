import React from 'react';
import AppFlex from './chakraOverrides/AppFlex';
import GoogleLogo from '../assets/logos/google-logo.svg';
import AppleLogo from '../assets/logos/apple-logo.svg';
import FaceBookLogo from '../assets/logos/facebook-logo.svg';
import AppImage from './chakraOverrides/AppImage';
import { Box } from '@chakra-ui/layout';
import axios from 'axios';
// import { useGoogleLogin } from '@react-oauth/google';
import { useMutation } from '@tanstack/react-query';
import makePostRequest from '../api/utils/makePostRequest';

const OtherLoginOpn = ({ handleOtherSignInIsLoading }: { handleOtherSignInIsLoading: any }) => {

  const { data, isLoading, isError, error, mutate } = useMutation((body) =>
    makePostRequest("LOGIN_API", body), {
    // onError: (err: any) => {
    //     setErr(err?.response?.data?.non_field_errors[0])
    // },
    // onSuccess: ()=> {

    // }
  }
  );

  const sendDataToBE = (userInfo: any) => {
    mutate();
    handleOtherSignInIsLoading(isLoading);

  };

  // const googleLogin = useGoogleLogin({
  //   onSuccess: async (tokenResponse: any) => {
  //     console.log(tokenResponse);
  //     const userInfo = await axios.get(
  //       'https://www.googleapis.com/oauth2/v3/userinfo',
  //       { headers: { Authorization: `Bearer ${tokenResponse.access_token}>` } },
  //     );
  //     sendDataToBE(userInfo)

  //     console.log(userInfo);
  //   },
  //   onError: (errorResponse: any) => console.log(errorResponse),
  // });

  return (
    <AppFlex
      gap={'60px'}
      alignItems="end"
      justifyContent={'center'}
      customStyles={{ marginTop: '36px' }}>
      {[GoogleLogo].map((logo, ind) => (
        <Box role={"button"} key={`logo${ind}`}>
          <AppImage src={logo} fallbackSrc={''} customStyles={{ width: '40px' }} />
        </Box>
      ))}
    </AppFlex>
  );
};

export default OtherLoginOpn;
