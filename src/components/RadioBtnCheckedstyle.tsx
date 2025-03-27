/* eslint-disable react/display-name */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Box, Checkbox, HStack, Radio } from '@chakra-ui/react';
import React from 'react';
import { appColors } from '../theme/foundations/appColor';
import { CheckedIcon } from '../utils/customIcons';
import AppText from './chakraOverrides/AppText';

type AppInput = {
  isDisabled?: boolean;
  isChecked: boolean;
  value: any;
  text: string;
};

// eslint-disable-next-line react/display-name, react/prop-types
const RadioBtnCheckedstyle: React.FC<AppInput> = React.forwardRef(({ isChecked, isDisabled, value, text, ...rest }, ref) => {
  return (
    <label htmlFor={"test"} style={{ position: "relative" }}>
      <Radio ref={ref} value={value} {...rest} >
        <HStack gap="18px">
          {isChecked ? <CheckedIcon h={"27px"} w="27px" /> : <Box h={"27px"} w="27px" borderRadius={"4px"} border={"3px solid #9D9D9D"}> </Box>}
          <AppText
            color={isChecked ? appColors.appBlack[800] : appColors.appBlack[400]}
            fontWeight={500}
            fontSize={'20px'}
            >
            {text}
          </AppText>
        </HStack>
      </Radio>
    </label>

  );
})

export default RadioBtnCheckedstyle