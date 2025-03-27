import { Text } from '@chakra-ui/layout'
import React from 'react'
import { MAKE_LIST_ALL_CAMPAIGNS_PAGE } from '../navigation/routes/common-routes'
import { appColors } from '../theme/foundations/appColor'
import AppListsContainer from './AppListsContainer'
import AppCampaignCard from './influencer/AppCampaignCard'

const ProfileCampaignListContainer = ({ campaignList }: { campaignList: any }) => {
    return (
        <AppListsContainer
            customWidth={["100%"]} gridTemplateColumns={['100%', 'repeat(4,1fr)']}
            heading={'Featured Campaigns'}
            linkTo={{ name: 'View All Campaigns', link: MAKE_LIST_ALL_CAMPAIGNS_PAGE }}>
            {campaignList?.length !== 0 ? (
                <>
                    {campaignList?.slice(0, 4)?.map((obj: any) => (
                        <AppCampaignCard
                            key={obj?.id}
                            name={obj?.campaign_name}
                            date={obj?.start_date}
                            link={''}
                            logo={obj?.campaign_image}
                            description={obj?.description}
                            tags={obj?.content_category}
                            data={obj}
                        />
                    ))}
                </>
            ) : (
                <Text w="100%" fontWeight={500} color={appColors.appGrey[800]}>
                    No Campaigns created yet
                </Text>
            )}
        </AppListsContainer>
    )
}

export default ProfileCampaignListContainer