import React from 'react';
import { Box, Checkbox, Flex, HStack, Stack } from '@chakra-ui/react';
import { useForm, useFormContext } from 'react-hook-form';
import AppImage from '../chakraOverrides/AppImage';
import twitterLogo from '../../assets/logos/twitter-logo.svg';
import instagramLogo from '../../assets/logos/instagram-logo.svg';
import facebookLogo from '../../assets/logos/facebook-logo.svg';
import GoogleLogo from '../../assets/logos/google-logo.svg';
import youtubeLogo from '../../assets/logos/youtube-logo.svg';
import AppText from '../chakraOverrides/AppText';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { useQuery } from '@tanstack/react-query';
import Tick from '../../assets/tick.png';
import axios from 'axios';
// import { useGoogleLogin } from '@react-oauth/google';


function SocialMediaPage() {
  const [selectedSocialMedia, setSelectedMedia] = React.useState("");
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const { register, handleSubmit, watch, setValue } = useFormContext();
  console.log("watch", watch('facebook-profile'));

  const handleAccessToken = (token: any) => {
    if (token.accessToken) {
      setValue("fb_access_token", token);
      // setSelectedMedia("");
    }

  };

  React.useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(watch()));
  }, []);


  // const googleLogin = useGoogleLogin({
  //   onSuccess: async (tokenResponse: any) => {
  //     console.log(tokenResponse);
  //     const userInfo = await axios.get(
  //       'https://www.googleapis.com/oauth2/v3/userinfo',
  //       { headers: { Authorization: `Bearer ${tokenResponse.access_token}>` } },
  //     );

  //     console.log(userInfo);
  //   },
  //   onError: (errorResponse: any) => console.log(errorResponse),
  // });

  return (
    <Box pt="4em" pb={"30px"}>
      <AppText size='textmedium1' customStyles={{ mt: "-20px", mb: "5px" }}>Our verification requires you to connect your social media accounts.</AppText>
      <AppText size='textmedium1' customStyles={{ mb: "20px" }}>Verification can take up to a few days.</AppText>
      <div>
        <HStack gap={"50px"} mb="60px" mt="30px" >
          {!watch('fb_access_token') ? <>
            <FacebookLogin
              appId={import.meta.env.VITE_FACEBOOK_APP_ID}
              fields="id,name,posts.limit(100),likes"
              scope="user_posts,user_likes"
              callback={(token: string) => handleAccessToken(token)}
              render={(renderProps: any) => (
                <HStack
                  onClick={renderProps.onClick}
                  justifyContent="center"
                  width={["58px", "98px"]}
                  height={["58px", "98px"]}
                  backgroundColor={selectedSocialMedia == "facebook" ? "#EB752F" : "#EDEEEF"}
                  borderRadius={"50px"}
                  role="button"

                >
                  <AppImage customStyles={{ height: "51px", width: "51px" }} src={facebookLogo} alt={''} />
                </HStack>
              )} />

            <Box onClick={() => window.open(`https://api.instagram.com/oauth/authorize?client_id=${import.meta.env.VITE_INSTAGRAM_APP_ID}&redirect_uri=https://hoti-staging.netlify.app/signup/auth/&scope=user_profile,user_media&response_type=code`)}>
              <HStack
                justifyContent="center"
                width={["58px", "98px"]}
                height={["58px", "98px"]}
                backgroundColor={selectedSocialMedia == "facebook" ? "#EB752F" : "#EDEEEF"}
                borderRadius={"50px"}
                role="button"
              >
                <AppImage customStyles={{ height: "51px", width: "51px" }} src={instagramLogo} alt={''} />
              </HStack>
            </Box>
            <Box onClick={() => undefined}>
              <HStack
                justifyContent="center"
                width={["58px", "98px"]}
                height={["58px", "98px"]}
                backgroundColor={selectedSocialMedia == "facebook" ? "#EB752F" : "#EDEEEF"}
                borderRadius={"50px"}
                role="button"
              >
                <AppImage customStyles={{ height: "51px", width: "51px" }} src={GoogleLogo} alt={''} />
              </HStack>
            </Box></> : <Flex><AppText color='#EB752F' fontWeight={600} size='textmedium1' fontSize='22px' customStyles={{ mr: "10px" }}>Profile Verified</AppText><img src={Tick} /></Flex>
          }



          {/* <HStack
            justifyContent="center"
            width={["58px", "98px"]}
            height={["58px", "98px"]}
            backgroundColor="#EDEEEF"
            borderRadius={"50px"}
            role="button"
          >
            <AppImage customStyles={{ height: "51px", width: "51px" }} src={twitterLogo} alt={''} />
          </HStack> */}
          {/* <AppInput
              type={'text'}
              customStyles={{ height: '50px' }}
              {...register('facebook-profile')}
              placeholder="Facebook profile link"
            /> */}

          {/* <HStack
            justifyContent="center"
            width="5vw"
            maxWidth="60px"
            height="50px"
            backgroundColor="#EDEEEF"
          >
            <AppImage src={instagramLogo} alt={''} />
          </HStack>
          <AppInput
              type={'text'}
              customStyles={{ height: '50px' }}
              {...register('instagram-profile')}
              placeholder="Instagram profile link"
            />

          <HStack
            justifyContent="center"
            width="5vw"
            maxWidth="60px"
            height="50px"
            backgroundColor="#EDEEEF"
          >
            <AppImage src={twitterLogo} alt={''} />
          </HStack>
          <AppInput
              type={'text'}
              customStyles={{ height: '50px' }}
              {...register('twitter-profile')}
              placeholder="Twitter profile link"
            />*/}
        </HStack>

        <Checkbox variant={"blackOulined_17"} size="lg" {...register('tc')}>
          <AppText customStyles={{ fontSize: "base", ml: "10px" }}>
            I have read and I agree to HOTI’s
            <AppText fontWeight="semibold" fontSize="base" customStyles={{ display: 'inline-block', px: "3" }}>
              Privacy Policy
            </AppText>
            and
            <AppText fontWeight="semibold" fontSize="base" customStyles={{ display: 'inline-block', pl: "3" }}>
              T&C
            </AppText>
          </AppText>
        </Checkbox>

      </div>
    </Box>
  );
}

export default SocialMediaPage;
