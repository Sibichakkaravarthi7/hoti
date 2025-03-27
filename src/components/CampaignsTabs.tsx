import { Text } from '@chakra-ui/layout'
import React from 'react'
import { appColors } from '../theme/foundations/appColor'
import AppFilterSortSearch from './AppFilterSortSearch'
import AppListsContainer from './AppListsContainer'
import AppCampaignCard from './influencer/AppCampaignCard'

const CampaignsTabs = ({ setSearchCampaign, searchCampaign, campaignData, filteredCampaign }: { setSearchCampaign: any; searchCampaign: any; campaignData: any; filteredCampaign: any }) => {
    return (
        <>
            <AppFilterSortSearch placeholder="Search Campaign" searchOnly searchFn={setSearchCampaign} searchVal={searchCampaign} />
            <AppListsContainer customWidth={["100%"]} gridTemplateColumns={['100%', 'repeat(4,1fr)']}>
                {campaignData?.length !== 0 ? <>
                    {filteredCampaign?.length !== 0 ?
                        <>
                            {filteredCampaign?.map((obj: any) => (
                                <AppCampaignCard
                                    key={obj?.id}
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
                            ))}
                        </>
                        :
                        <Text w="100%" fontWeight={500} color={appColors.appGrey[800]}>No Resuts Found</Text>
                    }</> : <Text w="100%" fontWeight={500} color={appColors.appGrey[800]}>No Campaigns created yet</Text>}
            </AppListsContainer>
        </>
    )
}

export default CampaignsTabs