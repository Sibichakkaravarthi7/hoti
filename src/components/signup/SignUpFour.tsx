import React from 'react';
import { Box } from '@chakra-ui/react';
import { useForm, useFormContext } from 'react-hook-form';
import AppFormFieldWrapper from '../chakraOverrides/AppFormFieldWrapper';
import AppMultiSelect from '../chakraOverrides/AppMultiSelect';
import makeGetRequest from '../../api/utils/makeGetRequest';
import { SIGNUP_META } from '../../api/url/common';
import { useQuery } from '@tanstack/react-query';

function SignUpFour() {
  const { register, handleSubmit, watch, control, setValue, formState:{errors} } = useFormContext();

  const { data, isLoading, isError, error } = useQuery([SIGNUP_META], () =>
    makeGetRequest(SIGNUP_META)
  );

  // console.log('watch', watch());
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
    <Box py="4em">
      <div style={{ width: '100%', display: 'grid', gap: '2.4em' }}>
        {data && (
          <>
            {watch('user_type') === "influencer" && <AppFormFieldWrapper label="Your Interests (Multi-Select) *" htmlFor={''}>
              <AppMultiSelect
                placeholder=""
                fw={400}
                otherProps={register('interests', { required: true })}
                control={control}
                bg={'appGrey.400'}
                options={getOptionStructure(data?.insterest)}
                dropDownIndicator
                name={'interests'}
                isError={errors.interests !== undefined}
              />
            </AppFormFieldWrapper>}
            <AppFormFieldWrapper label="Content Category (Multi-Select) *" htmlFor={''}>
              <AppMultiSelect
                isError={errors.content_category !== undefined}
                placeholder=""
                fw={400}
                otherProps={register('content_category', { required: true })}
                control={control}
                bg={'appGrey.400'}
                options={getOptionStructure(data?.content_category)}
                dropDownIndicator
                name={'content_category'}
              />
            </AppFormFieldWrapper>
          </>
        )}
      </div>
    </Box>
  );
}

export default SignUpFour;
