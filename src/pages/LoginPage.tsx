import React from 'react';
import AppBox from '../components/chakraOverrides/AppBox';
import AppFlex from '../components/chakraOverrides/AppFlex';
import AppImage from '../components/chakraOverrides/AppImage';
import logo from '../assets/common/logo.svg';
import AppButton from '../components/chakraOverrides/AppButton';
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
import { FORGOT_PASSWORD, HOME, SIGN_UP_PAGE } from '../navigation/routes/common-routes';
import { useMutation } from '@tanstack/react-query';
import makePostRequest from "../api/utils/makePostRequest";
import useAppStore from '../store';
import { LOGIN_API } from '../api/url/common';
import { Spinner } from '@chakra-ui/react';
import getUserToken from '../api/utils/getUserToken';
import getCurrentUserData from '../api/utils/getCurrentUserData';

const LoginPage = () => {
    const [err, setErr] = React.useState(null);
    const [otherSignInIsLoading, setSetOtherSignInIsLoading] = React.useState(false);

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { showPassword, togglePasswordVisibility } = usePasswordVisibility();

    const { data, isLoading, isError, error, mutate } = useMutation((body) =>
        makePostRequest(LOGIN_API, body), {
        onError: (err: any) => {
            setErr(err?.response?.data?.non_field_errors[0])
        }
    }
    );

    const handleOtherSignInIsLoading = (isLoading: boolean) => {
        setSetOtherSignInIsLoading(isLoading);
    };

    const onSubmit = (data: any, e: any) => submitLogin(data);
    const onError = (errors: any, e: any) => console.log(errors, e);

    const submitLogin = (data: any) => {
        setErr(null);
        mutate(data);
    }
    const navigate = useNavigate()

    const setUserAndToken = useAppStore((state: any) => state.setUserAndToken);

    // Hooks to Handle form success and error
    React.useLayoutEffect(() => {
        const handleUserSignIn = async () => {
            if (!isLoading && !isError && data) {
                await setUserAndToken({
                    token: data?.token,
                    name: data?.username,
                    id: data?.user_id,
                    type: data?.user_type,
                    verified_status: data?.verified_status,
                    email: data?.email,
                });
                // console.log("token data.................",data?.token)
                localStorage.setItem('token', data?.token)
                const ls = { user_id: data?.user_id, user_type: data?.user_type, user_email: data?.email };
                localStorage.setItem('user_data', JSON.stringify(ls));
                navigate(HOME);
                // console.log("zustandCheck", zustandCheck);
            }
        };
        handleUserSignIn();
    }, [data, isLoading, isError]);

    // Check if user is already authenticated

    // React.useLayoutEffect(() => {
    //     //@ts-ignore
    //     const initialValue = document.body.style.zoom;

    //     //@ts-ignore
    //     document.body.style.zoom = "90%";
    //     return () => {
    //         //@ts-ignore
    //         document.body.style.zoom = initialValue;
    //     };
    // }, [])

    React.useEffect(() => {
        getCurrentUserData().then((resData: any) => {
            const token = getUserToken();
            setUserAndToken({
                token: token,
                name: resData?.username,
                id: resData?.user_id,
                type: resData?.user_type,
                verified_status: resData?.verified_status,
                email: data?.email,
            });
            navigate(HOME);
        });
    }, [])
    // console.log("err", error?.response?.data?.non_field_errors[0]);
    return (
        <AppFlex>
            <AppBox customStyles={{ flexBasis: ["100%", '52%'], height: '100vh', pt: '5em', display: 'flex', justifyContent: 'center' }}>
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
                        <AppFlex justifyContent="space-between" customStyles={{ mb: '1.4em', mt: '85px' }}>
                            <AppText fontWeight={"bold"} fontSize={"lg"} customStyles={{ textAlign: 'center', width: "100%" }}>
                                Log In
                            </AppText>
                        </AppFlex>
                        <AppBox customStyles={{ width: '100%', height: '4px', backgroundColor: '#C1C1C0', marginBottom: '37px', }}>
                            {/* --- Grey border ---- */}
                            <AppBox
                                customStyles={{
                                    width: '100%',
                                    height: '4px',
                                    backgroundColor: appColors.appGrey[400],
                                }}
                            />
                        </AppBox>
                    </AppBox>


                    {/*  --- forms --- */}
                    <AppBox >
                        <form onSubmit={handleSubmit(onSubmit, onError)}>
                            <AppFormFieldWrapper label="Username *" htmlFor={''} >
                                <AppInput type={'text'} errorVariable={errors.username} {...register('username', { required: true })} customStyles={{ marginBottom: '20px', fontSize: "17px" }} placeholder="Enter your username" />
                            </AppFormFieldWrapper>

                            <AppFormFieldWrapper label="Password *" htmlFor={''}>
                                <AppBox customStyles={{ position: 'relative' }}>
                                    <AppInput errorVariable={errors.password} type={showPassword ? 'show' : 'password'} {...register('password', { required: true })} placeholder="Enter your password" customStyles={{ paddingRight: '50px', fontSize: "17px" }} />
                                    <AppBox role="button" onClick={() => togglePasswordVisibility()} customStyles={{ position: 'absolute', right: '6px', top: '50%', transform: 'translate(-50%, -50%)', fontSize: '20px', color: appColors.appGrey[800] }}>
                                        {showPassword ? <BiShow /> : <BiHide />}
                                    </AppBox>
                                </AppBox>
                            </AppFormFieldWrapper>
                            <AppFlex justifyContent={'flex-end'} customStyles={{ margin: '7px 0px 20px 0px' }}>
                                <Link style={{ fontSize: '15px', color: appColors.appBlack[600], textDecoration: 'underline' }} to={FORGOT_PASSWORD}>Forgot Password</Link>
                            </AppFlex>

                            {err && <AppText customStyles={{ textAlign: "center", mb: "10px" }} fontSize='13px' color='red'>{err}</AppText>}

                            {/*  --- button --- */}
                            <AppBox>
                                <AppButton
                                    customStyles={{ width: '100%', maxWidth: '100%', fontSize: "17px" }}
                                    variant="fillBrandGreen"
                                    type='submit'
                                    isDisabled={isLoading}
                                >
                                    {isLoading ? <Spinner color='white' /> : "Login"}
                                </AppButton>
                            </AppBox>
                        </form>
                    </AppBox>

                    {/* <AppBox customStyles={{ position: 'relative', background: appColors.appBlack[600], height: '.5px', marginTop: '40px' }}>
                        <AppText customStyles={{textAlign: "center", position: 'absolute', transform: 'translate(-50%, -50%)', left: '50%', background: 'white', padding: '0px 22px', fontSize: '16px', fontWeight: '500' }}>Or continue with</AppText>
                    </AppBox> */}

                    {/* Other login options such google, fb */}
                    {/* <OtherLoginOpn handleOtherSignInIsLoading={handleOtherSignInIsLoading} /> */}

                    <AppFlex customStyles={{ mt: "20px" }} justifyContent="center" gap={'8px'}>
                        <AppText fontSize={"15px"} fontWeight={"500"}>Not a member?</AppText>
                        <Link to={SIGN_UP_PAGE}>
                            <AppText fontSize='15px' color={appColors.appPrimary[600]}>Sign Up Now</AppText>
                        </Link>
                    </AppFlex>

                </AppBox>
            </AppBox>

            <AppBox customStyles={{ flexBasis: '45%', height: '100vh', position: "fixed", top: "0px", right: "0px", bottom: "0px", width: "45%", display: ["none", "none", "block"] }}>
                <AppImage
                    src={displayImage}
                    fallbackSrc={''}
                    customStyles={{ width: '100%', height: '100%' }}
                />
            </AppBox>
        </AppFlex>
    )
}

export default LoginPage