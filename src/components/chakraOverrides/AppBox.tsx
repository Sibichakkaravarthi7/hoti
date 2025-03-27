import { Box, BoxProps, useStyleConfig } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

type AppBox = {
  size?: 'xs' | 'sm' | 'md';

  variant?: string;
  customStyles?: BoxProps;
  children?: ReactNode;
  onClick?: () => any;
  role?: string;
  className?: string
};

// eslint-disable-next-line react/function-component-definition
const AppBox: FC<AppBox> = ({ size = 'xs', variant, customStyles, children, onClick, role, className }) => {
  const styles = useStyleConfig('AppBox', { size, variant });

  return (
    <Box sx={styles} className={className} role={role} onClick={onClick} {...customStyles}>
      {children}
    </Box>
  );
};
export default AppBox;
