import { Alert, AlertIcon, Box, Button, Flex, HStack, Image, Spinner, useDisclosure, VStack } from '@chakra-ui/react'
import React from 'react'
import { appColors } from '../../theme/foundations/appColor'
import { LinkIcon, SaveIcon } from '../../utils/customIcons'
import AppButton from '../chakraOverrides/AppButton'
import AppText from '../chakraOverrides/AppText'
import WelcomePic from '../../assets/welcome-page-group-pic.png'
import AppFlex from '../chakraOverrides/AppFlex'
import AppInput from '../chakraOverrides/AppInput'
import AppImage from '../chakraOverrides/AppImage'
import twitterLogo from '../../assets/logos/twitter-logo.svg';
import instagramLogo from '../../assets/logos/instagram-logo.svg';
import facebookLogo from '../../assets/logos/facebook-logo.svg';
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import makePutRequest from '../../api/utils/makePutRequest'
import { UPDATE_PROFILE_DATA } from '../../api/url/common'

const EditSocialMediaLinksModal = ({ profileData, onClose, refetch }: { profileData: any, onClose: any, refetch: any }) => {
  const [isSuccess, setIsSuccess] = React.useState(true);
  const {
    isOpen,
    onClose: onAlertClose,
    onOpen
  } = useDisclosure();
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit
  } = useForm({
    defaultValues: profileData
  });
  const {
    isLoading: submitIsLoading,
    error: submitError,
    mutate: updateSocialMedia
  } = useMutation((body) => makePutRequest(UPDATE_PROFILE_DATA, body), {
    onSuccess: () => {
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1300);
      refetch();
      onOpen();
    },
    onError: () => {
      setIsSuccess(false);
      setTimeout(() => {
        onAlertClose();
      }, 1700);
      onOpen();
    }
  });
  const submitUpdateSocialMedia = (data: any) => {
    //@ts-ignore
    updateSocialMedia({
      instagram: watch('instagram'),
      twitter: watch('twitter'),
      facebook: watch('facebook')
    })
    console.log("watch('instagram')", {
      instagram: watch('instagram'),
      twitter: watch('twitter'),
      facebook: watch('facebook')
    })
  };

  const onSubmit = (data: any, e: any) => submitUpdateSocialMedia(data);
  const onError = (errors: any, e: any) => console.log(errors, e);
  return (
    <Box py="10px">
      <form style={{ width: '100%', display: 'flex', gap: '2.4em', flexFlow: "column" }} onSubmit={handleSubmit(onSubmit, onError)}>
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

        <AppFlex customStyles={{ gap: '1.5em' }}>
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
            {...register('twitter')}
            placeholder="Twitter profile link"
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
          <AppImage src={youtubeLogo} alt={''} />
        </HStack>
        <AppInput
          type={'text'}
          customStyles={{ height: '50px' }}
          {...register('youtube-profile')}
          placeholder="Youtube profile link"
        />
      </AppFlex> */}

        <Flex gridColumn={'1/3'} justifyContent={'end'}>
          <Button isDisabled={submitIsLoading} type={'submit'} leftIcon={<SaveIcon />}>
            {submitIsLoading ? <Spinner color='white' /> : "Save"}
          </Button>
        </Flex>

      </form>
      {isOpen && (
        <Box
          className="custom-toast"
          bg={isSuccess ? '#C6F6D5' : '#FED7D7'}
          borderRadius={'12px'}
          boxShadow={'0px 0px 6px -1px black'}
          title={''}>
          <Box color={ isSuccess ? 'green' : 'red'} p="20px" fontWeight={700} fontSize="20px">
            <Alert status={isSuccess ? "success" : "error"} variant="subtle">
              <AlertIcon height={'20px'} width={'20px'} />
              {isSuccess ? "Updated Successfully!" : "An Error Occured!"}
            </Alert>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default EditSocialMediaLinksModal;