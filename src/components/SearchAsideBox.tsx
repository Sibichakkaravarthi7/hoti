import { CheckboxGroup, Divider, HStack, ScaleFade, Stack } from '@chakra-ui/react'
import React from 'react'
import { IoFilter } from 'react-icons/io5'
import AppRangeContainer from './AppRangeContainer'
import AppSwitch from './AppSwitch'
import AppBox from './chakraOverrides/AppBox'
import AppCheckbox from './chakraOverrides/AppCheckbox'
import AppFormFieldWrapper from './chakraOverrides/AppFormFieldWrapper'
import AppIcon from './chakraOverrides/AppIcon'
import AppMultiSelect from './chakraOverrides/AppMultiSelect'
import AppText from './chakraOverrides/AppText'

const SearchAsideBox = ({isOpen, control}:{isOpen: any, control: any}) => {
  return (
    <ScaleFade initialScale={0.95} in={isOpen} style={{ flexBasis: "18%", transitionDuration: "100ms" }} unmountOnExit >
    <AppBox customStyles={{ background: "white" }}>
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
                    control={control}
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
            {/* <AppRangeContainer id={'followers'} label={'Followers Range'} filters={undefined} setFilters={undefined} /> */}
            <Divider />
            <AppSwitch label={'Verified Profiles'} id={'verified-profiles'} size="md" />
        </Stack>
    </AppBox>
</ScaleFade >
  )
}

export default SearchAsideBox