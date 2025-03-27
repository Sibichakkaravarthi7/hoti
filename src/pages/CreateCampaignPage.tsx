import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Checkbox,
  CloseButton,
  Flex,
  Spinner,
  useDisclosure,
  VStack
} from '@chakra-ui/react';
import React from 'react';
import AppText from '../components/chakraOverrides/AppText';
import AppBox from '../components/chakraOverrides/AppBox';
import AppFormFieldWrapper from '../components/chakraOverrides/AppFormFieldWrapper';
import AppInput from '../components/chakraOverrides/AppInput';
import { set, useForm } from 'react-hook-form';
import AppSelect from '../components/chakraOverrides/AppSelect';
import AppTextArea from '../components/chakraOverrides/AppTextArea';
import AppMultiSelect from '../components/chakraOverrides/AppMultiSelect';
import { AddFile, SearchIcon } from '../utils/customIcons';
import AppButton from '../components/chakraOverrides/AppButton';
import { appColors } from '../theme/foundations/appColor';
import AppModal from '../components/Modal/AppModal';
import InviteToHOTI from '../components/Modal/InviteToHOTI';
import useAppStore from './../store/index';
import getUserData from '../utils/getUserData';
import makeGetRequest from '../api/utils/makeGetRequest';
import { CREATE_CAMPAIGN_API, GET_FILE_ID, GET_USERS_LIST, SIGNUP_META } from '../api/url/common';
import { useMutation, useQuery } from '@tanstack/react-query';
import makePostRequest from '../api/utils/makePostRequest';
import Tick from "../assets/tick.png"
import { useNavigate } from 'react-router-dom';
import { MAKE_LIST_ALL_CAMPAIGNS_PAGE } from '../navigation/routes/common-routes';
import useIsUserVerified from '../utils/hooks/useIsUserVerified';
import { motion } from 'framer-motion';
import AppAlert from '../components/chakraOverrides/AppAlert';

