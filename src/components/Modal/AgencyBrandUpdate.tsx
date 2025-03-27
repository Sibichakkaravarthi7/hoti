import { Box } from '@chakra-ui/react'
import React from 'react'
import AppFormFieldWrapper from '../chakraOverrides/AppFormFieldWrapper'
import AppInput from '../chakraOverrides/AppInput'
import AppMultiSelect from '../chakraOverrides/AppMultiSelect'
import AppSelect from '../chakraOverrides/AppSelect'
import AppTextArea from '../chakraOverrides/AppTextArea'
import InternationalPhone from '../InternationalPhone'

const AgencyUpdateForm = ({ errors, register, phoneChange, watch, data, control, userType, locationMeta, setLocationText, setValue }: {
    errors: any;
    register: any;
    phoneChange: any;
    watch: any;
    data: any;
    control: any;
    userType: any;
    locationMeta: any;
    setLocationText: any;
    setValue: any;
}) => {

    const getOptionStructure = (arr: any) => {
        const arrToReturn = arr?.map((obj: any) => {
            return {
                label: obj?.interest_name || obj?.content_category,
                value: obj?.interest_name || obj?.content_category,
            };
        });
        return arrToReturn;
    };

    return (
        <>
            <AppFormFieldWrapper labelFontSize={"20px"} label={`Agency name`} required htmlFor={''}>
                <AppInput errorVariable={errors['agency_name'] !== undefined} type={'text'} {...register('agency_name', { required: true })} />
            </AppFormFieldWrapper>

            <AppFormFieldWrapper labelFontSize={"20px"} label="Website" required htmlFor={''}>
                <AppInput errorVariable={errors['website'] !== undefined} type={'text'} {...register('website', { required: true })} />
            </AppFormFieldWrapper>
            <AppFormFieldWrapper labelFontSize={"20px"} label="Contact *" htmlFor={''}>

                <InternationalPhone isError={watch('phoneError')} fs="17px" watch={watch} phoneChange={phoneChange} />
            </AppFormFieldWrapper>

            <AppFormFieldWrapper labelFontSize={"16px"} label="Location" htmlFor={''}>
                <AppMultiSelect
                    name={"location"}
                    options={locationMeta}
                    placeholder={'Search City'}
                    fs="17px"
                    p="0.3em"
                    defaultValue={{ label: watch('location'), value: watch('location') }}
                    normalSelect={true}
                    // value={filters?.location}
                    optionFs="15px"
                    onChange={(val: any) => setValue('location', val.value)}
                    onInputChange={(val: string) => setLocationText(val)}
                />
            </AppFormFieldWrapper>

            {/* <AppFormFieldWrapper labelFontSize={"20px"} label="Date of Birth *" htmlFor={''}>
                <AppInput type={"date"} errorVariable={errors['date_of_birth'] !== undefined} {...register('date_of_birth', { required: true })} placeholder="Select" />
            </AppFormFieldWrapper> */}

            <Box gridColumn="1/3">
                <AppFormFieldWrapper labelFontSize={"20px"} label="Short Bio" htmlFor={''}>
                    <AppTextArea {...register('short_bio', { required: true })} size="lg" customStyles={{ minH: "85px" }} />
                </AppFormFieldWrapper>
            </Box>
            <Box gridColumn="1/3">
                <AppFormFieldWrapper labelFontSize={"20px"} label="Content Category (Multi-Select)" required htmlFor={''}>
                    <AppMultiSelect
                        placeholder=""
                        fw={400}
                        otherProps={register('content_category', { required: true })}
                        control={control}
                        bg={'appGrey.400'}
                        options={getOptionStructure(data?.content_category)}
                        dropDownIndicator
                        name={'content_category'}
                        isError={errors.content_category !== undefined}
                    />                        </AppFormFieldWrapper>
            </Box>
        </>
    )
}

export default AgencyUpdateForm