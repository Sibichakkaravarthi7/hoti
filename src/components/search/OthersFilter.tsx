import { Box, Divider, Flex, HStack, Stack } from '@chakra-ui/layout'
import { Button, Spinner } from '@chakra-ui/react'
import React from 'react'
import { IoFilter } from 'react-icons/io5'
import { appColors } from '../../theme/foundations/appColor'
import AppFormFieldWrapper from '../chakraOverrides/AppFormFieldWrapper'
import AppIcon from '../chakraOverrides/AppIcon'
import AppMultiSelect from '../chakraOverrides/AppMultiSelect'
import AppText from '../chakraOverrides/AppText'

const OthersFilter = ({ applyBtn, locationMeta, categoryMeta, setFilters, filters, resetFilter, setLocationText }: { applyBtn: any, locationMeta: any, categoryMeta: any, setFilters: any, filters: any, resetFilter: any, setLocationText: any }) => {
    return (
        <Stack spacing={[1, 5]} style={{ padding: "1.5em", boxShadow: "2px 7px 10px rgba(21, 21, 21, 0.102)" }}>
            <HStack spacing={3} justifyContent="space-between" alignItems={"center"}>
                <Flex alignItems={"center"} gap="10px">
                    <AppText fontWeight={"semibold"}>Filters</AppText>
                    <AppIcon icon={IoFilter} boxSize={7} />
                </Flex>
                <Button variant={"ghost"} fontSize={"14px"} color={appColors.appGrey[700]} fontWeight={600} w="fit-content" p="0px 5px" onClick={() => resetFilter()}>Clear All</Button>
            </HStack>

            <AppFormFieldWrapper label="Location" htmlFor={''}>
                <AppMultiSelect
                    name={"location"}
                    options={locationMeta}
                    placeholder={'Search City'}
                    fs="xs"
                    p="0.1em"
                    // control={control}
                    value={filters?.location}
                    controlled={true}
                    optionFs="15px"
                    onChange={(val: any) => setFilters({ ...filters, location: val })}
                    onInputChange={(val: string) => setLocationText(val)}
                />
                {filters?.location?.length ? <Box top="9px" left="-10px" position={"absolute"} w="7px" h="7px" borderRadius={"100%"} bg={appColors.appPrimary[600]}></Box> : ""}

            </AppFormFieldWrapper>
            <AppFormFieldWrapper label="Content Category" htmlFor={''}>
                <AppMultiSelect
                    name={"content_category"}
                    options={categoryMeta}
                    placeholder={'Search Category'}
                    fs="xs"
                    p="0.1em"
                    // control={control}
                    controlled={true}
                    optionFs="15px"
                    value={filters?.content_category}
                    onChange={(val: any) => setFilters({ ...filters, content_category: val })}
                />
                {filters?.content_category?.length ? <Box top="9px" left="-10px" position={"absolute"} w="7px" h="7px" borderRadius={"100%"} bg={appColors.appPrimary[600]}></Box> : ""}

            </AppFormFieldWrapper>
            <Divider />
            <Button mt="0px" onClick={() => applyBtn()} width={"100%"}>Apply</Button>
            {/* <Button variant={"ghost"} onClick={() => setFilters({ content_category: [], location: [] })} w="100%">Clear</Button> */}
        </Stack >
    )
}
export default OthersFilter