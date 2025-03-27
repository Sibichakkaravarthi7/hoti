import React from 'react';
import { Box } from '@chakra-ui/react';
import { useForm, useFormContext } from 'react-hook-form';
import AppFormFieldWrapper from '../chakraOverrides/AppFormFieldWrapper';
import AppSelect from '../chakraOverrides/AppSelect';
import AppTextArea from '../chakraOverrides/AppTextArea';
import AppInput from '../chakraOverrides/AppInput';
import AppBox from '../chakraOverrides/AppBox';
import { BiHide, BiShow } from 'react-icons/bi';
import usePasswordVisibility from '../../utils/hooks/usePasswordVisibility';
import { appColors } from '../../theme/foundations/appColor';
import AppText from '../chakraOverrides/AppText';

function SignUpThree() {
  const { register, watch, formState: { errors } } = useFormContext();
  const { showPassword, togglePasswordVisibility } = usePasswordVisibility();

  return (
    <Box py="4em" maxWidth={{ sm: "100%", md: "355px" }}>
      <div
        style={{
          width: '100%',
          display: 'grid',
          gridTemplateRows: 'repeat(2,1fr)',
          gap: '2.4em'
        }}
      >
        <AppFormFieldWrapper label="Username *" htmlFor={''}>
          <AppInput placeholder='Enter your username' type={'text'} {...register('username', {
            required: true, minLength: {
              value: 5,
              message: `Username must be at least ${5} characters long`
            }
          })} errorVariable={errors['username'] !== undefined} />
          {errors.username && <AppText variant="inputError">{errors.username.message}</AppText>}
        </AppFormFieldWrapper>

        <AppFormFieldWrapper label="Password *" htmlFor={''}>
          {/* <AppInput errorVariable={errors['password'] !== undefined} type={'password'} {...register('password', { required: true })} /> */}
          <AppInput errorVariable={errors.password} type={showPassword ? 'show' : 'password'} {...register('password', { required: true })} placeholder="Enter your password" customStyles={{ paddingRight: '50px' }} />
          <AppBox role="button" onClick={() => togglePasswordVisibility()} customStyles={{ position: 'absolute', right: '6px', top: '70%', transform: 'translate(-50%, -50%)', fontSize: '20px', color: appColors.appGrey[800] }}>
            {showPassword ? <BiShow /> : <BiHide />}
          </AppBox>
        </AppFormFieldWrapper>

      </div>
    </Box>
  );
}

export default SignUpThree;
