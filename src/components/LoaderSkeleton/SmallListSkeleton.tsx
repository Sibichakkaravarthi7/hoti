import { HStack, VStack } from '@chakra-ui/layout'
import { Skeleton, SkeletonText } from '@chakra-ui/react'
import React from 'react'
import AppButton from '../chakraOverrides/AppButton'

const SmallListSkeleton = () => {
    return (
        <HStack justifyContent="space-between">
            <VStack alignItems={'left'}>
                <SkeletonText skeletonHeight={"16px"} noOfLines={1}>List name dad adnalkandlkandw1</SkeletonText>
                <SkeletonText skeletonHeight={"10px"} w="50%" noOfLines={1}></SkeletonText>
            </VStack>
            <Skeleton>
                <AppButton
                    variant="onlyBorderBlack"
                    customStyles={{ p: '14px 46px', fontSize: 'xs', fontWeight: 'semibold' }}>
                    Add
                </AppButton>
            </Skeleton>

        </HStack>
    )
}

export default SmallListSkeleton