import { FormControl, FormErrorMessage, Input, InputProps } from '@chakra-ui/react';
import React, { forwardRef, FC } from 'react';

type AppInput = {
  placeholder?: string;
  name?: string;
  value?: InputProps['value'];
  defaultValue?: InputProps['value'];
  onChange?: (e: any) => any;
  onWheel?: (e: any) => any;
  label?: string;
  type?: InputProps['type'];
  customStyles?: InputProps;
  id?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  variant?: string;
  ref?: React.Ref<any>;
  size?: InputProps['size'];
  isInvalid?: boolean;
  onKeyPress?: (e: any) => any;
  accept?: any;
  errorVariable?: any;
  formMessage?: any;
};

// eslint-disable-next-line react/display-name
const AppInput: FC<AppInput> = forwardRef(
  (
    {
      name,
      value,
      defaultValue,
      onChange,
      onWheel,
      type = 'text',
      customStyles,
      id,
      isRequired,
      isDisabled,
      variant,
      size,
      isInvalid,
      onKeyPress,
      accept,
      errorVariable,
      formMessage,
      placeholder="",
      ...restProps
    },
    ref
  ) => (
    <FormControl isInvalid={errorVariable}>
      <Input
      id={id}
      ref={ref}
      placeholder={placeholder}
      name={name}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      onWheel={onWheel}
      type={type}
      required={isRequired}
      variant={variant}
      isDisabled={isDisabled}
      size={size}
      isInvalid={isInvalid}
      errorBorderColor="red.300"
      {...customStyles}
      {...restProps}
      onKeyPress={onKeyPress}
      accept={accept}
    />
    {formMessage && <FormErrorMessage>{formMessage}</FormErrorMessage>}
    </FormControl>
    
  )
);

export default AppInput;
