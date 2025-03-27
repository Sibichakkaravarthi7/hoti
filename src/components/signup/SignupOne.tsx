import React from 'react';
import { Box, FormControl, FormErrorMessage, Radio, RadioGroup, Stack } from '@chakra-ui/react';
import { useForm, useFormContext } from 'react-hook-form';
import AppFormFieldWrapper from '../chakraOverrides/AppFormFieldWrapper';
import AppSelect from '../chakraOverrides/AppSelect';
import AppTextArea from '../chakraOverrides/AppTextArea';
import AppInput from '../chakraOverrides/AppInput';
import { BiCheck } from 'react-icons/bi';
import AppText from '../chakraOverrides/AppText';
import { appColors } from '../../theme/foundations/appColor';
import RadioBtnCheckedstyle from '../RadioBtnCheckedstyle';

function SignupOne() {
  const { register, handleSubmit, watch, formState: { errors } } = useFormContext();
  
  return (
    <Box py="4em">
      <div>
         <FormControl isInvalid={errors['user_type'] !== undefined}>
          <RadioGroup defaultValue={watch('user_type')} variant={'orangeBox'}>
          <Stack direction="column" gap={'61px'}>
            <RadioBtnCheckedstyle {...register('user_type', { required: true })} isChecked={watch('user_type') === 'brand'} value="brand" text='I’m a brand' />
            <RadioBtnCheckedstyle {...register('user_type', { required: true })} isChecked={watch('user_type') === 'influencer'} value="influencer" text='I’m an influencer' />
            <RadioBtnCheckedstyle {...register('user_type', { required: true })} isChecked={watch('user_type') === 'agency'} value="agency" text='I’m an agency' />
          </Stack>
        </RadioGroup>
        <FormErrorMessage mt={"40px"}>Please select a value to proceed further</FormErrorMessage>
        </FormControl>
      </div>
    </Box>
  );
}

export default SignupOne;
