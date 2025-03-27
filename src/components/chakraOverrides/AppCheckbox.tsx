import { Checkbox } from '@chakra-ui/react'
import React from 'react'
import AppText from './AppText'

function AppCheckbox({ value }: { value: any }) {
    return (
        <Checkbox
            w="fit-content"
            size="lg"
            value={value}
        >
            <AppText customStyles={{ fontSize: 'xs' }}>{value}</AppText>
        </Checkbox>
    )
}

export default AppCheckbox