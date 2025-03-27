import { Box, HStack, Stack } from '@chakra-ui/react'
import React from 'react'
import AppSearch from './AppSearch'
import AppIcon from './chakraOverrides/AppIcon'
import AppText from './chakraOverrides/AppText'
import { RxCaretSort } from 'react-icons/rx'
import { IoFilter } from "react-icons/io5"
import { IoSearch } from "react-icons/io5"
import AppInput from './chakraOverrides/AppInput'
import { appColors } from '../theme/foundations/appColor'

function AppFilterSortSearch({ searchOnly = false, searchFn, searchVal, placeholder }: { searchOnly?: boolean, searchFn: any, searchVal: string, placeholder: string }) {
    return (
        <Stack justifyContent={'space-between'} direction={{ base: 'column', sm: 'row' }} my={["2em", "0"]}>
            {!searchOnly && <HStack spacing={[9, 6]}>
                <HStack>
                    <AppIcon icon={IoFilter} boxSize={9} />
                    <AppText>Filter</AppText>
                </HStack>
                <HStack>
                    <AppIcon icon={RxCaretSort} boxSize={9} />
                    <AppText>Sort</AppText>
                </HStack>
            </HStack>}

            <Box w={{ base: "100%", sm: "50%", md: "30%" }} py={{ base: "1.5em", sm: "2.5em" }} pos="relative">
                <AppInput
                    size="xs"
                    variant='searchOutline'
                    name="s"
                    placeholder={placeholder}
                    value={searchVal}
                    onChange={(e) => searchFn(e.target.value)}
                    customStyles={{ border: `2px solid ${appColors.appGrey[800]}`, pr:"50px" }}
                />
                <AppIcon icon={IoSearch} customStyles={{ position: "absolute", right:"10px", top: "50%", transform: "translate(-50%, -50%)", fontSize: "20px", fill: appColors.appGrey[800] }} />

            </Box>
        </Stack>
    )
}

export default AppFilterSortSearch