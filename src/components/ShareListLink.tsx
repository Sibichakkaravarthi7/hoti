import { Box, Flex, Text } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/react'
import React from 'react'
import { appColors } from '../theme/foundations/appColor'

const ShareListLink = ({ link }: { link: string }) => {
    const [copyStatus, setCopyStatus] = React.useState("Copy");
    const handleCopy = () => {
        setCopyStatus("Copied!")
        navigator.clipboard.writeText(link);
        setTimeout(() => {
            setCopyStatus("Copy")
        }, 2000)

    };

    return (
        <Flex>
            <Box>
                <Text fontSize={'18px'} fontWeight={500}>
                    Share this list with others!
                </Text>
                <Flex width={"100%"} maxW="400px" justifyContent={"center"} alignItems={"center"} border={`2px solid ${appColors.appPrimary[600]}`}>
                    <Text w="100%" overflow={"hidden"} textOverflow="ellipsis" whiteSpace={"nowrap"} fontSize={'16px'} p="3px 10px">{link}</Text>
                    <Button onClick={() => handleCopy()} fontSize={'16px'} p="5px 16px" height={"100%"}>{copyStatus}</Button>
                </Flex>
            </Box>
        </Flex>
    )
}

export default ShareListLink