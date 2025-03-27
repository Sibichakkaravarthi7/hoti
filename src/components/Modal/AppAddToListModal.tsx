import React from 'react';
import AppBox from '../chakraOverrides/AppBox';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  HStack,
  Divider,
  Stack,
  Box,
  VStack,
  Text,
  Skeleton,
  SkeletonText,
  Flex,
} from '@chakra-ui/react';
import AppInput from '../chakraOverrides/AppInput';
import AppText from '../chakraOverrides/AppText';
import AppButton from '../chakraOverrides/AppButton';
import AppIcon from '../chakraOverrides/AppIcon';
import { BsPlus } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { SearchIcon } from '../../utils/customIcons';
import { appColors } from '../../theme/foundations/appColor';
import makeGetRequest from '../../api/utils/makeGetRequest';
import { ADD_TO_LISTS, DELETE_WISHLIST, GET_ALL_WISHLISTS, REMOVE_FROM_WISHLIST } from '../../api/url/common';
import { useMutation, useQuery } from '@tanstack/react-query';
import CreateSingleListModal from './CreateSingleListModal';
import makePostRequest from '../../api/utils/makePostRequest';
import AppFilterSortSearch from '../AppFilterSortSearch';
import SmallListSkeleton from '../LoaderSkeleton/SmallListSkeleton';

function AppAddToListModal({ profileToAddId }: { profileToAddId: number }) {
  const { data: listData, isLoading: listDataLoading, refetch: listRefetch } = useQuery([GET_ALL_WISHLISTS], () => makeGetRequest(GET_ALL_WISHLISTS));
  const [currModal, setCurrModal] = React.useState(0);

  const { isLoading: addIsLoading, mutate: addMutate } = useMutation((body) =>
    makePostRequest(ADD_TO_LISTS, body), {
    onSuccess: () => listRefetch()
  }
  );

  const { isLoading: removeIsLoading, mutate: removeMutate } = useMutation((body) =>
    makePostRequest(REMOVE_FROM_WISHLIST, body), {
    onSuccess: () => listRefetch()
  }
  );


  React.useEffect(() => {
    listRefetch();
  }, [])

  const onSuccessAction = () => {
    setCurrModal(0);
  };

  const handleRemoveFromList = (listId: number) => {
    const formData = {
      "user_id": profileToAddId,
      "user_wish_list_id": listId,
    }
    //@ts-ignore
    removeMutate(formData);
  };

  const handleAddToList = (listId: number) => {
    const formData = {
      "user": profileToAddId,
      "user_wish_list": listId
    }
    //@ts-ignore
    addMutate(formData);
  };
  const [searchList, setSearchList] = React.useState("");

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

  const isAlreadyAdded = (array: any) => {
    return array?.user_wish_list_items?.some((profile: any) => profileToAddId == profile.user)
  };

  return (
    <AppBox>
      {currModal === 0 ? (
        <Stack spacing={'10px'} w="100%">
          {/* <AppFilterSortSearch placeholder='Search for a list' searchOnly searchFn={setSearchList} searchVal={searchList} /> */}
          <Box pos="relative">
            <AppInput
              type="search"
              placeholder="Search for a list"
              customStyles={{ mb: '0.5em', pr: "30px" }}
              value={searchList}
              onChange={(e) => setSearchList(e.target.value)}
            />
            <SearchIcon
              height={'15px'}
              width="15px"
              pos={'absolute'}
              right="20px"
              transform={'translateY(-100%)'}
              top="55%"
            />
          </Box>
          {listData?.length > 0 ? <>

            {filteredList.length > 0 ? <>{filteredList?.map((each: any) => (
              <>
                <HStack key={each.id} justifyContent="space-between">
                  <VStack alignItems={'left'}>
                    <AppText size={'h3'}>{each?.list_name}</AppText>
                    <AppText size={'body1'}>{`${each?.user_wish_list_items?.length} items`}</AppText>
                  </VStack>
                  <AppButton
                    onClick={() => isAlreadyAdded(each) ? handleRemoveFromList(each.id) : handleAddToList(each.id)}
                    variant={isAlreadyAdded(each) ? "fillBrandColor" : "onlyBorderBlack"}
                    customStyles={{ p: '14px 46px', fontSize: 'xs', fontWeight: 'semibold', width: ["23px", "122px"] }}>
                    {isAlreadyAdded(each) ? "Remove" : "Add"}
                  </AppButton>
                </HStack>
                <Divider />
              </>
            ))}</> : <Text w="100%" fontWeight={500} color={appColors.appGrey[800]}>No Resuts Found</Text>}
            <AppBox>
              <Box onClick={() => setCurrModal(1)}>
                <HStack p={'10px'} w="fit-content" mx="auto" cursor="pointer">
                  <AppIcon color={appColors.appPrimary[600]} icon={BsPlus} boxSize={8} />
                  <AppText color={appColors.appPrimary[600]} size={'h3'}>
                    Create a New List
                  </AppText>
                </HStack>
              </Box>
            </AppBox>
          </> : <Flex flexFlow={"column"} gap="29px"> <SmallListSkeleton /><SmallListSkeleton />
          </Flex>}
        </Stack>

      ) : (
        <CreateSingleListModal onSuccessAction={onSuccessAction} abortAction={onSuccessAction} />
      )}
    </AppBox>
  );
}

export default AppAddToListModal;
