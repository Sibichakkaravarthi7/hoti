import { Divider, Stack, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import AppModal from '../../components/Modal/AppModal';
import AppCampaignCard from '../../components/influencer/AppCampaignCard';
import AppListsContainer from '../../components/AppListsContainer';
import AppCampaignDetailModal from '../../components/Modal/AppCampaignDetailModal';
import { useQuery } from '@tanstack/react-query';
import { GET_INFLUENCER_DATA, PROFILE_DATA, SIGNUP_META } from '../../api/url/common';
import makeGetRequest from '../../api/utils/makeGetRequest';
import { useParams } from 'react-router-dom';
import AppProfileHeroTemplate from '../../components/AppProfileHeroTemplate';
import useIsCurrentUser from '../../utils/hooks/useIsCurrentUser';
import AppText from '../../components/chakraOverrides/AppText';
import { appColors } from '../../theme/foundations/appColor';
import { MAKE_PROFILE_PAGE_URL } from '../../navigation/routes/common-routes';

function CampaignPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { id, user_type } = useParams();
  const { checkIsCurrentUser, isCurrentUser } = useIsCurrentUser();

  const { data: profileData, isLoading, isError, refetch } = useQuery([PROFILE_DATA(id, user_type)], () => makeGetRequest(PROFILE_DATA(id, user_type)), {
    onSuccess: (res) => checkIsCurrentUser(res?.data) 
  });

  const { data: metaData, refetch: refetchMeta } = useQuery([SIGNUP_META], () =>
  makeGetRequest(SIGNUP_META)
);

  React.useEffect(() => {
    refetch();
  }, [])

  return (
    <>
      {(profileData) && <Stack key={2} mx="auto" w="98.5%" bg="#fff" maxW="1560px" my="1em" >
        <AppProfileHeroTemplate
          name={profileData?.data?.company_name || profileData?.data?.agency_name || `${profileData?.data?.first_name} ${profileData?.data?.last_name}`}
          bio={profileData?.data?.location}
          description={profileData?.data?.short_bio}
          tags={profileData?.data?.content_category}
          profileImg={profileData?.data?.profile_image}
          isCurrentUser={isCurrentUser}
          currUserType={profileData?.data?.user_type}
          profileBanner={"heroDummy"}
          profileData={profileData?.data}
          refetch={refetch}
          metaData={metaData}
           />
        <Divider />



        {/* -- list of all campaigns as cards ---- */}
        <AppListsContainer heading={'All Campaigns'} linkTo={{ name: 'View Profile', link:  MAKE_PROFILE_PAGE_URL(user_type, id)}}>
          {profileData?.data?.campaign?.length !== 0 ? <>
            {
              profileData?.data?.campaign?.map((obj: any) => (
                <AppCampaignCard
                  key={obj.campaign_name}
                  name={obj?.campaign_name}
                  date={obj?.start_date}
                  link={''}
                  logo={obj?.campaign_image}
                  description={
                    obj?.description
                  }
                  tags={obj?.content_category}
                  data={obj}
                />
              ))
            }</> : <AppText fontWeight={500} color={appColors.appGrey[800]}>No Campaigns created yet</AppText>}
        </AppListsContainer>

        {/* -- modal for campaign card --- */}
        {/* <AppModal isOpen={isOpen} onClose={onClose} size={{ base: 'full', md: '5xl', lg: '6xl' }}>
          <AppCampaignDetailModal data={} />
        </AppModal> */}
      </Stack>}
    </>
  );
}

export default CampaignPage;
