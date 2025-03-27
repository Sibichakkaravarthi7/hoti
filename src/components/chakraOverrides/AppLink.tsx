import { Link as RouterLink } from 'react-router-dom';
import { Link, LinkProps } from '@chakra-ui/react';

type AppLinkProps = {
  href?: string;
  variant?: string;
  size?: string;
  fontWeight?: string;
  title?: string;
  customStyles?: LinkProps;
  color?: string;
  onClick?: () => any;
  children?: any;
};

function AppLink({
  href = '#',
  variant,
  size,
  fontWeight,
  title,
  customStyles,
  color,
  onClick,
  children,
}: AppLinkProps) {
  return (
    <RouterLink to={href} onClick={onClick}>
      <Link
        as="span"
        href={href}
        fontSize={size}
        fontWeight={fontWeight}
        variant={variant}
        color={color}
        {...customStyles}
      >
        {title || children}
      </Link>
    </RouterLink>
  );
}

export default AppLink;
