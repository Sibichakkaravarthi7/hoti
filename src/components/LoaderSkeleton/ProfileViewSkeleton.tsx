import { Box, Stack } from '@chakra-ui/layout'
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/skeleton'
import React from 'react'

const ProfileViewSkeleton = () => {
  return (
    <Stack mx="auto" w="98.5%" bg="#fff" my="1em">
    <Box p="16px">
      <Box position={"relative"}>
        <Skeleton>
        <Box mb="35px" height="265px"></Box>
      </Skeleton>
      <SkeletonCircle pos="absolute" bottom="-55px" left="28px" opacity={"100%"} size={["120px", "196px"]} />
      </Box>
      
      <SkeletonText mt="95px" width={"50%"} skeletonHeight={"30px"}>lorem500</SkeletonText>
      <SkeletonText mt="70px" width={"50%"} skeletonHeight={"30px"}>lorem500</SkeletonText>
      <SkeletonText mt="70px" width={"50%"} skeletonHeight={"30px"}>lorem500</SkeletonText>
    </Box>
  </Stack>
  )
}

export default ProfileViewSkeleton