import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ModalProps,
  HStack
} from '@chakra-ui/react';
import { ModalClose } from '../../utils/customIcons';

interface AppModalType {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: ModalProps['size'];
  title?: string;
  py?: number | string;
  px?: number | string;
  maxWidth?: string | number;
  iconColor?: string;
  closeBtnTop?: string;
  closeBtnRight?: string;
  disableCloseButton?: boolean;
}

function AppModal({ isOpen, onClose, children, size, title, py = 5, px = 3, closeBtnTop = "30px", closeBtnRight = "30px", maxWidth, iconColor = "#757575", disableCloseButton = false }: AppModalType) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size}>
      <ModalOverlay />
      <ModalContent m="10px" maxWidth={maxWidth} py={py} px={px} borderRadius="20px">
        <HStack>
          {title && <ModalHeader p="13px 0px 19px 0px" fontSize="2.4rem" flexBasis={"100%"} fontWeight={'bold'}>{title}</ModalHeader>}
          {!disableCloseButton && <ModalCloseButton position={title ? "inherit" : "absolute"} right={closeBtnRight} top={closeBtnTop} ><ModalClose color={iconColor} /></ModalCloseButton>}
        </HStack>

        <ModalBody p="0px">{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default AppModal;
