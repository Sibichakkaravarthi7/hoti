import React, { useRef, useEffect, useState } from 'react';
import AppArrowIcon from '../components/AppArrowIcon';
import AppBox from '../components/chakraOverrides/AppBox';
import AppButton from '../components/chakraOverrides/AppButton';
import AppFlex from '../components/chakraOverrides/AppFlex';
import AppImage from '../components/chakraOverrides/AppImage';
import AppText from '../components/chakraOverrides/AppText';
import SignupOne from '../components/signup/SignupOne';
import displayImage from '../assets/common/signup-display.webp';
import logo from '../assets/common/logo.svg';
import UserSpecificForm from '../components/signup/UserSpecificForm';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import SignUpThree from '../components/signup/SignUpThree';
import SignUpFour from '../components/signup/SignUpFour';
import SocialMediaPage from '../components/signup/SocialMediaPage';
import SignUpImageUpload from '../components/signup/SignUpImageUpload';
import { useMutation } from '@tanstack/react-query';
import makePostRequest from '../api/utils/makePostRequest';
import useStructureApiData from '../utils/hooks/useStructureApiData';
import { GET_INSTAGRAM_ACCESS_TOKEN, SIGNUP_API } from '../api/url/common';
import { HOME, LOG_IN_PAGE } from '../navigation/routes/common-routes';
import { useNavigate, useParams, useSearchParams, useLocation } from 'react-router-dom';
import useAppStore from '../store';
import { Alert, AlertIcon, Box, Spinner, Text, useDisclosure, useToast } from '@chakra-ui/react';
import getCurrentUserData from '../api/utils/getCurrentUserData';
import getUserToken from '../api/utils/getUserToken';
import { usePhoneValidation } from 'react-international-phone';
import EmailVerification from '../components/signup/EmailVerification';
import ConnectSocialMedia from '../components/signup/ConnectSocialMedia';

