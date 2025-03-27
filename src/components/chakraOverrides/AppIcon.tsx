import { Icon, IconProps, useStyleConfig } from '@chakra-ui/react';
import { IconType } from 'react-icons';

type AppIcon = {
  icon: IconType | any;
  size?: string;
  boxSize?: number | string;
  variant?: string;
  customStyles?: IconProps;
  onClick?: (e: any) => any;
  color?: string;
  cursor?: string;
};
function AppIcon({
  icon,
  size,
  boxSize,
  variant,
  customStyles,
  onClick,
  color,
  cursor = 'pointer'
}: AppIcon) {
  const styles = useStyleConfig('AppIcon', { size, variant });

  return (
    <Icon
      sx={styles}
      boxSize={boxSize}
      as={icon}
      onClick={onClick}
      {...customStyles}
      color={color}
      cursor={cursor}
    />
  );
}

export default AppIcon;
