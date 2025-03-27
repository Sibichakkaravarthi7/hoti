import { Box, HStack, Portal, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import AppIcon from './chakraOverrides/AppIcon'
import { FaPlus } from 'react-icons/fa'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
} from '@chakra-ui/react'
import AppFlex from './chakraOverrides/AppFlex'
import AppText from './chakraOverrides/AppText'
import { HiOutlineBolt } from "react-icons/hi2"
import AppModal from './Modal/AppModal'
import { CREATE_CAMPAIGN } from '../navigation/routes/common-routes'
import { useNavigate } from 'react-router-dom'
import CreateSingleListModal from './Modal/CreateSingleListModal'

function AppShortcutPopOver() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const navigate = useNavigate();

  const popoverData = [{ name: "Create a List", description: "Lorem Ipsum Dolor Sit Amet", onClick: ()=> onOpen() }, { name: "Create a Campaign", description: "Lorem Ipsum Dolor Sit Amet", onClick: ()=> navigate(CREATE_CAMPAIGN) }];
  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Box pos="fixed" bottom="10%" right="2%" >
            <HStack justifyContent="center" backgroundColor="appPrimary.600" w="35px" h="35px" borderRadius="50%" cursor='pointer'>
              <AppIcon icon={FaPlus} color="#fff" boxSize={7} />
            </HStack>
          </Box>
        </PopoverTrigger>
        <Portal>
          <PopoverContent width="320px" py={"13px"} border="1px dashed #1D1D1D" borderRadius="14px" _focus={{ boxShadow: "none" }}>
            <PopoverBody>
              { popoverData.map(each =>
                <AppFlex
                  key={each.name}
                  gap="0.9em"
                  onClick={each.onClick}
                  customStyles={{
                    p: "13px 19px",
                    borderRadius: "4px",
                    _hover: {
                      color: "appWhite.900",
                      backgroundColor: "appPrimary.600",
                      transition: "all 150ms ease-in",
                      cursor: "pointer"
                    }
                  }}
                >
                  <AppIcon icon={HiOutlineBolt} boxSize={8} />
                  <Box>
                    <AppText size="textdark2">{each.name}</AppText>
                    <AppText size="textlight3" customStyles={{ my: "0.5em" }}>{each.description}</AppText>
                  </Box>
                </AppFlex>
              )}
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover >

      <AppModal maxWidth={"585px"} px="20px" isOpen={isOpen} onClose={onClose} size="2xl" title={"Create a List"}>
        <CreateSingleListModal onClose={onClose} />
      </AppModal>
    </>
  )
}

export default AppShortcutPopOver