import { CheckboxGroup } from '@chakra-ui/checkbox'
import { Divider, HStack, Stack } from '@chakra-ui/layout'
import { ScaleFade } from '@chakra-ui/transition'
import React from 'react'
import { IoFilter } from 'react-icons/io5'
import AppRangeContainer from './AppRangeContainer'
import AppSwitch from './AppSwitch'
import AppBox from './chakraOverrides/AppBox'
import AppCheckbox from './chakraOverrides/AppCheckbox'
import AppFlex from './chakraOverrides/AppFlex'
import AppFormFieldWrapper from './chakraOverrides/AppFormFieldWrapper'
import AppGrid from './chakraOverrides/AppGrid'
import AppIcon from './chakraOverrides/AppIcon'
import AppMultiSelect from './chakraOverrides/AppMultiSelect'
import AppText from './chakraOverrides/AppText'
import AppProfilePreviewCardWithStats from './influencer/AppProfilePreviewCardWithStats'

const SearchBodyComponent = ({ dataToShow }: { dataToShow: any }) => {

    // console.log("dataToShow", dataToShow);

    return (
        <>
            <AppFlex gap="2em" customStyles={{ p: '16px', bg: '#fff', mt: "1em" }} justifyContent="flex-end">

                {/* -- sidebar with filters control fields  --- */}
                <ScaleFade initialScale={0.95} in={true} style={{ flexBasis: "18%", transitionDuration: "100ms" }} unmountOnExit >
                    <AppBox>
                        <Stack spacing={[1, 5]} style={{ padding: "1.5em", boxShadow: "2px 7px 10px rgba(21, 21, 21, 0.102)" }}>
                            <HStack spacing={3}>
                                <AppText fontWeight={"semibold"}>Filters</AppText>
                                <AppIcon icon={IoFilter} boxSize={7} />
                            </HStack>

                            <AppFormFieldWrapper label="Location" htmlFor={''}>
                                <AppMultiSelect
                                    options={[]}
                                    placeholder={'Search City'}
                                    fs="xs"
                                    p="0.1em"
                                    name={'belly'}
                                // control={control}
                                />
                            </AppFormFieldWrapper>
                            <Divider />
                            <AppFormFieldWrapper htmlFor={''} label={'Gender'}>
                                <CheckboxGroup>
                                    <Stack>
                                        {['Male', 'Female', 'Other'].map(each =>
                                            <AppCheckbox value={each} key={each} />)}
                                    </Stack>
                                </CheckboxGroup>
                            </AppFormFieldWrapper>
                            <Divider />
                            {/* <AppRangeContainer id={'followers'} label={'Followers Range'} />
                            <Divider />
                            <AppRangeContainer id={'score'} label={'Score'} />
                            <Divider /> */}
                            <AppSwitch label={'Verified Profiles'} id={'verified-profiles'} size="md" />
                        </Stack>
                    </AppBox>
                </ScaleFade >

                {/* -- display results ----- */}
                <AppGrid customStyles={{
                    flexBasis: true ? "82%" : "100%",
                    gridTemplateColumns: true ? "repeat(4,1fr)" : "repeat(4,1fr)",
                    transition: "all 300ms ease-in 50ms",
                    gridRowGap: "2.5em",
                    gridColumnGap: "1.5em",
                    justifyItems: "end"
                }}>
                    {dataToShow?.map((profileData: any) => <AppProfilePreviewCardWithStats key={profileData.id} profileData={profileData} />)}
                </AppGrid>
            </AppFlex >
        </>
    )
}

export default SearchBodyComponent