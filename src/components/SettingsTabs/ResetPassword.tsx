//@ts-nocheck
import { Box, Flex, Text } from '@chakra-ui/layout'
import { Alert, AlertIcon, Button, Spinner, useDisclosure } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query';
import React from 'react'
import { useForm } from 'react-hook-form';
import { BiHide, BiShow } from 'react-icons/bi';
import { FORGOT_PASSWORD_SEND_OTP, POST_OTP_AND_PASSWORD } from '../../api/url/common';
import makePostRequest from '../../api/utils/makePostRequest';
import { appColors } from '../../theme/foundations/appColor';
import usePasswordVisibility from '../../utils/hooks/usePasswordVisibility';
import AppBox from '../chakraOverrides/AppBox';
import AppFormFieldWrapper from '../chakraOverrides/AppFormFieldWrapper';
import AppInput from '../chakraOverrides/AppInput';

const ResetPassword = ({ userData }: { userData: any }) => {
  const { register, handleSubmit, watch, trigger, formState: { errors }, reset } = useForm();
  const [err, setErr] = React.useState("");
  const { showPassword, togglePasswordVisibility } = usePasswordVisibility();
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
  const { mutate: setNewPassword, isLoading: setNewPasswordIsLoading, error: setNewPasswordError } = useMutation((body) => makePostRequest(POST_OTP_AND_PASSWORD, body), {
    onSuccess: () => {
      onSuccessOnOpen();
      setIsOTPSentOnce(false);
      setOTPCount(30);
      setIsOTPDisabled(false);
      setTimeout(() => {
        onSuccessOnClose();
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

  const handleResetPassword = async () => {
    let isPassMatch = true;
    await trigger('otp');
    await trigger('password');
    await trigger('password_again');
    if (watch('password') !== watch('password_again')) {
      isPassMatch = false;
      setErr("Password doesn't match");
    } else {
      isPassMatch = true;
      setErr("");
    }
    if (await trigger('otp') && await trigger('password') && await trigger('password_again') && isPassMatch == true) {
      //@ts-ignore
      setNewPassword({
        "email": userData?.data?.email,
        "otp": watch('otp'),
        "new_password": watch('password'),
      })
    }

  }

  const { onToggle: onSuccessToggle, isOpen: onSuccessIsOpen, onClose: onSuccessOnClose, onOpen: onSuccessOnOpen } = useDisclosure();

  const handleCancel = () => {
    setIsOTPSentOnce(false);
    setOTPCount(30);
    setIsOTPDisabled(false);
  };

  return (
    <Box>
      <Text p="20px 0px" borderBottom={`3px solid ${appColors.appPrimary[600]}`} fontWeight={600} fontSize="28px" color={appColors.appPrimary[600]}>Reset Password</Text>
      <Text mt="28px" mb="22px" fontSize={["14px", "18px"]} >Once you click on the Reset Password button, an OTP will be sent to your registered Email ID.<br /> Enter the OTP and your new password and click submit to reset your passwod. </Text>
      <Button isDisabled={isSendOTPDisabled} onClick={() => handleSendOTP()}>{sendOtpToMailIsLoading ? <Spinner color='white' /> : "Send OTP"}</Button>
      {isOTPSentOnce && <Box w="100%" maxW="400px">



        <Text mt="15px" color={appColors.appPrimary[600]} fontWeight={500} fontSize={["13px", "15px"]}>An OTP has been sent to your registered Email ID.</Text>
        {isSendOTPDisabled && <Text color={appColors.appPrimary[600]} fontWeight={500} fontSize={["13px", "15px"]}>{`Send OTP again in ${OTPCount} seconds`}</Text>}
        <Flex mt="15px" mb="10px">
          <AppFormFieldWrapper label="Enter the OTP" htmlFor={''}>
            <AppInput type={'text'} errorVariable={errors.otp} {...register('otp', { required: true })} customStyles={{ marginBottom: '20px' }} placeholder="OTP" />
          </AppFormFieldWrapper>
        </Flex>
        <AppFormFieldWrapper label="Enter new password" htmlFor={''}>
          <AppBox customStyles={{ position: 'relative', marginBottom: "20px" }}>
            <AppInput errorVariable={errors.password} type={'text'} {...register('password', { required: true, minLength: { value: 6, message: "Password should be atleast 6 characters" } })} placeholder="Password" customStyles={{ paddingRight: '50px' }} />
          </AppBox>
        </AppFormFieldWrapper>
        <AppFormFieldWrapper label="Enter New Password Again" htmlFor={''}>
          <AppBox customStyles={{ position: 'relative' }}>
            <AppInput errorVariable={errors.password_again} type={showPassword ? 'show' : 'password'} {...register('password_again', { required: true })} placeholder="Password " customStyles={{ paddingRight: '50px' }} />
            <AppBox role="button" onClick={() => togglePasswordVisibility()} customStyles={{ position: 'absolute', right: '6px', top: '50%', transform: 'translate(-50%, -50%)', fontSize: '20px', color: appColors.appGrey[800] }}>
              {showPassword ? <BiShow /> : <BiHide />}
            </AppBox>
          </AppBox>
        </AppFormFieldWrapper>
        <Box mt="10px">
          {errors.password && <Text color={"red"} fontSize={"14px"} fontWeight={500}>*Password shoud be atleast 6 characters </Text>}
          {err !== "" && <Text color={"red"} fontSize={"14px"} fontWeight={500}>*Password doesn't match</Text>}
          {setNewPasswordError?.response?.data?.msg && <Text color={"red"} fontSize={"14px"} fontWeight={500}>{setNewPasswordError?.response?.data?.msg}</Text>}
        </Box>



        <Flex mt="30px" gap="20px" alignItems={"center"} justifyContent="start">
          <Button onClick={() => handleCancel()} variant={"onlyBorderGreen"}>
            Cancel
          </Button>
          <Button
            variant="fillBrandGreen"
            type='submit'
            isDisabled={false}
            onClick={() => handleResetPassword()}
          >
            {setNewPasswordIsLoading ? <Spinner color='white' /> : "Submit"}
          </Button>
        </Flex>
      </Box>}
      {onSuccessIsOpen && <Box className='custom-toast' bg={"#C6F6D5"} borderRadius={"12px"} boxShadow={"0px 0px 6px -1px black"} title={""}>
        <Box color={"green"} p="20px" fontWeight={700} fontSize="20px" ><Alert status='success' variant='subtle'>
          <AlertIcon height={"30px"} width={"26px"} mr="30px" />
          Password has been updated successfully.{<br />}
        </Alert></Box>
      </Box>}
    </Box>
  )
}

export default ResetPassword