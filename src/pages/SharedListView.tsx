import { Box, Flex, Text, VStack } from '@chakra-ui/layout';
import { Button, Image, Spinner } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { GET_SHARE_WISHLIST } from '../api/url/common';
import makeGetRequest from '../api/utils/makeGetRequest';
import AppGrid from '../components/chakraOverrides/AppGrid';
import AppProfilePreviewCardWithStats from '../components/influencer/AppProfilePreviewCardWithStats';
import ShareListLink from '../components/ShareListLink';
import { appColors } from '../theme/foundations/appColor';
import HeaderBg from "../assets/common/shared-list-header.png";
import Logo from "../assets/nike-profile.png"
import { useParams } from 'react-router-dom';

const SharedListView = () => {
    const { listId } = useParams()
    const {
        data: listData,
        isLoading,
        isError
    } = useQuery([GET_SHARE_WISHLIST(listId || "")], () => makeGetRequest(GET_SHARE_WISHLIST(listId || "")));

    return (
        <Box minH="100vh">
            {!isLoading ? <Box>
                <VStack justifyContent={"center"} w="100%" backgroundImage={`url(${HeaderBg})`} bgSize="cover" maxH={"850px"}
                    bgRepeat="no-repeat">
                    <Image my="35px" src={listData?.[0]?.agency_profile_image} w="100%" maxW={"195px"} />
                    <Text pb="40px" fontWeight={600} textAlign="center" fontSize="32px">{listData?.[0]?.list_name}</Text>

                </VStack>
                <Box width={'100%'} maxW={'1240px'} p="50px 10px" m="auto">
                    {listData?.length != 0 &&<Box mb="18px">
                        <Text fontSize={'18px'} fontWeight={500}>Created by <Text>{listData?.[0]?.agency_name}</Text></Text>

                    </Box>}
                   {listData?.length != 0 && <Flex justifyContent={["center", "start"]} mb="50px">
                        <ShareListLink link={`${window.location.hostname}/shared-list/${listId}`} />
                    </Flex>}
                    <Flex justifyContent={["center", "start"]} flexFlow="column">
                       {listData?.length != 0 && <Text textAlign={["center", "left"]} mb="20px" fontWeight={600} fontSize={'24px'}>
                            Suggested Influencers
                        </Text>}
                        <Flex justifyContent={'center'} alignItems={'center'}>
                            {listData?.length != 0 ? <AppGrid
                                customStyles={{
                                    flexBasis: '100%',
                                    gridTemplateColumns: listData?.[0]?.user_wish_list_items?.length !== 0 ? ['repeat(2,180px)', 'repeat(4,1fr)'] : 'auto',
                                    transition: 'all 300ms ease-in 50ms',
                                    gridRowGap: '2.5em',
                                    gridColumnGap: ['1em', '1.5em'],
                                    justifyItems: 'end'
                                }}>
                                <>
                                    {listData[0]?.user_wish_list_items?.length !== 0 ? (
                                        <>
                                            {listData?.[0]?.user_wish_list_items?.map((profileData: any) => (
                                                <AppProfilePreviewCardWithStats
                                                    key={profileData.id}
                                                    profileData={profileData}
                                                    noSaveOption
                                                />
                                            ))}
                                        </>
                                    ) : (
                                        <Box w="100%" mt="70px">
                                            <Text
                                                w="100%"
                                                textAlign={'center'}
                                                color={appColors.appGrey[800]}
                                                fontWeight={500}
                                                fontSize={'25px'}
                                                width="100%">
                                                No profile has been selected
                                            </Text>
                                        </Box>
                                    )}
                                </>
                            </AppGrid> :
                                <Text
                                    w="100%"
                                    textAlign={'center'}
                                    color={appColors.appGrey[800]}
                                    fontWeight={500}
                                    fontSize={'25px'}
                                    width="100%">
                                    Either the list has been deleted or unavailable
                                </Text>}
                        </Flex>
                    </Flex>
                </Box>
            </Box> : <Flex justifyContent={"center"} alignItems={"center"}>
                <Spinner key={0} color={appColors.appPrimary[600]} />
            </Flex>}
        </Box>


    );
};

export default SharedListView;
