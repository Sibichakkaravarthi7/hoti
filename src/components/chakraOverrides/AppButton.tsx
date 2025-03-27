import { Button, ButtonProps } from '@chakra-ui/react';
import React from 'react';

type ButtonPropsType = {
  size?: string;
  title?: string;
  children?: React.ReactNode;
  onClick?: () => any;
  variant?: string;
  customStyles?: ButtonProps;
  isLoading?: boolean;
  type?: ButtonProps['type'];
  isDisabled?: boolean;
  rightIcon?: React.ReactElement<any, string | React.JSXElementConstructor<any>> | undefined;
  leftIcon?: React.ReactElement<any, string | React.JSXElementConstructor<any>> | undefined;
};

const AppButton = React.forwardRef<HTMLButtonElement, ButtonPropsType>(
  (
    {
      title,
      children,
      onClick,
      variant = 'solid',
      customStyles,
      isLoading,
      type,
      isDisabled,
      leftIcon,
      rightIcon,
      size
    },
    ref
  ) => (
    <Button
      size={size}
      type={type}
      onClick={onClick}
      variant={variant}
      isLoading={isLoading}
      isDisabled={isDisabled}
      rightIcon={rightIcon}
      leftIcon={leftIcon}
      {...customStyles}
      ref={ref}
    >
      {title || children}
    </Button>
  )
);

export default AppButton;
