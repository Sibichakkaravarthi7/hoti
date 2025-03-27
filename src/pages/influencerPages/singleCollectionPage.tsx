// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import {
    Box,
    Button,
    CloseButton,
    Flex,
    HStack,
    SimpleGrid,
    Stack,
    Text,
    useDisclosure
} from '@chakra-ui/react';
import React from 'react';
import AppFilterSortSearch from '../../components/AppFilterSortSearch';
import AppBox from '../../components/chakraOverrides/AppBox';
import AppButton from '../../components/chakraOverrides/AppButton';
import AppIcon from '../../components/chakraOverrides/AppIcon';
import AppText from '../../components/chakraOverrides/AppText';
import { RiShareForwardLine } from 'react-icons/ri';
import { AiOutlineTag } from 'react-icons/ai';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import AppProfilePreviewCard from '../../components/influencer/AppProfilePreviewCard';
import { useNavigate, useParams } from 'react-router';
import { useMutation, useQuery } from '@tanstack/react-query';
import { DELETE_WISHLIST, GET_SHARE_WISHLIST, REMOVE_FROM_WISHLIST } from '../../api/url/common';
import makeGetRequest from '../../api/utils/makeGetRequest';
import { appColors } from '../../theme/foundations/appColor';
import { COLLECTIONS_LIST_PAGE } from '../../navigation/routes/common-routes';
import makePostRequest from '../../api/utils/makePostRequest';
import AppModal from '../../components/Modal/AppModal';
import getUserData from '../../utils/getUserData';
// import { City } from 'country-state-city';
import { motion } from 'framer-motion';

