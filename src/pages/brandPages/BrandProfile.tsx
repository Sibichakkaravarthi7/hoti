import {
    Divider,
    Stack,
    Text,
    VStack
} from '@chakra-ui/react';
import React from 'react';
import AppProfileHeroTemplate from '../../components/AppProfileHeroTemplate';
import { useQuery } from '@tanstack/react-query';
import { PROFILE_DATA, SIGNUP_META } from '../../api/url/common';
import { useParams } from 'react-router-dom';
import makeGetRequest from '../../api/utils/makeGetRequest';
import useIsCurrentUser from '../../utils/hooks/useIsCurrentUser';
import ProfileViewSkeleton from '../../components/LoaderSkeleton/ProfileViewSkeleton';
import useIsUserVerified from '../../utils/hooks/useIsUserVerified';
import ProfileIsBeingVerified from '../../components/ProfileIsBeingVerified';
import ProfileCampaignListContainer from '../../components/ProfileCampaignListContainer';
import FeaturedPostList from '../../components/FeaturedPostList';
import { motion } from 'framer-motion';

function BrandProfile() {
    const { checkIsCurrentUser, isCurrentUser } = useIsCurrentUser();
    const { id } = useParams();
    const {
        data: profileData,
        isLoading,
        isError,
        refetch
    } = useQuery([PROFILE_DATA(id, 'brand')], () => makeGetRequest(PROFILE_DATA(id, 'brand')), {
        onSuccess: (res) => checkIsCurrentUser(res.data)
    });
    const { data: metaData, refetch: refetchMeta } = useQuery([SIGNUP_META], () =>
        makeGetRequest(SIGNUP_META)
    );

    const { isUserVerified, isVerified, verifyIsLoading } = useIsUserVerified();
    React.useEffect(() => {
        isUserVerified();
    }, []);

    React.useEffect(() => {
        refetch();
    }, []);

    return (
        <motion.div className="page-layout"
            initial={{ opacity: 0, scale: "99%" }}
            animate={{ opacity: 1, scale: "100%" }}
            // transition={{ duration: 0.5 }} 
            style={{ background: "white" }}>
            {profileData && !verifyIsLoading ? (
                <>
                    <AppProfileHeroTemplate
                        name={profileData?.data?.company_name}
                        bio={profileData?.data?.location}
                        description={profileData?.data?.short_bio}
                        tags={profileData?.data?.content_category}
                        profileImg={profileData?.data?.profile_image}
                        isCurrentUser={isCurrentUser}
                        currUserType={'brand'}
                        profileBanner={'profile_image'}
                        profileData={profileData?.data}
                        refetch={refetch}
                        metaData={metaData}
                    />{isVerified ? <><Divider />
                        <ProfileCampaignListContainer campaignList={profileData?.data?.campaign} />
                        {/* <AppBox customStyles={{ p: '16px', bg: '#fff' }}>
                <AppBox customStyles={{ position: "relative", height: "35vh", maxH: "325px", border: "1px solid lightgray" }}>
                    <AppImage src={Dummy} alt="" fit="cover" customStyles={{ w: "100%", h: "100%" }} />

                    <VStack
                        width="10%"
                        height="25px"
                        backgroundColor="appPrimary.600"
                        pos="absolute"
                        top="0"
                        left="8px"

                    >
                        <AppText color="appWhite.900" size="textdark3" customStyles={{ lineHeight: "2em" }}>
                            Ongoing Campaign
                        </AppText>
                    </VStack>
                </AppBox>
            </AppBox> */}
                        <FeaturedPostList profileData={profileData} />
                    </> : <ProfileIsBeingVerified />}


                </>
            ) : (
                <ProfileViewSkeleton />
            )}
        </motion.div>
    );
}

export default BrandProfile;
