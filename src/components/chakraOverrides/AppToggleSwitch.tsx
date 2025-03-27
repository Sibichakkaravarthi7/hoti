/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { BoxProps, Switch, SwitchProps } from '@chakra-ui/react';
import React, { FC, forwardRef } from 'react';
import AppBox from './AppBox';
import AppText from './AppText';

type AppToggleSwitch = {
  customStyles?: BoxProps;
  title?: string;
  name?: string;
  isChecked?: boolean;
  isRequired?: boolean;
  onChange?: () => any;
  toggleCustomStyles?: SwitchProps;
  isDisabled?: boolean;
  ref?: React.Ref<any>;
};

const AppToggleSwitch: FC<AppToggleSwitch> = forwardRef(
  (
    { customStyles, title, name, isChecked, isRequired, onChange, toggleCustomStyles, isDisabled },
    ref
  ) => (
    <AppBox customStyles={customStyles}>
      {title && (
        <AppText title={title} variant="labelTextDefault">
          {isRequired && (
            <AppText title=" *" variant="errorMessage" customStyles={{ display: 'inline' }} />
          )}
        </AppText>
      )}
      <Switch
        ref={ref}
        // @ts-ignore

        name={name}
        // @ts-ignore
        isChecked={isChecked}
        onChange={onChange}
        variant="highlightDisabled"
        isDisabled={isDisabled}
        {...toggleCustomStyles}
      />
    </AppBox>
  )
);

export default AppToggleSwitch;
