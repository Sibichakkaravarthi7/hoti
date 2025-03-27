//@ts-nocheck
import React from 'react';
import { Box, Button, Flex, Spinner, Text, useQuery } from '@chakra-ui/react';
import { useForm, useFormContext } from 'react-hook-form';
import AppFormFieldWrapper from '../chakraOverrides/AppFormFieldWrapper';
import AppInput from '../chakraOverrides/AppInput';
import { appColors } from '../../theme/foundations/appColor';
import makePostRequest from '../../api/utils/makePostRequest';
import { useMutation } from '@tanstack/react-query';
import { SEND_OTP_TO_EMAIL, VERIFY_OTP } from '../../api/url/common';
import AppText from '../chakraOverrides/AppText';
import Tick from '../../assets/tick.png';

function EmailVerification() {
    const {
        register,
        watch,
        formState: { errors },
        setValue
    } = useFormContext();
    const [isOTPSent, setIsOTPSent] = React.useState(false);
    const [otp, setOtp] = React.useState('');

    const { mutate, isLoading, error: sendOtpError } = useMutation(
        (body) => makePostRequest(SEND_OTP_TO_EMAIL, body),
        {
            onSuccess: () => {
                setValue('verified', false);
                setValue('verifiedWith', watch('email'));
            }
        }
    );

    const {
        mutate: sendOtp,
        isLoading: otpCheckIsLoading,
        error
    } = useMutation((body) => makePostRequest(VERIFY_OTP, body), {
        onSuccess: () => {
            setValue('verified', true);
            setValue('verifiedWith', watch('email'));
        }
    });

    React.useEffect(() => {
        if (watch('verified') == undefined) {
            // console.log("watch('verified') == undefined");
            //@ts-ignore
            mutate({ email: watch('email') });
        } else {
            if (watch('verifiedWith') !== watch('email')) {
                setValue('verified', false);
                // console.log('Case 2');
                //@ts-ignore
                mutate({ email: watch('email') });
            }
        }
    }, []);

    const handleSendOTP = () => {
        //@ts-ignore
        sendOtp({
            email: watch('email'),
            otp: otp
        });
    };

    return (
        <Box py="4em" maxWidth={{ sm: '100%', md: '100%' }}>
            <>
                {!watch('verified') === true ? (
                    <>
                        {' '}
                        {!isLoading ? (
                            sendOtpError ? <Text fontWeight={500}>{sendOtpError?.response?.data?.msg}</Text> :
                                <div>
                                    <Text
                                        fontSize={'18px'}
                                        mb="20px"
                                        fontWeight={500}>{`An OTP has been sent to the email id ${watch('email')}`}</Text>
                                    <Box width={'100%'} maxW="200px">
                                        <>
                                            <AppFormFieldWrapper label="Enter the OTP *" htmlFor={''}>
                                                <Flex>
                                                    <AppInput
                                                        value={otp}
                                                        type="number"
                                                        onChange={(e) => setOtp(e.target.value)}
                                                        errorVariable={error}
                                                        placeholder="Enter OTP"
                                                    />
                                                    <Button onClick={() => handleSendOTP()}>Verify</Button>
                                                </Flex>
                                            </AppFormFieldWrapper>
                                            {error && (
                                                <Text mt="10px" color={'red'} fontSize="14px">
                                                    {error?.response?.data?.msg}
                                                </Text>
                                            )}
                                        </>
                                    </Box>
                                </div>
                        ) : (
                            <Spinner color={appColors.appPrimary[600]} />
                        )}
                    </>
                ) : (
                    <Flex>
                        <AppText
                            color="#EB752F"
                            fontWeight={600}
                            size="textmedium1"
                            fontSize="22px"
                            customStyles={{ mr: '10px' }}>
                            Email Verified
                        </AppText>
                        <img src={Tick} />
                    </Flex>
                )}
            </>
        </Box>
    );
}

export default EmailVerification;
