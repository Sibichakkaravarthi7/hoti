import { Box, Flex, HStack, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import AppArrowIcon from '../AppArrowIcon';
import AppBox from '../chakraOverrides/AppBox';
import AppCard from '../chakraOverrides/AppCard';
import AppTag from '../chakraOverrides/AppTag';
import AppText from '../chakraOverrides/AppText';
import AppProfilePreviewCard from './AppProfilePreviewCard';
import AppStatsGrid from '../AppStatsGrid';
import AppTagWrapper from '../AppTagWrapper';
import { INFLUENCER_PROFILE_PAGE } from '../../navigation/routes';
import { Link } from 'react-router-dom';
import { MAKE_PROFILE_PAGE_URL } from '../../navigation/routes/common-routes';
import AppImage from '../chakraOverrides/AppImage';
import twitterLogo from '../../assets/logos/twitter-logo.svg';
import instagramLogo from '../../assets/logos/instagram-logo.svg';
import facebookLogo from '../../assets/logos/facebook-logo.svg';
import { motion } from 'framer-motion';
import { SearchProfilesI } from '../../Types';


function AppProfilePreviewCardWithStats({ profileData, noSaveOption = false }: { profileData: SearchProfilesI, noSaveOption?: boolean }) {
  // console.log("profileData", profileData);
  return (
    <motion.div 
    whileHover={{ scale: "" }}  initial={{ opacity: 0, transform: "translateY(2%)" }}
    whileInView={{ opacity: 1, transform: "translateY(0%)" }}
    // transition={{ delay: .1 }}
    // animate={{ opacity: 1, transform: "translateY(0%)" }}
    
    // viewport={{ once: false }}
    >
      <AppCard variant={'profilePreviewWithStats'}>
        <Stack display={["none", "block"]} gap="1em">
          <AppBox>
            <AppProfilePreviewCard noShadow noSaveOption={noSaveOption} profile_id={profileData.user || profileData.id} variant="profilePreviewWithStats" hideTags={true} cardData={profileData} />
          </AppBox>
          <Box borderTop="1px solid  #EAE8E9" borderBottom="1px solid  #EAE8E9" py="1.9em">
            <Flex textAlign={"center"}>
              <Flex>
                <AppImage customStyles={{ height: "24px", width: "24px" }} src={instagramLogo} alt={''} />
                <AppText customStyles={{ width: "51px" }} fontWeight={500} fontSize="15px">{"-"}</AppText>
              </Flex>
              <Flex>
                <AppImage customStyles={{ height: "24px", width: "24px" }} src={facebookLogo} alt={''} />
                <AppText customStyles={{ width: "51px" }} fontWeight={500} fontSize="15px">{"-"}</AppText>
              </Flex>
              <Flex>
                <AppImage customStyles={{ height: "24px", width: "24px" }} src={twitterLogo} alt={''} />
                <AppText customStyles={{ width: "51px" }} fontWeight={500} fontSize="15px">{"-"}</AppText>
              </Flex>
            </Flex>
          </Box>
          <Box p="20px 0px" >
            <AppTagWrapper>
              {profileData.content_category?.map((each: { id: number, content_category: string }) => (
                // eslint-disable-next-line react/jsx-key
                <AppTag>{each.content_category}</AppTag>
              ))}
            </AppTagWrapper>
          </Box>

          <Link to={MAKE_PROFILE_PAGE_URL(profileData.user_type, profileData.id)} style={{ width: "fit-content", marginTop: "1.25em" }}>
            <HStack color="appBlack.800" _hover={{ color: 'appPrimary.600' }}>
              <AppText size="textmedium2" customStyles={{ color: 'inherit' }}>
                View Profile
              </AppText>
              <AppArrowIcon customStyles={{ fontSize: '1.6em', color: 'inherit' }} />
            </HStack>
          </Link>
        </Stack>
        <Box display={["block", "none"]}>
          <AppProfilePreviewCard profile_id={profileData?.user || profileData?.id} variant="profilePreviewWithStats" hideTags={true} cardData={profileData} />
        </Box>
      </AppCard>
    </motion.div>

  );
}

export default AppProfilePreviewCardWithStats;
