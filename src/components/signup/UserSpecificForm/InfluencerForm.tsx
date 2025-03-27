import React from 'react';
import { Box } from '@chakra-ui/react';
import { useForm, useFormContext } from 'react-hook-form';
import AppFormFieldWrapper from '../../chakraOverrides/AppFormFieldWrapper';
import AppSelect from '../../chakraOverrides/AppSelect';
import AppTextArea from '../../chakraOverrides/AppTextArea';
import AppInput from '../../chakraOverrides/AppInput';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import InternationalPhone from '../../InternationalPhone';
import AppText from '../../chakraOverrides/AppText';
import AppMultiSelect from '../../chakraOverrides/AppMultiSelect';

function InfluencerForm({ register, watch, errors, setValue, locationMeta, setLocationText }: { register: any; watch: any; errors: any; setValue: any, locationMeta: any, setLocationText: any }) {
    // const [selCountry, setSelCountry] = React.useState('');
    const phoneChange = (num: any, country: string) => {
        setValue('phone', num);
        setValue('country', country);
    }
    return <>
        <AppFormFieldWrapper label="First Name *" htmlFor={''}>
            <AppInput errorVariable={errors['first_name'] !== undefined} type={'text'} {...register('first_name', { required: true })} />
        </AppFormFieldWrapper>

        <AppFormFieldWrapper label="Last Name *" htmlFor={''}>
            <AppInput errorVariable={errors['last_name'] !== undefined} type={'text'} {...register('last_name', { required: true })} />
        </AppFormFieldWrapper>

        <AppFormFieldWrapper label="Contact *" htmlFor={''}>
            <InternationalPhone watch={watch} phoneChange={phoneChange} isError={errors['phone'] !== undefined} />
            {/* <AppInput errorVariable={errors['phone'] !== undefined} type={'number'} {...register('phone', { required: true })} /> */}
        </AppFormFieldWrapper>

        <AppFormFieldWrapper label="Location *" htmlFor={''}>
            {/* <AppInput errorVariable={errors['location'] !== undefined} type={'text'} {...register('location', { required: true })} /> */}
            <AppMultiSelect
                name={"location"}
                options={locationMeta}
                placeholder={'Search City'}
                // p="0.1em"
                normalSelect
                optionFs="15px"
                onChange={(val: any) => setValue("location", val?.value)}
                onInputChange={(val: string) => setLocationText(val)}
                isError={errors['location'] !== undefined}
                // h={"48px"}
                dropDownIndicator
            />

        </AppFormFieldWrapper>

        <AppFormFieldWrapper label="E-mail *" htmlFor={''}>
            <AppInput type={'email'} errorVariable={errors['email'] !== undefined} {...register('email', { required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ })} />
            {errors?.email?.type == "pattern" && <AppText variant="inputError">Enter a valid email address</AppText>}
        </AppFormFieldWrapper>

        <AppFormFieldWrapper label="Date of Birth *" htmlFor={''}>
            <AppInput type={"date"} errorVariable={errors['date_of_birth'] !== undefined} {...register('date_of_birth', { required: true })} placeholder="Select" />
        </AppFormFieldWrapper>

        <AppFormFieldWrapper label="Gender *" htmlFor={''}>
            <AppMultiSelect
                name={"gender"}
                options={[{ label: "Male", value: "Male" }, { label: "Female", value: "Female" }, { label: "Others", value: "Others" }]}
                placeholder={'Select Gender'}
                // p="0.1em"
                normalSelect
                optionFs="15px"
                onChange={(val: any) => setValue("gender", val?.value)}
                isError={errors['gender'] !== undefined}
                // h={"48px"}
                isSearchable={false}
                defaultValue={[{ label: "Male", value: "male" }]}
                dropDownIndicator
            />
        </AppFormFieldWrapper>



        <Box gridColumn="1/3">
            <AppFormFieldWrapper label="Short Bio *" htmlFor={''}>
                <AppTextArea maxLength={150} {...register('short_bio', { required: true })} errorVariable={errors['short_bio'] !== undefined} size="lg" customStyles={{ minH: "85px" }} />
            </AppFormFieldWrapper>
        </Box>

    </>
}

export default InfluencerForm;