function SignUp() {
  const [currentPart, setCurrentPart] = useState<number>(0);

  const navigate = useNavigate();
  const { code } = useParams();

  const { search } = useLocation();

  const { watch, trigger, handleSubmit, setValue, formState: { errors } } = useFormContext();

  const setUserAndToken = useAppStore((state: any) => state.setUserAndToken);

  const { isLoading, isError, error, mutate } = useMutation((body) =>
    makePostRequest(SIGNUP_API, body), {

    onSuccess: async (res: any) => {
      if (res.status == "success") {
        console.log("success");
        if (localStorage.getItem('formData')) {
          localStorage?.removeItem("formData")
        };
        setTimeout(() => {
          navigate(LOG_IN_PAGE);
        }, 2000);
        onSuccessOnOpen()

      }

    },

  }
  );

  const { isLoading: instaTokenLoading, isError: instaIsError, error: instaError, mutate: instaMutate } = useMutation((body) =>
    makePostRequest(GET_INSTAGRAM_ACCESS_TOKEN, body), {

    onSuccess: async (res: any) => {
      if (res.status == "success") {
        setValue("fb_access_token", res);
      }

    }
  }
  );

  const appendInstaFormDataAndMutate = (code: any) => {
    const formData = new FormData();
    formData.append('client_id', import.meta.env.VITE_FACEBOOK_APP_ID);
    formData.append("client_secret", import.meta.env.VITE_FACEBOOK_APP_SECRET);
    formData.append("grant_type", "authorization_code");
    formData.append("redirect_uri", "https://hoti-staging.netlify.app/signup/");
    formData.append("code", code);
  }

  React.useEffect(() => {
    setValue('selectedFiles', []);
    const query = new URLSearchParams(search);
    const accessCode = query.get('code')?.slice(0, -2);
    if (accessCode) {
      const formData = localStorage.getItem("formData") || "{}";
      const properFormData = JSON.parse(formData);
      Object.keys(properFormData)?.map((data) => setValue(data, properFormData[data]));
      setCurrArr(formFields.influencerForm);
      setCurrentPart(4);
      appendInstaFormDataAndMutate(accessCode);
    }
  }, []);

  const { structureInflencer, structureAgency, structureBrand } = useStructureApiData()

  const handlePreviousClick = () => {
    moveBack();
  };

  const formFields = {
    "influencerForm": [
      {
        component: SignupOne,
        title: "What describes you best?",
      },
      {
        component: UserSpecificForm,
        title: "Tell us about yourself",
      },
      {
        component: EmailVerification,
        title: "Email Verification",
      },
      {
        component: SignUpThree,
        title: "Create your account",
      },
      {
        component: SignUpFour,
        title: "Almost there",
      },
      // {
      //   component: SocialMediaPage,
      //   title: "Profile Verification",
      // },
      {
        component: ConnectSocialMedia,
        title: "Connect your social media",
      },
    ],
    "othersForm": [
      {
        component: SignupOne,
        title: "What describes you best?",
      },
      {
        component: UserSpecificForm,
        title: "Tell us about yourself",
      },
      {
        component: EmailVerification,
        title: "Email Verification",
      },
      {
        component: SignUpThree,
        title: "Create Your Account",
      },
      {
        component: SignUpFour,
        title: "Almost there",
      }
      ,
      {
        component: SignUpImageUpload,
        title: "Profile Verification",
      }
    ]
  }
  const [currArr, setCurrArr] = useState(formFields.othersForm);
  const isErrorOccured = async () => {
    let isValid = true
    if (await trigger()) {
      isValid = true;
    } else {
      isValid = false;
    }
    if (currentPart == 1) {
      //@ts-ignore
      const isPhoneValid = usePhoneValidation(watch('phone'), { country: watch('country') });
      if (!isPhoneValid.isValid) {
        errors['phone'] = {
          type: "required",
        }
        isValid = false
      } else {
        delete errors.phone;
      }
      if (watch('location') == undefined) {
        errors['location'] = {
          type: "required",
        }
        isValid = false
      } else {
        delete errors.location;
      }
    } else {
      delete errors.phone;
      delete errors.location;
    }
    return isValid;
  }

  const handleNextClick = async () => {
    console.log("Errors", errors);
    await isErrorOccured()
    if (await isErrorOccured()) {
      if (currentPart == 0) {
        if (watch('user_type') == "influencer") {
          setCurrArr(formFields.influencerForm);
        } else {
          setCurrArr(formFields.othersForm);
        }
        moveNext();
      } else {
        moveNext()
      }
    }
  };

  const moveNext = () => {
    setCurrentPart((prev) => prev + 1);
  }
  const moveBack = () => {
    setCurrentPart((prev) => prev - 1);
  }


  const submitSignUp = async () => {
    let signUpData;
    if (watch('user_type') == "influencer") {
      signUpData = await structureInflencer(watch());
    } else if (watch('user_type') == "agency") {
      signUpData = await structureAgency(watch());
    } else {
      signUpData = await structureBrand(watch());
      signUpData.brand = { ...signUpData.brand, description: signUpData.short_bio }
    }
    mutate(signUpData);
  };

  React.useEffect(() => {

    getCurrentUserData().then((resData: any) => {
      const token = getUserToken();
      setUserAndToken({
        token: token,
        name: resData?.username,
        id: resData?.user_id,
        type: resData?.user_type,
        verified_status: resData?.verified_status
      });
      navigate(HOME);
    });

  }, [])

  const isConformDisabled = () => {
    if (watch("user_type") == "influencer") {
      if (watch('tc') == false) {
        return true;
      }
      // if (watch('fb_access_token') == undefined) {
      //   return true
      // }
    } else {
      if (watch('tc') == false || watch('tc') == undefined) {
        return true;
      }
      if (watch('file_ids') == undefined || watch('file_ids').length == 0) {
        return true;
      }
    }
  };

  const isNextDisabled = () => {
    if ((currentPart == 2) && (watch('verified') !== true)) return true
    if ((watch('verified') == true) && (currentPart == 2)) {
      if (watch('verifiedWith') !== watch('email')) {
        return true
      }
    }
  };

  const returnError = () => {
    if (error) {
      //@ts-ignore
      const errObj = error?.response?.data?.errors;
      // errObj[Object.keys(errObj)?.[0]];
      const errArr = errObj[Object?.keys(errObj)?.[0]];
      return <Text mb="10" mt="-10px" color={"red"} fontSize={"14px"} fontWeight={500}>{errArr[0]}</Text>
    }

  };

  const { onToggle: onSuccessToggle, isOpen: onSuccessIsOpen, onClose: onSuccessOnClose, onOpen: onSuccessOnOpen } = useDisclosure();


  //@ts-ignore
  const SignUpPartComponent = currArr[currentPart]?.component;

  return (
    <AppFlex>

      <AppBox customStyles={{ flexBasis: ['100%', '100%', '55%'], height: '100vh', pt: '6em' }}>
        <form>
          <AppBox customStyles={{ width: '80%', mx: 'auto', maxWidth: '710px' }}>
            {/* --- app logo ---- */}
            <AppBox>
              <AppBox
                customStyles={{
                  width: '10vw',
                  height: '60px',
                  maxWidth: '205px',
                  minWidth: '170px',
                  mx: 'auto',
                  mb: '4em'
                }}
              >
                <AppImage src={logo} />
              </AppBox>
            </AppBox>

            {/* --- progress bar ----- */}
            <AppBox>
              <AppFlex justifyContent="space-between" alignItems={["end", "center"]} customStyles={{ mb: '1.4em' }}>
                <AppText customStyles={{ fontWeight: 'bold', fontSize: 'lg', color: '#151515' }}>
                  {currArr[currentPart]?.title}
                </AppText>
                <Text whiteSpace={"nowrap"} fontSize={["12px", "18px"]}>{`(Step ${currentPart + 1}/${currArr.length})`}</Text>
              </AppFlex>
              <AppBox customStyles={{ width: '100%', height: '4px', backgroundColor: '#C1C1C0' }}>
                <AppBox
                  customStyles={{
                    width: `${(currentPart + 1) * 100 / currArr.length}%`,
                    height: '4px',
                    backgroundColor: '#E65C1F',
                    transition: "width 0.5s ease-in-out",
                  }}
                />
              </AppBox>
            </AppBox>

            {/*  --- forms --- */}
            <AppBox>
              <SignUpPartComponent />
            </AppBox>

            {returnError()}



            {/*  --- button --- */}
            <AppFlex gap="1.4em" customStyles={{ w: 'fit-content', justifyContent: 'start', pb: "50px" }}>
              {currentPart !== 0 && (
                <AppButton
                  variant="onlyBorderGreen"
                  leftIcon={<AppArrowIcon customStyles={{ transform: 'rotate(180deg)' }} />}
                  onClick={handlePreviousClick}
                >
                  Previous
                </AppButton>
              )}
              {(currentPart == 0 || !(currentPart == currArr.length - 1)) ? <AppButton
                variant="fillBrandGreen"
                rightIcon={<AppArrowIcon />}
                onClick={handleNextClick}
                isDisabled={isNextDisabled()}
              >
                Next
              </AppButton>
                :
                <AppButton
                  variant="fillBrandGreen"
                  rightIcon={<AppArrowIcon />}
                  // type="submit"
                  isDisabled={isConformDisabled()}
                  onClick={() => submitSignUp()}
                >
                  {isLoading ? <Spinner color='white' /> : "Confirm"}
                </AppButton>}
            </AppFlex>
          </AppBox>
        </form>
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
          Account created successfully{<br />}
          Navigating to login page
        </Alert></Box>
      </Box>}
    </AppFlex>
  );
}

export default SignUp;
