import React from 'react';
import { Box, Select } from '@chakra-ui/react';
import { useForm, useFormContext } from 'react-hook-form';
import AppFormFieldWrapper from '../chakraOverrides/AppFormFieldWrapper';
import AppSelect from '../chakraOverrides/AppSelect';
import AppTextArea from '../chakraOverrides/AppTextArea';
import AppInput from '../chakraOverrides/AppInput';
import BrandForm from './UserSpecificForm/BrandForm';
import AgencyForm from './UserSpecificForm/AgencyForm';
import InfluencerForm from './UserSpecificForm/InfluencerForm';
import { useQuery } from '@tanstack/react-query';
import makeGetRequest from '../../api/utils/makeGetRequest';
import { GET_LOCATION_META } from '../../api/url/common';
import { useDebounce } from 'use-debounce';
import { ChakraStylesConfig } from 'chakra-react-select';
import { appColors } from '../../theme/foundations/appColor';

function UserSpecificForm() {
  const [locationText, setLocationText] = React.useState("");
  const [locationValue] = useDebounce(locationText, 160);
  const { register, watch, formState: { errors }, setValue } = useFormContext();
  const { data: locationMetaData, isLoading, isError, refetch } = useQuery(["locationMeta", locationValue], () => makeGetRequest(GET_LOCATION_META(locationValue || '')));
// const locationMetaData = [
//   {
//     label: "Chennai",
//     value: "Chennai",    
//   },
//   {
//     label: "Mumbai",
//     value: "Mumbai",    
//   }
// ]

  const giveUserSpecificForm = () => {
    const userType = watch('user_type');
    if (userType == "influencer") {
      return <InfluencerForm setValue={setValue} register={register} watch={watch} errors={errors} locationMeta={locationMetaData?.data} setLocationText={setLocationText} />
    } else if (userType == "agency") {
      return <AgencyForm setValue={setValue} register={register} watch={watch} errors={errors} locationMeta={locationMetaData?.data} setLocationText={setLocationText} />
    } else {
      return <BrandForm setValue={setValue} register={register} watch={watch} errors={errors} locationMeta={locationMetaData?.data} setLocationText={setLocationText} />
    }
  };


  return (
    <Box py="4em">
      <Box
        width='100%'
        display={['flex', 'grid']}
        flexFlow="column"
        gridTemplateColumns='repeat(2,1fr)'
        gap='2.4em'
      >
        {giveUserSpecificForm()}
      </Box>
    </Box>
  );
}

export default UserSpecificForm;
