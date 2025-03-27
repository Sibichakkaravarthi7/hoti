import { Grid, GridProps, useStyleConfig } from '@chakra-ui/react';

type AppGridsProps = {
  children: React.ReactNode;
  size?: string;
  variant?: string;

  customStyles?: GridProps;
};

function AppGrid({ children, size, variant, customStyles }: AppGridsProps) {
  const styles = useStyleConfig('AppGrid', { size, variant });
  return (
    <Grid sx={styles} {...customStyles}>
      {children}
    </Grid>
  );
}

export default AppGrid;