const CreateCampaignPage = () => {
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const {
    register,
    watch,
    control,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm();

  // const navigate

  const { onToggle, isOpen, onClose, onOpen } = useDisclosure();

  const { onToggle: onSuccessToggle, isOpen: onSuccessIsOpen, onClose: onSuccessOnClose, onOpen: onSuccessOnOpen } = useDisclosure();

  const userData = getUserData();

  const navigate = useNavigate()

  const userType = userData.user_type;

  const { data: metaCategory } = useQuery([SIGNUP_META], () => makeGetRequest(SIGNUP_META));

  const { data: brandUsersList } = useQuery([GET_USERS_LIST('brand')], () =>
    makeGetRequest(GET_USERS_LIST('brand'))
  );
  const { data: influencerUsersList } = useQuery([GET_USERS_LIST('influencer')], () =>
    makeGetRequest(GET_USERS_LIST('influencer'))
  );
  const { isLoading: fileUploadLoading, error: fileUploadError, mutate: fileUploadMutate } = useMutation((body) =>
    makePostRequest(GET_FILE_ID, body), {
    onSuccess: (res) => {
      const idArr = res?.detail?.map((obj: any) => {
        return obj.id
      })
      if (watch("campaign_files")) {
        setValue("campaign_files", [...watch("campaign_files"), ...idArr]);
      } else {
        setValue("campaign_files", [...idArr]);
      }

    }
  }
  );
  const { isLoading: submitLoading, error: submitError, mutate: sudmitLoading } = useMutation((body) =>
    makePostRequest(CREATE_CAMPAIGN_API, body), {
    onSuccess: (res) => {
      if (res.id) {
        onSuccessOnOpen()
        setTimeout(() => {
          navigate("/" + userType + "/" + userData.user_id + "/" + MAKE_LIST_ALL_CAMPAIGNS_PAGE);
          onSuccessOnClose();
        }, 1300)
      }
    }
  }
  );

  const getOptionStructure = (arr: any, type: string) => {
    if (type == "category") {
      const arrToReturn = arr?.map((obj: any) => {
        return {
          label: obj?.interest_name || obj?.content_category,
          value: obj?.interest_name || obj?.content_category
        };
      });
      return arrToReturn;
    }

    if (type == "userType") {
      const arrToReturn = arr?.map((obj: any) => {
        return {
          label: obj?.first_name ? `${obj?.first_name} ${obj?.last_name}` : obj?.agency_brand_name,
          value: obj?.id
        };
      });
      return arrToReturn;
    }
  };

  const { isUserVerified } = useIsUserVerified();
  React.useEffect(() => {
    isUserVerified();
  }, []);




  const handleImageUpload = (e: any) => {
    // console.log("filessssssssssssssss", e.target.files)
    const files = Array.from(e.target.files);
    if (selectedFiles.length + files.length <= 4) {
      //@ts-ignore
      setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, ...files]);
      const formdata = new FormData();
      files.map((obj) => {
        //@ts-ignore
        formdata.append("media_files", obj);
      })
      //@ts-ignore
      fileUploadMutate(formdata);
    }
  }

  const emptyFilesSelected = () => {
    setSelectedFiles([]);
    setValue("campaign_files", [])
  };

  const onSubmit = (data: any, e: any) => submitData(data);
  const onError = (errors: any, e: any) => console.log(errors, e);

  const submitData = async (data: any) => {
    const _start_date = data.start_date;
    const [day, month, year] = _start_date.split("-");
    data["start_date"] = `${day}-${month}-${year}T00:00:00Z`;
    const _category = await data.content_category?.map((obj: any) => { return { content_category: obj.value } });
    // const _brands = await data?.associated_brands?.map((obj: any) => { return obj.value });
    const _influencer = await data?.associated_influencers?.map((obj: any) => { return obj.value });

    if (_influencer) {
      data["associated_influencers"] = _influencer;
    }
    // if (_brands) {
    //   // data["associated_brands"] = _brands;
    // }
    if (data.end_date) {
      const _end_date = data.end_date;
      const [day, month, year] = _end_date.split("-");
      data["end_date"] = `${day}-${month}-${year}T00:00:00Z`;
    }
    if (userType == "brand") {
      data["associated_brands"] = await userData.user_id;
    }

    data["content_category"] = _category;
    sudmitLoading(data);
  };

  const showUploadedFileList = () => {
    if (selectedFiles?.length == watch('campaign_files')?.length) {
      return selectedFiles?.map((file: any) => (
        <Box p="2px 5px" bg={appColors.appPrimary[600]} color="white" key={file?.lastModified}>{file?.name}</Box>
      ))
    } else {
      return <Spinner key={0} color={appColors.appPrimary[600]} />
    }

  };


  return (
    <motion.div className="page-layout"
      initial={{ opacity: 0, scale: "99%" }}
      animate={{ opacity: 1, scale: "100%" }}
      // transition={{ duration: 0.5 }}
      style={{ background: "white", padding: "2em", minHeight: "100vh" }}>
      {metaCategory && brandUsersList && influencerUsersList ? (
        <>
          <AppBox customStyles={{ p: '16px', bg: '#fff', width: '100%', mx: 'auto' }}>
            <AppText size="h1" color="appBlack.800" customStyles={{ pb: '2rem' }}>
              Create a Campaign
            </AppText>
            <form onSubmit={handleSubmit(onSubmit, onError)}>
              <VStack alignItems={'inherit'} gap="26px">
                <Box display={'flex'} gap={'33px'} flexWrap="wrap">
                  <Box flexBasis={{ base: '100%', md: '745px' }}>
                    <AppFormFieldWrapper label="Campaign Name" htmlFor={''}>
                      <AppInput
                        placeholder='Enter campaign name'
                        type={'text'}
                        {...register('campaign_name', { required: true })}
                        errorVariable={errors['campaign_name'] !== undefined}
                      />
                    </AppFormFieldWrapper>
                  </Box>
                  <Box
                    flexBasis={{ base: '100%', md: '0' }}
                    minW="300px"
                    maxW={'745px'}
                    flexGrow={1}>
                    <AppFormFieldWrapper label="Status" htmlFor={''}>
                      <AppSelect
                        {...register('status', { required: true })}
                        errorVariable={errors['staus'] !== undefined}
                        placeholder="">
                        <option value="Ongoing">Ongoing</option>
                        <option value="Completed">Completed</option>
                      </AppSelect>
                    </AppFormFieldWrapper>
                  </Box>
                </Box>

                <Box display={'flex'} gap={'33px'} flexWrap="wrap">
                  <Box flexBasis={{ base: '100%', md: '745px' }}>
                    <AppFormFieldWrapper label="Description" htmlFor={''}>
                      <AppTextArea
                        errorVariable={errors['username'] !== undefined}
                        placeholder="Describe the campaign in a few words..."
                        {...register('description', { required: true })}
                        size="lg"
                        customStyles={{ minH: '147px' }}
                      />
                    </AppFormFieldWrapper>
                  </Box>
                  <Box
                    flexBasis={{ base: '100%', md: '0' }}
                    minW="300px"
                    maxW={'745px'}
                    flexGrow={1}>
                    <AppFormFieldWrapper label="Category" htmlFor={''}>
                      <AppMultiSelect
                        name="content_category"
                        placeholder="Select"
                        control={control}
                        fs="18px"
                        fw={400}
                        otherProps={register('content_category', { required: true })}
                        bg={'appGrey.400'}
                        options={getOptionStructure(metaCategory?.content_category, "category")}
                        dropDownIndicator
                      />
                    </AppFormFieldWrapper>
                  </Box>
                </Box>

                <Box display={'flex'} gap={'33px'} flexWrap="wrap">
                  <Box flexBasis={{ base: '45%', md: '356px' }}>
                    <AppFormFieldWrapper label="Start Date" htmlFor={''}>
                      <AppInput
                        // errorVariable={errors['start_date'] !== undefined}
                        type={'date'}
                        placeholder="Select"
                        {...register('start_date', { required: true })}
                      />
                    </AppFormFieldWrapper>
                  </Box>
                  {watch('status') == 'Completed' && (
                    <Box flexBasis={{ base: '45%', md: '356px' }}>
                      <AppFormFieldWrapper label="End Date" htmlFor={''}>
                        <AppInput
                          // errorVariable={errors['end_date'] !== undefined}
                          type={'date'}
                          {...register('end_date', { required: true })}
                          placeholder="Select"
                        />
                      </AppFormFieldWrapper>
                    </Box>
                  )}
                </Box>

                <Box display={'flex'}>
                  <Box flexBasis={{ base: '100%', md: '745px' }}>
                    <AppFormFieldWrapper label="Deliverables" htmlFor={''}>
                      <AppInput type={'text'} placeholder="Add your deliverable" {...register('deliverables', { required: true })} />
                    </AppFormFieldWrapper>
                  </Box>
                </Box>
                {userType == 'influencer' && (
                  <Box display={'flex'} alignItems="center" gap={'72px'}>
                    <Box flexBasis={{ base: '100%', md: '522px' }}>
                      <AppFormFieldWrapper label="Associated Brand" htmlFor={''}>
                        {/* <AppMultiSelect
                          name="associated_brands"
                          placeholder="Search for brands..."
                          fs="18px"
                          control={control}
                          fw={400}
                          otherProps={register('associated_brands', { required: true })}
                          bg={'appGrey.400'}
                          options={getOptionStructure(brandUsersList, "userType")}
                          dropDownIndicator
                        /> */}
                        <AppMultiSelect
                          name={"associated_brands"}
                          options={brandUsersList?.map((obj: any) => ({ label: obj?.agency_brand_name, value: obj?.id }))}
                          placeholder={'Search for brand'}
                          // p="0.1em"
                          normalSelect
                          optionFs="15px"
                          onChange={(val: any) => setValue("associated_brands", val?.value)}
                          // isError={errors['location'] !== undefined}
                          required={true}

                        // h={"48px"}
                        // dropDownIndicator
                        />
                      </AppFormFieldWrapper>
                    </Box>
                    {/* <Box marginTop={'20px'}>
                      <Checkbox variant={'blackOulined_17'} {...register('request_brand_for_approval')}>
                        <AppText
                          customStyles={{ marginLeft: '13px' }}
                          fontSize="20px"
                          fontWeight={500}
                          color={appColors.appBlack[600]}>
                          Request brand for approval?
                        </AppText>
                      </Checkbox>
                    </Box> */}
                  </Box>

                )}
                {userType == 'agency' && (
                  <>
                    <Box display={'flex'}>
                      <Box flexBasis={{ base: '100%', md: '522px' }}>
                        <AppFormFieldWrapper label="Associated Influencers" htmlFor={''}>
                          <Box pos="relative">
                            <AppMultiSelect
                              fw={400}
                              control={control}
                              placeholder="Search for influencers..."
                              otherProps={register('associated_influencers', { required: true })}
                              bg={'appGrey.400'}
                              options={getOptionStructure(influencerUsersList, "userType")}
                              dropDownIndicator
                              name={'associated_influencers'}
                              fs="17px"
                              optionFs={"15px"}
                            />
                            <SearchIcon
                              background={appColors.appGrey[400]}
                              height={'15px'}
                              width="15px"
                              pos={'absolute'}
                              right="20px"
                              transform={'translateY(-100%)'}
                              top="63%"
                            />
                          </Box>
                        </AppFormFieldWrapper>
                      </Box>
                    </Box>
                    <Box display={'flex'} alignItems="center" gap={'72px'}>
                      <Box flexBasis={{ base: '100%', md: '522px' }}>
                        <AppFormFieldWrapper label="Associated Brand" htmlFor={''}>
                          <Box pos="relative">
                            {/* <AppSelect errorVariable={errors['associated_brands'] !== undefined} {...register('associated_brands', { required: true })} defaultValue={watch('associated_brands')} placeholder="Select">
                              {brandUsersList?.map((obj: any) => <option key={obj.id} value={obj.id}>{obj.agency_brand_name}</option>)}
                            </AppSelect> */}
                            <AppMultiSelect
                              name={"associated_brands"}
                              options={brandUsersList?.map((obj: any) => ({ label: obj?.agency_brand_name, value: obj?.id }))}
                              placeholder={'Search for brand'}
                              // p="0.1em"
                              normalSelect
                              optionFs="15px"
                              onChange={(val: any) => setValue("associated_brands", val?.value)}
                              // isError={errors['location'] !== undefined}
                              required={true}

                            // h={"48px"}
                            // dropDownIndicator
                            />
                            <SearchIcon
                              background={appColors.appGrey[400]}
                              height={'15px'}
                              width="15px"
                              pos={'absolute'}
                              right="20px"
                              transform={'translateY(-100%)'}
                              top="63%"
                            />
                          </Box>
                        </AppFormFieldWrapper>
                      </Box>
                      {/* <Box marginTop={'20px'}>
                        <Checkbox variant={'blackOulined_17'} {...register('request_brand_for_approval')}>
                          <AppText
                            customStyles={{ marginLeft: '13px' }}
                            fontSize="20px"
                            fontWeight={500}
                            color={appColors.appBlack[600]}>
                            Request brand for approval?
                          </AppText>
                        </Checkbox>
                      </Box> */}
                    </Box>
                  </>
                )}

                <Box display={'flex'}>
                  <Box>
                    <AppFormFieldWrapper label="Related Images/Videos" htmlFor={''}>
                      <input
                        style={{ display: 'none', border: '1px solid red' }}
                        type={'file'}
                        id="related-img-vids"
                        multiple
                        onChange={(e) => handleImageUpload(e)}
                      // {...register('related-img-vids', { required: true })}
                      />
                      <label htmlFor="related-img-vids" role={'button'}>
                        <Flex alignItems={'center'} gap={'10px'} mt="27px">
                          <AddFile height={'19px'} width={'19px'} />
                          <AppText>Upload Media</AppText>
                        </Flex>
                      </label>
                    </AppFormFieldWrapper>
                    {selectedFiles.length > 0 && <Flex alignItems={"flex-end"} justifyContent={"space-between"}>
                      <Flex mt="5px" gap={"7px"}>
                        {showUploadedFileList()}
                        {/* {selectedFiles.map((file: any) => {
                          return <Box p="2px 5px" bg={appColors.appPrimary[600]} color="white" key={file.name}>{file.name}</Box>
                        })} */}
                      </Flex>
                      <Box ml={"10px"} onClick={() => emptyFilesSelected()}><CloseButton fontSize={"10px"} /></Box>
                    </Flex>}

                  </Box>
                </Box>

                <Box>
                  <AppButton type='submit' variant="fillBrandColor">
                    Save Campaign
                  </AppButton>
                </Box>
              </VStack>
            </form>
          </AppBox>
          <AppModal
            iconColor=""
            isOpen={isOpen}
            onClose={onClose}
            maxWidth="693px"
            px={'21px'}
            title={''}>
            <InviteToHOTI />
          </AppModal>
        </>
      ) : ""}
      {onSuccessIsOpen && <AppAlert status="success" message="Campaign Created Successfully" />}
    </motion.div>
  );
};

export default CreateCampaignPage;
