import {
  Box,
  Divider,
  Image,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import React from 'react';
import AppCampaignCard from '../../components/influencer/AppCampaignCard';
import AppSocialProfileCard from '../../components/influencer/AppSocialProfileCard';
import AppListsContainer from '../../components/AppListsContainer';
import { INFLUENCER_CAMPAIGNS_PAGE } from '../../navigation/routes';
import AppShortcutPopOver from '../../components/AppShortcutPopover';
import AppModal from '../../components/Modal/AppModal';
import EditSocialMediaLinksModal from '../../components/Modal/EditSocialMediaLinksModal';
import AppProfileHeroTemplate from '../../components/AppProfileHeroTemplate';
import { useQuery } from '@tanstack/react-query';
import { PROFILE_DATA, GET_INFLUENCER_DATA, SIGNUP_META } from '../../api/url/common';
import { useParams } from 'react-router-dom';
import makeGetRequest from '../../api/utils/makeGetRequest';
import useAppStore from '../../store';
import useIsCurrentUser from '../../utils/hooks/useIsCurrentUser';
import AppText from '../../components/chakraOverrides/AppText';
import { appColors } from '../../theme/foundations/appColor';
import { MAKE_LIST_ALL_CAMPAIGNS_PAGE } from '../../navigation/routes/common-routes';
import ProfileViewSkeleton from '../../components/LoaderSkeleton/ProfileViewSkeleton';
import useIsUserVerified from '../../utils/hooks/useIsUserVerified';
import ProfileIsBeingVerified from '../../components/ProfileIsBeingVerified';
import ProfileCampaignListContainer from '../../components/ProfileCampaignListContainer';
import FeaturedPostList from '../../components/FeaturedPostList';
import { motion } from 'framer-motion';


function InfluencerProfile() {
  const { id } = useParams();
  const { checkIsCurrentUser, isCurrentUser } = useIsCurrentUser();
  const {
    data: profileData,
    isLoading,
    isError,
    refetch
  } = useQuery(
    [PROFILE_DATA(id, 'influencer')],
    () => makeGetRequest(PROFILE_DATA(id, 'influencer')),
    {
      onSuccess: (res) => checkIsCurrentUser(res?.data)
    }
  );
  const { data: metaData, refetch: refetchMeta } = useQuery([SIGNUP_META], () =>
    makeGetRequest(SIGNUP_META)
  );

  const { isVerified, isUserVerified, verifyIsLoading } = useIsUserVerified();

  React.useEffect(() => {
    isUserVerified();
    refetch();
  }, []);

  // console.log("isVerified", isVerified);

  const { onToggle, isOpen, onClose, onOpen } = useDisclosure();
  const {
    onToggle: showMediaOnToggle,
    isOpen: showMediaIsOpen,
    onClose: showMediaonClose,
    onOpen: showMediaOnOpen
  } = useDisclosure();
  const getSocialProfileCard = (obj: any) => (
    <AppSocialProfileCard
      logo={''}
      profileName={'Kalyani Priyadarshan'}
      tagAt={'@kalyanipriyadarshan'}
      score={'9.34'}
      socialStats={[
        {
          head: 'Followers',
          value: '3.6m'
        },
        {
          head: 'Average Likes',
          value: '634.6k'
        },
        {
          head: 'Average Comments',
          value: '1.6k'
        },
        {
          head: 'Average Video Views',
          value: '408.5k'
        }
      ]}
    />
  );
  return (
    <motion.div className="page-layout"
      initial={{ opacity: 0, scale: "99%" }}
      animate={{ opacity: 1, scale: "100%" }}
      // transition={{ duration: 0.5 }}
      >
      {profileData && !verifyIsLoading ? (
        <Stack bg="white" pb="30px">
          <AppProfileHeroTemplate
            name={`${profileData?.data?.first_name} ${profileData?.data?.last_name}`}
            bio={`${profileData?.data?.age_in_years}, ${profileData?.data?.location}`}
            description={profileData?.data?.short_bio}
            tags={profileData?.data?.content_category}
            profileImg={profileData?.data?.profile_image}
            isCurrentUser={isCurrentUser}
            currUserType={'influencer'}
            profileBanner={'heroDummy'}
            profileData={profileData?.data}
            refetch={refetch}
            metaData={metaData}
          />
          {isVerified ? (
            <>
              <Divider />
              <AppListsContainer
                gridTemplateColumns={
                  profileData?.social_profile?.length > 0 ? ['repeat(3, 1fr)'] : 'auto'
                }
                heading={'Social Profiles'}
                rightButton={{ name: 'Manage', action: () => onOpen() }}>
                {profileData?.social_profile ? (
                  <>
                    {profileData?.social_profile?.map((obj: any) => {
                      getSocialProfileCard(obj);
                    })}
                  </>
                ) : (
                  <Text w="100%" fontWeight={500} color={appColors.appGrey[800]}>
                    No Social Platforms connected yet
                  </Text>
                )}
              </AppListsContainer>
              <Divider />

              <ProfileCampaignListContainer campaignList={profileData?.data?.campaign} />
              <Divider />

              <FeaturedPostList profileData={profileData} />
              {/* <AppShortcutPopOver /> */}
            </>
          ) : (
            <ProfileIsBeingVerified />
          )}

          <AppModal
            iconColor=""
            isOpen={isOpen}
            onClose={onClose}
            px="20px"
            maxWidth="778px"
            title={'Connect your social media'}>
            <EditSocialMediaLinksModal
              onClose={onClose}
              refetch={refetch}
              profileData={profileData?.data}
            />
          </AppModal>
        </Stack>
      ) : (
        <ProfileViewSkeleton />
      )}
    </motion.div>
  );
}

export default InfluencerProfile;
