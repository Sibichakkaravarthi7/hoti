//@ts-nocheck
import React from 'react';
import AppBox from '../components/chakraOverrides/AppBox';
import AppFlex from '../components/chakraOverrides/AppFlex';
import AppImage from '../components/chakraOverrides/AppImage';
import logo from '../assets/common/logo.svg';
import displayImage from '../assets/common/signup-display.webp';
import AppFormFieldWrapper from '../components/chakraOverrides/AppFormFieldWrapper';
import AppInput from '../components/chakraOverrides/AppInput';
import { useForm } from 'react-hook-form';
import AppText from '../components/chakraOverrides/AppText';
import { appColors } from '../theme/foundations/appColor';
import { BiHide, BiShow } from 'react-icons/bi';
import usePasswordVisibility from '../utils/hooks/usePasswordVisibility';
import { Link, useNavigate } from 'react-router-dom';
import OtherLoginOpn from '../components/OtherLoginOpn';
import { LOG_IN_PAGE } from '../navigation/routes/common-routes';
import { useMutation } from '@tanstack/react-query';
import makePostRequest from "../api/utils/makePostRequest";
import useAppStore from '../store';
import { FORGOT_PASSWORD_SEND_OTP, LOGIN_API, POST_OTP_AND_PASSWORD } from '../api/url/common';
import { Alert, AlertIcon, Box, Button, Flex, Spinner, Text, useDisclosure } from '@chakra-ui/react';

const ForgotPassword = () => {
    const { register, handleSubmit, watch, trigger, formState: { errors } } = useForm();
    const { showPassword, togglePasswordVisibility } = usePasswordVisibility();
    const [currForm, setCurrForm] = React.useState(0);
    const [err, setErr] = React.useState("");

    const navigate = useNavigate()

    const { mutate: sendOtpToMail, isLoading: sendOtpToMailIsLoading, error: sendOtpToMailError } = useMutation((body) => makePostRequest(FORGOT_PASSWORD_SEND_OTP, body), {
        onSuccess: () => {
            setCurrForm(1);
        },
    });
    const { mutate: setNewPassword, isLoading: setNewPasswordIsLoading, error: setNewPasswordError } = useMutation((body) => makePostRequest(POST_OTP_AND_PASSWORD, body), {
        onSuccess: () => {
            onSuccessOnOpen();
            setTimeout(()=>{
                navigate(LOG_IN_PAGE);
            }, 2000)
        },
    });

    const handleVerifyEmail = async () => {
        // console.log("errors", errors.email)
        if (await trigger('email')) {
            //@ts-ignore
            sendOtpToMail({
                "email": watch('email')
            })
        }

    }

    const handleResetPassword = async () => {
        // console.log("errors", errors.email)
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
                "email": watch('email'),
                "otp": watch('otp'),
                "new_password": watch('password')
            })
        }

    }

    const { onToggle: onSuccessToggle, isOpen: onSuccessIsOpen, onClose: onSuccessOnClose, onOpen: onSuccessOnOpen } = useDisclosure();

    return (
        <AppFlex>
            <AppBox customStyles={{ flexBasis: ['100%', '100%', '55%'], height: '100vh', pt: '5em', display: 'flex', justifyContent: 'center' }}>
                <AppBox customStyles={{ width: "80%", maxWidth: '355px' }}>
                    {/* --- app logo ---- */}
                    <AppBox>
                        <AppBox
                            customStyles={{
                                width: '10vw',
                                height: '60px',
                                maxWidth: '205px',
                                minWidth: '170px',
                                mx: 'auto',
                                mb: '4em',
                            }}
                        >
                            <AppImage src={logo} />
                        </AppBox>
                    </AppBox>

                    {/* --- login title ---- */}
                    <AppBox>
                        <AppFlex justifyContent="space-between" customStyles={{ mb: '1.4em', mt: '95px' }}>
                            <AppText fontWeight={"bold"} fontSize={"lg"} customStyles={{ textAlign: 'left', width: "100%", paddingBottom: "10px", borderBottom: "2px solid black" }}>
                                Forgot password?
                            </AppText>
                        </AppFlex>

                    </AppBox>


                    {/*  --- forms --- */}
                    {currForm == 0 ? <AppBox>
                        <Box mb="20px">
                            <Box mt={"20px"}>
                                <Text mb="10px" fontWeight={500} fontSize="17px">
                                    Enter the registered Email ID
                                </Text>
                                <Flex>
                                    <AppInput type={'text'} errorVariable={errors.email} {...register('email', { required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ })} customStyles={{ marginBottom: '10px', fontSize: "17px" }} placeholder="Enter your email ID" />
                                    <Button fontSize={"17px"} onClick={() => handleVerifyEmail()}>{sendOtpToMailIsLoading ? <Spinner /> : "Verify"}</Button>
                                </Flex>
                            </Box>
                            <Text mt="20px" fontSize={"17px"} fontWeight={500}>An OTP will be sent to the Entered Email</Text>

                            {errors.email && <Text color={"red"} fontSize={"14px"} fontWeight={500}>Enter a valid Email ID </Text>}
                            {sendOtpToMailError?.response?.data?.msg && <Text color={"red"} fontSize={"14px"} fontWeight={500}>{sendOtpToMailError?.response?.data?.msg} </Text>}
                        </Box>
                        <Box>
                            <Button fontSize={"17px"} variant={"onlyBorderGreen"} onClick={()=>navigate(LOG_IN_PAGE)}>Back</Button>
                        </Box>
                    </AppBox>
                        :
                        <Box>
                            <Flex mb="20px">
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



                            <Flex mt="20px" gap="20px" alignItems={"center"} justifyContent="start">
                                <Button onClick={() => setCurrForm(0)} variant={"onlyBorderGreen"}>
                                    Back
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
                        </Box>
                    }

                </AppBox>
            </AppBox>

            <AppBox customStyles={{ flexBasis: '45%', height: '100vh', position: "fixed", top: "0px", right: "0px", bottom: "0px", width: "45%", display: ["none", "none", "block"] }}>
                <AppImage
                    src={displayImage}
                    fallbackSrc={''}
                    customStyles={{ width: '100%', height: '100%' }}
                />
            </AppBox>
            {onSuccessIsOpen && <Box className='custom-toast' bg={"#C6F6D5"} borderRadius={"12px"} boxShadow={"0px 0px 6px -1px black"} title={""}>
                <Box color={"green"} p="20px" fontWeight={700} fontSize="20px" ><Alert status='success' variant='subtle'>
                    <AlertIcon height={"30px"} width={"26px"} mr="30px" />
                    Password has been updated successfully.{<br />}
                    Navigating to login page
                </Alert></Box>
            </Box>}
        </AppFlex>
    )
}

export default ForgotPassword