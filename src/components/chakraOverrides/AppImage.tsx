import { Image, ImageProps, useStyleConfig } from '@chakra-ui/react';

type AppImageProps = {
  size?: string;
  variant?: string;
  src: string;
  customStyles?: ImageProps;
  fallbackSrc?: string;
  fit?: string;
  alt?: string;
  className?: string;
};

function AppImage({ size, variant, src, customStyles, fallbackSrc, fit, alt, className }: AppImageProps) {
  const styles = useStyleConfig('AppImage', { size, variant });

  //@ts-ignore
  return <Image sx={styles} src={src} {...customStyles} className={className} fallbackSrc={fallbackSrc} fit={fit} alt={alt} />;
}

export default AppImage;
