//@ts-nocheck
import React from 'react'
import {
    RangeSlider,
    RangeSliderTrack,
    RangeSliderFilledTrack,
    RangeSliderThumb,
    Box,
} from '@chakra-ui/react'
import AppBox from './chakraOverrides/AppBox'
import AppFlex from './chakraOverrides/AppFlex'
import AppText from './chakraOverrides/AppText'
import AppFormFieldWrapper from './chakraOverrides/AppFormFieldWrapper'
import { useFormContext } from 'react-hook-form'
import { appColors } from '../theme/foundations/appColor'

interface AppRangeContainerType {
    id: string;
    label?: string;
    watch?: any;
    setValue?: any;
    filters: any;
    setFilters: any
}

const AppRangeContainer: React.FC<AppRangeContainerType> = ({ label, id, setValue, setFilters, filters }) => {
    const [range, setRange] = React.useState([10, 70])
    return (
        <AppFormFieldWrapper label={label} htmlFor={id}>
            <RangeSlider value={range} onChange={(val) => setRange([...val])} onChangeEnd={(val) => setFilters({ ...filters, age: val })} aria-label={['min', 'max']} defaultValue={[10, 50]} id={id}>
                <RangeSliderTrack>
                    <RangeSliderFilledTrack bg={appColors.appPrimary[600]} />
                </RangeSliderTrack>
                <RangeSliderThumb bg={appColors.appPrimary[600]} index={0} zIndex={0} />
                <RangeSliderThumb bg={appColors.appPrimary[600]} index={1} zIndex={0} />
            </RangeSlider>

            <AppFlex justifyContent={'space-between'} customStyles={{ my: "1em" }}>
                {["min", "max"].map((each, index) =>
                    <AppBox customStyles={{ bgColor: 'appGrey.200', p: "0.25em 1em 0.8em", w: "40%" }} key={each}>
                        <AppText fontSize='xxs' color="appGrey.700">{index === 0 ? "Minimum" : "Maximum"}</AppText>
                        <AppText fontSize='xs' customStyles={{ lineHeight: "0.8em" }}>{range?.[index]}</AppText>
                    </AppBox>
                )}
            </AppFlex>
            {filters?.age?.length ? <Box top="9px" left="-10px" position={"absolute"} w="7px" h="7px" borderRadius={"100%"} bg={appColors.appPrimary[600]}></Box> : ""}

        </AppFormFieldWrapper >
    )
}

export default AppRangeContainer