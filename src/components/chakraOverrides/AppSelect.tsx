import { FormControl, FormErrorMessage, Select, SelectProps } from '@chakra-ui/react';
import { FC, forwardRef } from 'react';

type AppSelect = {
  size?: string;
  variant?: string;
  name?: string;
  placeholder?: string;
  children?: React.ReactNode;
  onChange?: (e: any) => any;
  options?: React.ReactNode;
  customStyles?: SelectProps;
  isRequired?: boolean;
  ref?: any;
  value?: string;
  isDisabled?: boolean;
  defaultValue? :string;
  errorVariable?: any;
  formMessage?: any
};

// eslint-disable-next-line react/display-name
const AppSelect: FC<AppSelect> = forwardRef(
  (
    {
      size,
      variant,
      name,
      placeholder,
      children,
      options,
      onChange,
      customStyles,
      isRequired,
      value,
      isDisabled,
      errorVariable,
      formMessage,
      defaultValue="",
      
    },
    ref
  ) => (
    <FormControl isInvalid={errorVariable}>
    <Select
      placeholder={placeholder}
      size={size}
      name={name}
      // @ts-ignore
      ref={ref}
      onChange={onChange}
      variant={variant}
      required={isRequired}
      disabled={isDisabled}
      defaultValue={defaultValue}
      {...customStyles}
      value={value}
      
    >
      {options || children}
    </Select>
    {formMessage && <FormErrorMessage>{formMessage}</FormErrorMessage>}
    </FormControl>
  )
);

export default AppSelect;
