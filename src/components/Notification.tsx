import { Menu, MenuButton, MenuIcon, MenuItem, MenuList } from '@chakra-ui/menu';
import React from 'react';
import { BellIcon } from '../utils/customIcons';
import { CometChat } from '@cometchat-pro/chat';
import MessageNotification from './MessageNotification';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { appColors } from '../theme/foundations/appColor';
import useGetRelativeTime from '../utils/hooks/useGetRelativeTime';
import { RxDotFilled } from 'react-icons/rx';
import useAppStore from '../store';
import { IoMdNotificationsOff } from 'react-icons/io';

const Notification = ({ cometChatLoading }: { cometChatLoading: boolean }) => {
    const [allNotification, setAllNotification] = React.useState([]);
    const listenerID = 'abcd123';
    const { getRelativeTime } = useGetRelativeTime();
    //@ts-ignore
    const { chatNotification } = useAppStore();
    const setChatNotification = useAppStore((state: any) => state.setChatNotification);
    const updateUnreadMessage = useAppStore((state: any) => state.updateUnreadMessage);


    const CheckunreadMessgaes = () => {

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

    React.useEffect(() => {
        //@ts-ignore
        setAllNotification([...chatNotification])
    }, [chatNotification])

    console.log('chatNotification', chatNotification);

    const beginUnreadMessageListener = () => {
        console.log('listener initialized!!!!!!!');
        CheckunreadMessgaes();

        CometChat.addMessageListener(
            listenerID,
            new CometChat.MessageListener({
                onTextMessageReceived: (textMessage: any) => {
                    // console.log('Text message received successfully', textMessage);
                    setChatNotification(textMessage);
                    CheckunreadMessgaes();
                },
                onMediaMessageReceived: (mediaMessage: any) => {
                    // console.log('Media message received successfully', mediaMessage);
                    setChatNotification(mediaMessage);
                    CheckunreadMessgaes();
                },
                onCustomMessageReceived: (customMessage: any) => {
                    // console.log('Custom message received successfully', customMessage);
                    setChatNotification(customMessage);
                    CheckunreadMessgaes();
                }
            })
        );
    };
    React.useEffect(() => {
        if (!cometChatLoading) {
            beginUnreadMessageListener();
        }
    }, [cometChatLoading]);

    const giveProperNotificationComponent = () => {
        if (allNotification?.length == 0)
            return (
                <MenuItem zIndex={9} h="400px" justifyContent={"center"}>
                    <Flex mt="-20px" h="100%" flexFlow={"column"} justifyContent={"center"} alignItems="center">
                        <Flex justifyContent={"center"} alignItems={"center"} ><IoMdNotificationsOff color={appColors.appGrey[800]} fontSize={"92px"} /></Flex>
                        <Flex mt="20px" justifyContent={"center"} alignItems={"center"}><Text color={appColors.appGrey[800]} fontWeight={600}>No notifications yet!</Text></Flex>
                    </Flex>
                </MenuItem >
            );
        return allNotification?.map((data: any) => {
            switch (data.type) {
                case 'text':
                    return notificationContainer(<MessageNotification key={data?.sendAt} messageData={data} />, data);
                case 'media':
                    return notificationContainer(<MessageNotification key={data?.sendAt} messageData={data} />, data);
                case 'custom':
                    return notificationContainer(<MessageNotification key={data?.sendAt} messageData={data} />, data);

                default:
                    return;
            }
        });
    };

    const notificationContainer = (comp: any, data: any) => {
        return (
            <MenuItem>
                <Flex gap={"15px"} alignItems="center">
                    {comp}
                    <Box flexBasis={['45px', '75px']}>
                        <Text fontSize={"11px"} whiteSpace="pre" color={appColors.appGrey[700]}>{getRelativeTime(data?.sentAt)}</Text>
                    </Box>
                </Flex>
            </MenuItem>
        );
    };

    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <Menu isOpen={isOpen} onOpen={() => setIsOpen(true)} onClose={() => setIsOpen(false)} isLazy={true} autoSelect={false} variant={'notification'}>
            <MenuButton>
                <Box pos="relative"><BellIcon height={'17px'} width="16px" />{allNotification?.length > 0 ? <RxDotFilled style={{ position: "absolute", color: appColors.appPrimary[600], fontSize: "25px", top: "-10px", right: "-9px" }} /> : ""}</Box>
            </MenuButton>

            {<MenuList zIndex={9}>
                <Text p={["17px 27px"]} fontWeight={700} fontSize="20px" pb="14px" borderBottom={"2px solid #E2E8F0"}>Notifications</Text>
                {giveProperNotificationComponent()}
            </MenuList>}
        </Menu>
    );
};

export default Notification;
