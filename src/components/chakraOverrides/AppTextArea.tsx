/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { FormControl, FormErrorMessage, Textarea, TextareaProps } from '@chakra-ui/react';
import React from 'react';

interface AppTextAreaType {
  size?: string;
  placeholder?: string;
  customStyles?: TextareaProps;
  ref?: React.Ref<any>;
  errorVariable?: any;
  formMessage?: any;
  maxLength?: number;
}

const AppTextArea: React.FC<AppTextAreaType> = React.forwardRef(
  ({ placeholder, size = 'sm', customStyles, formMessage, errorVariable, maxLength, ...restProps }, ref) => {
    return (
      <FormControl isInvalid={errorVariable}>
        <Textarea maxLength={maxLength} border={errorVariable ? "2px solid #FC8181" : "2px solid transparent"} ref={ref} placeholder={placeholder} size={size} {...restProps} {...customStyles} />
      </FormControl>
    );
  }
);

export default AppTextArea;
