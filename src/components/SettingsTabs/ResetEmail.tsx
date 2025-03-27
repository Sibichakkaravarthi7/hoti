//@ts-nocheck

import { Box, Flex, Text } from '@chakra-ui/layout'
import { Alert, AlertIcon, Button, Spinner, useDisclosure } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query';
import React from 'react'
import { useForm } from 'react-hook-form';
import { BiHide, BiShow } from 'react-icons/bi';
import { FORGOT_PASSWORD_SEND_OTP, POST_OTP_AND_EMAIL, POST_OTP_AND_PASSWORD } from '../../api/url/common';
import makePostRequest from '../../api/utils/makePostRequest';
import { appColors } from '../../theme/foundations/appColor';
import usePasswordVisibility from '../../utils/hooks/usePasswordVisibility';
import AppBox from '../chakraOverrides/AppBox';
import AppFormFieldWrapper from '../chakraOverrides/AppFormFieldWrapper';
import AppInput from '../chakraOverrides/AppInput';

const ResetEmail = ({ userData }: { userData: any }) => {
  const { register, handleSubmit, watch, trigger, formState: { errors }, reset } = useForm();
  const [err, setErr] = React.useState("");
  const [isOTPSentOnce, setIsOTPSentOnce] = React.useState(false);
  const [isSendOTPDisabled, setIsOTPDisabled] = React.useState(false);
  const [OTPCount, setOTPCount] = React.useState(30);

  const { mutate: sendOtpToMail, isLoading: sendOtpToMailIsLoading, error: sendOtpToMailError } = useMutation((body) => makePostRequest(FORGOT_PASSWORD_SEND_OTP, body), {
    onSuccess: () => {
      setIsOTPSentOnce(true);
      initiateCount();
      reset();
    },
  });
  const { mutate: setNewEmail, isLoading: setNewEmailIsLoading, error: setNewEmailError } = useMutation((body) => makePostRequest(POST_OTP_AND_EMAIL, body), {
    onSuccess: () => {
      onSuccessOnOpen();
      setIsOTPSentOnce(false);
      setOTPCount(30);
      setIsOTPDisabled(false);
      setTimeout(() => {
        location.reload();
      }, 2000)
    },
  });

  const timerRef = React.useRef<NodeJS.Timer | undefined>(undefined);

  const initiateCount = () => {
    setIsOTPDisabled(true);
    setOTPCount(30);
    timerRef.current = setInterval(() => {
      setOTPCount(prev => prev - 1);
    }, 1000);
  };

  React.useEffect(() => {
    if (OTPCount === 0) {
      clearInterval(timerRef.current!);
      setIsOTPDisabled(false);
    }
  }, [OTPCount]);

  React.useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const handleSendOTP = () => {
    console.log("userData", userData);
    if (userData?.data?.email) {
      //@ts-ignore
      sendOtpToMail({
        "email": userData?.data?.email
      })
    }
  }

  const handleResetEmail = async () => {
    await trigger('otp');
    await trigger('new_email');
    console.log("trigger('new_email')", await trigger('new_email'))
    if (await trigger('otp') && await trigger('new_email')) {
      //@ts-ignore
      setNewEmail({
        "email": userData?.data?.email,
        "otp": watch('otp'),
        "new_email": watch('new_email'),
      })
    }

  }

  const handleCancel = () => {
    setIsOTPSentOnce(false);
    setOTPCount(30);
    setIsOTPDisabled(false);
  };

  const { onToggle: onSuccessToggle, isOpen: onSuccessIsOpen, onClose: onSuccessOnClose, onOpen: onSuccessOnOpen } = useDisclosure();

  return (
    <Box>
      <Text p="20px 0px" borderBottom={`3px solid ${appColors.appPrimary[600]}`} fontWeight={600} fontSize="28px" color={appColors.appPrimary[600]}>Reset Email</Text>
      <Text mt="28px" mb="22px" fontSize={["14px", "18px"]} >Once you click on the Reset Email button, an OTP will be sent to your registered Email ID.<br /> Enter the OTP and your new Email and click submit to reset your Email. </Text>
      <Button isDisabled={isSendOTPDisabled} onClick={() => handleSendOTP()}>{sendOtpToMailIsLoading ? <Spinner color='white' /> : "Send OTP"}</Button>
      {isOTPSentOnce && <Box w="100%" maxW="400px">



        <Text mt="15px" color={appColors.appPrimary[600]} fontWeight={500} fontSize={["13px", "15px"]}>An OTP has been sent to your registered Email ID.</Text>
        {isSendOTPDisabled && <Text color={appColors.appPrimary[600]} fontWeight={500} fontSize={["13px", "15px"]}>{`Send OTP again in ${OTPCount} seconds`}</Text>}
        <Flex mt="15px" mb="10px">
          <AppFormFieldWrapper label="Enter the OTP" htmlFor={''}>
            <AppInput type={'text'} errorVariable={errors.otp} {...register('otp', { required: true })} customStyles={{ marginBottom: '20px' }} placeholder="OTP" />
          </AppFormFieldWrapper>
        </Flex>

        <AppFormFieldWrapper label="Enter new Email ID" htmlFor={''}>
          <AppBox customStyles={{ position: 'relative', marginBottom: "20px" }}>
            <AppInput errorVariable={errors.new_email} type={'text'} {...register('new_email', { required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ })} placeholder="New Email" customStyles={{ paddingRight: '50px' }} />
          </AppBox>
          <Box mt="10px">
            {errors?.new_email?.type == "pattern" && <Text variant="inputError">Enter a valid email address</Text>}
            {setNewEmailError?.response?.data?.msg && <Text variant="inputError">{setNewEmailError?.response?.data?.msg}</Text>}
          </Box>
        </AppFormFieldWrapper>





        <Flex mt="30px" gap="20px" alignItems={"center"} justifyContent="start">
          <Button onClick={() => handleCancel()} variant={"onlyBorderGreen"}>
            Cancel
          </Button>
          <Button
            variant="fillBrandGreen"
            type='submit'
            isDisabled={false}
            onClick={() => handleResetEmail()}
          >
            {setNewEmailIsLoading ? <Spinner color='white' /> : "Submit"}
          </Button>
        </Flex>
      </Box>}
      {onSuccessIsOpen && <Box className='custom-toast' bg={"#C6F6D5"} borderRadius={"12px"} boxShadow={"0px 0px 6px -1px black"} title={""}>
        <Box color={"green"} p="20px" fontWeight={700} fontSize="20px" ><Alert status='success' variant='subtle'>
          <AlertIcon height={"30px"} width={"26px"} mr="30px" />
          Email has been updated successfully.{<br />}
        </Alert></Box>
      </Box>}
    </Box>
  )
}

export default ResetEmail