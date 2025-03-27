import { Button, Image, VStack } from '@chakra-ui/react'
import React from 'react'
import { appColors } from '../../theme/foundations/appColor'
import { LinkIcon } from '../../utils/customIcons'
import AppButton from '../chakraOverrides/AppButton'
import AppText from '../chakraOverrides/AppText'
import WelcomePic from '../../assets/welcome-page-group-pic.png'

const InviteToHOTI = () => {
  return (
    <VStack>
        <AppText size={'textmedium1'}>Can’t find an influencer you worked with?</AppText>
        <AppText color={appColors.appPrimary[600]} size='h1'>Invite them to HOTI</AppText>
        <Image maxW={"273px"} margin="36px 0px 34px 0px !important" src={WelcomePic} />
        <Button fontSize="18px" padding={"12px 22px"} mb="27px !important" rightIcon={<LinkIcon ml={"4px"} />} size="" variant='fillBrandColor'>Copy Invite Link</Button>
    </VStack>
  )
}

export default InviteToHOTI