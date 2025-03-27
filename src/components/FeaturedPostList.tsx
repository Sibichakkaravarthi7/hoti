import { Box, Flex, Text } from '@chakra-ui/layout'
import { Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, Image, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { BsFillPlayFill } from 'react-icons/bs'
import { appColors } from '../theme/foundations/appColor'
import AppListsContainer from './AppListsContainer'

const FeaturedPostList = ({ profileData }: { profileData: any }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [media, setMedia] = React.useState({
        type: "",
        src: "",
    });

    const handleSetMedia = (type: string, src: string) => {
        setMedia({
            type: type,
            src: src,
        });
        onOpen();
    }
    return (
        <AppListsContainer gridTemplateColumns={profileData?.data?.featured_posts?.length > 0 ? ["repeat(3, 1fr)", "repeat(6, 1fr)"] : "auto"} heading={'Featured Posts'}>
            {profileData?.data?.featured_posts?.length > 0 ? (
                <>
                    {profileData?.data?.featured_posts?.map((obj: any) => (
                        <Box
                            bg="black"
                            w="100%"
                            key={obj.media_file__media_file}
                            h="28vw"
                            // maxW="200px"
                            maxH="200px"
                            border="1px solid lightgrey"
                            role={"button"}
                            onClick={() => handleSetMedia(obj.media_file__file_type, obj.media_file__media_file)}
                        >
                            {obj.media_file__file_type == 'image' ? (
                                <Image src={obj.media_file__media_file} objectFit="cover" h="100%" w="100%" />
                            ) : (
                                <Flex h="100%" position={"relative"}  >
                                    <BsFillPlayFill style={{ position: "absolute", color: "white", fontSize: "22px", left: "8px", top: "8px" }} />
                                    <video
                                        style={{ height: '100%', width: "100%" }}
                                        src={obj.media_file__media_file}
                                        // controls
                                        controlsList="nodownload"></video>
                                </Flex>

                            )}
                        </Box>
                    ))}
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent w="100%" maxW="700px" maxH={"600px"} bg={"black"}>
                            {/* <ModalHeader>Modal Title</ModalHeader> */}
                            {/* <ModalCloseButton /> */}
                            <ModalBody p="0px">
                                {media?.type == 'image' ? (
                                    <Image src={media?.src} objectFit="cover" h="100%" w="100%" />
                                ) : (
                                    <Flex h="100%" position={"relative"}  >
                                        <video
                                            style={{ height: '100%', width: "100%" }}
                                            src={media?.src}
                                            controls
                                            controlsList="nodownload"></video>
                                    </Flex>

                                )}
                            </ModalBody>
                        </ModalContent>
                    </Modal>
                </>
            ) : (
                <Text w="100%" fontWeight={500} color={appColors.appGrey[800]}>
                    No Featured Post
                </Text>
            )}
        </AppListsContainer>
    )
}

export default FeaturedPostList