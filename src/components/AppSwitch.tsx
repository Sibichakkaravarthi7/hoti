import { HStack, Switch } from '@chakra-ui/react'
import React from 'react'
import AppFormFieldWrapper from './chakraOverrides/AppFormFieldWrapper'
import AppText from './chakraOverrides/AppText'

interface AppSwitchTypes {
    label: string;
    required?: boolean;
    size?: string;
    id: string;
    otherProps?: any;
}

const AppSwitch: React.FC<AppSwitchTypes> = ({ label, required, size = "lg", id, otherProps }) => {
    return (
        <AppFormFieldWrapper label={label} htmlFor={id} required={required}>
            <HStack gap="1em">
                <AppText fontSize='xs'>No</AppText>
                <Switch {...otherProps} id={id} size={size} isRequired={required} />
                <AppText fontSize='xs'>Yes</AppText>
            </HStack>
        </AppFormFieldWrapper >
    )
}

export default AppSwitch