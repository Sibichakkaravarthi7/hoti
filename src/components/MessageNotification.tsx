import { Box, Flex, Text } from '@chakra-ui/layout'
import { Avatar } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { MAKE_INDIVDUAL_CHAT_PAGE } from '../navigation/routes/common-routes'

const MessageNotification = ({ messageData }: { messageData: any }) => {
    const profile_image = messageData?.data?.entities?.sender?.entity?.metadata?.profile_image;
    const name = messageData?.data?.entities?.sender?.entity?.name;
    const linkID = messageData?.data?.entities?.sender?.entity?.uid;
    return (
        <Link to={MAKE_INDIVDUAL_CHAT_PAGE(linkID)}>
            <Flex alignItems={"center"} gap="20px">
                <Avatar src={profile_image} />
                <Box>
                    <Text display={"inline"} variant={"notificationBold"}>{name}</Text>{" "}
                    <Text display={"inline"} variant={"notificationNormal"}>have messaged you</Text>
                </Box>
            </Flex>
        </Link>
    )
}

export default MessageNotification