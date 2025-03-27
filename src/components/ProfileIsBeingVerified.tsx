import { Box, Flex, Text } from '@chakra-ui/layout'
import React from 'react'

const ProfileIsBeingVerified = () => {
    return (
        <Flex justifyContent={"center"} w="100%" >
            <Box w="97%" textAlign={"center"} py="70px" borderTop={"1px solid #D9D9D9"}>
                <Text fontSize={"28px"} fontWeight={700}>Your profile is being verified.</Text>
                <Text fontSize={"18px"} fontWeight={400} my="20px">Verification can take up to a few days.</Text>
                <Text fontSize={"18px"} fontWeight={400}>We’ll notify you via email once verification is complete.</Text>
            </Box>
        </Flex>
    )
}

export default ProfileIsBeingVerified