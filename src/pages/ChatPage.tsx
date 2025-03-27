import { Box, Flex } from '@chakra-ui/layout'
import { CometChat } from '@cometchat-pro/chat';
import React from 'react'
import { useOutletContext, useParams } from 'react-router-dom';
import useAppStore from '../store';
import useIsUserVerified from '../utils/hooks/useIsUserVerified';
//@ts-ignore
import { CometChatUI } from './../CometChatWorkspace/src';
import { motion } from 'framer-motion';
import { Spinner } from '@chakra-ui/spinner';

const ChatPage = () => {
    //@ts-ignore
    const { cometChatLoading } = useOutletContext();
    const { isUserVerified } = useIsUserVerified();
    const emptyChatNotification = useAppStore((state: any) => state.emptyChatNotification);
    const updateUnreadMessage = useAppStore((state: any) => state.updateUnreadMessage);
    //@ts-ignore
    const { webView } = useOutletContext();

    React.useEffect(() => {
        isUserVerified();
        emptyChatNotification();
        return () => {
            CometChat.getUnreadMessageCount()
                .then((res) => {
                    //@ts-ignore
                    updateUnreadMessage(Object.keys(res?.users)?.length || 0);
                    // console.log('unread messages', Object.keys(res?.users)?.length);
                })
                .catch((err) => {
                    console.log('error', err);
                });
        }
    }, []);
    const { profileId } = useParams();
    return (
        <motion.div className={webView ? "page-layout-webview" : "page-layout"}
            initial={{ opacity: 0, scale: "99%" }}
            animate={{ opacity: 1, scale: "100%" }}
        // transition={{ duration: 0.5 }} 
        >

            {!cometChatLoading ? <> {profileId ? <CometChatUI chatWithUser={profileId} /> : <CometChatUI />} </> : <Flex justifyContent={"center"} alignItems="center" bg="white" minH={"100vh"} ><Spinner color="#EB752F" /></Flex>}
        </motion.div>
    )
}

export default ChatPage