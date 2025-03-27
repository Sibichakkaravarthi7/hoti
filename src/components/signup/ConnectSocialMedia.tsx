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
import AppFlex from '../chakraOverrides/AppFlex';
import AppInput from '../chakraOverrides/AppInput';


function ConnectSocialMedia() {
  const [selectedSocialMedia, setSelectedMedia] = React.useState("");
  const { register, handleSubmit, watch, setValue } = useFormContext();

  // console.log("watch", watch('facebook-profile'));

  return (
    <Box py="20px">
      <form style={{ width: '100%', display: 'grid', gap: '2.4em' }}>
        <AppFlex customStyles={{ gap: '1.5em' }}>
          <HStack
            justifyContent="center"
            width="5vw"
            maxWidth="60px"
            height="50px"
            backgroundColor="#EDEEEF"
          >
            <AppImage src={facebookLogo} alt={''} />
          </HStack>
          <AppInput
            type={'text'}
            customStyles={{ height: '50px' }}
            {...register('facebook')}
            placeholder="Facebook profile link"
          />
        </AppFlex>

        <AppFlex customStyles={{ gap: '1.5em' }}>
          <HStack
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
            {...register('instagram')}
            placeholder="Instagram profile link"
          />
        </AppFlex>

        {/* <AppFlex customStyles={{ gap: '1.5em' }}>
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
        />
      </AppFlex> */}

      </form>

      <Checkbox mt={"30px"} ml="10px" variant={"blackOulined_17"} size="lg" {...register('tc')}>
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
    </Box>
  );
}

export default ConnectSocialMedia;
