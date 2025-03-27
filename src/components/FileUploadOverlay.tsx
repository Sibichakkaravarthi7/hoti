import { FormLabel, HStack } from '@chakra-ui/react';
import React from 'react';
import AppInput from './chakraOverrides/AppInput';
import AppText from './chakraOverrides/AppText';

const FileUploadOverlay = ({
  id,
  text,
  icon,
  iconDirection = 'right',
  customStyles,
  name,
  onChange,
  ...restProps
}: {
  id?: string;
  text: string;
  icon?: any;
  iconDirection?: string;
  customStyles?: any;
  name?: string;
  onChange: any, 

}) => {
  return (
    <>
      <AppInput
        id={id}
        type={'file'}
        accept="image/png, image/gif, image/jpeg"
        customStyles={{ display: 'none' }}
        name={name}
        onChange={onChange}
      />
      <FormLabel
        display={'flex'}
        justifyContent="center"
        alignItems={'center'}
        htmlFor={id}
        color={'white'}
        background={'rgba(0, 0, 0, 0.3)'}
        position="absolute"
        top={'0px'}
        left={'0'}
        height="100%"
        width="100%"
        role={'button'}
        {...customStyles}
        {...restProps}>
        <HStack>
          {icon && iconDirection == 'left' && icon}
          <AppText fontWeight={600} variant="h3">
            {text}
          </AppText>
          {icon && iconDirection == 'right' && icon}
        </HStack>
      </FormLabel>
    </>
  );
};

export default FileUploadOverlay;
