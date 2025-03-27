import { Box, Flex, Text } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/react'
import React from 'react'
import { appColors } from '../theme/foundations/appColor'
import { SearchProfilesI } from '../Types'
import AppGrid from './chakraOverrides/AppGrid'
import AppProfilePreviewCardWithStats from './influencer/AppProfilePreviewCardWithStats'

const SearchResultBody = ({ searchDataIsLoading, searchResult }: { searchDataIsLoading: boolean; searchResult: SearchProfilesI[] }) => {

    const searhList = () => {
        if (Array.isArray(searchResult)) {
            if (searchResult?.length > 0) return true;
        } else {
            return false;
        }
    };

    return (
        <>
            {searchDataIsLoading ? (
                <Flex
                    height={'50vh'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    width={'100%'}>
                    <Spinner size={'xl'} color={appColors.appPrimary[600]} />
                </Flex>
            ) : (
                <AppGrid
                    customStyles={{
                        // flexBasis: isOpen ? '82%' : '100%',
                        gridTemplateColumns: searhList() ? ['repeat(2,180px)', 'repeat(4,1fr)'] : 'auto',
                        transition: 'all 300ms ease-in 50ms',
                        gridRowGap: '2.5em',
                        gridColumnGap: '1.5em',
                        justifyItems: 'end'
                    }}>
                    {searhList() ? (
                        <>
                            {searchResult?.map((profileData: SearchProfilesI) => (
                                <AppProfilePreviewCardWithStats
                                    key={profileData.id}
                                    profileData={profileData}
                                />
                            ))}
                        </>
                    ) : (
                        <Box w="100%">
                            <Text
                                w="100%"
                                textAlign={'center'}
                                mt="100px"
                                color={appColors.appGrey[800]}
                                fontWeight={500}
                                fontSize={'25px'}>
                                Just Empty!
                            </Text>
                        </Box>
                    )}
                </AppGrid>
                /* <AppBox customStyles={{ p: '16px', bg: '#fff', width: '100%', display: "grid", placeContent: "center" }}>
                  <AppButton variant='fillBrandColor'>Load More</AppButton>
              </AppBox> */

            )}</>
    )
}

export default SearchResultBody