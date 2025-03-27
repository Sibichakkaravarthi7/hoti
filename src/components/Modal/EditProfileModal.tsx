import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  Skeleton,
  Spinner,
  useDisclosure
} from '@chakra-ui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import { PROFILE_DATA, SIGNUP_META, UPDATE_PROFILE_DATA } from '../../api/url/common';
import { SaveIcon } from '../../utils/customIcons';
import useStructureApiData from '../../utils/hooks/useStructureApiData';
import makePutRequest from '../../api/utils/makePutRequest';
import { useParams } from 'react-router-dom';
import UserSpecificProfileEditModal from './UserSpecificProfileEditModal';
import { usePhoneValidation } from 'react-international-phone';

const EditProfileModal = ({
  profileData,
  userType,
  onClose,
  refetch,
  metaData,
}: {
  profileData: any;
  userType: string;
  onClose: any;
  refetch: any;
  metaData: any;
}) => {

  const {
    register,
    formState: { errors },
    watch,
    setValue,
    control,
    handleSubmit
  } = useForm({
    defaultValues: profileData
  });
  const {
    isLoading: submitIsLoading,
    error: submitError,
    mutate: updateProfile
  } = useMutation((body) => makePutRequest(UPDATE_PROFILE_DATA, body), {
    onSuccess: () => {
      setTimeout(() => {
        onClose();
      }, 1300);
      refetch();
      onSuccessOnOpen();
    },
    onError: () => {
      onErrorOnOpen();
      setTimeout(() => {
        onOnErrorOnClose();
      }, 1700);
    }
  });


  React.useEffect(() => {
    if (profileData) {
      const category = profileData['content_category']?.map((obj: any) => {
        return {
          label: obj?.content_category,
          value: obj?.content_category
        };
      }
      );
      setValue('content_category', category);

      if (userType == 'influencer') {
        const interests = profileData['interests']?.map((obj: any) => {
          // console.log("obj", obj)
          return {
            label: obj?.interest_name,
            value: obj?.interest_name
          };
        });
        setValue('interests', interests);
      }
    }
  }, []);

  const { structureInflencer, structureAgency, structureBrand } = useStructureApiData();

  const phoneChange = (num: any) => {
    setValue('phone', num);
  };

  const submitSignUp = async (data: any) => {
    let isValid = true;
    const isPhoneValid = usePhoneValidation(watch('phone'), { country: "in" });
    if (!isPhoneValid.isValid) {
      setValue('phoneError', true)
      return
    } else {
      setValue('phoneError', false)
    }
    console.log("errorssssss", errors)
    delete data?.profile_image;
    delete data?.background_image;
    delete data?.influencer;
    delete data?.facebook;
    delete data?.instagram;
    delete data?.twitter;
    delete data?.fb_access_token;
    delete data?.user_fb;
    delete data?.phoneError;
    let structuredData;

    if (userType == 'influencer') {
      structuredData = await structureInflencer(data);
      delete structuredData?.insterest;
    } else if (userType == 'agency') {
      structuredData = await structureAgency(data);
      delete structuredData?.agency_name
    } else {
      structuredData = await structureBrand(data);
      structuredData['company_name'] = structuredData?.brand?.company_name;
    }

    // console.log('structuredData', structuredData);
    updateProfile(structuredData);
  };

  const onSubmit = (data: any, e: any) => submitSignUp(data);
  const onError = (errors: any, e: any) => console.log(errors, e);

  const {
    onToggle: onSuccessToggle,
    isOpen: onSuccessIsOpen,
    onClose: onSuccessOnClose,
    onOpen: onSuccessOnOpen
  } = useDisclosure();

  const {
    onToggle: onErrorToggle,
    isOpen: onErrorIsOpen,
    onClose: onOnErrorOnClose,
    onOpen: onErrorOnOpen
  } = useDisclosure();

  // console.log("pd", profileData);
  // console.log("md", metaData);

  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    if (metaData && profileData) {
      setTimeout(() => {
        setShow(true);
      }, 50)
    }

  }, [])

  return (
    <Box>

      <>
        {profileData && <Box>
          <form
            className='edit-profile-modal'
            onSubmit={handleSubmit(onSubmit, onError)}>
            {show ? (<UserSpecificProfileEditModal
              userType={userType}
              data={metaData}
              watch={watch}
              errors={errors}
              register={register}
              phoneChange={phoneChange}
              control={control}
              setValue={setValue}
            />) : <>
              {
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((d) => (<Skeleton key={d} height={"50px"} my="4px" />))
              }
            </>}
            <Flex gridColumn={'1/3'} justifyContent={'end'}>
              <Button isDisabled={submitIsLoading} type={'submit'} leftIcon={<SaveIcon />}>
                {submitIsLoading ? <Spinner color='white' /> : "Save"}
              </Button>
            </Flex>
          </form>
        </Box>}
      </>
      {onSuccessIsOpen && (
        <Box
          className="custom-toast"
          bg={'#C6F6D5'}
          borderRadius={'12px'}
          boxShadow={'0px 0px 6px -1px black'}
          title={''}>
          <Box color={'green'} p="20px" fontWeight={700} fontSize="20px">
            <Alert status="success" variant="subtle">
              <AlertIcon height={'20px'} width={'20px'} />
              Profile Updated Successfully!
            </Alert>
          </Box>
        </Box>
      )}
      {onErrorIsOpen && (
        <Box
          className="custom-toast"
          bg={'#FED7D7'}
          borderRadius={'12px'}
          boxShadow={'0px 0px 6px -1px black'}
          title={''}>
          <Box color={'red'} p="20px" fontWeight={700} fontSize="20px">
            <Alert status="error" variant="subtle">
              <AlertIcon height={'20px'} width={'20px'} />
              An Error Occured!
            </Alert>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default EditProfileModal;
