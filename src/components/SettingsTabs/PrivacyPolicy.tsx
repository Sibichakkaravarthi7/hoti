import { Box, Text } from '@chakra-ui/layout'
import React from 'react'
import { appColors } from '../../theme/foundations/appColor'

const PrivacyPolicy = () => {
  return (
    <Box>
      <Text p="20px 0px" borderBottom={`3px solid ${appColors.appPrimary[600]}`} fontWeight={600} fontSize="28px" color={appColors.appPrimary[600]}>
        Privacy Policy
      </Text>
    </Box>
  )
}

export default PrivacyPolicy