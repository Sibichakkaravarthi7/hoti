import React from 'react';
import { Box, Select } from '@chakra-ui/react';
import { useForm, useFormContext } from 'react-hook-form';
import AppFormFieldWrapper from '../../chakraOverrides/AppFormFieldWrapper';
import AppSelect from '../../chakraOverrides/AppSelect';
import AppTextArea from '../../chakraOverrides/AppTextArea';
import AppInput from '../../chakraOverrides/AppInput';
import { PhoneInput } from 'react-international-phone';
import InternationalPhone from '../../InternationalPhone';
import AppText from '../../chakraOverrides/AppText';
import AppMultiSelect from '../../chakraOverrides/AppMultiSelect';

function AgencyForm({ register, watch, errors, setValue, locationMeta, setLocationText }: { register: any; watch: any; errors: any, setValue: any, locationMeta: any, setLocationText: any }) {
    const phoneChange = (num: any) => {
        setValue('phone', num);
    }
    return <>
        <AppFormFieldWrapper label="Agency Name *" htmlFor={''}>
            <AppInput errorVariable={errors['agency_name'] !== undefined} type={'text'} {...register('agency_name', { required: true })} />
        </AppFormFieldWrapper>

        <AppFormFieldWrapper label="Location *" htmlFor={''}>
            <AppMultiSelect
                name={"location"}
                options={locationMeta}
                placeholder={'Search City'}
                normalSelect
                optionFs="15px"
                onChange={(val: any) => setValue("location", val?.value)}
                onInputChange={(val: string) => setLocationText(val)}
                isError={errors['location'] !== undefined}
                dropDownIndicator
            />
        </AppFormFieldWrapper>

        <AppFormFieldWrapper label="Contact *" htmlFor={''}>
            <InternationalPhone watch={watch} phoneChange={phoneChange} isError={errors['phone'] !== undefined} />
        </AppFormFieldWrapper>

        <AppFormFieldWrapper label="E-mail *" htmlFor={''}>
            <AppInput type={'email'} errorVariable={errors['email'] !== undefined} {...register('email', { required: true, pattern: { value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, message: "Enter a valid email address" } })} />
            {errors?.email?.type == "pattern" && <AppText variant="inputError">Enter a valid email address</AppText>}
        </AppFormFieldWrapper>

        <AppFormFieldWrapper label="Website *" htmlFor={''}>
            <AppInput errorVariable={errors['website'] !== undefined} type={'text'} {...register('website', { required: true, pattern: /^(https?:\/\/)?(www\.)?([a-zA-Z0-9]+\.[a-zA-Z]{2,})([a-zA-Z0-9\/\?\=\&\%\#\-\_\.\~\+\@]*)*$/ })} />
            {errors?.website?.type == "pattern" && <AppText variant="inputError">Enter a valid website</AppText>}
        </AppFormFieldWrapper>

        <Box gridColumn="1/3">
            <AppFormFieldWrapper label="Short Bio *" htmlFor={''}>
                <AppTextArea maxLength={150} {...register('short_bio', { required: true })} errorVariable={errors['short_bio'] !== undefined} size="lg" customStyles={{ minH: "85px" }} />
            </AppFormFieldWrapper>
        </Box>

    </>
}

export default AgencyForm;
