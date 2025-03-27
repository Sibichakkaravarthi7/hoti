import { Box } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useDebounce } from 'use-debounce'
import { GET_LOCATION_META } from '../../api/url/common'
import makeGetRequest from '../../api/utils/makeGetRequest'
import AppFormFieldWrapper from '../chakraOverrides/AppFormFieldWrapper'
import AppInput from '../chakraOverrides/AppInput'
import AppMultiSelect from '../chakraOverrides/AppMultiSelect'
import AppSelect from '../chakraOverrides/AppSelect'
import AppTextArea from '../chakraOverrides/AppTextArea'
import InternationalPhone from '../InternationalPhone'
import AgencyUpdateForm from './AgencyBrandUpdate'
import BrandUpdateForm from './BrandUpdateForm'
import InfluencerUpdateForm from './InfluencerUpdateForm'

const UserSpecificProfileEditModal = ({ errors, register, phoneChange, watch, data, control, userType, setValue }: {
    errors: any;
    register: any;
    phoneChange: any;
    watch: any;
    data: any;
    control: any;
    userType: any;
    setValue: any;
}) => {
    const userSpecificForm = () => {
        const [locationText, setLocationText] = React.useState("");
        const [locationValue] = useDebounce(locationText, 160);
        const { data: locationMetaData, isLoading, isError, refetch } = useQuery(["locationMeta", locationValue], () => makeGetRequest(GET_LOCATION_META(locationValue || '')));

        if (userType == "influencer") {
            return <InfluencerUpdateForm locationMeta={locationMetaData?.data} setLocationText={setLocationText} setValue={setValue} userType={userType} data={data} watch={watch} errors={errors} register={register} phoneChange={phoneChange} control={control} />
        } else if (userType == "agency") {
            return <AgencyUpdateForm locationMeta={locationMetaData?.data} setLocationText={setLocationText} setValue={setValue} userType={userType} data={data} watch={watch} errors={errors} register={register} phoneChange={phoneChange} control={control} />
        } else {
            return <BrandUpdateForm locationMeta={locationMetaData?.data} setLocationText={setLocationText} setValue={setValue} userType={userType} data={data} watch={watch} errors={errors} register={register} phoneChange={phoneChange} control={control} />
        }
    };


    return (
        <>{userSpecificForm()}</>

    )
}

export default UserSpecificProfileEditModal