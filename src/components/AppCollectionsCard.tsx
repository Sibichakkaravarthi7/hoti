import { AspectRatio, Box, Button, Flex, HStack, Input, Menu, MenuButton, MenuItem, MenuList, SimpleGrid, Spacer, Spinner, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import AppCard from './chakraOverrides/AppCard'
import AppText from './chakraOverrides/AppText'
import DummyProfile from '../assets/common/profile-image-dummy.png'
import DummyProfile2 from '../assets/dummy/Slice-2.png'
import AppImage from './chakraOverrides/AppImage'
import { Link } from 'react-router-dom'
import AppIcon from './chakraOverrides/AppIcon'
import { BsThreeDotsVertical } from "react-icons/bs"
import { MAKE_INDIVDUAL_COLLECTION_PAGE } from '../navigation/routes/common-routes'
import { BiPencil, BiShare } from 'react-icons/bi'
import { AiOutlineDelete } from 'react-icons/ai'
import makePostRequest from '../api/utils/makePostRequest'
import { useMutation } from '@tanstack/react-query'
import { MdCancel, MdClose, MdOutlineCancel, MdOutlineClose, MdOutlineDone } from 'react-icons/md'
import { DELETE_WISHLIST, RENAME_LIST } from '../api/url/common'
import AppModal from './Modal/AppModal'
import { appColors } from '../theme/foundations/appColor'
import getUserData from '../utils/getUserData'
import { motion } from "framer-motion";

const AppCollectionsCard = ({ listData, listRefetch }: { listData: any, listRefetch: any }) => {

  const [isRenameOn, setIsRenameOn] = React.useState(false);
  const [newName, setNewName] = React.useState("");

  const { isLoading: renameIsLoading, error: renameError, mutate: renameList
  } = useMutation((body) => makePostRequest(RENAME_LIST, body), {
    onSuccess: () => {
      setIsRenameOn(false);
      setNewName("");
      listRefetch();
    }
  });

  const { isLoading: deleteIsLoading, mutate: deleteMutate } = useMutation((body) =>
    makePostRequest(DELETE_WISHLIST, body), {
    onSuccess: () => listRefetch()
  }
  );

  const arr = [DummyProfile, DummyProfile2, DummyProfile2, DummyProfile, DummyProfile];

  const handleRestProfileCount = (index: number) => {
    if ((index == 3) && (listData?.user_wish_list_items?.length > 4)) {
      return <Text color="white" position={"absolute"} fontWeight={600} fontSize={"26px"}>{`+${arr.length - 3}`}</Text>
    } else {
      return "";
    }
  };

  const handleDelete = () => {
    //@ts-ignore
    deleteMutate({
      wishlist_id: listData?.id,
    })
  };

  const handleRename = (listId: number | string) => {
    //@ts-ignore
    renameList({
      wishlist_id: listId,
      new_name: newName,
    })
    console.log("listId", listId)
  };

  const handleShare = () => {
    window.open(`/shared-list/${listData?.share_list_id}`)
  }

  const renameCancel = () => {
    setNewName("");
    setIsRenameOn(false)
  }

  const { isOpen, onClose, onOpen } = useDisclosure();
  const userData = getUserData();
  const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};
  return (
    <AppCard variant={'basicShadow'}>
      <Link to={MAKE_INDIVDUAL_COLLECTION_PAGE(listData.id)}>
        <SimpleGrid columns={2} spacing={5}>
          {arr?.slice(0, 4)?.map((each, index) => (
            <AspectRatio
              key={index.toString() + ':' + each}
              ratio={1}
              backgroundColor={'blackAlpha.800'}
              borderRadius="0.5em">
              <Box position={'relative'}>
                <>
                  <AppImage
                    src={listData?.user_wish_list_items[index]?.profile_image}
                    alt={''}
                    fit={'cover'}
                    customStyles={{
                      borderRadius: '0.5em',
                      opacity: (index === 3 && listData?.user_wish_list_items?.length > 4) ? '0.5' : 'initial',
                      objectFit: "cover",
                      height: "100%",
                      width: "100%",
                      bg: appColors.appGrey[800]
                    }}
                  />
                  {handleRestProfileCount(index)}
                </>
              </Box>
            </AspectRatio>
          ))}
        </SimpleGrid>
      </Link>
      <Box pt="0.75em" justifyContent={"center"} alignItems="center">
        <HStack>
          {isRenameOn ? (
            <Box alignItems={'center'} border={'2px solid #EB752F'} display={'flex'} w="100%">
              <Input
                id='rename'
                name='rename'
                autoFocus={true}
                _focus={{ outline: 'none', border: 'none' }}
                // onBlurCapture={}
                padding={'8px'}
                bg="white"
                placeholder="Enter new name"
                onChange={(e) => setNewName(e.target.value)}
                value={newName}
              />
              {renameIsLoading ? "" : <Box role={"button"} p="8px" bg={'#EB752F'} onClick={() => renameCancel()}>
                <MdClose color='white' fontSize={'15px'} />
              </Box>}
              <Button height={"100%"} isDisabled={newName == ""} p="8px" bg={'#EB752F'} onClick={() => handleRename(listData?.id)}>
                {renameIsLoading ? <Spinner color='white' /> : <MdOutlineDone fontSize={'15px'} color="white" />}
              </Button>
            </Box>
          ) : (
            <AppText size="h3">{listData.list_name}</AppText>
          )}
          <Spacer />
          <Menu placement="end-start">
            <MenuButton>
              <AppIcon icon={BsThreeDotsVertical} boxSize={7} />
            </MenuButton>
            <MenuList fontSize={'18px'}>
              <MenuItem onClick={() => setIsRenameOn(true)} p={'8px 20px'}>
                <BiPencil style={{ marginRight: '14px' }} />
                Rename
              </MenuItem>
              {userData?.user_type == "agency" && <MenuItem p={'8px 20px'} onClick={() => handleShare()}>
                <BiShare style={{ transform: 'scaleX(-1)', marginRight: '14px' }} />
                Share
              </MenuItem>}
              <MenuItem p={'8px 20px'} onClick={() => onOpen()}>
                <AiOutlineDelete style={{ marginRight: '14px' }} />
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
        <AppText>{listData?.user_wish_list_items?.length}</AppText>
      </Box>
      <AppModal disableCloseButton maxWidth={'570px'} px="20px" isOpen={isOpen} onClose={onClose} size="2xl" title={''}>
        <Box p="25px 0px">
          <Text textAlign={"center"} mb="30px" fontWeight={600} fontSize="22px">
            Are you sure  want to delete {listData?.list_name}?
          </Text>
          <Flex justifyContent={'center'} gap={'20px'}>
            <Button variant={"warningButtonOutlined"} onClick={() => onClose()}>Cancel</Button>
            <Button variant={"warningButton"} onClick={() => handleDelete()}>
              Delete
            </Button>
          </Flex>
        </Box>
      </AppModal>
    </AppCard>
  );
}

export default AppCollectionsCard