function SingleCollectionPage() {
    const [selected, setSelected] = React.useState({
        wholeList: {
            isSelected: true
        },
        listItem: {
            isSelected: false,
            listData: {
                name: '',
                id: ''
            }
        }
    });

    React.useEffect(() => {
        listRefetch();
    }, [])


    const [searchItems, setSearchItems] = React.useState('');

    const { collectionId } = useParams();
    const navigate = useNavigate();

    const {
        data: listData,
        isLoading: listDataLoading,
        refetch: listRefetch
    } = useQuery([GET_SHARE_WISHLIST(collectionId)], () =>
        makeGetRequest(GET_SHARE_WISHLIST(collectionId))
    );


    const { isLoading: deleteIsLoading, mutate: deleteMutate } = useMutation(
        (body) => makePostRequest(DELETE_WISHLIST, body),
        {
            onSuccess: () => navigate(COLLECTIONS_LIST_PAGE)
        }
    );

    const { isLoading: removeIsLoading, mutate: removeMutate } = useMutation(
        (body) => makePostRequest(REMOVE_FROM_WISHLIST, body),
        {
            onSuccess: () => {
                onClose();
                listRefetch();
            }
        }
    );

    const handleShare = () => {
        window.open(`/shared-list/${listData?.[0]?.share_list_id}`);
    };

    const handleDelete = () => {
        //@ts-ignore
        deleteMutate({
            wishlist_id: listData?.[0]?.id
        });
    };

    const handleRemoveFromList = () => {
        const formData = {
            user_id: selected?.listItem?.listData?.id,
            user_wish_list_id: listData?.[0]?.id
        };
        //@ts-ignore
        removeMutate(formData);
    };

    const userData = getUserData()

    const heroButtons = [
        // {
        //     name: 'Tag',
        //     link: '',
        //     icon: AiOutlineTag,
        //     action: undefined,
        // },
        {
            name: 'Share',
            link: '',
            icon: RiShareForwardLine,
            action: () => handleShare()
        },
        {
            name: 'Delete',
            link: '',
            icon: MdOutlineDeleteOutline,
            action: () => handleDeleteListButton()
        }
    ];

    const actionToPerform = {
        list: {
            title: `Are you sure want to delete ${listData?.[0]?.list_name} list?`,
            actionBtnText: 'Delete',
            action: () => handleDelete()
        },
        listItem: {
            title: `Are you sure want to remove ${selected?.listItem?.listData?.name}?`,
            actionBtnText: 'Remove',
            action: () => handleRemoveFromList()
        }
    };

    const filteredProfile = React.useMemo(() => {
        if (!listData?.[0]?.user_wish_list_items) {
            return [];
        }

        return listData?.[0]?.user_wish_list_items?.filter((obj: any) => {
            const searchValue = searchItems?.toLowerCase();
            return obj?.full_name?.toLowerCase()?.includes(searchValue);
        });
    }, [listData?.[0], searchItems]);

    const { isOpen, onClose, onOpen } = useDisclosure();

    const currentRemoveOperation =
        selected?.wholeList?.isSelected == true ? actionToPerform['list'] : actionToPerform['listItem'];

    const handleRemoveProfileButton = (profileData: any) => {
        setSelected({
            "listItem": {
                "isSelected": true, "listData": {
                    id: profileData?.user,
                    name: profileData?.full_name,
                }
            }
        })
        onOpen();
    };

    const handleDeleteListButton = () => {
        setSelected({
            "wholeList": {
                "isSelected": true
            }
        })
        onOpen();
    };
    return (
        <motion.div className="page-layout"
            initial={{ opacity: 0, scale: "99%" }}
            animate={{ opacity: 1, scale: "100%" }}
            // transition={{ duration: 0.5 }}
             style={{ background: "white", padding: "2em", minHeight: "100vh" }}>
            <Stack
                
                justifyContent={'space-between'}
                direction={['column', 'column', 'row']}
                spacing={[5, 6, 0]}>
                <Box>
                    <AppText size={{ base: 'h3', sm: 'h2', md: 'h1' }}>{listData?.[0]?.list_name}</AppText>
                    <AppText size="textlight1">Total profiles:<Text display={"inline"} ml="10px" fontSize={"20px"}>{listData?.[0]?.user_wish_list_items?.length}</Text> </AppText>
                </Box>
                <HStack gap={5}>
                    {heroButtons.slice(userData?.user_type == "agency" ? 0 : 1)?.map((each) => (
                        <AppButton
                            key={each.name}
                            variant="onlyBorderPrimary"
                            leftIcon={<AppIcon icon={each.icon} />}
                            customStyles={{ p: '1em 0.75em' }}
                            onClick={each?.action}>
                            {each.name}
                        </AppButton>
                    ))}
                </HStack>
            </Stack>
            <AppFilterSortSearch
                placeholder="Search Profile"
                searchOnly
                searchVal={searchItems}
                searchFn={setSearchItems}
            />

            {listData?.[0]?.user_wish_list_items?.length > 0 ? (
                <SimpleGrid columns={[2, 3, 4, 7]} rowGap={[6, 9, 12]} columnGap={[4, 8, 2]}>
                    {filteredProfile?.length > 0 ? (
                        <>
                            {filteredProfile?.map((profileData: any) => (
                                <Box key={profileData.id} width="fit-content" pos={'relative'}>
                                    <AppProfilePreviewCard
                                        cardData={profileData}
                                        variant={'profilePreview'}
                                        profile_id={profileData?.user}
                                        link={''}
                                    />
                                    <Box
                                        onClick={() => handleRemoveProfileButton(profileData)}
                                        bg={appColors.appPrimary[600]}
                                        borderRadius="6px"
                                        p="2px"
                                        pos={'absolute'}
                                        top="6px"
                                        right={'6px'}>
                                        <CloseButton fontSize={'9px'} fontWeight={500} color={'white'} />
                                    </Box>
                                </Box>
                            ))}
                        </>
                    ) : (
                        <Text w="100%" fontWeight={500} color={appColors.appGrey[800]}>
                            No profile has been selected
                        </Text>
                    )}
                </SimpleGrid>
            ) : (
                <Text w="100%" fontWeight={500} color={appColors.appGrey[800]}>
                    No profile has been selected
                </Text>
            )}
            <AppModal disableCloseButton maxWidth={'570px'} px="20px" isOpen={isOpen} onClose={onClose} size="2xl" title={''}>
                <Box p="25px 0px">
                    <Text textAlign={"center"} mb="30px" fontWeight={600} fontSize="22px">
                        {currentRemoveOperation?.title}
                    </Text>
                    <Flex justifyContent={'center'} gap={'20px'}>
                        <Button variant={"warningButtonOutlined"} onClick={() => onClose()}>Cancel</Button>
                        <Button variant={"warningButton"} onClick={currentRemoveOperation?.action}>
                            {currentRemoveOperation?.actionBtnText}
                        </Button>
                    </Flex>
                </Box>
            </AppModal>
        </motion.div>
    );
}

export default SingleCollectionPage;
