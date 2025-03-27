import { Text, TextProps } from '@chakra-ui/react';
import { FC, forwardRef, ReactNode, Ref } from 'react';

type AppText = {
  title?: string;
  size?: TextProps['size'];
  fontSize?: string;
  fontWeight?: string | number;
  variant?: string;
  color?: string;
  customStyles?: TextProps;
  children?: any;
  onClick?: () => any;
  ref?: Ref<any>;
};

// eslint-disable-next-line react/display-name
const AppText: FC<AppText> = forwardRef(
  // eslint-disable-next-line react/prop-types
  ({ title, size, fontSize, fontWeight, variant, children, color, customStyles, onClick }, ref) => (
    <Text
      size={size}
      fontSize={fontSize}
      fontWeight={fontWeight}
      ref={ref}
      variant={variant}
      color={color}
      onClick={onClick}
      {...customStyles}
    >
      {title || children}
    </Text>
  )
);

export default AppText;
