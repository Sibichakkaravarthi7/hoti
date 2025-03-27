import { SimpleGrid, Text } from '@chakra-ui/layout'
import React from 'react'
import { appColors } from '../theme/foundations/appColor'
import AppCollectionsCard from './AppCollectionsCard'
import AppFilterSortSearch from './AppFilterSortSearch'
import CollectionCardSkeleton from './LoaderSkeleton/CollectionCardSkeleton'

const ListTabs = ({ setSearchList, searchList, isLoading, listData, filteredList, listRefetch }: { setSearchList: any; searchList: any; isLoading: boolean; listData: any; filteredList: any; listRefetch: any }) => {
    return (
        <>
            <AppFilterSortSearch placeholder="Search List" searchOnly searchFn={setSearchList} searchVal={searchList} />
            {!isLoading ? <>
                {listData?.length > 0 ?
                    <SimpleGrid justifyItems={["center", "start"]} columns={[1, 2, 3, 4]} rowGap={12}>
                        {filteredList?.length !== 0 ?
                            <>{filteredList?.map((list: any) => (<AppCollectionsCard listRefetch={listRefetch} listData={list} key={list.id} />))}</> :
                            <Text w="100%" fontWeight={500} color={appColors.appGrey[800]}>No Resuts Found</Text>
                        }
                    </SimpleGrid>
                    :
                    <Text p="16px" w="100%" fontWeight={500} color={appColors.appGrey[800]}>No List has been created</Text>}
            </>
                :
                <CollectionCardSkeleton />}</>
    )
}

export default ListTabs