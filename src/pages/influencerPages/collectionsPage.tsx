import { HStack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useDisclosure } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { GET_ALL_WISHLISTS, GET_LOGGEDIN_USER_CAMPAIGNS } from '../../api/url/common'
import makeGetRequest from '../../api/utils/makeGetRequest'
import AppButton from '../../components/chakraOverrides/AppButton'
import AppText from '../../components/chakraOverrides/AppText'
import AppModal from '../../components/Modal/AppModal'
import CreateSingleListModal from '../../components/Modal/CreateSingleListModal'
import { CREATE_CAMPAIGN } from '../../navigation/routes/common-routes'
import useIsUserVerified from '../../utils/hooks/useIsUserVerified'
import { motion } from 'framer-motion';
import ListTabs from '../../components/ListTabs'
import CampaignsTabs from '../../components/CampaignsTabs'

function CollectionsPage() {
    const [tabIndex, setTabIndex] = React.useState(0);
    const navigate = useNavigate();

    const { isUserVerified } = useIsUserVerified();
    React.useEffect(() => {
        isUserVerified();
        listRefetch();
    }, []);

    const { data: campaignData, isLoading, isError, refetch } = useQuery([GET_LOGGEDIN_USER_CAMPAIGNS], () => makeGetRequest(GET_LOGGEDIN_USER_CAMPAIGNS));
    const { data: listData, isLoading: listDataLoading, refetch: listRefetch } = useQuery([GET_ALL_WISHLISTS], () => makeGetRequest(GET_ALL_WISHLISTS));

    const { isOpen, onClose, onOpen } = useDisclosure();
    const handleSuccess = () => {
        onClose();
        listRefetch();
    };

    const [searchList, setSearchList] = React.useState("");
    const [searchCampaign, setSearchCampaign] = React.useState("");

    const filteredList = React.useMemo(() => {
        if (!listData) {
            return [];
        }

        return listData.filter((obj: any) => {
            const searchValue = searchList?.toLowerCase();
            return (
                obj?.list_name?.toLowerCase()?.includes(searchValue)
            );
        });
    }, [listData, searchList]);

    const filteredCampaign = React.useMemo(() => {
        if (!campaignData) {
            return [];
        }

        return campaignData.filter((obj: any) => {
            const searchValue = searchCampaign?.toLowerCase();
            return (
                obj?.campaign_name?.toLowerCase()?.includes(searchValue)
            );
        });
    }, [campaignData, searchCampaign]);


    return (
        <motion.div className="page-layout"
            initial={{ opacity: 0, scale: "99%" }}
            animate={{ opacity: 1, scale: "100%" }}
            // transition={{ duration: 0.5 }}
            style={{ background: "white", padding: "2em", minHeight: "100vh" }}>
            <HStack mb={["20px", "0px"]} justifyContent={'space-between'}>
                <AppText size={{ base: "h3", sm: "h2", md: "h1" }}>All Lists</AppText>
                <AppButton onClick={() => tabIndex == 0 ? onOpen() : navigate(CREATE_CAMPAIGN)} variant="fillBrandColor" customStyles={{ p: "20px 18px" }}>+ {tabIndex == 0 ? "Create List" : "Create Campaign"}</AppButton>
            </HStack>
            <Tabs variant={"OrangeUnderlined"} onChange={(index) => setTabIndex(index)}>
                <TabList>
                    <Tab pl="0px">My Lists</Tab>
                    <Tab>My Campaigns</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <ListTabs setSearchList={setSearchList} searchList={searchList} isLoading={isLoading} listData={listData} filteredList={filteredList} listRefetch={listRefetch} />
                    </TabPanel>
                    <TabPanel>
                        <CampaignsTabs setSearchCampaign={setSearchCampaign} searchCampaign={searchCampaign} campaignData={campaignData} filteredCampaign={filteredCampaign} />
                    </TabPanel>
                </TabPanels>
            </Tabs>

            <AppModal maxWidth={"634px"} px="20px" isOpen={isOpen} onClose={onClose} size="2xl" title={"Create a List"}>
                <CreateSingleListModal onSuccessAction={handleSuccess} onClose={onClose} />
            </AppModal>

        </motion.div>
    )
}

export default CollectionsPage